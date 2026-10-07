import { Router } from 'express';
import multer from 'multer';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { requireAuth } from '../auth.js';
import { UPLOAD_DIR } from '../paths.js';

const router = Router();
const MAX_BYTES = 6 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES, files: 1 },
});

// Don't trust the browser's mime type: look at the file's first bytes.
function detectType(buf) {
  if (buf.length > 12 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png';
  if (buf.length > 12 && buf.subarray(0, 4).toString() === 'RIFF' && buf.subarray(8, 12).toString() === 'WEBP') return 'webp';
  return null;
}

router.get('/media', requireAuth, async (_req, res, next) => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const names = (await fs.readdir(UPLOAD_DIR)).filter((n) => /\.(jpg|png|webp)$/.test(n));
    const items = await Promise.all(
      names.map(async (name) => {
        const stat = await fs.stat(path.join(UPLOAD_DIR, name));
        return { name, url: `/uploads/${name}`, size: stat.size, modified: stat.mtimeMs };
      })
    );
    items.sort((a, b) => b.modified - a.modified);
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.post('/media', requireAuth, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file received.' });
    const ext = detectType(req.file.buffer);
    if (!ext) return res.status(400).json({ error: 'Only JPG, PNG or WebP images are allowed.' });
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const name = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
    await fs.writeFile(path.join(UPLOAD_DIR, name), req.file.buffer);
    res.status(201).json({ name, url: `/uploads/${name}`, size: req.file.size });
  } catch (err) {
    next(err);
  }
});

router.delete('/media/:name', requireAuth, async (req, res, next) => {
  try {
    const name = req.params.name;
    if (!/^[\w-]+\.(jpg|png|webp)$/.test(name)) return res.status(400).json({ error: 'Bad file name.' });
    await fs.unlink(path.join(UPLOAD_DIR, name)).catch((e) => {
      if (e.code !== 'ENOENT') throw e;
    });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;

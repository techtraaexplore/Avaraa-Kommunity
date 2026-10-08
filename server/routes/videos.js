import { Router } from 'express';
import multer from 'multer';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { requireAuth } from '../auth.js';
import { UPLOAD_DIR } from '../paths.js';

const router = Router();
const MAX_MB = Number(process.env.MAX_VIDEO_MB) || 200;
const TMP = path.join(UPLOAD_DIR, '.tmp');

const upload = multer({
  storage: multer.diskStorage({
    destination: async (_req, _file, cb) => {
      try {
        await fs.mkdir(TMP, { recursive: true });
        cb(null, TMP);
      } catch (e) {
        cb(e);
      }
    },
    filename: (_req, _file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.part`),
  }),
  limits: { fileSize: MAX_MB * 1024 * 1024, files: 1 },
});

// Look at the first bytes instead of trusting the browser: MP4/MOV have "ftyp", WebM starts with 1A 45 DF A3.
function detectVideo(buf) {
  if (buf.length > 12 && buf.subarray(4, 8).toString() === 'ftyp') return buf.subarray(8, 12).toString().startsWith('qt') ? 'mov' : 'mp4';
  if (buf.length > 4 && buf[0] === 0x1a && buf[1] === 0x45 && buf[2] === 0xdf && buf[3] === 0xa3) return 'webm';
  return null;
}

async function head(file, n = 16) {
  const fh = await fs.open(file, 'r');
  try {
    const buf = Buffer.alloc(n);
    const { bytesRead } = await fh.read(buf, 0, n, 0);
    return buf.subarray(0, bytesRead);
  } finally {
    await fh.close();
  }
}

router.get('/videos', requireAuth, async (_req, res, next) => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const names = (await fs.readdir(UPLOAD_DIR)).filter((n) => /\.(mp4|mov|webm)$/.test(n));
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

router.post('/videos', requireAuth, upload.single('file'), async (req, res, next) => {
  const tmp = req.file?.path;
  try {
    if (!req.file) return res.status(400).json({ error: 'No file received.' });
    const ext = detectVideo(await head(tmp));
    if (!ext) {
      await fs.unlink(tmp).catch(() => {});
      return res.status(400).json({ error: 'Only MP4, MOV or WebM videos are allowed.' });
    }
    const name = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
    await fs.rename(tmp, path.join(UPLOAD_DIR, name));
    res.status(201).json({ name, url: `/uploads/${name}`, size: req.file.size });
  } catch (err) {
    if (tmp) await fs.unlink(tmp).catch(() => {});
    next(err);
  }
});

router.delete('/videos/:name', requireAuth, async (req, res, next) => {
  try {
    const name = req.params.name;
    if (!/^[\w-]+\.(mp4|mov|webm)$/.test(name)) return res.status(400).json({ error: 'Bad file name.' });
    await fs.unlink(path.join(UPLOAD_DIR, name)).catch((e) => {
      if (e.code !== 'ENOENT') throw e;
    });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;

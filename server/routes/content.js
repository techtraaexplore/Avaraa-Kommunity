import { Router } from 'express';
import { requireAuth } from '../auth.js';
import { copyIfExists, readJson, remove, writeJson } from '../store.js';

const router = Router();
const FILE = 'content.json';

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// Public: the website reads this on load. An empty object means "nothing saved yet, use the built-in defaults".
router.get('/content', async (_req, res, next) => {
  try {
    const content = await readJson(FILE);
    res.set('Cache-Control', 'no-store');
    res.json(content ?? {});
  } catch (err) {
    next(err);
  }
});

router.put('/content', requireAuth, async (req, res, next) => {
  try {
    if (!isPlainObject(req.body)) return res.status(400).json({ error: 'Content must be a JSON object.' });
    await copyIfExists(FILE, 'content.backup.json'); // keep one step of undo
    await writeJson(FILE, req.body);
    res.json({ ok: true, savedAt: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
});

// Reset to the built-in defaults (the previous version is kept as content.backup.json).
router.delete('/content', requireAuth, async (_req, res, next) => {
  try {
    await copyIfExists(FILE, 'content.backup.json');
    await remove(FILE);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;

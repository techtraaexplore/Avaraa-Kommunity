import { Router } from 'express';
import crypto from 'node:crypto';
import { rateLimit, requireAuth } from '../auth.js';
import { readJson, writeJson } from '../store.js';

const router = Router();
const FILE = 'enquiries.json';
const MAX_STORED = 5000;

const clean = (v, max) => (typeof v === 'string' ? v.trim().replace(/\s+/g, ' ').slice(0, max) : '');

const submitLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  message: 'Too many requests. Please message us on WhatsApp instead.',
});

// Public: the "Save my spot" form posts here (as well as opening WhatsApp).
router.post('/enquiries', submitLimit, async (req, res, next) => {
  try {
    const b = req.body || {};
    if (b.website) return res.json({ ok: true }); // honeypot field: bots fill it, people never see it
    const entry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: clean(b.name, 80),
      phone: clean(b.phone, 30),
      city: clean(b.city, 80),
      group: clean(b.group, 20),
      trip: clean(b.trip, 80),
    };
    if (!entry.name || !entry.phone) return res.status(400).json({ error: 'Name and phone are required.' });
    const list = await readJson(FILE, []);
    list.unshift(entry);
    await writeJson(FILE, list.slice(0, MAX_STORED));
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.get('/enquiries', requireAuth, async (_req, res, next) => {
  try {
    res.json(await readJson(FILE, []));
  } catch (err) {
    next(err);
  }
});

router.delete('/enquiries/:id', requireAuth, async (req, res, next) => {
  try {
    const list = await readJson(FILE, []);
    await writeJson(FILE, list.filter((e) => e.id !== req.params.id));
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;

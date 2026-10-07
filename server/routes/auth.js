import { Router } from 'express';
import { adminConfigured, checkPassword, issueToken, rateLimit, requireAuth } from '../auth.js';

const router = Router();

const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many attempts. Try again in a few minutes.',
});

router.post('/login', loginLimit, (req, res) => {
  if (!adminConfigured()) {
    return res.status(503).json({
      error: 'Admin password is not set. Copy .env.example to .env, set ADMIN_PASSWORD, then restart the server.',
    });
  }
  if (!checkPassword(req.body?.password ?? '')) {
    return res.status(401).json({ error: 'Wrong password.' });
  }
  res.json(issueToken());
});

// Lets the admin app check that a stored token is still valid.
router.get('/me', requireAuth, (_req, res) => res.json({ ok: true }));

export default router;

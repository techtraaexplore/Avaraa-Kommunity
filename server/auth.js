// Password login -> short-lived signed token. No database and no extra dependencies.
import crypto from 'node:crypto';

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const SECRET = process.env.TOKEN_SECRET || crypto.randomBytes(32).toString('hex');

const sha = (v) => crypto.createHash('sha256').update(String(v)).digest();
const sign = (payload) => crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export function checkPassword(input) {
  if (!adminConfigured()) return false;
  return crypto.timingSafeEqual(sha(input), sha(process.env.ADMIN_PASSWORD));
}

export function issueToken() {
  const payload = String(Date.now() + TOKEN_TTL_MS);
  return { token: `${payload}.${sign(payload)}`, expiresAt: Number(payload) };
}

function verifyToken(token) {
  if (typeof token !== 'string') return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  return Number(payload) > Date.now();
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!verifyToken(token)) return res.status(401).json({ error: 'Please log in again.' });
  next();
}

// Very small in-memory rate limiter (per IP). Good enough for a single-process site.
export function rateLimit({ windowMs, max, message }) {
  const hits = new Map();
  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip;
    const entry = hits.get(key);
    if (!entry || entry.reset < now) {
      hits.set(key, { count: 1, reset: now + windowMs });
      return next();
    }
    entry.count += 1;
    if (entry.count > max) return res.status(429).json({ error: message });
    next();
  };
}

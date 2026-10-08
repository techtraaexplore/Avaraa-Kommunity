import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { adminConfigured } from './auth.js';
import { DIST_DIR, UPLOAD_DIR } from './paths.js';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import enquiryRoutes from './routes/enquiries.js';
import mediaRoutes from './routes/media.js';
import videoRoutes from './routes/videos.js';

const app = express();
const PORT = Number(process.env.PORT) || 4000;

if (process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY) || 1);
app.disable('x-powered-by');

app.use((_req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
  });
  next();
});

app.use(express.json({ limit: '2mb' }));

// API
app.use('/api', authRoutes);
app.use('/api', contentRoutes);
app.use('/api', mediaRoutes);
app.use('/api', videoRoutes);
app.use('/api', enquiryRoutes);
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

// Uploaded photos and videos
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '30d', immutable: true, index: false }));

// Production: serve the built React app (run `npm run build` first)
if (fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
  app.use(express.static(DIST_DIR, { maxAge: '1h' }));
  app.get('*', (_req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
}

// Errors (upload too big, bad JSON, etc.)
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    const isVideo = _req.path.startsWith('/videos');
    return res.status(413).json({ error: isVideo ? `Video is too large (max ${Number(process.env.MAX_VIDEO_MB) || 200} MB).` : 'Image is too large (max 6 MB).' });
  }
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Content is too large.' });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON.' });
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// Only listen if not running in Vercel serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Avaraa server running on http://localhost:${PORT}`);
    if (!adminConfigured()) {
      console.warn('! ADMIN_PASSWORD is not set. The admin panel is locked. Copy .env.example to .env and set it.');
    }
  });
}

// Export for Vercel serverless
export default app;

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

export const ROOT = path.resolve(here, '..');
export const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(here, 'data'));
export const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(here, 'uploads'));
export const DIST_DIR = path.join(ROOT, 'dist');

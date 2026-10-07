// Tiny JSON-file storage. Writes are atomic (temp file + rename) so a crash can't leave half a file.
import fs from 'node:fs/promises';
import path from 'node:path';
import { DATA_DIR } from './paths.js';

const file = (name) => path.join(DATA_DIR, name);

export async function readJson(name, fallback = null) {
  try {
    return JSON.parse(await fs.readFile(file(name), 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return fallback;
    throw err;
  }
}

export async function writeJson(name, data) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = file(`${name}.${process.pid}.tmp`);
  await fs.writeFile(tmp, JSON.stringify(data, null, 2));
  await fs.rename(tmp, file(name));
}

export async function copyIfExists(from, to) {
  try {
    await fs.copyFile(file(from), file(to));
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}

export async function remove(name) {
  try {
    await fs.unlink(file(name));
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}

import { compressImage } from '../utils/image.js';
import { api } from './client.js';

export const listMedia = () => api('/media', { auth: true });
export const deleteMedia = (name) => api(`/media/${name}`, { method: 'DELETE', auth: true });

export async function uploadImage(file) {
  const ready = await compressImage(file);
  const formData = new FormData();
  formData.append('file', ready);
  return api('/media', { method: 'POST', auth: true, formData });
}

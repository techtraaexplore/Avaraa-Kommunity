import { api, ApiError, getToken } from './client.js';

export const listVideos = () => api('/videos', { auth: true });
export const deleteVideo = (name) => api(`/videos/${name}`, { method: 'DELETE', auth: true });

/** Upload a video with a progress callback (fetch can't report upload progress, XHR can). */
export function uploadVideo(file, onProgress) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('file', file);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/videos');
    xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress?.(Math.round((e.loaded / e.total) * 100));
    xhr.onerror = () => reject(new ApiError('Could not reach the server. Is it running?', 0));
    xhr.onload = () => {
      let data = null;
      try {
        data = JSON.parse(xhr.responseText);
      } catch {
        /* empty */
      }
      if (xhr.status >= 200 && xhr.status < 300) resolve(data);
      else if (xhr.status === 413) reject(new ApiError(data?.error || 'That video is too large.', 413));
      else reject(new ApiError(data?.error || `Upload failed (${xhr.status}). A proxy may be limiting the file size.`, xhr.status));
    };
    xhr.send(form);
  });
}

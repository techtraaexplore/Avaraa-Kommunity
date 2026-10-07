/** Shrink a photo in the browser before uploading (max 1600px, WebP) so pages stay fast. */
export async function compressImage(file, { maxSize = 1600, quality = 0.82 } = {}) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error('Please choose a JPG, PNG or WebP image.');
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, maxSize / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
    if (blob && blob.size < file.size) {
      return new File([blob], `${file.name.replace(/\.\w+$/, '')}.webp`, { type: 'image/webp' });
    }
  } catch {
    /* fall through and upload the original */
  }
  return file;
}

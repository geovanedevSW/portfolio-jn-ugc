/**
 * Cloudinary Optimization Helper
 * Centralizes URL transformations to ensure high performance and consistent quality.
 */

export const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/your-cloud-name/image/upload';

export function getOptimizedUrl(url: string, width?: number, quality: 'auto' | 'high' = 'auto') {
  if (!url) return '';
  if (!url.includes('cloudinary.com')) return url;

  // Extract the path after /upload/
  const parts = url.split('/upload/');
  if (parts.length < 2) return url;

  const path = parts[1];
  const transformations = [];

  // Automatic format (WebP/AVIF) and quality
  transformations.push(`f_auto`);
  transformations.push(`q_${quality === 'auto' ? 'auto' : 'high'}`);

  if (width) {
    transformations.push(`w_${width}`);
  }

  return `${CLOUDINARY_BASE_URL}/${transformations.join(',')}/${path}`;
}

export function getCloudinaryThumbnail(url: string) {
  // Extract frame from video if it's a video URL, or optimize if image
  if (!url) return '';
  if (!url.includes('cloudinary.com')) return url;

  const parts = url.split('/upload/');
  if (parts.length < 2) return url;

  const path = parts[1];
  // so_0: extract first frame of video
  return `${CLOUDINARY_BASE_URL}/so_0,f_auto,q_auto,w_500/${path}`;
}

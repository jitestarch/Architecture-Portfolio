import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Helper to dynamically inject optimization parameters into Cloudinary URLs.
 * If the URL is not a Cloudinary URL, it returns it unchanged.
 */
export function getOptimizedImageUrl(url: string, width?: number): string {
  if (!url || !url.includes('res.cloudinary.com')) {
    return url;
  }

  // Check if it already contains transformations
  if (
    url.includes('/image/upload/c_') || 
    url.includes('/image/upload/w_') || 
    url.includes('/image/upload/f_auto') ||
    url.includes('/image/upload/q_auto')
  ) {
    return url;
  }

  const transformation = width 
    ? `w_${width},c_limit,q_auto,f_auto` 
    : 'q_auto,f_auto';

  // Replace '/image/upload/' with '/image/upload/<transformation>/'
  return url.replace('/image/upload/', `/image/upload/${transformation}/`);
}


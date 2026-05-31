/**
 * Cloudinary Helper Functions
 * 
 * In a production architecture, you would integrate this with next-cloudinary
 * or @cloudinary/url-gen. For this portfolio, we abstract the media URL generation.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';

/**
 * Generate an optimized Cloudinary image URL
 */
export function getOptimizedImageUrl(publicId: string, width?: number, height?: number): string {
  // If it's an external URL (like our placeholder picsum), return it directly
  if (publicId.startsWith('http')) return publicId;

  const transforms = ['f_auto', 'q_auto'];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  transforms.push('c_fill'); // Crop fill for responsive cover images

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(',')}/${publicId}`;
}

/**
 * Generate a low-quality image placeholder (LQIP) URL for blur-up effects
 */
export function getBlurPlaceholderUrl(publicId: string): string {
  if (publicId.startsWith('http')) return publicId;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_50,e_blur:1000/${publicId}`;
}

/**
 * Generate a URL for PDF delivery and optional download
 */
export function getPdfUrl(publicId: string, download: boolean = false): string {
  if (publicId.startsWith('http')) return publicId;
  const transforms = download ? 'fl_attachment' : '';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms ? transforms + '/' : ''}${publicId}.pdf`;
}

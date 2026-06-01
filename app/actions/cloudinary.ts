'use server';

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using Server-side environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Next.js Server Action to securely generate a signature for Cloudinary uploads.
 * This runs strictly on the server, keeping your API Secret 100% hidden.
 */
export async function getCloudinarySignature(folder: string = 'portfolio-projects') {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) {
    throw new Error('Cloudinary API Secret is not configured in .env.local');
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  
  // Set parameters that the signature will authorize
  const paramsToSign = {
    timestamp,
    folder,
  };

  // Generate signature using Cloudinary SDK
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    apiSecret
  );

  return {
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
  };
}

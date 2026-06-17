'use client';

import * as React from 'react';
import { Upload, X, FileText, Loader2, ExternalLink } from 'lucide-react';
import { getCloudinarySignature } from '@/app/actions/cloudinary';
import { cn } from '@/lib/utils';

interface PdfUploaderProps {
  label: string;
  value?: string;
  onUploadSuccess: (url: string) => void;
  onRemove: () => void;
  className?: string;
}

export function PdfUploader({
  label,
  value,
  onUploadSuccess,
  onRemove,
  className,
}: PdfUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'signing' | 'uploading' | 'error'>('idle');
  const [progress, setProgress] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const uploadFile = async (file: File) => {
    if (!file) return;

    // Check file type
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('Please upload a valid PDF file.');
      setStatus('error');
      return;
    }

    // Check size limit (e.g., 20MB for large PDFs)
    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 20MB limit.');
      setStatus('error');
      return;
    }

    try {
      setStatus('signing');
      setErrorMessage(null);
      setProgress(0);

      // 1. Get secure signature from Server Action
      const { signature, timestamp, cloudName, apiKey } = await getCloudinarySignature('portfolio-cv');

      if (!cloudName || !apiKey) {
        throw new Error('Cloudinary environment variables are not configured on the server.');
      }

      setStatus('uploading');

      // 2. Perform direct upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);
      formData.append('folder', 'portfolio-cv');

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

      // Track progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setProgress(percent);
        }
      });

      // Handle response
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.secure_url) {
              onUploadSuccess(response.secure_url);
              setStatus('idle');
            } else {
              throw new Error('No secure URL returned from Cloudinary.');
            }
          } catch (err: any) {
            setErrorMessage(err.message || 'Failed to parse upload response.');
            setStatus('error');
          }
        } else {
          try {
            const errResponse = JSON.parse(xhr.responseText);
            setErrorMessage(errResponse.error?.message || `Upload failed with status ${xhr.status}`);
          } catch {
            setErrorMessage(`Upload failed with status ${xhr.status}`);
          }
          setStatus('error');
        }
      };

      xhr.onerror = () => {
        setErrorMessage('Network error occurred during upload.');
        setStatus('error');
      };

      xhr.send(formData);

    } catch (error: any) {
      console.error('Upload error:', error);
      setErrorMessage(error.message || 'An error occurred during upload.');
      setStatus('error');
    }
  };

  const onDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  }, []);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const triggerSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">
        {label}
      </label>

      {value ? (
        // Preview / Completed PDF State
        <div className="relative border border-gray-200 bg-gray-50/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 group">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 text-red-500 rounded-none border border-red-100">
              <FileText className="w-8 h-8 stroke-1.5" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-800 uppercase tracking-wider">Portfolio Document</p>
              <a 
                href={value} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] text-[#2563EB] font-bold hover:underline flex items-center gap-1 uppercase"
              >
                View Uploaded PDF <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-250 text-red-600 text-[10px] uppercase tracking-wider font-bold hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm"
          >
            <X className="w-3.5 h-3.5" /> Remove PDF
          </button>
        </div>
      ) : (
        // Dropzone Uploader State
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={status === 'idle' ? triggerSelect : undefined}
          className={cn(
            'border border-dashed py-10 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ease-out select-none',
            isDragging
              ? 'border-[#2563EB] bg-[#2563EB]/5 scale-[1.01]'
              : 'border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50/50',
            status !== 'idle' && 'pointer-events-none'
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileSelect}
            accept="application/pdf"
            className="hidden"
          />

          {status === 'idle' && (
            <div className="space-y-4 flex flex-col items-center">
              <div className="p-4 bg-gray-50 rounded-full text-gray-400 group-hover:text-gray-600 transition-colors">
                <Upload className="w-6 h-6 stroke-1" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-800">
                  Drag and drop PDF, or <span className="text-[#2563EB] font-bold hover:underline">browse</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                  PDF up to 20MB
                </p>
              </div>
            </div>
          )}

          {status === 'signing' && (
            <div className="space-y-3 flex flex-col items-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#2563EB]" />
              <p className="text-xs text-gray-500 font-medium animate-pulse">
                Authorizing secure connection...
              </p>
            </div>
          )}

          {status === 'uploading' && (
            <div className="w-full max-w-[80%] space-y-4 flex flex-col items-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#2563EB] mb-2" />
              <div className="w-full bg-gray-100 h-1.5 overflow-hidden">
                <div
                  className="bg-[#2563EB] h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 font-medium">
                Uploading: {progress}%
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4 flex flex-col items-center p-4">
              <div className="p-3 bg-red-50 text-red-500 rounded-full">
                <X className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-red-600">Upload Failed</p>
                <p className="text-[10px] text-gray-400 mt-1 max-w-[200px] leading-relaxed">
                  {errorMessage || 'Unknown error occurred.'}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setStatus('idle');
                  setErrorMessage(null);
                }}
                className="text-[10px] uppercase tracking-widest font-bold text-[#2563EB] hover:underline"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useRef } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  destinationId: string;
  currentImageUrl?: string;
  onImageUploaded?: (imageUrl: string) => void;
  onImageDeleted?: () => void;
  className?: string;
}

export default function ImageUpload({
  destinationId,
  currentImageUrl,
  onImageUploaded,
  onImageDeleted,
  className = ''
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const { destinationService } = await import('@/services');
      const response = await destinationService.uploadDestinationImage(destinationId, file);

      if (response.success && response.data) {
        setUploadSuccess(true);
        onImageUploaded?.(response.data.image.url);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        setUploadError(response.error || 'Upload failed');
      }
    } catch {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!currentImageUrl) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const { destinationService } = await import('@/services');
      const response = await destinationService.deleteDestinationImage(destinationId);

      if (response.success) {
        onImageDeleted?.();
      } else {
        setUploadError(response.error || 'Delete failed');
      }
    } catch {
      setUploadError('Delete failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Image Display */}
      {currentImageUrl && (
        <div className="relative group">
          <Image
            src={currentImageUrl}
            alt="Destination"
            width={400}
            height={256}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <button
            onClick={handleDeleteImage}
            disabled={isUploading}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Area */}
      <div
        onClick={triggerFileSelect}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${currentImageUrl 
            ? 'border-gray-300 hover:border-gray-400' 
            : 'border-blue-300 hover:border-blue-400 bg-blue-50'
          }
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : uploadSuccess ? (
          <div className="flex flex-col items-center space-y-2">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <p className="text-sm text-green-600">Image uploaded successfully!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-8 h-8 text-blue-500" />
            <p className="text-sm text-gray-600">
              {currentImageUrl ? 'Click to change image' : 'Click to upload image'}
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{uploadError}</p>
        </div>
      )}
    </div>
  );
}

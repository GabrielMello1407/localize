/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const handleOnUpload = (result: any) => {
    if (result.event === 'success') {
      onUpload(result.info.secure_url);
    }
  };

  return (
    <div className="image-upload">
      <CldUploadWidget uploadPreset="localize" onSuccess={handleOnUpload}>
        {({ open }) => (
          <button
            onClick={() => open()}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Enviar Imagem
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;

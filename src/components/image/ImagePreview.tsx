import React, { useEffect, useState } from 'react';

interface ImagePreviewProps {
  image: File;
  onRemove: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, onRemove }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    // Create object URL for preview
    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);
    
    // Clean up the URL when the component unmounts
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]); //AI assisted, cleanup function added to revoke the object URL

  return (
    <div 
      className="group relative overflow-hidden rounded-lg border border-gray-200"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative bg-gray-100 pt-[100%]">
        
        {previewUrl && (
          <img
            src={previewUrl}
            alt={image.name}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-300`}
          />
        )}
        
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={onRemove}
            className="rounded-full bg-red-500 p-2 text-white transition-transform duration-200 hover:scale-110 hover:bg-red-600"
            title="Remove image"
          >
            delete
          </button>
        </div>
      </div>
      
      <div className="bg-white p-2">
        <p className="truncate text-xs text-gray-600" title={image.name}>
          {image.name}
        </p>
        <p className="text-xs text-gray-500">
          {(image.size / 1024).toFixed(0)} KB
        </p>
      </div>
    </div>
  );
};

export default ImagePreview;
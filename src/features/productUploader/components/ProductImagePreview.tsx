import ImagePreview from 'components/image/ImagePreview';
import React, { useCallback } from 'react'

interface ProductImagePreviewProps {
  uploadedImages: File[];
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>;
  errors?: {
    uploadedImages?: string;
  };
} // AI assisted

const MAX_IMAGES: number = 3;

export default function ProductImagePreview({ uploadedImages, setUploadedImages, errors }: ProductImagePreviewProps) {

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("Files:", files);

    if (files) {
      const newImages = Array.from(files).filter(
        (file) => !uploadedImages.some(
          (uploadedFile) => uploadedFile.name === file.name && uploadedFile.size === file.size
        )
      ).slice(0, 3);

      if (newImages.length < Array.from(files).length) {
        alert("Same files were already uploaded and have been skipped.");
      }

      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    },[]);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    },[]);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const files = e.dataTransfer.files
        if (files) {
            const newImages = Array.from(files).slice(0, 3)
            setUploadedImages((prevImages) => [...prevImages, ...newImages])
        }
    },[setUploadedImages]);


  const handleRemoveImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index))
    };

  console.log("Uploaded images:", uploadedImages);

  return (
    <>
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Product Images</h2>
      
      <div
        className={`mb-4 rounded-lg border-2 border-dashed p-6 text-center transition-colors duration-200`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          
          <p className="mb-1 text-lg font-medium text-gray-700">
            Drag and drop your images here
          </p>
          
          <p className="mb-4 text-sm text-gray-500">
            or click to browse (JPEG, PNG, GIF, WebP &bull; Max 5MB)
          </p>
          {/* AI assisted tailwindcss */}
          <label className={`${
                uploadedImages.length >= MAX_IMAGES ? 'cursor-not-allowed opacity-50' : 'cursor-pointer  opacity-100 '
                } inline-flex  items-center rounded-md border border-transparent
                 bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                  if (file && file.size > 5 * 1024 * 1024) {
                    alert("File size should not exceed 5MB.");
                    e.target.value = "";
                  }
                handleFileInputChange(e);
                e.target.value = ''; // bugfix: when you upload the same file, it doesn't trigger the onChange event
              }}
              className="sr-only"
              disabled={uploadedImages.length >= MAX_IMAGES}
            />
            Upload Images
          </label>
          
          <p className="mt-2 text-xs text-gray-500">
            {uploadedImages.length}/{MAX_IMAGES} images uploaded
          </p>
        </div>
      </div>
      {/* AI assisted  */}
      {errors?.uploadedImages && (
        <div className="mb-4 flex items-start rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          <p className="text-sm">{errors.uploadedImages}</p>
        </div>
      )}

    {uploadedImages.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {uploadedImages.map((image, index) => (
            <ImagePreview 
              key={`${image.name}-${index}`} 
              image={image} 
              onRemove={() => handleRemoveImage(index)} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md bg-gray-50 py-8">
          {/* <ImageIcon className="mb-3 size-12 text-gray-300" /> */}
          <p className="text-sm text-gray-500">No images uploaded yet</p>
        </div>
      )}
    </div>
    </>
  )
}

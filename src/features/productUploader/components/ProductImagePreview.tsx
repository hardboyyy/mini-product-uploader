import React from 'react'

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
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).slice(0, 3)
      setUploadedImages((prevImages) => [...prevImages, ...newImages])
    }
  }

  console.log("Uploaded images:", uploadedImages);

  return (
    <>
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Product Images</h2>
      
      <div
        className={`mb-4 rounded-lg border-2 border-dashed p-6 text-center transition-colors duration-200`}
      >
        <div className="flex flex-col items-center justify-center">
          
          <p className="mb-1 text-lg font-medium text-gray-700">
            Drag and drop your images here
          </p>
          
          <p className="mb-4 text-sm text-gray-500">
            or click to browse (JPEG, PNG, GIF, WebP &bull; Max 5MB)
          </p>
          {/* AI assisted tailwindcss */}
          <label className="inline-flex cursor-pointer items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileInputChange}
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
    </div>
    </>
  )
}

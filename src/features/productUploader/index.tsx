import React, { useState } from "react"
import ProductForm from "./components/ProductForm"
import { ProductData } from "./types"
import ProductImagePreview from "./components/ProductImagePreview"
import Toast from "components/ui/Toast"

export default function ProductUploader() {
  const [productData, setProductData] = useState<ProductData>({
    title: "",
    category: "",
    tags: []
  })
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = React.useState<{
    title?: string
    category?: string
    uploadedImages?: string
  }>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    e.preventDefault()
    const newErrors: {
      uploadedImages: string
      title?: string
      category?: string
    } = {}

    if (!productData.title) {
      newErrors.title = "Title is required"
    }

    if (!productData.category) {
      newErrors.category = "Category is required"
    }

    if (uploadedImages.length === 0) {
      newErrors.uploadedImages = "At least one image is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length !== 0) {
      setIsSubmitting(false)
      return
    }

    // Simulating network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Handle form submission here
    console.log("Form submitted with data:", productData)
    console.log("Uploaded images:", uploadedImages)
    setShowToast(true);

    setTimeout(() => {
        setShowToast(false)
    }, 3000);
    // Reset form and images after submission
    setProductData({
      title: "",
      category: "",
      tags: []
    })
    setUploadedImages([])
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Product Uploader
      </h1>
      <div className="lg:flex lg:gap-8">
        <div className="mb-8 w-full lg:mb-0 lg:w-1/2">
          <ProductForm
            productData={productData}
            setProductData={setProductData}
            isSubmitting={isSubmitting}
            hasImages={uploadedImages.length > 0}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <ProductImagePreview
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
        </div>
      </div>
      {showToast && (
        <Toast 
          message="Product successfully uploaded!" 
          type="success" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  )
}

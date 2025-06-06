import React from "react"
import { ProductData } from "../types"
import Loader from "components/ui/Loader"
import Button from "components/ui/Button"

interface ProductFormProps {
  productData: ProductData
  setProductData: React.Dispatch<React.SetStateAction<ProductData>>
  hasImages: boolean
  errors: {
    title?: string
    category?: string
  }
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isSubmitting: boolean
}

const CATEGORIES = [
  "T-shirt",
  "Dress",
  "Hoodie",
  "Jeans",
  "Shoes",
  "Accessories"
]

//in this component error handling is AI assisted and also the version 1.0 of the form is AI assisted, types check are also AI assisted

export default function ProductForm({
  productData,
  setProductData,
  hasImages,
  errors,
  handleSubmit,
  isSubmitting
}: ProductFormProps) {
  const [tagsInput, setTagsInput] = React.useState("")
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleTagsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value)
  }

  const handleTagsInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const newTag = tagsInput.trim()
      if (newTag && !productData.tags.includes(newTag)) {
        setProductData((prevData) => ({
          ...prevData,
          tags: [...prevData.tags, newTag]
        }))
        setTagsInput("")
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    setProductData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove)
    }))
  }

  console.log("productData", productData)
  return (
    <>
      <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Product Information
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Product Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={productData.title}
              onChange={handleChange}
              className={`w-full border px-3 py-2 ${
                errors.title ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter product title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className={`w-full border px-3 py-2 ${
                errors.category ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="tags"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <div>
              <div className="flex items-center">
                <input
                  id="tags"
                  type="text"
                  value={tagsInput}
                  onChange={handleTagsInputChange}
                  onKeyDown={handleTagsInputKeyDown}
                  // onBlur={addTag}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tags separated by commas"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Press Enter or comma to add a tag
              </p>
              {productData.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {productData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800"
                    >
                      {tag}
                      <Button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        &times;
                      </Button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {!hasImages && (
            <p className="mt-2 text-center text-sm text-orange-500">
              Please upload at least one image
            </p>
          )}

          <div className="mt-6">
            <Button
              type="submit"
              disabled={isSubmitting || !hasImages}
            //   className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

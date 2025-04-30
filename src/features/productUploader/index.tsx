import { useState } from 'react'
import ProductForm from './components/ProductForm'
import { ProductData } from './types';

export default function ProductUploader() {
    const [productData, setProductData] = useState<ProductData>({
        title: '',
        category: '',
        tags: [],
      });
      const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="mb-6 text-3xl font-bold text-gray-800">Product Uploader</h1>
    
    <ProductForm productData={productData} setProductData={setProductData} />
    
    
  </div>
  )
}

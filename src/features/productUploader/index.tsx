import { useState } from 'react'
import ProductForm from './components/ProductForm'
import { ProductData } from './types';
import ProductImagePreview from './components/ProductImagePreview';

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
    <div className='lg:flex lg:gap-8'>
        <div className="w-full lg:w-1/2">
            <ProductForm productData={productData} setProductData={setProductData} hasImages={uploadedImages.length > 0} />
        </div>
        <div className="w-full lg:w-1/2">
            <ProductImagePreview uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
        </div>
    </div>
    
    {/* <ProductForm productData={productData} setProductData={setProductData} /> */}
    
    
  </div>
  )
}

'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { isValidCategory } from '@/lib/constants'
import { Product } from '@/lib/types'

export default function ProductPage({ params }: { params: { category: string; id: string } }) {
  const searchParams = useSearchParams()
  const encodedData = searchParams.get('data')
  const category = decodeURIComponent(params.category)
  
  if (!isValidCategory(category)) {
    notFound()
  }

  let product: Product | null = null;
  if (encodedData) {
    try {
      product = JSON.parse(decodeURIComponent(encodedData)) as Product;
    } catch (error) {
      console.error('Error parsing product data:', error);
    }
  }

  useEffect(() => {
    if (product) {
      localStorage.setItem('lastViewedCategory', product.category)
    }
  }, [product])

  if (!product || product.category !== decodeURIComponent(params.category) || product.id.toString() !== params.id) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-2"><strong>Category:</strong> {product.category}</p>
        <p className="text-gray-600 mb-2"><strong>CAS:</strong> {product.cas}</p>
        <p className="text-gray-600 mb-2"><strong>Catalog:</strong> {product.catalog}</p>
        {/* Add more product details here as needed */}
      </div>
    </div>
  )
}

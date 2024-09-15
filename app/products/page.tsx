'use client'

import { getProducts } from '@/lib/google-sheets';
import ProductCard from '@/components/product-card';
import { Input } from '@/components/ui/input';


// OR for Incremental Static Regeneration (ISR) with a 60-second interval
// export const revalidate = false;

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <Input
        type="text"
        placeholder="Search products..."
        className="mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
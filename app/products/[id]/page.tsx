import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getProducts } from '@/lib/google-sheets'
import Link from 'next/link'

export const revalidate = 3600; // Revalidate every hour

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const products = await getProducts()
  const product = products.find(p => p.id.toString() === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Products
      </Link>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Other Attributes</h2>
            <p className="text-gray-700">{product.otherAttributes}</p>
          </div>
          
          {/* <Button className="w-full">Add to Cart</Button> */}
        </div>
      </div>
    </div>
  )
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}
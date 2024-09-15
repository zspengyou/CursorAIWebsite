import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Chemical E-commerce Store</h1>
      <p className="mb-6">We are dedicated to providing high-quality chemicals for various industries and research purposes.</p>
      <Link href="/products">
        <Button>View Our Products</Button>
      </Link>
    </main>
  )
}

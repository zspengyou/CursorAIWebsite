import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    otherAttributes: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <p className="text-xs text-gray-500">{product.otherAttributes}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/products/${product.id}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
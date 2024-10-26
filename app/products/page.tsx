'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getProducts } from '@/lib/google-sheets'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Product {
  id: number;
  name: string;
  cas: string;
  catalog: string;
  category: string;
}

const categories = [
  { name: 'Advanced Building Blocks', sheet: 'Sheet1' },
  { name: 'Isotope labeled compounds', sheet: 'Sheet2' },
  { name: 'PEGs and PEG Linkers', sheet: 'Sheet3' },
  { name: 'Cy5', sheet: 'Sheet4' },
]

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await Promise.all(
        categories.map(async (category) => {
          const fetchedProducts = await getProducts(category.sheet)
          return fetchedProducts.map(product => ({ ...product, category: category.name }))
        })
      )
      const flattenedProducts = allProducts.flat()
      setProducts(flattenedProducts)
      setFilteredProducts(flattenedProducts)
    }
    fetchAllProducts()
  }, [])

  useEffect(() => {
    let filtered = products
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.cas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.catalog.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, products])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <Button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            variant={selectedCategory === category.name ? "default" : "outline"}
          >
            {category.name}
          </Button>
        ))}
        <Button
          onClick={() => setSelectedCategory('All')}
          variant={selectedCategory === 'All' ? "default" : "outline"}
        >
          All
        </Button>
      </div>

      <Input
        type="text"
        placeholder="Search by Chemical Name, CAS, or Catalog..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chemical Name</TableHead>
            <TableHead>CAS</TableHead>
            <TableHead>Catalog</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.cas}</TableCell>
              <TableCell>{product.catalog}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

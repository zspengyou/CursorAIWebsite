'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getProducts } from '@/lib/google-sheets'
import { categories_and_sheet } from '@/lib/constants'
import { Product } from '@/lib/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PRODUCTS_PER_PAGE = 50

export default function Products() {
  const router = useRouter()
  const pathname = usePathname()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)


  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await Promise.all(
        categories_and_sheet.map(async (category) => {
          const fetchedProducts = await getProducts(category.sheet)
          return fetchedProducts.map(product => ({ ...product, category: category.name }))
        })
      )
      const flattenedProducts = allProducts.flat()
      setProducts(flattenedProducts)
      setFilteredProducts(flattenedProducts)
    }
    fetchAllProducts()

    // Check for last viewed category in localStorage
    const lastViewedCategory = localStorage.getItem('lastViewedCategory')
    if (lastViewedCategory) {
      setSelectedCategory(lastViewedCategory)
      localStorage.removeItem('lastViewedCategory') // Clear after using
    }
  }, [])

  useEffect(() => {
    const lastViewedCategory = localStorage.getItem('lastViewedCategory')
    if (lastViewedCategory) {
      setSelectedCategory(lastViewedCategory)
      localStorage.removeItem('lastViewedCategory') // Clear after using
    }
  }, [pathname]) // This effect will run when the pathname changes

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
    setCurrentPage(1) // Reset to first page when filtering changes
  }, [searchTerm, selectedCategory, products])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleProductClick = (product: Product) => {
    const encodedProduct = encodeURIComponent(JSON.stringify(product))
    router.push(`/products/${encodeURIComponent(product.category)}/${product.id}?data=${encodedProduct}`)
  }

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories_and_sheet.map((category) => (
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

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-black">
            <TableRow>
              <TableHead className="w-1/2 text-white font-bold">Chemical Name</TableHead>
              <TableHead className="w-1/4 text-white font-bold">CAS</TableHead>
              <TableHead className="w-1/4 text-white font-bold">Catalog</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow 
                key={product.id} 
                onClick={() => handleProductClick(product)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell >
                  {product.name}
                </TableCell>
                <TableCell>{product.cas}</TableCell>
                <TableCell>{product.catalog}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

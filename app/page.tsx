import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Chemical E-commerce Store</h1>
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <p className="text-lg ">
          DE chem inc. (a successor of AB chem inc. running independently at the same site) continuously focuses on advanced building blocks for pharmaceutical, biotech, and agrochemical industries. DE Chem has a number of unique structural fragments which are not commercially available from other manufacturers.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <p>
          We offer broader services including drug APIs, impurities (e.g., N-nitroso compounds (N-nitrosamines)) and metabolites (e.g., O-sulfate) and their corresponding labeled compounds (M+3, M+4 etc.) in analytical chemistry.
        </p>
        <p>
          Additionally, we provide PEG linker products, PEG linker modified nano-liposome formula materials, and lipophilic nanoparticle formula materials. These offerings provide reliable materials and technical support for the urgently needed drug delivery industry.
        </p>
      </div>
      <Link href="/products">
        <Button>View Our Products</Button>
      </Link>
    </main>
  )
}

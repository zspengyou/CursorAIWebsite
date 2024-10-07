import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Advanced Chemical Solutions</h1>
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <p className="text-lg text-gray-600">
            DE chem inc. (a successor of AB chem inc. running independently at the same site) continuously focuses on advanced
            building blocks for pharmaceutical, biotech, and agrochemical industries. DE Chem has a number of unique structural
            fragments which are not commercially available from other manufacturers.
          </p>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Comprehensive Services</h2>
          <p className="text-gray-600">
            We offer broader services including drug APIs, impurities (e.g., N-nitroso
            compounds (N-nitrosamines)) and metabolites (e.g., O-sulfate) and their
            corresponding labeled compounds (M+3, M+4 etc.) in analytical
            chemistry.
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Innovative Materials</h2>
          <p className="text-gray-600">
            Additionally, we provide PEG linker products, PEG linker modified nano-
            liposome formula materials, and lipophilic nanoparticle formula materials.
            These offerings provide reliable materials and technical support for the
            urgently needed drug delivery industry.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link href="/products">
          <Button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
            Explore Our Products &rarr;
          </Button>
        </Link>
      </div>
    </main>
  )
}

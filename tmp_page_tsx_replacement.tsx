"use client"
import { useEffect, useMemo, useState } from "react"
import { useProductStore } from "@/lib/store/product-store"
import { ProductCard } from "@/components/ui/ProductCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MAX_CATEGORIES = 4
const MAX_PRODUCTS_PER_CATEGORY = 4

export default function Home() {
  const [hasHydrated, setHasHydrated] = useState(false)
  const products = useProductStore((state) => state.products)

  useEffect(() => {
    setHasHydrated(true)
    console.log("Products in store:", products)
  },)

  const categorySections = useMemo(() => {
    const groups: Record<string, typeof products> = {}

    products.forEach((product) => {
      if (!groups[product.category]) groups[product.category] = []
      groups[product.category].push(product)
    })

    return Object.keys(groups)
      .sort()
      .slice(0, MAX_CATEGORIES)
      .map((category) => ({
        category,
        products: groups[category].slice(0, MAX_PRODUCTS_PER_CATEGORY),
      }))
  }, [products])

  if (!hasHydrated) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 space-y-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Stock Hub</h1>
          <p className="mt-2 text-slate-600">Browse featured categories with up to 4 cards per category.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/products"><Button variant="outline">Shop All </Button></Link>
          <Link href="/products/add"><Button>Add Product</Button></Link>
        </div>
      </div>

      <div className="space-y-16">
        {categorySections.map((section) => (
          <section key={section.category} className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{section.category}</h2>
                <p className="text-sm text-slate-600">
                  Showing up to {section.products.length} products from {section.category}.
                </p>
              </div>
              <Link href="/products" className="text-sm font-medium text-slate-900 hover:text-slate-700">
                View all {section.category} products →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {section.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

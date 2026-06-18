//show all -> produCts slug

"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useProductStore } from "@/lib/store/product-store"

export default function ProductsPage() {
  const products = useProductStore((state) => state.products)
  const [priceFilter, setPriceFilter] = useState<"all" | "below" | "above">("all")

  const filteredProducts = products.filter((product) => {
    if (priceFilter === "below") return product.price < 3000
    if (priceFilter === "above") return product.price > 10000
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
  
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">All Products</h1>
              <p className="mt-2 text-slate-600">Browse our complete collection of {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPriceFilter("all")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition ${priceFilter === "all" ? "bg-slate-900 text-white shadow-md" : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
              >
                All Prices
              </button>
              <button
                type="button"
                onClick={() => setPriceFilter("below")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition ${priceFilter === "below" ? "bg-slate-900 text-white shadow-md" : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
              >
                Below ₹3K
              </button>
              <button
                type="button"
                onClick={() => setPriceFilter("above")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition ${priceFilter === "above" ? "bg-slate-900 text-white shadow-md" : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
              >
                Above ₹10K
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="text-5xl mb-3">📭</div>
            <h3 className="text-xl font-semibold text-slate-900">No products found</h3>
            <p className="mt-2 text-slate-600">Try adjusting your filters to find products.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id} href={`/products/${product.id}`} className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:border-slate-300 overflow-hidden"
              >
               
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                src={product.imageUrl}
                alt={product.name}
                fill
               sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover transition group-hover:scale-110"
/>
                  
                  <div className="absolute left-3 top-3 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                    {product.category}
                  </div>
                 
                  {product.rating > 0 && (
                    <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-md">
                      <span>⭐</span> {product.rating}
                    </div>
                  )}
                </div>

               
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition">{product.name}</h3>
                  
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.description || "Premium quality product"}</p>

                  <div className="mt-auto flex items-baseline justify-between pt-4">
                    <span className="text-2xl font-bold text-slate-900">₹{product.price.toLocaleString("en-IN")}</span>
                  </div>

                 
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      product.status === "active" 
                        ? "bg-green-100 text-green-700" 
                        : product.status === "upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

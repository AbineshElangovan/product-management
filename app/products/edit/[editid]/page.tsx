//edit page/form

"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useProductStore } from "@/lib/store/product-store"
import { ProductForm } from "@/components/products/form"

export default function EditProductPage() {
  const params = useParams()
  const getProduct = useProductStore((state) => state.getProduct)
  
  const product = getProduct(String(params.editid))

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-3">Product Not Found</h1>
          <p className="text-slate-600 mb-6">
            Cannot find product with ID <strong className="text-slate-900">{params.editid}</strong>.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
      
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
     

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <ProductForm productId={String(params.editid)} initialProduct={product} />
        </div>
      </div>
  
  )
}

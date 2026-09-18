"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useProductStore } from "@/lib/store/product-store"
import { ProductForm } from "@/components/products/form"
import { Button } from "@/components/ui/button"

export default function EditProductPage() {
  const params = useParams()
  const getProduct = useProductStore((state) => state.getProduct)
  
  const productId = String(params.editid)
  const product = getProduct(productId)

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="rounded-3xl glass-card p-10 shadow-2xl text-center max-w-md border border-slate-700/80 space-y-4">
          <div className="text-6xl">🔍</div>
          <h1 className="text-2xl font-bold text-white">Product Not Found</h1>
          <p className="text-xs text-slate-400">
            Cannot locate product with ID <strong className="text-cyan-400">{productId}</strong> in your store.
          </p>
          <Link href="/products">
            <Button variant="glow" className="font-bold text-xs">
              ← Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4">
      <ProductForm productId={productId} initialProduct={product} />
    </div>
  )
}

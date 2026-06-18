//product/slug  -> edit/sLug

"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useProductStore } from "@/lib/store/product-store"

export default function ProductDetailPage() {
  const params = useParams()
  const products = useProductStore((state) => state.products)

  const product = products.find((p) => String(p.id) === String(params.productid))

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-3">Product Not Found</h1>
          <p className="text-slate-600 mb-6">
            Product with ID <strong className="text-slate-900">{params.productid}</strong> doesn't exist in your store.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            ← Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
            <p className="text-sm text-slate-600">Product ID: {params.productid}</p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-100"
          >
            ← Back to Products
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-2">
         
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={product.imageUrl || 'https://via.placeholder.com/600x600?text=No+Image'}
                alt='Product Image'
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

           
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Product Name</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{product.name}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Price</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">₹{product.price.toLocaleString("en-IN")}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Category</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{product.category}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Rating</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{product.rating > 0 ? `${product.rating} ★` : "—"}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Description</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              {product.description || `This is a high-quality ${product.name}. Perfect for your daily needs. It is designed to deliver excellent performance and value.`}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this product?")) {
                  useProductStore.getState().deleteProduct(String(params.productid))
                  window.location.href = "/products"
                }
              }}
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Delete Product
            </button>
            <Link
              href={`/products/edit/${params.productid}`}
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
               Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}











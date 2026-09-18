"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useProductStore } from "@/lib/store/product-store"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { useTheme } from "@/components/ThemeProvider"
import {
  ArrowLeft,
  Edit3,
  Trash2,
  Star,
  Box,
  Calendar,
  Tag,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const products = useProductStore((state) => state.products)
  const deleteProduct = useProductStore((state) => state.deleteProduct)
  const { activeOption } = useTheme()

  const productId = String(params.productid)
  const product = products.find((p) => String(p.id) === productId)

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className={`rounded-3xl glass-card bg-white/80 backdrop-blur-md p-10 shadow-sm text-center max-w-md border border-stone-200/90 space-y-4 ${activeOption.cardBorder}`}>
          <div className="text-6xl">🔍</div>
          <h1 className="text-2xl font-black text-slate-900">Product Not Found</h1>
          <p className="text-xs text-slate-600 font-medium">
            Cannot locate product with ID <strong className="text-slate-900">{productId}</strong> in your store.
          </p>
          <Link href="/products">
            <Button className={`font-bold text-xs ${activeOption.glowBtn}`}>
              ← Browse Catalog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDelete = () => {
    deleteProduct(product.id)
    toast.success(`Deleted ${product.name}`)
    router.push("/products")
  }

  const getStatusBadge = () => {
    switch (product.status) {
      case "active":
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 text-white px-3 py-1 text-xs font-bold shadow-xs">Active</span>
      case "upcoming":
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 text-white px-3 py-1 text-xs font-bold shadow-xs">Upcoming</span>
      case "discontinued":
        return <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 text-white px-3 py-1 text-xs font-bold shadow-xs">Discontinued</span>
      default:
        return <span className="inline-flex items-center gap-1 rounded-full bg-slate-500 text-white px-3 py-1 text-xs font-bold shadow-xs">Inactive</span>
    }
  }

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2 text-slate-700 hover:text-slate-950 font-bold">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Button>

        <div className="flex items-center gap-2">
          <Link href={`/products/edit/${product.id}`}>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold border-stone-300 text-slate-800 hover:bg-stone-100">
              <Edit3 className="h-3.5 w-3.5 text-indigo-600" /> Edit Details
            </Button>
          </Link>

          {/* Shadcn Dialog Delete Confirmation */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm" className="gap-1.5 text-xs font-bold shadow-xs">
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
            </DialogTrigger>
            <DialogContent className={`glass-card bg-white/98 max-w-md shadow-2xl rounded-3xl p-6 z-50 border ${activeOption.cardBorder}`}>
              <DialogHeader className="space-y-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-xs mx-auto sm:mx-0 ${activeOption.badgeColor}`}>
                  <ShieldAlert className="h-6 w-6 text-rose-600 animate-pulse" />
                </div>
                <DialogTitle className={`text-xl font-black ${activeOption.highlightText}`}>
                  Delete Product Confirmation
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-600 font-medium leading-relaxed">
                  Are you sure you want to permanently delete <strong className="text-slate-900 font-extrabold">&quot;{product.name}&quot;</strong> from your store database? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200">
                <DialogClose asChild>
                  <Button variant="outline" size="sm" className={`text-xs font-bold ${activeOption.secondaryBtn}`}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleDelete}
                  className="text-xs font-bold bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white shadow-md px-4"
                >
                  Yes, Delete Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Product Showcase Card */}
      <div className={`rounded-3xl glass-card bg-white/80 backdrop-blur-md p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-8 ${activeOption.cardBorder}`}>
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-5 relative aspect-square w-full overflow-hidden rounded-2xl bg-stone-100 border border-stone-200 shadow-md group">
            <Image
              src={product.imageUrl || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800"}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Category Overlay */}
            <div className="absolute top-4 left-4">
              <span className={`rounded-full px-3.5 py-1.5 text-xs font-bold shadow-sm backdrop-blur-md border ${activeOption.badgeColor}`}>
                {product.category}
              </span>
            </div>

            {/* Status Overlay */}
            <div className="absolute top-4 right-4">
              {getStatusBadge()}
            </div>
          </div>

          {/* Right Column: Detailed Product Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2 ${activeOption.accentText}`}>
                <Sparkles className="h-3.5 w-3.5" /> Product Showcase
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900">{product.name}</h1>
              <p className="text-xs text-slate-500 mt-1 font-semibold">System ID: {product.id}</p>
            </div>

            {/* Price Tag */}
            <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200/90 flex items-center justify-between shadow-2xs">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Unit Price</p>
                <p className={`text-3xl font-black mt-1 ${activeOption.accentText}`}>₹{product.price.toLocaleString("en-IN")}</p>
              </div>
              {product.rating > 0 && (
                <div className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-sm font-extrabold text-amber-800 border border-amber-300 shadow-2xs">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-xs text-stone-500 font-normal">({product.reviewCount || 0} reviews)</span>
                </div>
              )}
            </div>

            {/* Inventory Status & Progress Bar */}
            <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200/90 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800 flex items-center gap-1.5">
                  <Box className={`h-4 w-4 ${activeOption.accentText}`} /> Stock Level
                </span>
                <span className={product.quantity < 10 ? "text-rose-600" : "text-emerald-700"}>
                  {product.quantity} units available
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    product.quantity < 10 ? "bg-rose-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.min(100, (product.quantity / 50) * 100)}%` }}
                />
              </div>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-stone-50 p-3 border border-stone-200 flex items-center gap-3">
                <Calendar className={`h-4 w-4 ${activeOption.accentText}`} />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Added Date</p>
                  <p className="text-xs font-bold text-slate-900">{product.addedDate || "Recently"}</p>
                </div>
              </div>
              {product.launchDate && (
                <div className="rounded-xl bg-stone-50 p-3 border border-stone-200 flex items-center gap-3">
                  <Tag className={`h-4 w-4 ${activeOption.accentText}`} />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Launch Date</p>
                    <p className="text-xs font-bold text-slate-900">{product.launchDate}</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Description Section */}
        <div className="rounded-2xl bg-stone-50 p-6 border border-stone-200 space-y-3">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className={`h-4 w-4 ${activeOption.accentText}`} /> Product Specifications & Description
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed font-normal">
            {product.description || `High quality ${product.name} designed with premium components and industry standard durability.`}
          </p>
        </div>

      </div>

    </div>
  )
}


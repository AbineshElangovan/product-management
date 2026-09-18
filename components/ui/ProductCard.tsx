"use client"

import React, { useState } from "react"
import { Product } from "@/types/products"
import { Button } from "@/components/ui/button"
import { Star, Eye, Edit3, Trash2, Box, ShieldAlert } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useProductStore } from "@/lib/store/product-store"
import { useTheme } from "@/components/ThemeProvider"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ProductCardProps {
  product: Product
  variant?: "full" | "compact" | "price" | "category" | "upcoming"
}

export function ProductCard({ product }: ProductCardProps) {
  const { deleteProduct } = useProductStore()
  const { activeOption } = useTheme()
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    deleteProduct(product.id)
    toast.success(`Deleted ${product.name}`)
    setDeleteOpen(false)
  }

  const getStatusBadge = () => {
    switch (product.status) {
      case "active":
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-xs"><span className="h-1.5 w-1.5 rounded-full bg-emerald-200 animate-pulse"></span> Active</span>
      case "upcoming":
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-xs"><span className="h-1.5 w-1.5 rounded-full bg-amber-200"></span> Upcoming</span>
      case "discontinued":
        return <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-xs">Discontinued</span>
      default:
        return <span className="inline-flex items-center gap-1 rounded-full bg-slate-500 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-xs">Inactive</span>
    }
  }

  return (
    <div className={`group relative flex flex-col overflow-hidden rounded-2xl glass-card glass-card-hover border bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300 ${activeOption.cardBorder}`}>
      
      {/* Top Image Showcase */}
      <div className="relative h-52 w-full overflow-hidden bg-stone-100 p-4 flex items-center justify-center">
        <Image
          src={product.imageUrl || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Pill with dynamic theme accent */}
        <div className="absolute top-3 left-3">
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold shadow-xs backdrop-blur-md border ${activeOption.badgeColor}`}>
            {product.category}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {getStatusBadge()}
        </div>

        {/* Rating Badge */}
        {product.rating > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 shadow-sm backdrop-blur-md border border-amber-300">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span>{product.rating}</span>
            <span className="text-[9px] text-stone-500 font-normal">({product.reviewCount || 0})</span>
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link href={`/products/${product.id}`}>
            <Button size="icon" variant="glass" className="h-7 w-7 rounded-full bg-white/90 shadow-sm" title="View Details">
              <Eye className="h-3.5 w-3.5 text-stone-900" />
            </Button>
          </Link>
          <Link href={`/products/edit/${product.id}`}>
            <Button size="icon" variant="glass" className="h-7 w-7 rounded-full bg-white/90 shadow-sm" title="Edit Product">
              <Edit3 className="h-3.5 w-3.5 text-stone-900" />
            </Button>
          </Link>
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button size="icon" variant="glass" className="h-7 w-7 rounded-full bg-white/90 shadow-sm text-rose-600 hover:text-rose-700" title="Delete Product">
                <Trash2 className="h-3.5 w-3.5" />
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
                  Are you sure you want to permanently delete <strong className="text-slate-900 font-extrabold">&quot;{product.name}&quot;</strong> from your store? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200/80">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setDeleteOpen(false)
                  }}
                  className={`text-xs font-bold ${activeOption.secondaryBtn}`}
                >
                  Cancel
                </Button>
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

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-4 space-y-3 bg-white/60">
        <Link href={`/products/${product.id}`} className={`transition-colors ${activeOption.accentText}`}>
          <h3 className="line-clamp-1 text-base font-extrabold text-slate-900 hover:opacity-80 transition-opacity">{product.name}</h3>
        </Link>

        <p className="line-clamp-2 text-xs text-slate-600 leading-relaxed font-normal">
          {product.description || "High quality studio product."}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-stone-200/80">
          <div>
            <span className={`text-xl font-black ${activeOption.accentText}`}>
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Theme-derived stock pill */}
          <div className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border shadow-2xs ${activeOption.stockBadge}`}>
            <Box className="h-3.5 w-3.5 shrink-0" />
            <span>{product.quantity} in stock</span>
          </div>
        </div>

        {/* Dynamic Theme Primary Action Button */}
        <Link href={`/products/${product.id}`}>
          <Button className={`w-full text-xs font-bold h-8 rounded-xl ${activeOption.primaryBtn}`}>
            View Details
          </Button>
        </Link>
      </div>

    </div>
  )
}
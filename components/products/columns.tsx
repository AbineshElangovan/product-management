import React, { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Edit3, Trash2, Star, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Product } from "@/types/products"
import Link from "next/link"
import { useProductStore } from "@/lib/store/product-store"
import { useTheme } from "@/components/ThemeProvider"
import { toast } from "sonner"

function ActionCell({ product }: { product: Product }) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const { deleteProduct } = useProductStore()
  const { activeOption } = useTheme()

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    deleteProduct(product.id)
    toast.success(`Deleted ${product.name}`)
    setDeleteOpen(false)
  }

  return (
    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
      <Link href={`/products/${product.id}`} onClick={(e) => e.stopPropagation()}>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2.5 rounded-xl border-stone-300 text-xs font-bold text-slate-800 bg-white hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 shadow-2xs gap-1"
          title="View Details"
        >
          <Eye className="h-3.5 w-3.5 text-purple-600" />
          <span className="hidden xl:inline">View</span>
        </Button>
      </Link>

      <Link href={`/products/edit/${product.id}`} onClick={(e) => e.stopPropagation()}>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2.5 rounded-xl border-stone-300 text-xs font-bold text-slate-800 bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 shadow-2xs gap-1"
          title="Edit Product"
        >
          <Edit3 className="h-3.5 w-3.5 text-indigo-600" />
          <span>Edit</span>
        </Button>
      </Link>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2.5 rounded-xl border-stone-300 text-xs font-bold text-rose-600 bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 shadow-2xs gap-1"
            title="Delete Product"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
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
  )
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-slate-900 hover:text-slate-950 font-bold -ml-3"
        >
          Product Info
          <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-slate-700" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex items-center gap-3">
          <img
            src={product.imageUrl || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200"}
            alt={product.name}
            className="h-11 w-11 rounded-xl object-cover border border-stone-200 bg-stone-100 shadow-xs"
          />
          <div>
            <Link href={`/products/${product.id}`} className="font-extrabold text-slate-900 hover:text-purple-700 transition-colors line-clamp-1">
              {product.name}
            </Link>
            <div className="text-xs text-slate-600 font-semibold">{product.category}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: () => <span className="font-bold text-slate-900">Status</span>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      switch (status) {
        case "active":
          return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 text-white px-2.5 py-0.5 text-xs font-bold shadow-xs">Active</span>
        case "upcoming":
          return <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 text-white px-2.5 py-0.5 text-xs font-bold shadow-xs">Upcoming</span>
        case "discontinued":
          return <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 text-white px-2.5 py-0.5 text-xs font-bold shadow-xs">Discontinued</span>
        default:
          return <span className="inline-flex items-center gap-1 rounded-full bg-slate-500 text-white px-2.5 py-0.5 text-xs font-bold shadow-xs">Inactive</span>
      }
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-slate-900 hover:text-slate-950 font-bold -ml-3"
        >
          Price (₹)
          <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-slate-700" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = row.getValue("price") as number
      return (
        <span className="font-black text-slate-900 text-base">
          ₹{price.toLocaleString("en-IN")}
        </span>
      )
    },
  },
  {
    accessorKey: "quantity",
    header: () => <span className="font-bold text-slate-900">Stock Level</span>,
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number
      return (
        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg border shadow-xs ${
          quantity > 10
            ? "bg-emerald-50 text-emerald-950 border-emerald-300"
            : quantity > 0
            ? "bg-amber-50 text-amber-950 border-amber-300"
            : "bg-rose-50 text-rose-950 border-rose-300"
        }`}>
          {quantity} units
        </span>
      )
    },
  },
  {
    accessorKey: "rating",
    header: () => <span className="font-bold text-slate-900">Rating</span>,
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number
      const reviewCount = row.original.reviewCount || 0
      return (
        <div className="flex items-center gap-1 text-xs text-amber-800 font-bold">
          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          <span>{rating > 0 ? rating : "N/A"}</span>
          <span className="text-[10px] text-stone-500 font-normal">({reviewCount})</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: () => <span className="font-bold text-slate-900">Actions</span>,
    cell: ({ row }) => <ActionCell product={row.original} />,
  },
]
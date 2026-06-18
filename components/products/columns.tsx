"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Product } from "@/types/products"
import Link from "next/link"
import { useProductStore } from "@/lib/store/product-store"
import { toast } from "sonner"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex items-center gap-3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-10 w-10 rounded-md object-cover"
          />
          <div>
            <Link href={`/products/${product.id}`} className="font-medium hover:underline">
              {product.name}
            </Link>
            <div className="text-sm text-muted-foreground">{product.category}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "active"
              ? "default"
              : status === "upcoming"
              ? "secondary"
              : "destructive"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
   cell: ({ row }) => {
  const product = row.original
  return (
    <div className="flex items-center gap-3">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-10 w-10 rounded-md object-cover"
      />
      <div>
        <div className="font-medium">{product.name}</div>
        <div className="text-sm text-muted-foreground">{product.category}</div>
      </div>
    </div>
  )
},
  },
  {
    accessorKey: "quantity",
    header: "Stock",
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number
      return (
        <Badge variant={quantity > 10 ? "default" : quantity > 0 ? "secondary" : "destructive"}>
          {quantity} units
        </Badge>
      )
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number
      const reviewCount = row.original.reviewCount
      return (
        <div className="text-sm">
          <div>{rating > 0 ? `${rating} ★` : "-"}</div>
          <div className="text-muted-foreground">{reviewCount} reviews</div>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
      const { deleteProduct } = useProductStore()

      const handleDelete = () => {
        deleteProduct(product.id)
        toast.success("Product deleted")
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/products/${product.id}`}>
              <DropdownMenuItem>View details</DropdownMenuItem>
            </Link>
            <Link href={`/products/${product.id}/edit`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
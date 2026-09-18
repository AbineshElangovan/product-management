"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useProductStore } from "@/lib/store/product-store"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface DeleteDialogProps {
  productId: string
  productName: string
  children?: React.ReactNode
}

export function DeleteDialog({ productId, productName, children }: DeleteDialogProps) {
  const [open, setOpen] = useState(false)
  const deleteProduct = useProductStore(state => state.deleteProduct)
  const router = useRouter()

  const handleDelete = () => {
    deleteProduct(productId)
    setOpen(false)
    router.push("/products")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{productName}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
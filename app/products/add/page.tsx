//add page

"use client"
import { useRouter } from "next/navigation"
import { useProductStore } from "@/lib/store/product-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Upload } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function AddProductPage() {
  const router = useRouter()
  const addProduct = useProductStore(state => state.addProduct)
  const [imagePreview, setImagePreview] = useState("")
  const [fileName, setFileName] = useState("")
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 1,
    description: "",
    rating: 0.0,
    reviewCount: 0,
    imageUrl: "",
    status: "active" as const
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      e.target.value = ""
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB")
      e.target.value = ""
      return
    }

    setFileName(file.name)

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setForm(prev => ({...prev, imageUrl: base64 }))
      setImagePreview(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.imageUrl) {
      toast.error("Image is required")
      return
    }
    addProduct(form)
    router.push("/products")
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />Back
      </Button>

      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(val: any) => setForm({...form, category: val})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(val: any) => setForm({...form, status: val})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Price</Label>
            <Input type="text" min="0" value={form.price} onChange={e => setForm({...form, price: +e.target.value})} required />
          </div>

          <div>
            <Label>Quantity</Label>
            <Input type="text" min="1" max="100" value={form.quantity} onChange={e => setForm({...form, quantity: +e.target.value})} required />
          </div>
        </div>

        

        <div>
          <Label>Description</Label>
          <Input value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        </div>

        <div>
          <Label>Rating</Label>
          <Input type="number" step="0.5" max="5" min="0" value={form.rating} onChange={e => setForm({...form, rating: parseFloat(e.target.value)})} required />
        </div>


        <div>
          <Label>Product Image</Label>
          <div className="flex items-center gap-3 rounded-md border p-3">
            {imagePreview && (
              <Dialog>
                <DialogTrigger asChild>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-10 w-10 rounded object-contain bg-slate-50 border cursor-pointer hover:opacity-80"
                  />
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Image Preview</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <img
                      src={imagePreview}
                      alt="Full preview"
                      className="w-full rounded-lg object-contain max-h-96"
                    />
                    <div className="text-sm text-slate-600">
                      <p><strong>File:</strong> {fileName}</p>
                      <p><strong>Size:</strong> ~{Math.round(imagePreview.length * 0.75 / 1024)} KB</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <Button type="button" variant="outline" size="sm" asChild>
              <label className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Choose File
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </Button>
            <span className="text-sm text-slate-600 truncate flex-1">
              {fileName || "No file chosen"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Any image format, max 5MB. Click image to view full size.
          </p>
        </div>

        <Button type="submit" className="w-full">Add Product</Button>
      </form>
    </div>
  )
}
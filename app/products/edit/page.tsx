//edit /slug


"use client"

import { useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload } from "lucide-react"
import { useProductStore } from "@/lib/store/product-store"
import { ProductFormData, ProductStatus } from "@/types/products"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  quantity: z.coerce.number().min(1, "Quantity cannot be negative"),
  imageUrl: z.string().min(1, "Image is required"),
  status: z.enum(["active", "upcoming", "discontinued", "inactive"]),
  launchDate: z.string().optional().or(z.literal("")),
})

type FormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  productId?: string
  initialProduct?: ProductFormData
}


export default function Page() {
  return <ProductForm />
}

export function ProductForm({ productId, initialProduct }: ProductFormProps) {
  const router = useRouter()
  const { addProduct, updateProduct, getProduct, products: allProducts } = useProductStore()
  const product = initialProduct || (productId? getProduct(productId) : undefined)
  const [imagePreview, setImagePreview] = useState(product?.imageUrl || "")
  const [fileName, setFileName] = useState("")

  const categories = useMemo(() => {
    const set = new Set(allProducts.map((item) => item.category))
    if (product?.category) set.add(product.category)
    return Array.from(set).sort()
  }, [allProducts, product])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: product
 ?{
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          imageUrl: product.imageUrl,
          status: product.status as ProductStatus,
          launchDate: product.launchDate || "",
        }
      : {
          name: "",
          category: "",
          description: "",
          price: 1,
          quantity: 1,
          imageUrl: "",
          status: "active",
          launchDate: "",
        },
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
      form.setValue("imageUrl", base64, { shouldValidate: true })
      setImagePreview(base64)
    }
    reader.readAsDataURL(file)
  }

  function onSubmit(values: FormValues) {
    const data: ProductFormData = {
      name: values.name,
      category: values.category,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
      imageUrl: values.imageUrl,
      status: values.status,
      launchDate: values.launchDate ,
    }

    if (productId) {
      updateProduct(productId, data)
      toast.success("Product updated")
    } else {
      addProduct(data)
      toast.success("Product added")
    }

    router.push("/products")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="discontinued">Discontinued</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="text" min="0" max="100" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={1} {...field}  required/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="launchDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Launch Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



        <FormField
          control={form.control}
          name="imageUrl"
          render={() => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <div className="flex items-center gap-3 rounded-md border p-3">
                {imagePreview? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button type="button" className="shrink-0">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-10 w-10 rounded object-contain bg-slate-50 border cursor-pointer hover:opacity-80"
                        />


                      </button>
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
                          <p><strong>File:</strong> {fileName || "Current image"}</p>
                          <p><strong>Size:</strong> ~{Math.round(imagePreview.length * 0.75 / 1024)} KB</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : null}
                <Button type="button" variant="outline" size="sm" asChild>
                  <label className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      
                        
                      
                      />
                    </FormControl>
                  </label>
                </Button>
                <span className="text-sm text-slate-600 truncate flex-1">
                  {fileName || "No file chosen"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Any image format, max 5MB. Click image to view full size.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {productId? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Form>
  )
}
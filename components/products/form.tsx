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
import { Upload, Sparkles, ArrowLeft, CheckCircle2, Box, Star } from "lucide-react"
import { useProductStore } from "@/lib/store/product-store"
import { useTheme } from "@/components/ThemeProvider"
import { ProductFormData, ProductStatus } from "@/types/products"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const PRESET_PHOTOS = [
  { label: "Camera", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600" },
  { label: "Headphones", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" },
  { label: "Smartwatch", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" },
  { label: "Laptop", url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600" },
  { label: "Sneakers", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
  { label: "Coffee Maker", url: "https://images.unsplash.com/photo-1517668808822-9e428824603b?w=600" },
]

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  quantity: z.coerce.number().min(0, "Quantity cannot be negative"),
  imageUrl: z.string().min(1, "Image is required"),
  status: z.enum(["active", "upcoming", "discontinued", "inactive"]),
  launchDate: z.string().optional().or(z.literal("")),
})

type FormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  productId?: string
  initialProduct?: ProductFormData
}

export function ProductForm({ productId, initialProduct }: ProductFormProps) {
  const router = useRouter()
  const { activeOption } = useTheme()
  const { addProduct, updateProduct, getProduct, products: allProducts } = useProductStore()
  const product = initialProduct || (productId ? getProduct(productId) : undefined)
  const [imagePreview, setImagePreview] = useState(product?.imageUrl || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600")
  const [fileName, setFileName] = useState("")

  const categories = useMemo(() => {
    const set = new Set(allProducts.map((item) => item.category))
    if (product?.category) set.add(product.category)
    return Array.from(set).sort()
  }, [allProducts, product])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? {
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
          price: undefined as unknown as number,
          quantity: undefined as unknown as number,
          imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
          status: "active",
          launchDate: "",
        },
  })

  // Watch values for real-time live preview
  const watchedName = form.watch("name") || "Sample Product Name"
  const watchedCategory = form.watch("category") || "Category"
  const watchedPrice = form.watch("price") || 0
  const watchedQuantity = form.watch("quantity") || 0
  const watchedStatus = form.watch("status") || "active"
  const watchedDescription = form.watch("description") || "Product description preview will update as you type..."
  const watchedImage = form.watch("imageUrl") || imagePreview

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file")
      e.target.value = ""
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file must be under 5MB")
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
      launchDate: values.launchDate || undefined,
    }

    if (productId) {
      updateProduct(productId, data)
      toast.success(`Successfully updated ${values.name}`)
    } else {
      addProduct(data)
      toast.success(`Successfully added ${values.name}`)
    }

    router.push("/products")
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start">
      
      {/* Left Column: High-Contrast Form Fields */}
      <div className="lg:col-span-7 rounded-3xl glass-card p-6 sm:p-8 border border-stone-200/80 shadow-lg">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${activeOption.accentText}`}>
              <Sparkles className="h-3.5 w-3.5" /> Product Management Form
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              {productId ? "Edit Product Details" : "Add New Store Product"}
            </h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-1.5 text-slate-700 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-bold text-xs">Product Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Wireless Noise Cancelling Headphones"
                      {...field}
                      className="bg-stone-50 border-stone-300 text-slate-900 placeholder:text-stone-400 text-xs focus:bg-white rounded-xl"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-rose-600 font-medium" />
                </FormItem>
              )}
            />

            {/* Category & Status Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-900 font-bold text-xs">Category *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Electronics, Gaming, Wearables..."
                        {...field}
                        list="cat-list"
                        className="bg-stone-50 border-stone-300 text-slate-900 placeholder:text-stone-400 text-xs focus:bg-white rounded-xl"
                      />
                    </FormControl>
                    <datalist id="cat-list">
                      {categories.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                    <FormMessage className="text-xs text-rose-600 font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-900 font-bold text-xs">Status *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-stone-50 border-stone-300 text-slate-900 text-xs rounded-xl focus:bg-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="glass-card border-stone-200">
                        <SelectItem value="active" className="text-emerald-800 font-bold">Active</SelectItem>
                        <SelectItem value="upcoming" className="text-amber-800 font-bold">Upcoming</SelectItem>
                        <SelectItem value="discontinued" className="text-rose-800 font-bold">Discontinued</SelectItem>
                        <SelectItem value="inactive" className="text-slate-600">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-rose-600 font-medium" />
                  </FormItem>
                )}
              />
            </div>

            {/* Price & Quantity Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-900 font-bold text-xs">Price (₹) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        step="1"
                        {...field}
                        className="bg-stone-50 border-stone-300 text-slate-900 text-xs focus:bg-white rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-rose-600 font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-900 font-bold text-xs">Stock Quantity *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        className="bg-stone-50 border-stone-300 text-slate-900 text-xs focus:bg-white rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-rose-600 font-medium" />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-bold text-xs">Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Write product specifications and details..."
                      {...field}
                      className="bg-stone-50 border-stone-300 text-slate-900 placeholder:text-stone-400 text-xs focus:bg-white rounded-xl"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-rose-600 font-medium" />
                </FormItem>
              )}
            />

            {/* Photo Edit & Image Management Section */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-slate-900 font-bold text-xs flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-purple-600" /> Product Photo & Edit Upload *
                    </FormLabel>
                    <span className="text-[10px] text-slate-500 font-semibold">JPG, PNG, WebP or Base64 (max 5MB)</span>
                  </div>

                  <div className="rounded-2xl border border-stone-300 bg-white/90 p-4 space-y-4 shadow-2xs">
                    
                    {/* Current Active Photo Preview Banner */}
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-stone-100/90 border border-stone-200">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-200 border border-stone-300 shadow-2xs">
                        <img
                          src={watchedImage || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600"}
                          alt="Product Edit Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                          Active Photo Preview <Sparkles className="h-3 w-3 text-amber-500" />
                        </span>
                        <p className="text-[11px] text-slate-500 truncate font-mono">
                          {watchedImage?.startsWith("data:") ? "Uploaded Local Image File" : watchedImage}
                        </p>
                      </div>
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        asChild
                        className="shrink-0 font-bold text-xs border-stone-300 hover:bg-stone-200"
                      >
                        <label className="cursor-pointer gap-1.5 text-slate-800">
                          <Upload className="h-3.5 w-3.5 text-purple-600" /> Change / Upload Photo
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      </Button>
                    </div>

                    {/* Quick Sample Photo Presets Selection */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-700">Quick Choose Preset Product Photo:</span>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {PRESET_PHOTOS.map((preset) => {
                          const isSelected = watchedImage === preset.url
                          return (
                            <button
                              key={preset.label}
                              type="button"
                              onClick={() => {
                                form.setValue("imageUrl", preset.url, { shouldValidate: true })
                                setImagePreview(preset.url)
                                setFileName("")
                              }}
                              className={`group relative flex flex-col items-center rounded-xl border p-1 transition cursor-pointer overflow-hidden ${
                                isSelected
                                  ? "border-purple-600 ring-2 ring-purple-400 bg-purple-50"
                                  : "border-stone-200 bg-stone-50 hover:border-stone-400 hover:bg-white"
                              }`}
                              title={preset.label}
                            >
                              <img
                                src={preset.url}
                                alt={preset.label}
                                className="h-10 w-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                              />
                              <span className="mt-1 text-[9px] font-bold text-slate-800 truncate w-full text-center">
                                {preset.label}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Custom Image URL Field */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-bold text-slate-700">Or Edit Image Web URL Directly:</span>
                      <Input
                        placeholder="https://images.unsplash.com/..."
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          setImagePreview(e.target.value)
                          setFileName("")
                        }}
                        className={`bg-white border-stone-300 text-slate-900 placeholder:text-stone-400 text-xs rounded-xl ${activeOption.ringColor}`}
                      />
                    </div>

                    {fileName && (
                      <p className="text-xs text-emerald-700 flex items-center gap-1 font-bold pt-1">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Uploaded local file: {fileName}
                      </p>
                    )}
                  </div>
                  <FormMessage className="text-xs text-rose-600 font-medium" />
                </FormItem>
              )}
            />

            {/* Launch Date */}
            <FormField
              control={form.control}
              name="launchDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-bold text-xs">Launch Date (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="bg-stone-50 border-stone-300 text-slate-900 text-xs focus:bg-white rounded-xl"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-rose-600 font-medium" />
                </FormItem>
              )}
            />

            {/* Form Submit Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
              <Button type="button" variant="outline" onClick={() => router.back()} className="text-xs font-semibold border-stone-300">
                Cancel
              </Button>
              <Button type="submit" className={`font-bold text-xs px-6 shadow-md ${activeOption.glowBtn}`}>
                {productId ? "Update Product" : "Publish New Product"}
              </Button>
            </div>

          </form>
        </Form>
      </div>

      {/* Right Column: High-Contrast Real-time Live Product Preview Card */}
      <div className="lg:col-span-5 space-y-4 sticky top-24">
        <div className="rounded-2xl glass-card p-4 border border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className={`h-4 w-4 ${activeOption.accentText}`} />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Live Card Preview</span>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${activeOption.badgeColor}`}>
            Real-time Sync
          </span>
        </div>

        {/* Live Product Card Mockup with High Contrast Dark Slate Title & Theme Accent Price */}
        <div className={`group relative flex flex-col overflow-hidden rounded-3xl glass-card border border-stone-200 shadow-md ${activeOption.cardBorder}`}>
          <div className="relative h-60 w-full overflow-hidden bg-stone-200/50 p-4 flex items-center justify-center">
            <img
              src={watchedImage || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600"}
              alt={watchedName}
              className="h-full w-full object-cover"
            />
            
            <div className="absolute top-3 left-3">
              <span className={`rounded-full px-3 py-1 text-xs font-bold shadow-xs backdrop-blur-md border ${activeOption.badgeColor}`}>
                {watchedCategory}
              </span>
            </div>
            
            <div className="absolute top-3 right-3">
              <span className="capitalize rounded-full bg-emerald-100 text-emerald-900 px-2.5 py-0.5 text-xs font-bold border border-emerald-300">
                {watchedStatus}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200 shadow-xs">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> 4.5 <span className="text-[10px] text-stone-500">(New)</span>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5 space-y-3">
            <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{watchedName}</h3>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{watchedDescription}</p>

            <div className="pt-3 flex items-center justify-between border-t border-stone-200">
              <span className={`text-2xl font-black ${activeOption.accentText}`}>₹{Number(watchedPrice).toLocaleString("en-IN")}</span>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-stone-200/60 px-2.5 py-1 rounded-lg border border-stone-300">
                <Box className={`h-3.5 w-3.5 ${activeOption.accentText}`} />
                <span>{watchedQuantity} in stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
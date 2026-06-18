export type ProductStatus = "active" | "inactive" | "upcoming"

export type Product = {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  description: string
  rating: number
  reviewCount: number
  imageUrl: string
  status: ProductStatus
  addedDate: string
}

export type ProductStore = {
  products: Product[]
  getProduct: (id: string) => Product | undefined
  addProduct: (product: Omit<Product, 'id' | 'addedDate'>) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProductsByCategory: (category: string) => Product[]
}
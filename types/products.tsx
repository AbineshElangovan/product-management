export type productStatus = "active" | "upcoming" | "discontinued" | "inactive"

export type product = {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  description: string
  rating: number
  reviewCount: number
  imageUrl: string
  status: productStatus
  addedDate: string
  launchDate?: string
}

export type ProductFormData = Omit<product, 'id' | 'addedDate' | 'rating' | 'reviewCount'>

export type ProductStatus = "active" | "upcoming" | "discontinued" | "inactive"

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
  launchDate?: string
}



// Delete this interface - it conflicts with the type above
// export interface ProductFormData {
//   name: string
//   category: string
//   description: string
//   price: number
//   quantity: number
//   imageUrl: string
//   status: ProductStatus
//   launchDate?: string
// }
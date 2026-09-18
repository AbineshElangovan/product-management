"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { Product } from "@/types/products"
import { toast } from "sonner"


const initialProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    quantity: 15,
    rating: 4.5,
    reviewCount: 120,
    status: "active",
    imageUrl: "https://picsum.photos/400/400?random=1",
    description: "Noise cancelling wireless headphones",
    addedDate: "2026-06-01"
  },
  {
    id: "2",
    name: "Smart Watch",
    category: "Wearables",
    price: 2999,
    quantity: 10,
    rating: 4.2,
    reviewCount: 88,
    status: "active",
    imageUrl: "https://picsum.photos/400/400?random=2",
    description: "Fitness tracking smart watch",
    addedDate: "2026-06-02"
  }
]

interface ProductContextType {
  products: Product[]
  addProduct: (data: Omit<Product, 'id' | 'addedDate'>) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => Product | undefined
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") return initialProducts

    const stored = localStorage.getItem("products")
    return stored ? JSON.parse(stored) : initialProducts
  })

  useEffect(() => {
    if (products.length) localStorage.setItem('products', JSON.stringify(products))
  }, [products])


const addProduct = (data: Omit<Product, 'id' | 'addedDate'>) => {
  const newProduct: Product = {
   ...data,
    id: Date.now().toString(),
    addedDate: new Date().toISOString(),
  }
  setProducts(prev => [newProduct,...prev])
  toast.success("added")
}


const updateProduct = (id: string, data: Partial<Product>) => {
  setProducts(prev => prev.map(p => p.id === id? {...p,...data } : p))
  toast.success("updated") 
}


const deleteProduct = (id: string) => {
  setProducts(prev => prev.filter(p => p.id!== id))
  toast.success("deleted") 
}

  const getProduct = (id: string) => products.find(p => p.id === id)

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) throw new Error('useProducts must be used within ProductProvider')
  return context
}

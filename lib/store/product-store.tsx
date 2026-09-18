"use client"
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, ProductFormData } from '@/types/products'

const initialProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    category: "Electronics",
    description: "Latest iPhone with A17 Pro chip and titanium body",
    price: 134900,
    quantity: 25,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    status: "active",
    rating: 4.8,
    reviewCount: 234,
    addedDate: "2024-01-15"
  },
  {
    id: "2",
    name: "MacBook Air M3",
    category: "Electronics",
    description: "Powerful thin laptop with Apple M3 chip",
    price: 114900,
    quantity: 15,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
    status: "active",
    rating: 4.9,
    reviewCount: 189,
    addedDate: "2024-02-01"
  },
  {
    id: "3",
    name: "Galaxy S24 Ultra",
    category: "Electronics",
    description: "Premium Android smartphone with pro camera AI",
    price: 124999,
    quantity: 18,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    status: "active",
    rating: 4.7,
    reviewCount: 152,
    addedDate: "2024-03-10"
  },
  {
    id: "4",
    name: "AirPods Pro 2",
    category: "Accessories",
    description: "Noise cancelling wireless earbuds with spatial audio",
    price: 24999,
    quantity: 40,
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
    status: "active",
    rating: 4.6,
    reviewCount: 310,
    addedDate: "2024-04-20"
  },
  {
    id: "5",
    name: "Nintendo Switch OLED",
    category: "Gaming",
    description: "Portable gaming console with 7-inch OLED screen",
    price: 44999,
    quantity: 12,
    imageUrl: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600",
    status: "upcoming",
    rating: 4.8,
    reviewCount: 225,
    addedDate: "2024-05-05"
  },
  {
    id: "6",
    name: "Sony WH-1000XM5 Headphones",
    category: "Audio",
    description: "Industry leading noise canceling wireless over-ear headphones",
    price: 34999,
    quantity: 22,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    status: "active",
    rating: 4.8,
    reviewCount: 890,
    addedDate: "2023-09-20"
  },
  {
    id: "7",
    name: "Apple Watch Ultra 2",
    category: "Wearables",
    description: "Rugged smartwatch with outdoor GPS tracking and titanium case",
    price: 89900,
    quantity: 14,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    status: "active",
    rating: 4.9,
    reviewCount: 276,
    addedDate: "2023-11-01"
  },
  {
    id: "8",
    name: "Dell XPS 15 Creator Edition",
    category: "Electronics",
    description: "High performance laptop with 4K InfinityEdge display",
    price: 189990,
    quantity: 8,
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600",
    status: "active",
    rating: 4.5,
    reviewCount: 134,
    addedDate: "2024-01-05"
  },
  {
    id: "9",
    name: "PlayStation 5 Console",
    category: "Gaming",
    description: "Next-gen gaming console with DualSense wireless controller",
    price: 54990,
    quantity: 10,
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600",
    status: "active",
    rating: 4.9,
    reviewCount: 1203,
    addedDate: "2023-08-12"
  },
  {
    id: "10",
    name: "Logitech MX Master 3S Mouse",
    category: "Accessories",
    description: "Performance wireless mouse with quiet clicks and 8K DPI sensor",
    price: 10995,
    quantity: 60,
    imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
    status: "active",
    rating: 4.8,
    reviewCount: 445,
    addedDate: "2023-07-18"
  },
  {
    id: "11",
    name: "Canon EOS R6 Mark II",
    category: "Cameras",
    description: "Full-frame mirrorless camera with 24.2MP sensor and 4K 60p video",
    price: 239990,
    quantity: 6,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    status: "active",
    rating: 4.9,
    reviewCount: 156,
    addedDate: "2024-02-28"
  },
  {
    id: "12",
    name: "Bose SoundLink Revolve+",
    category: "Audio",
    description: "360 degree portable Bluetooth speaker with deep immersive sound",
    price: 29900,
    quantity: 31,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    status: "active",
    rating: 4.7,
    reviewCount: 387,
    addedDate: "2023-04-08"
  },
  {
    id: "13",
    name: "DJI Mini 4 Pro Drone",
    category: "Cameras",
    description: "Sub-249g folding drone with 4K HDR video and obstacle sensing",
    price: 89900,
    quantity: 11,
    imageUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600",
    status: "active",
    rating: 4.8,
    reviewCount: 178,
    addedDate: "2024-03-10"
  },
  {
    id: "14",
    name: "Samsung 65-inch QLED 4K TV",
    category: "Electronics",
    description: "Smart TV with Quantum Dot color and Object Tracking Sound",
    price: 94990,
    quantity: 9,
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600",
    status: "active",
    rating: 4.6,
    reviewCount: 267,
    addedDate: "2023-03-11"
  },
  {
    id: "15",
    name: "Meta Quest 3 VR Headset",
    category: "Gaming",
    description: "Breakthrough mixed reality headset with 512GB storage",
    price: 62999,
    quantity: 16,
    imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600",
    status: "active",
    rating: 4.7,
    reviewCount: 356,
    addedDate: "2024-01-12"
  },
  {
    id: "16",
    name: "Garmin Fenix 7 Pro Solar",
    category: "Wearables",
    description: "Multisport GPS watch with solar charging lens",
    price: 81990,
    quantity: 7,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600",
    status: "active",
    rating: 4.8,
    reviewCount: 142,
    addedDate: "2023-10-05"
  },
  {
    id: "17",
    name: "Keychron K2 Mechanical Keyboard",
    category: "Accessories",
    description: "75% layout wireless mechanical keyboard with RGB backlighting",
    price: 9999,
    quantity: 45,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
    status: "active",
    rating: 4.7,
    reviewCount: 512,
    addedDate: "2023-06-18"
  },
  {
    id: "18",
    name: "GoPro Hero 12 Black",
    category: "Cameras",
    description: "Action camera with 5.3K video, HDR, and Hypersmooth 6.0",
    price: 45000,
    quantity: 19,
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600",
    status: "active",
    rating: 4.6,
    reviewCount: 334,
    addedDate: "2024-03-01"
  },
  {
    id: "19",
    name: "Anker 737 Power Bank",
    category: "Accessories",
    description: "24,000mAh 140W portable charger with smart digital display",
    price: 13999,
    quantity: 35,
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600",
    status: "active",
    rating: 4.8,
    reviewCount: 420,
    addedDate: "2023-11-20"
  },
  {
    id: "20",
    name: "Razer Blade 16 Gaming Laptop",
    category: "Gaming",
    description: "Intel i9 with RTX 4090 and dual-mode Mini-LED display",
    price: 329999,
    quantity: 4,
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600",
    status: "active",
    rating: 4.7,
    reviewCount: 98,
    addedDate: "2024-03-05"
  }
]

interface ProductStore {
  products: Product[]
  addProduct: (product: ProductFormData) => void
  updateProduct: (id: string, product: Partial<ProductFormData>) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => Product | undefined
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (data) => {
        const newProduct: Product = {
          ...data,
          id: Date.now().toString(),
          rating: 4.5,
          reviewCount: 1,
          addedDate: new Date().toISOString().split("T")[0],
        }
        set((state) => ({ products: [newProduct, ...state.products] }))
      },
      updateProduct: (id, data) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
        }))
      },
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }))
      },
      getProduct: (id) => {
        return get().products.find((p) => p.id === id)
      },
    }),
    {
      name: "product-storage-v4",
    }
  )
)

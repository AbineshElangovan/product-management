"use client"
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, ProductFormData } from '@/types/products'




const initialProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    category: "Electronics",
    description: "Latest iPhone with A17 Pro chip",
    price: 134900,
    quantity: 25,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
    status: "active",
    rating: 4.8,
    reviewCount: 234,
    addedDate: "2024-01-15"
  },
  {
    id: "2",
    name: "MacBook Air M3",
    category: "Electronics",
    description: "Powerful laptop with M3 chip",
    price: 114900,
    quantity: 15,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    status: "active",
    rating: 4.9,
    reviewCount: 189,
    addedDate: "2024-02-01"
  },
  {
    id: "3",
    name: "Galaxy S24 Ultra",
    category: "Electronics",
    description: "Premium Android phone with pro camera",
    price: 124999,
    quantity: 18,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    status: "active",
    rating: 4.7,
    reviewCount: 152,
    addedDate: "2024-03-10"
  },
  {
    id: "4",
    name: "AirPods Pro",
    category: "Accessories",
    description: "Noise cancelling wireless earbuds",
    price: 24999,
    quantity: 40,
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    status: "active",
    rating: 4.6,
    reviewCount: 310,
    addedDate: "2024-04-20"
  },
  {
    id: "5",
    name: "Nintendo Switch LED",
    category: "Gaming",
    description: "Portable gaming console with vibrant display",
    price: 44999,
    quantity: 12,
    imageUrl: "https://images.unsplash.com/photo-1590608897129-79cbe60785d0?w=400",
    status: "upcoming",
    rating: 4.8,
    reviewCount: 225,
    addedDate: "2024-05-05"
  },
  {
    id: "8",
    name: "Dell XPS 15",
    category: "Electronics",
    description: "Creator laptop with LED 4K display",
    price: 189990,
    quantity: 8,
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
    status: "active",
    rating: 4.5,
    reviewCount: 134,
    addedDate: "2024-01-05"
  },
  {
    id: "9",
    name: "Nintendo Switch LED",
    category: "Gaming",
    description: "7-inch LED screen hybrid gaming console",
    price: 34999,
    quantity: 22,
    imageUrl: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400",
    status: "active",
    rating: 4.8,
    reviewCount: 890,
    addedDate: "2023-09-20"
  },
  {
    id: "10",
    name: "Dyson V15 Detect",
    category: "Home",
    description: "Cordless vacuum with laser dust detection",
    price: 65900,
    quantity: 14,
    imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400",
    status: "active",
    rating: 4.6,
    reviewCount: 276,
    addedDate: "2023-11-01"
  },
  {
    id: "11",
    name: "PlayStation 5",
    category: "Gaming",
    description: "Next-gen gaming with ultra-high speed SSD",
    price: 54990,
    quantity: 10,
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
    status: "active",
    rating: 4.9,
    reviewCount: 1203,
    addedDate: "2023-08-12"
  },
  {
    id: "12",
    name: "Logitech MX Master 3S",
    category: "Accessories",
    description: "Advanced wireless mouse for productivity",
    price: 10995,
    quantity: 60,
    imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
    status: "active",
    rating: 4.8,
    reviewCount: 445,
    addedDate: "2023-07-18"
  },
  {
    id: "13",
    name: "Kindle Paper white",
    category: "Electronics",
    description: "6.8 inch display with adjustable warm light",
    price: 13999,
    quantity: 35,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    status: "active",
    rating: 4.7,
    reviewCount: 623,
    addedDate: "2023-06-22"
  },
  {
    id: "14",
    name: "GoPro Hero 12",
    category: "Cameras",
    description: "5.3K video with HyperSmooth 6.0 stabilization",
    price: 45000,
    quantity: 19,
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
    status: "active",
    rating: 4.6,
    reviewCount: 334,
    addedDate: "2024-03-01"
  },
  {
    id: "15",
    name: "Next press",
    category: "Kitchen",
    description: "Coffee and espresso maker with Central fusion",
    price: 18500,
    quantity: 27,
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    status: "active",
    rating: 4.5,
    reviewCount: 198,
    addedDate: "2023-05-14"
  },
  {
    id: "16",
    name: "Bose SoundLink Revolve+",
    category: "Audio",
    description: "360 degree portable Bluetooth speaker",
    price: 29900,
    quantity: 31,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    status: "active",
    rating: 4.7,
    reviewCount: 387,
    addedDate: "2023-04-08"
  },
  {
    id: "17",
    name: "Canon EOS R6 Mark II",
    category: "Cameras",
    description: "Full-frame mirror less camera 24.2MP",
    price: 239990,
    quantity: 6,
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
    status: "active",
    rating: 4.9,
    reviewCount: 156,
    addedDate: "2024-02-28"
  },
  {
    id: "18",
    name: "Samsung 65 inch LED TV",
    category: "Electronics",
    description: "4K Smart TV with Quantum HDR",
    price: 94990,
    quantity: 9,
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    status: "active",
    rating: 4.6,
    reviewCount: 267,
    addedDate: "2023-03-11"
  },
  {
    id: "19",
    name: "Apple TV 4K",
    category: "Electronics",
    description: "HDR and Dolby Atmos streaming device",
    price: 17900,
    quantity: 42,
    imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400",
    status: "active",
    rating: 4.5,
    reviewCount: 301,
    addedDate: "2023-02-19"
  },
  {
    id: "20",
    name: "DJI Mini 4 Pro",
    category: "Cameras",
    description: "Sub-249g drone with 4K HDR video",
    price: 89900,
    quantity: 11,
    imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400",
    status: "active",
    rating: 4.8,
    reviewCount: 178,
    addedDate: "2024-03-10"
  },
  {
    id: "21",
    name: "The PowerCore 26800",
    category: "Accessories",
    description: "High capacity portable charger",
    price: 5999,
    quantity: 80,
    imageUrl: "https://images.unsplash.com/photo-1609592806596-b43bada2f4b3?w=400",
    status: "active",
    rating: 4.6,
    reviewCount: 1024,
    addedDate: "2023-01-25"
  },
  {
    id: "22",
    name: "Instant Pot Duo 7-in-1",
    category: "Kitchen",
    description: "Electric pressure cooker 6 quart",
    price: 8995,
    quantity: 38,
    imageUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400",
    status: "active",
    rating: 4.7,
    reviewCount: 892,
    addedDate: "2022-12-03"
  },
  {
    id: "23",
    name: "The gun Pro",
    category: "Health",
    description: "Professional-grade percussive therapy",
    price: 54999,
    quantity: 13,
    imageUrl: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400",
    status: "active",
    rating: 4.5,
    reviewCount: 145,
    addedDate: "2023-10-17"
  },
  {
    id: "24",
    name: "LEGO Star Wars Millennium Falcon",
    category: "Toys",
    description: "7541 pieces collector set",
    price: 84999,
    quantity: 5,
    imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400",
    status: "active",
    rating: 5.0,
    reviewCount: 89,
    addedDate: "2023-09-01"
  },
  {
    id: "25",
    name: "Oculus Quest 3",
    category: "Gaming",
    description: "Mixed reality VR headset 512GB",
    price: 62999,
    quantity: 16,
    imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400",
    status: "active",
    rating: 4.7,
    reviewCount: 356,
    addedDate: "2024-01-12"
  },
  {
    id: "26",
    name: "Samsung Galaxy Watch 6",
    category: "Wearables",
    description: "Advanced sleep and fitness tracking",
    price: 29999,
    quantity: 28,
    imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
    status: "active",
    rating: 4.4,
    reviewCount: 267,
    addedDate: "2023-08-25"
  },
  {
    id: "27",
    name: "Philips Hue Starter Kit",
    category: "Home",
    description: "Smart LED bulbs with bridge",
    price: 12999,
    quantity: 45,
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400",
    status: "active",
    rating: 4.6,
    reviewCount: 423,
    addedDate: "2023-07-02"
  },
  {
    id: "28",
    name: "Razer Blade 16",
    category: "Gaming",
    description: "Gaming laptop RTX 4090 240Hz",
    price: 329999,
    quantity: 4,
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
    status: "active",
    rating: 4.7,
    reviewCount: 98,
    addedDate: "2024-03-05"
  },
  {
    id: "29",
    name: "KitchenAid Stand Mixer",
    category: "Kitchen",
    description: "5 quart tilt-head mixer Artisan",
    price: 45999,
    quantity: 17,
    imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400",
    status: "active",
    rating: 4.9,
    reviewCount: 567,
    addedDate: "2023-06-15"
  },
  {
    id: "30",
    name: "Apple Pencil Pro",
    category: "Accessories",
    description: "Pixel-perfect precision for iPad",
    price: 11900,
    quantity: 55,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    status: "active",
    rating: 4.8,
    reviewCount: 312,
    addedDate: "2024-02-20"
  },
  {
    id: "31",
    name: "Google Pixel 8 Pro",
    category: "Electronics",
    description: "Pro-level camera with Google AI",
    price: 106999,
    quantity: 20,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
    status: "active",
    rating: 4.6,
    reviewCount: 234,
    addedDate: "2024-01-08"
  },
  {
    id: "32",
    name: "Believe Barista Express",
    category: "Kitchen",
    description: "Espresso machine with grinder",
    price: 69995,
    quantity: 10,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
    status: "active",
    rating: 4.7,
    reviewCount: 189,
    addedDate: "2023-05-22"
  },
  {
    id: "33",
    name: "Garmin Fenix 7",
    category: "Wearables",
    description: "Multi sport GPS smartwatch",
    price: 79990,
    quantity: 15,
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400",
    status: "active",
    rating: 4.8,
    reviewCount: 156,
    addedDate: "2023-04-14"
  },
  {
    id: "34",
    name: "LG C3 55 inch LED",
    category: "Electronics",
    description: "4K Smart LED TV 120Hz",
    price: 134990,
    quantity: 7,
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    status: "active",
    rating: 4.9,
    reviewCount: 201,
    addedDate: "2024-01-30"
  },
  {
    id: "35",
    name: "JBL Flip 6",
    category: "Audio",
    description: "Waterproof portable speaker",
    price: 11999,
    quantity: 48,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    status: "active",
    rating: 4.6,
    reviewCount: 678,
    addedDate: "2023-03-27"
  },
  {
    id: "36",
    name: "Steam Deck LED",
    category: "Gaming",
    description: "512GB handheld gaming PC",
    price: 64999,
    quantity: 12,
    imageUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400",
    status: "active",
    rating: 4.7,
    reviewCount: 289,
    addedDate: "2024-02-08"
  },
  {
    id: "37",
    name: "Room j7+",
    category: "Home",
    description: "Self-emptying robot vacuum",
    price: 74999,
    quantity: 11,
    imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400",
    status: "active",
    rating: 4.4,
    reviewCount: 167,
    addedDate: "2023-11-28"
  },
  {
    id: "38",
    name: "Key chron Q1 Pro",
    category: "Accessories",
    description: "Wireless mechanical keyboard",
    price: 18900,
    quantity: 33,
    imageUrl: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=400",
    status: "active",
    rating: 4.8,
    reviewCount: 234,
    addedDate: "2023-09-14"
  },
  {
    id: "39",
    name: "Nothing Phone 2",
    category: "Electronics",
    description: "Glyph interface transparent design",
    price: 44999,
    quantity: 26,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    status: "active",
    rating: 4.3,
    reviewCount: 178,
    addedDate: "2023-10-22"
  },
  {
    id: "40",
    name: "Sony A7 IV",
    category: "Cameras",
    description: "33MP full-frame mirror less camera",
    price: 214990,
    quantity: 5,
    imageUrl: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=400",
    status: "active",
    rating: 4.9,
    reviewCount: 112,
    addedDate: "2024-03-12"
  },
  {
    id: "41",
    name: "Apple Studio Display",
    category: "Electronics",
    description: "27-inch 5K Retina display",
    price: 159900,
    quantity: 6,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    status: "active",
    rating: 4.5,
    reviewCount: 87,
    addedDate: "2023-12-05"
  },
  {
    id: "42",
    name: "Vitamin A3500",
    category: "Kitchen",
    description: "Smart blender with touchscreen",
    price: 64995,
    quantity: 9,
    imageUrl: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400",
    status: "active",
    rating: 4.8,
    reviewCount: 145,
    addedDate: "2023-08-02"
  },
  {
    id: "43",
    name: "Bose QuietComfort Ultra",
    category: "Audio",
    description: "Immersive audio headphones",
    price: 34900,
    quantity: 29,
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e8e5?w=400",
    status: "active",
    rating: 4.7,
    reviewCount: 298,
    addedDate: "2024-01-25"
  },
  {
    id: "44",
    name: "Microsoft Surface Laptop 5",
    category: "Electronics",
    description: "13.5 inch touchscreen laptop",
    price: 1290,
    quantity: 10,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    status: "active",
    rating: 4.4,
    reviewCount: 123,
    addedDate: "2023-07-30"
  },
  {
    id: "45",
    name: "Potato Bike+",
    category: "Health",
    description: "Indoor cycling bike with rotating screen",
    price: 2495,
    quantity: 3,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    status: "active",
    rating: 4.6,
    reviewCount: 76,
    addedDate: "2023-06-08"
  },
  {
    id: "46",
    name: "boat 737 Power Bank",
    category: "Accessories",
    description: "140W 24000mAh laptop power bank",
    price: 13999,
    quantity: 52,
    imageUrl: "https://images.unsplash.com/photo-1609592806596-b43bada2f4b3?w=400",
    status: "active",
    rating: 4.7,
    reviewCount: 341,
    addedDate: "2023-04-19"
  },
  {
    id: "47",
    name: "Fujifilm X-T5",
    category: "Cameras",
    description: "40MP APS-C mirror less camera",
    price: 169,
    quantity: 8,
    imageUrl: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400",
    status: "active",
    rating: 4.8,
    reviewCount: 134,
    addedDate: "2024-02-25"
  },
  {
    id: "48",
    name: "Xiaomi 14 Ultra",
    category: "Electronics",
    description: "Leica quad camera system",
    price: 99999,
    quantity: 14,
    imageUrl: "https://images.unsplash.com/photo-1592899677-ff8c3be935df?w=400",
    status: "upcoming",
    rating: 0,
    reviewCount: 0,
    addedDate: "2024-03-20",
    launchDate: "2024-04-15"
  },
  {
    id: "49",
    name: "Samsung Galaxy Ring",
    category: "Wearables",
    description: "Health tracking smart ring",
    price: 39999,
    quantity: 0,
    imageUrl: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400",
    status: "upcoming",
    rating: 0,
    reviewCount: 0,
    addedDate: "2024-03-18",
    launchDate: "2024-05-01"
  },
  {
    id: "50",
    name: "iPhone SE 2022",
    category: "Electronics",
    description: "A15 Bionic compact phone",
    price: 49900,
    quantity: 0,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400",
    status: "discontinued",
    rating: 4.3,
    reviewCount: 456,
    addedDate: "2022-05-10"
  },
  {
    id: "51",
    name: "Apple Vision Pro",
    category: "Electronics",
    description: "Spatial computing headset",
    price: 349900,
    quantity: 2,
    imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400",
    status: "active",
    rating: 4.5,
    reviewCount: 67,
    addedDate: "2024-03-22"
  },
  {
    id: "52",
    name: "Samsung Galaxy Book4 Pro",
    category: "Electronics",
    description: "Intel Core Ultra laptop LED",
    price: 154990,
    quantity: 11,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
    status: "active",
    rating: 4.6,
    reviewCount: 92,
    addedDate: "2024-03-15"
  }
]


interface ProductStore {
  products: Product[]
  addProduct: (data: ProductFormData) => void
  updateProduct: (id: string, data: ProductFormData) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => Product | undefined
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (data) => set((state) => ({
        products: [...state.products, { 
         ...data, 
          id: crypto.randomUUID(), 
          rating: 0, 
          reviewCount: 0, 
          addedDate: new Date().toISOString().split('T')[0] 
        }]
      })),
      updateProduct: (id, data) => set((state) => ({
        products: state.products.map((p) => p.id === id? {...p,...data} : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id!== id)
      })),
      getProduct: (id) => get().products.find((p) => p.id === id)
    }),
    { name: 'product-store' }
  )
)
















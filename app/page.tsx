"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useProductStore } from "@/lib/store/product-store"
import { useTheme } from "@/components/ThemeProvider"
import { ProductCard } from "@/components/ui/ProductCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Boxes,
  TrendingUp,
  AlertTriangle,
  FolderTree,
  PlusCircle,
  Package,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react"

const MAX_CATEGORIES = 6
const MAX_PRODUCTS_PER_CATEGORY = 4

export default function Home() {
  const [hasHydrated, setHasHydrated] = useState(false)
  const products = useProductStore((state) => state.products)
  const { activeOption } = useTheme()
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All")

  useEffect(() => {
    setHasHydrated(true)
  }, [])

  // Calculate KPI Analytics
  const stats = useMemo(() => {
    const totalCount = products.length
    const totalValuation = products.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0)
    const lowStockCount = products.filter((p) => p.quantity < 10).length
    const categoriesSet = new Set(products.map((p) => p.category))
    return {
      totalCount,
      totalValuation,
      lowStockCount,
      categoriesCount: categoriesSet.size,
      categoriesList: Array.from(categoriesSet).sort(),
    }
  }, [products])

  const categorySections = useMemo(() => {
    const groups: Record<string, typeof products> = {}

    products.forEach((product) => {
      if (!groups[product.category]) groups[product.category] = []
      groups[product.category].push(product)
    })

    let selectedCategories = Object.keys(groups).sort()
    if (activeCategoryFilter !== "All") {
      selectedCategories = selectedCategories.filter((c) => c === activeCategoryFilter)
    } else {
      selectedCategories = selectedCategories.slice(0, MAX_CATEGORIES)
    }

    return selectedCategories.map((category) => ({
      category,
      products: groups[category].slice(0, MAX_PRODUCTS_PER_CATEGORY),
    }))
  }, [products, activeCategoryFilter])

  if (!hasHydrated) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl glass-card p-6 shadow-xl">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-800 border-t-transparent" />
          <span className="text-sm font-semibold">Loading Stock Hub Dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10 pb-16">
      
      {/* Dynamic Theme Hero Section */}
      <div className="relative overflow-hidden rounded-3xl glass-card p-8 sm:p-12 border shadow-xl transition-all duration-500">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          
          <div className="space-y-4 max-w-xl">
            <div className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold border transition-colors ${activeOption.badgeColor}`}>
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>{activeOption.name} • Product Studio</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900">
              Online <br className="hidden sm:inline" />
              <span className={activeOption.accentText}>Shopping</span> Hub
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              E-commerce and customer experience concept illustration. Manage products, analyze inventory, and process store operations seamlessly.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link href="/products">
                <Button size="lg" variant="outline" className={`gap-2 font-bold text-sm border-stone-300 text-slate-900 hover:bg-stone-200/80`}>
                  <span>Explore Catalog</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              
              <Link href="/products/add">
                <Button size="lg" className={`gap-2 font-bold text-sm shadow-md transition-all ${activeOption.glowBtn}`}>
                  <PlusCircle className="h-4 w-4" />
                  <span>+ Add Product</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Live Display */}
          <div className="rounded-2xl bg-white/90 p-6 border border-stone-200 shadow-xl space-y-4 max-w-xs w-full">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Store Inventory</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${activeOption.badgeColor}`}>
                Active Theme
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500">Total Stock Value</p>
              <p className={`text-3xl font-black ${activeOption.accentText}`}>₹{stats.totalValuation.toLocaleString("en-IN")}</p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs text-slate-700 border-t border-stone-200">
              <span>{stats.totalCount} Products</span>
              <span>{stats.categoriesCount} Categories</span>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1 */}
        <div className="rounded-2xl glass-card p-4 shadow-sm flex items-center gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-md ${activeOption.brandLogo}`}>
            <Boxes className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Products</p>
            <p className="text-2xl font-black text-slate-900">{stats.totalCount}</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl glass-card p-4 shadow-sm flex items-center gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-md ${activeOption.primaryBtn}`}>
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock Valuation</p>
            <p className={`text-2xl font-black ${activeOption.accentText}`}>₹{stats.totalValuation.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl glass-card p-4 shadow-sm flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-900 text-rose-50 shadow-md">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Low Stock Alert</p>
            <p className="text-2xl font-black text-rose-700">{stats.lowStockCount}</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl glass-card p-4 shadow-sm flex items-center gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-md ${activeOption.primaryBtn}`}>
            <FolderTree className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Categories</p>
            <p className="text-2xl font-black text-slate-900">{stats.categoriesCount}</p>
          </div>
        </div>

      </div>

      {/* Dynamic Category Filter Pills Bar */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl glass-card p-3 shadow-sm border">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">Filter Category:</span>
        <Button
          size="pill"
          variant="ghost"
          onClick={() => setActiveCategoryFilter("All")}
          className={`font-semibold ${activeCategoryFilter === "All" ? activeOption.activeNavPill : "text-slate-700 hover:bg-stone-200/60"}`}
        >
          All ({products.length})
        </Button>
        {stats.categoriesList.map((cat) => {
          const count = products.filter((p) => p.category === cat).length
          const isActive = activeCategoryFilter === cat
          return (
            <Button
              key={cat}
              size="pill"
              variant="ghost"
              onClick={() => setActiveCategoryFilter(cat)}
              className={`font-semibold ${isActive ? activeOption.activeNavPill : "text-slate-700 hover:bg-stone-200/60"}`}
            >
              {cat} ({count})
            </Button>
          )
        })}
      </div>

      {/* Dynamic Category Showcase Sections */}
      <div className="space-y-10">
        {categorySections.map((section) => (
          <section key={section.category} className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight text-slate-900">{section.category}</h2>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${activeOption.badgeColor}`}>
                  {section.products.length} Items
                </span>
              </div>
              <Link href={`/products?category=${section.category}`}>
                <Button size="sm" variant="ghost" className={`gap-1 text-xs font-semibold ${activeOption.accentText}`}>
                  View Category Catalog →
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {section.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </section>
        ))}
      </div>

      {/* Dynamic Add Product CTA Banner */}
      <div className="rounded-3xl glass-card p-8 border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${activeOption.accentText}`}>
            <ShieldCheck className="h-4 w-4" /> Seamless CRUD Operations
          </div>
          <h3 className="text-2xl font-black text-slate-900">Register a new store product</h3>
          <p className="text-xs text-slate-600">Add products with 4K image previews, price calculators, and live validation.</p>
        </div>
        <Link href="/products/add">
          <Button size="lg" className={`font-bold shrink-0 shadow-md ${activeOption.glowBtn}`}>
            <PlusCircle className="mr-2 h-4 w-4" /> Launch Product Form
          </Button>
        </Link>
      </div>

    </div>
  )
}

"use client"

import React, { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useProductStore } from "@/lib/store/product-store"
import { ProductCard } from "@/components/ui/ProductCard"
import { ProductTable } from "@/components/products/table"
import { columns } from "@/components/products/columns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/ThemeProvider"
import {
  LayoutGrid,
  Table as TableIcon,
  PlusCircle,
  Search,
  Package,
  RotateCcw,
} from "lucide-react"

function ProductsContent() {
  const searchParams = useSearchParams()
  const products = useProductStore((state) => state.products)
  const { activeOption } = useTheme()

  // View state: grid vs table
  const defaultView = searchParams.get("view") === "table" ? "table" : "grid"
  const [viewMode, setViewMode] = useState<"grid" | "table">(defaultView)

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "all")
  const [priceFilter, setPriceFilter] = useState<"all" | "low" | "mid" | "high">("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    const viewParam = searchParams.get("view")
    if (viewParam === "table") setViewMode("table")
    const catParam = searchParams.get("category")
    if (catParam) setSelectedCategory(catParam)
  }, [searchParams])

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category))
    return Array.from(set).sort()
  }, [products])

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search text
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = product.name.toLowerCase().includes(query)
        const matchesCat = product.category.toLowerCase().includes(query)
        const matchesDesc = (product.description || "").toLowerCase().includes(query)
        if (!matchesName && !matchesCat && !matchesDesc) return false
      }

      // Category
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false
      }

      // Status
      if (statusFilter !== "all" && product.status !== statusFilter) {
        return false
      }

      // Price Filter
      if (priceFilter === "low" && product.price >= 5000) return false
      if (priceFilter === "mid" && (product.price < 5000 || product.price > 50000)) return false
      if (priceFilter === "high" && product.price <= 50000) return false

      return true
    })
  }, [products, searchQuery, selectedCategory, statusFilter, priceFilter])

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setPriceFilter("all")
    setStatusFilter("all")
  }

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Header Controls Banner */}
      <div className={`rounded-3xl glass-card bg-white/80 backdrop-blur-md p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6 ${activeOption.cardBorder}`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${activeOption.accentText}`}>
              <Package className="h-4 w-4" /> Live Catalog Database
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
              Store Catalog Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Showing {filteredProducts.length} of {products.length} registered products
            </p>
          </div>

          {/* Action Row: View Mode Switcher + Add Product */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* View Mode Segmented Buttons */}
            <div className="flex items-center rounded-2xl bg-stone-100 p-1 border border-stone-300/80 shadow-2xs">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                onClick={() => setViewMode("grid")}
                className={`gap-2 text-xs font-bold rounded-xl ${viewMode === "grid" ? activeOption.activeNavPill : "text-slate-700 hover:bg-stone-200/80"}`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Card Grid</span>
              </Button>
              <Button
                size="sm"
                variant={viewMode === "table" ? "default" : "ghost"}
                onClick={() => setViewMode("table")}
                className={`gap-2 text-xs font-bold rounded-xl ${viewMode === "table" ? activeOption.activeNavPill : "text-slate-700 hover:bg-stone-200/80"}`}
              >
                <TableIcon className="h-4 w-4" />
                <span>Data Table</span>
              </Button>
            </div>

            <Link href="/products/add">
              <Button size="default" className={`gap-2 font-bold ${activeOption.glowBtn}`}>
                <PlusCircle className="h-4 w-4" />
                <span>+ Add Product</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-4 border-t border-stone-200/80">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-9 bg-white border-stone-300 text-slate-900 placeholder:text-stone-400 text-xs rounded-xl shadow-2xs ${activeOption.ringColor}`}
            />
          </div>

          {/* Category Dropdown/Selector */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`h-10 rounded-xl bg-white border border-stone-300 px-3 text-xs font-bold text-slate-900 shadow-2xs focus:outline-none cursor-pointer ${activeOption.ringColor}`}
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Selector */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`h-10 rounded-xl bg-white border border-stone-300 px-3 text-xs font-bold text-slate-900 shadow-2xs focus:outline-none cursor-pointer ${activeOption.ringColor}`}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="upcoming">Upcoming Only</option>
            <option value="discontinued">Discontinued</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Price Range Pills */}
          <div className="flex items-center gap-1 rounded-xl bg-stone-100 p-1 border border-stone-300 shadow-2xs">
            <button
              onClick={() => setPriceFilter("all")}
              className={`flex-1 text-[11px] font-bold py-1.5 rounded-lg transition ${
                priceFilter === "all" ? activeOption.activeNavPill : "text-slate-700 hover:text-slate-950"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setPriceFilter("low")}
              className={`flex-1 text-[11px] font-bold py-1.5 rounded-lg transition ${
                priceFilter === "low" ? activeOption.activeNavPill : "text-slate-700 hover:text-slate-950"
              }`}
            >
              &lt; ₹5K
            </button>
            <button
              onClick={() => setPriceFilter("mid")}
              className={`flex-1 text-[11px] font-bold py-1.5 rounded-lg transition ${
                priceFilter === "mid" ? activeOption.activeNavPill : "text-slate-700 hover:text-slate-950"
              }`}
            >
              5K-50K
            </button>
            <button
              onClick={() => setPriceFilter("high")}
              className={`flex-1 text-[11px] font-bold py-1.5 rounded-lg transition ${
                priceFilter === "high" ? activeOption.activeNavPill : "text-slate-700 hover:text-slate-950"
              }`}
            >
              &gt; ₹50K
            </button>
          </div>

        </div>

        {/* Active Filter Badges */}
        {(searchQuery || selectedCategory !== "all" || statusFilter !== "all" || priceFilter !== "all") && (
          <div className="flex items-center gap-2 pt-2 text-xs">
            <span className="text-slate-600 font-bold">Active Filters:</span>
            {searchQuery && (
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${activeOption.badgeColor}`}>
                Search: &quot;{searchQuery}&quot;
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${activeOption.badgeColor}`}>
                Category: {selectedCategory}
              </span>
            )}
            {statusFilter !== "all" && (
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${activeOption.badgeColor}`}>
                Status: {statusFilter}
              </span>
            )}
            <Button size="sm" variant="ghost" onClick={resetFilters} className="gap-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs h-6 px-2 font-bold">
              <RotateCcw className="h-3 w-3" /> Reset
            </Button>
          </div>
        )}

      </div>

      {/* Main Content Display */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl glass-card bg-white/80 p-12 text-center border border-dashed border-stone-300 space-y-4 shadow-sm">
          <div className="text-5xl">📦</div>
          <h3 className="text-xl font-extrabold text-slate-900">No products found matching filters</h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
            Try adjusting your search keywords, price filter, or category selection.
          </p>
          <Button variant="outline" onClick={resetFilters} className="text-xs font-bold border-stone-300">
            Clear Filters
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <ProductTable data={filteredProducts} columns={columns} />
      )}

    </div>
  )
}

export default function ProductsPage() {
  const { activeOption } = useTheme()
  return (
    <Suspense fallback={
      <div className="flex h-64 items-center justify-center">
        <div className={`rounded-2xl glass-card p-6 text-sm font-bold border shadow-sm ${activeOption.badgeColor}`}>
          Loading Catalog...
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useTheme, LIGHT_THEMES } from "@/components/ThemeProvider"
import { useProductStore } from "@/lib/store/product-store"
import {
  LayoutDashboard,
  Package,
  Table,
  PlusCircle,
  Palette,
  Search,
  Check,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { activeWallpaper, setWallpaper, activeOption } = useTheme()
  const products = useProductStore((state) => state.products)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSearchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : []

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4 transition-all">
      <div className="glass-nav flex items-center justify-between rounded-full p-2 shadow-sm border border-stone-200/80">
        
        {/* Brand Logo Button */}
        <Link href="/" className="flex items-center gap-2.5 pl-2 group">
          <div className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm group-hover:scale-105 transition-all ${activeOption.brandLogo}`}>
            <ShoppingBag className="h-4 w-4" />
          </div>
          <div className="hidden sm:block">
            <span className={`text-base font-black tracking-tight ${activeOption.accentText}`}>
              STOCK HUB
            </span>
            <p className="text-[10px] font-semibold text-slate-500">
              {activeOption.name}
            </p>
          </div>
        </Link>

        {/* Center Button Navigation Bar */}
        <nav className="flex items-center gap-1 sm:gap-1.5">
          {/* Dashboard Button */}
          <Link href="/">
            <Button
              size="pill"
              variant="ghost"
              className={`gap-1.5 font-semibold transition-all ${
                pathname === "/" ? activeOption.activeNavPill : "text-slate-700 hover:bg-stone-200/60"
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </Link>

          {/* Catalog Button */}
          <Link href="/products">
            <Button
              size="pill"
              variant="ghost"
              className={`gap-1.5 font-semibold transition-all ${
                pathname === "/products" ? activeOption.activeNavPill : "text-slate-700 hover:bg-stone-200/60"
              }`}
            >
              <Package className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Catalog</span>
            </Button>
          </Link>

          {/* Table View Button */}
          <Link href="/products?view=table">
            <Button
              size="pill"
              variant="ghost"
              className="gap-1.5 font-semibold text-slate-700 hover:bg-stone-200/60"
            >
              <Table className={`h-3.5 w-3.5 ${activeOption.accentText}`} />
              <span className="hidden lg:inline">Table View</span>
            </Button>
          </Link>

          {/* Add Product Dynamic Action Button */}
          <Link href="/products/add">
            <Button
              size="pill"
              className={`gap-1.5 font-bold hover:scale-105 transition-transform shadow-sm ${activeOption.glowBtn}`}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>+ Add Product</span>
            </Button>
          </Link>
        </nav>

        {/* Right Actions: Quick Search & 6 Light Studio Themes */}
        <div className="flex items-center gap-1.5 pr-1">
          
          {/* Quick Search Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-full h-9 w-9 text-slate-700">
                <Search className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3 glass-card">
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b pb-2 border-stone-200">
                  <Search className={`h-4 w-4 ${activeOption.accentText}`} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Quick Search</span>
                </div>
                <Input
                  placeholder="Search name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`text-xs font-extrabold text-slate-900 bg-white border-stone-300 placeholder:text-stone-400 ${activeOption.ringColor}`}
                />
                <div className="max-h-56 overflow-y-auto space-y-1">
                  {searchQuery && filteredSearchResults.length === 0 && (
                    <p className="p-3 text-center text-xs text-slate-500">No products found.</p>
                  )}
                  {filteredSearchResults.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        router.push(`/products/${p.id}`)
                        setSearchQuery("")
                      }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-200/70 cursor-pointer transition"
                    >
                      <img src={p.imageUrl} alt={p.name} className="h-8 w-8 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">{p.name}</p>
                        <p className={`text-[10px] font-bold ${activeOption.accentText}`}>₹{p.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* 6 All-Light Studio Theme Selector Button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button size="pill" variant="outline" className={`gap-1.5 text-xs font-semibold rounded-full border-stone-300 ${activeOption.accentText}`}>
                <Palette className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">{activeOption.name}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-84 p-3 glass-card">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2 border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className={`h-4 w-4 ${activeOption.accentText}`} />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Select Studio Light Theme</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                  {LIGHT_THEMES.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setWallpaper(option.id)}
                      className={`group relative flex flex-col rounded-xl border p-2 text-left transition ${
                        activeWallpaper === option.id
                          ? "border-slate-800 bg-slate-900/10 ring-2 ring-slate-800/30 font-bold"
                          : "border-stone-200 bg-white/70 hover:border-stone-400 hover:bg-white"
                      }`}
                    >
                      <div className={`relative h-12 w-full overflow-hidden rounded-lg bg-gradient-to-r ${option.previewGradient} flex items-center justify-center`}>
                        <img
                          src={option.imageUrl}
                          alt={option.name}
                          className="h-full w-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
                        />
                        {activeWallpaper === option.id && (
                          <div className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-white shadow-md">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="mt-1.5 text-[11px] font-bold text-slate-900 line-clamp-1">{option.name}</span>
                      <span className="text-[9px] text-slate-500 line-clamp-1">{option.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Product Counter */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-stone-200/80 px-3 py-1 text-[11px] font-bold text-slate-800">
            <TrendingUp className={`h-3.5 w-3.5 ${activeOption.accentText}`} />
            <span>{products.length} Products</span>
          </div>

        </div>

      </div>
    </header>
  )
}

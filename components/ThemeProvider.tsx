"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type WallpaperTheme = "warm_cream" | "lavender" | "mint_sage" | "rose_quartz" | "sky_azure" | "sand"

export interface WallpaperOption {
  id: WallpaperTheme
  name: string
  description: string
  imageUrl: string
  bgClass: string
  overlayClass: string
  previewGradient: string
  primaryBtn: string
  secondaryBtn: string
  accentText: string
  highlightText: string
  badgeColor: string
  stockBadge: string
  glowBtn: string
  cardBorder: string
  activeNavPill: string
  ringColor: string
  brandLogo: string
  heroBadge: string
  tableHeaderBg: string
  tableOddRow: string
  tableEvenRow: string
}

export const LIGHT_THEMES: WallpaperOption[] = [
  {
    id: "warm_cream",
    name: "Warm Cream Studio",
    description: "Soft ivory & warm cream studio stage",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=3840&auto=format&fit=crop",
    bgClass: "theme-warm-cream",
    overlayClass: "from-amber-50/95 via-stone-50/90 to-amber-100/95",
    previewGradient: "from-amber-200 via-stone-200 to-amber-300",
    primaryBtn: "bg-amber-900 text-amber-50 hover:bg-amber-800 shadow-amber-950/20",
    secondaryBtn: "bg-amber-100 text-amber-950 border border-amber-300 hover:bg-amber-200",
    accentText: "text-amber-800",
    highlightText: "text-amber-900",
    badgeColor: "bg-amber-100/90 text-amber-950 border-amber-300 font-bold",
    stockBadge: "bg-amber-200/80 text-amber-950 border-amber-400 font-bold",
    glowBtn: "bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 text-amber-50 shadow-amber-900/20",
    cardBorder: "border-amber-200/90 hover:border-amber-500/60 shadow-amber-950/5",
    activeNavPill: "bg-amber-900 text-white shadow-md",
    ringColor: "focus:ring-amber-500 focus:border-amber-500",
    brandLogo: "bg-amber-900 text-amber-300",
    heroBadge: "bg-amber-100 text-amber-900 border-amber-300",
    tableHeaderBg: "bg-amber-100/70 text-amber-950 border-b border-amber-200",
    tableOddRow: "bg-white/95 hover:bg-amber-100/60 transition-colors",
    tableEvenRow: "bg-amber-100/50 hover:bg-amber-200/70 transition-colors",
  },
  {
    id: "lavender",
    name: "Pastel Lavender Studio",
    description: "Soft violet & soothing lavender studio backdrop",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3840&auto=format&fit=crop",
    bgClass: "theme-lavender",
    overlayClass: "from-purple-50/95 via-fuchsia-50/90 to-indigo-50/95",
    previewGradient: "from-purple-200 via-pink-100 to-indigo-200",
    primaryBtn: "bg-purple-900 text-purple-50 hover:bg-purple-800 shadow-purple-950/20",
    secondaryBtn: "bg-purple-100 text-purple-950 border border-purple-300 hover:bg-purple-200",
    accentText: "text-purple-800",
    highlightText: "text-purple-900",
    badgeColor: "bg-purple-100/90 text-purple-950 border-purple-300 font-bold",
    stockBadge: "bg-purple-200/80 text-purple-950 border-purple-400 font-bold",
    glowBtn: "bg-gradient-to-r from-purple-800 via-fuchsia-900 to-indigo-950 text-purple-50 shadow-purple-900/20",
    cardBorder: "border-purple-200/90 hover:border-purple-500/60 shadow-purple-950/5",
    activeNavPill: "bg-purple-900 text-white shadow-md",
    ringColor: "focus:ring-purple-500 focus:border-purple-500",
    brandLogo: "bg-purple-900 text-purple-300",
    heroBadge: "bg-purple-100 text-purple-900 border-purple-300",
    tableHeaderBg: "bg-purple-100/70 text-purple-950 border-b border-purple-200",
    tableOddRow: "bg-white/95 hover:bg-purple-100/60 transition-colors",
    tableEvenRow: "bg-purple-100/50 hover:bg-purple-200/70 transition-colors",
  },
  {
    id: "mint_sage",
    name: "Mint Sage Studio",
    description: "Eye-soothing mint green & soft sage backdrop",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=3840&auto=format&fit=crop",
    bgClass: "theme-mint-sage",
    overlayClass: "from-emerald-50/95 via-teal-50/90 to-emerald-100/95",
    previewGradient: "from-emerald-200 via-teal-100 to-emerald-300",
    primaryBtn: "bg-emerald-900 text-emerald-50 hover:bg-emerald-800 shadow-emerald-950/20",
    secondaryBtn: "bg-emerald-100 text-emerald-950 border border-emerald-300 hover:bg-emerald-200",
    accentText: "text-emerald-800",
    highlightText: "text-emerald-900",
    badgeColor: "bg-emerald-100/90 text-emerald-950 border-emerald-300 font-bold",
    stockBadge: "bg-emerald-200/80 text-emerald-950 border-emerald-400 font-bold",
    glowBtn: "bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-emerald-50 shadow-emerald-900/20",
    cardBorder: "border-emerald-200/90 hover:border-emerald-500/60 shadow-emerald-950/5",
    activeNavPill: "bg-emerald-900 text-white shadow-md",
    ringColor: "focus:ring-emerald-500 focus:border-emerald-500",
    brandLogo: "bg-emerald-900 text-emerald-300",
    heroBadge: "bg-emerald-100 text-emerald-900 border-emerald-300",
    tableHeaderBg: "bg-emerald-100/70 text-emerald-950 border-b border-emerald-200",
    tableOddRow: "bg-white/95 hover:bg-emerald-100/60 transition-colors",
    tableEvenRow: "bg-emerald-100/50 hover:bg-emerald-200/70 transition-colors",
  },
  {
    id: "rose_quartz",
    name: "Rose Quartz Blush",
    description: "Soft blush pink & warm peach studio light",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=3840&auto=format&fit=crop",
    bgClass: "theme-rose-quartz",
    overlayClass: "from-rose-50/95 via-pink-50/90 to-orange-50/95",
    previewGradient: "from-rose-200 via-pink-100 to-rose-300",
    primaryBtn: "bg-rose-900 text-rose-50 hover:bg-rose-800 shadow-rose-950/20",
    secondaryBtn: "bg-rose-100 text-rose-950 border border-rose-300 hover:bg-rose-200",
    accentText: "text-rose-800",
    highlightText: "text-rose-900",
    badgeColor: "bg-rose-100/90 text-rose-950 border-rose-300 font-bold",
    stockBadge: "bg-rose-200/80 text-rose-950 border-rose-400 font-bold",
    glowBtn: "bg-gradient-to-r from-rose-800 via-pink-900 to-rose-950 text-rose-50 shadow-rose-900/20",
    cardBorder: "border-rose-200/90 hover:border-rose-500/60 shadow-rose-950/5",
    activeNavPill: "bg-rose-900 text-white shadow-md",
    ringColor: "focus:ring-rose-500 focus:border-rose-500",
    brandLogo: "bg-rose-900 text-rose-300",
    heroBadge: "bg-rose-100 text-rose-900 border-rose-300",
    tableHeaderBg: "bg-rose-100/70 text-rose-950 border-b border-rose-200",
    tableOddRow: "bg-white/95 hover:bg-rose-100/60 transition-colors",
    tableEvenRow: "bg-rose-100/50 hover:bg-rose-200/70 transition-colors",
  },
  {
    id: "sky_azure",
    name: "Sky Azure Studio",
    description: "Crisp sky blue & ice azure studio stage",
    imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=3840&auto=format&fit=crop",
    bgClass: "theme-sky-azure",
    overlayClass: "from-sky-50/95 via-blue-50/90 to-indigo-50/95",
    previewGradient: "from-sky-200 via-blue-100 to-indigo-200",
    primaryBtn: "bg-sky-900 text-sky-50 hover:bg-sky-800 shadow-sky-950/20",
    secondaryBtn: "bg-sky-100 text-sky-950 border border-sky-300 hover:bg-sky-200",
    accentText: "text-sky-800",
    highlightText: "text-sky-900",
    badgeColor: "bg-sky-100/90 text-sky-950 border-sky-300 font-bold",
    stockBadge: "bg-sky-200/80 text-sky-950 border-sky-400 font-bold",
    glowBtn: "bg-gradient-to-r from-sky-800 via-blue-900 to-indigo-950 text-sky-50 shadow-sky-900/20",
    cardBorder: "border-sky-200/90 hover:border-sky-500/60 shadow-sky-950/5",
    activeNavPill: "bg-sky-900 text-white shadow-md",
    ringColor: "focus:ring-sky-500 focus:border-sky-500",
    brandLogo: "bg-sky-900 text-sky-300",
    heroBadge: "bg-sky-100 text-sky-900 border-sky-300",
    tableHeaderBg: "bg-sky-100/70 text-sky-950 border-b border-sky-200",
    tableOddRow: "bg-white/95 hover:bg-sky-100/60 transition-colors",
    tableEvenRow: "bg-sky-100/50 hover:bg-sky-200/70 transition-colors",
  },
  {
    id: "sand",
    name: "Minimalist Dune Sand",
    description: "Neutral desert sand & paper studio stage",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=3840&auto=format&fit=crop",
    bgClass: "theme-sand",
    overlayClass: "from-amber-50/95 via-stone-50/90 to-orange-100/95",
    previewGradient: "from-amber-200 via-stone-200 to-orange-200",
    primaryBtn: "bg-stone-900 text-stone-50 hover:bg-stone-800 shadow-stone-950/20",
    secondaryBtn: "bg-stone-200 text-stone-950 border border-stone-400 hover:bg-stone-300",
    accentText: "text-stone-800",
    highlightText: "text-stone-900",
    badgeColor: "bg-stone-200/90 text-stone-950 border-stone-300 font-bold",
    stockBadge: "bg-stone-300/80 text-stone-950 border-stone-400 font-bold",
    glowBtn: "bg-gradient-to-r from-stone-800 via-amber-900 to-stone-950 text-amber-200 shadow-stone-900/20",
    cardBorder: "border-stone-300/90 hover:border-stone-500/60 shadow-stone-950/5",
    activeNavPill: "bg-stone-900 text-white shadow-md",
    ringColor: "focus:ring-stone-500 focus:border-stone-500",
    brandLogo: "bg-stone-900 text-amber-300",
    heroBadge: "bg-stone-200 text-stone-900 border-stone-300",
    tableHeaderBg: "bg-stone-200/70 text-stone-950 border-b border-stone-300",
    tableOddRow: "bg-white/95 hover:bg-stone-200/60 transition-colors",
    tableEvenRow: "bg-stone-200/50 hover:bg-stone-300/70 transition-colors",
  },
]

interface ThemeContextType {
  activeWallpaper: WallpaperTheme
  setWallpaper: (wallpaper: WallpaperTheme) => void
  activeOption: WallpaperOption
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeWallpaper, setActiveWallpaperState] = useState<WallpaperTheme>("warm_cream")

  useEffect(() => {
    const saved = localStorage.getItem("product_app_light_wallpaper") as WallpaperTheme
    if (saved && LIGHT_THEMES.some((opt) => opt.id === saved)) {
      setActiveWallpaperState(saved)
    }
  }, [])

  const setWallpaper = (wallpaper: WallpaperTheme) => {
    setActiveWallpaperState(wallpaper)
    localStorage.setItem("product_app_light_wallpaper", wallpaper)
  }

  const activeOption = LIGHT_THEMES.find((opt) => opt.id === activeWallpaper) || LIGHT_THEMES[0]

  return (
    <ThemeContext.Provider value={{ activeWallpaper, setWallpaper, activeOption }}>
      <div className={`relative min-h-screen w-full transition-colors duration-700 text-slate-900 font-sans antialiased ${activeOption.bgClass}`}>
        
        {/* Soft 4K Background Image Layer */}
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform scale-102 opacity-30"
          style={{ backgroundImage: `url(${activeOption.imageUrl})` }}
        />

        {/* Dynamic Light Eye-Friendly Soft Overlay */}
        <div className={`fixed inset-0 z-0 bg-gradient-to-b ${activeOption.overlayClass} backdrop-blur-md transition-colors duration-700`} />

        {/* Main Content Container */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}


import { Product } from "@/types/products"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type CardVariant = "full" | "compact" | "price" | "category" | "upcoming"

interface ProductCardProps {
  product: Product
  variant?: CardVariant
}

export function ProductCard({ product, variant = "compact" }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <Image src={product.imageUrl} alt={product.name} width={400} height={300} className="w-full h-48 object-cover" />
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold line-clamp-1">{product.name}</h3>
            <Badge variant={product.status === "active"? "default" : "secondary"}>
              {product.status}
            </Badge>
          </div>
          {variant === "full" && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
          )}
          <p className="text-lg font-bold">₹{product.price.toLocaleString('en-IN')}</p>
          {variant === "category" && <p className="text-sm text-muted-foreground">{product.category}</p>}
          {variant === "upcoming" && product.launchDate && (
            <p className="text-xs text-muted-foreground">Launches: {product.launchDate}</p>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}
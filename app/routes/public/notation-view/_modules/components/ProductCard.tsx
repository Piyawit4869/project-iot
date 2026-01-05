import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  calculateDiscountPercent,
  getStatusBadgeVariant,
  getStatusLabel,
  isProductAddToCartDisabled,
} from "../utils/productUtils";
import type { Product } from "../types/notation";

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
}: ProductCardProps) {
  const discountPercent = calculateDiscountPercent(
    product.price,
    product.comparePrice
  );
  const isAddToCartDisabled = isProductAddToCartDisabled(product.status);

  return (
    <Card className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border-0 bg-card">
      <div className="aspect-square relative overflow-hidden bg-muted/30">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}

        {discountPercent > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-2 left-2 rounded-xl text-xs font-medium"
          >
            -{discountPercent}%
          </Badge>
        )}

        <Badge
          variant={getStatusBadgeVariant(product.status)}
          className="absolute top-2 right-2 rounded-xl text-xs font-medium"
        >
          {getStatusLabel(product.status)}
        </Badge>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-medium text-sm leading-snug line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-lg">
            ฿{product.price.toFixed(2)}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-muted-foreground line-through">
              ฿{product.comparePrice.toFixed(2)}
            </span>
          )}
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs rounded-lg">
                {tag}
              </Badge>
            ))}
            {product.tags.length > 3 && (
              <Badge variant="outline" className="text-xs rounded-lg">
                +{product.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-xl text-xs"
            onClick={() => onViewDetails?.(product)}
          >
            View Details
          </Button>
          <Button
            size="sm"
            className="flex-1 rounded-xl text-xs"
            disabled={isAddToCartDisabled}
            onClick={() => onAddToCart?.(product)}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

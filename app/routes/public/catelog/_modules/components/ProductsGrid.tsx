import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface ProductsGridProps {
  products: Product[];
  onViewDetails?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductsGrid({
  products,
  onViewDetails,
  onAddToCart,
}: ProductsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

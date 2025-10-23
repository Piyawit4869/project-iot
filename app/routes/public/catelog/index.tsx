import { useState } from "react";
import { mockProducts } from "./_modules/data/mockProducts";
import { useProductFilters } from "./_modules/hooks/useProductFilters";
import { FilterPanel } from "./_modules/components/FilterPanel";
import { Toolbar } from "./_modules/components/ToolBar";
import { ProductsGrid } from "./_modules/components/ProductsGrid";
import { EmptyState } from "./_modules/components/EmptyState";
import { ProductsGridSkeleton } from "./_modules/components/ProductSkeleton";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  getStatusBadgeVariant,
  getStatusLabel,
  calculateDiscountPercent,
} from "./_modules/utils/productUtils";
import { toast } from "sonner";
import type { Product } from "./_modules/types/product";

export default function ShoppingPage() {
  const [isLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    queryState,
    updateQuery,
    filteredProducts,
    filterOptions,
    totalProducts,
    totalPages,
    currentPage,
  } = useProductFilters(mockProducts);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: Product) => {
    const toastId = toast.loading("Add Product to cart...");

    toast.success(`${product.name} has been added to your cart.`, {
      id: toastId,
    });
  };

  const handlePageChange = (page: number) => {
    updateQuery({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAllFilters = () => {
    updateQuery({
      q: undefined,
      category: undefined,
      priceMin: undefined,
      priceMax: undefined,
      status: undefined,
      attrs: undefined,
    });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return (
      <Pagination className="mt-8">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className="cursor-pointer"
              />
            </PaginationItem>
          )}

          {pages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className="cursor-pointer"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            แคตตาลอคสินค้า
          </h1>
          {/* <p className="text-muted-foreground">
            Discover our amazing collection of products
          </p> */}
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <FilterPanel
                queryState={queryState}
                filterOptions={filterOptions}
                onUpdateQuery={updateQuery}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Toolbar
              queryState={queryState}
              filterOptions={filterOptions}
              onUpdateQuery={updateQuery}
              totalProducts={totalProducts}
            />

            <div className="mt-6">
              {isLoading ? (
                <ProductsGridSkeleton />
              ) : filteredProducts.length > 0 ? (
                <>
                  <ProductsGrid
                    products={filteredProducts}
                    onViewDetails={handleViewDetails}
                    onAddToCart={handleAddToCart}
                  />
                  {renderPagination()}
                </>
              ) : (
                <EmptyState onAction={clearAllFilters} />
              )}
            </div>
          </div>
        </div>

        {/* Product Details Dialog */}
        <Dialog
          open={!!selectedProduct}
          onOpenChange={() => setSelectedProduct(null)}
        >
          {selectedProduct && (
            <DialogContent className="max-w-2xl rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {selectedProduct.name}
                </DialogTitle>
                <DialogDescription>
                  SKU: {selectedProduct.sku}
                </DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted/30">
                  {selectedProduct.imageUrl ? (
                    <img
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      ไม่มีรูปภาพ
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={getStatusBadgeVariant(selectedProduct.status)}
                      className="rounded-xl"
                    >
                      {getStatusLabel(selectedProduct.status)}
                    </Badge>
                    {calculateDiscountPercent(
                      selectedProduct.price,
                      selectedProduct.comparePrice
                    ) > 0 && (
                      <Badge variant="destructive" className="rounded-xl">
                        -
                        {calculateDiscountPercent(
                          selectedProduct.price,
                          selectedProduct.comparePrice
                        )}
                        % OFF
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold">
                        ฿{selectedProduct.price.toFixed(2)}
                      </span>
                      {selectedProduct.comparePrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ฿{selectedProduct.comparePrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {selectedProduct.category && (
                    <div>
                      <span className="text-sm font-medium">Category: </span>
                      <span className="text-sm text-muted-foreground capitalize">
                        {selectedProduct.category}
                      </span>
                    </div>
                  )}

                  {selectedProduct.attributes && (
                    <div className="space-y-2">
                      {selectedProduct.attributes.size && (
                        <div>
                          <span className="text-sm font-medium">
                            Available Sizes:{" "}
                          </span>
                          <div className="flex gap-1 mt-1">
                            {selectedProduct.attributes.size.map((size) => (
                              <Badge
                                key={size}
                                variant="outline"
                                className="rounded-lg"
                              >
                                {size.toUpperCase()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedProduct.attributes.color && (
                        <div>
                          <span className="text-sm font-medium">
                            Available Colors:{" "}
                          </span>
                          <div className="flex gap-1 mt-1">
                            {selectedProduct.attributes.color.map((color) => (
                              <Badge
                                key={color}
                                variant="outline"
                                className="rounded-lg"
                              >
                                {color.charAt(0).toUpperCase() + color.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedProduct.attributes.pattern && (
                        <div>
                          <span className="text-sm font-medium">
                            Patterns:{" "}
                          </span>
                          <div className="flex gap-1 mt-1">
                            {selectedProduct.attributes.pattern.map(
                              (pattern) => (
                                <Badge
                                  key={pattern}
                                  variant="outline"
                                  className="rounded-lg"
                                >
                                  {pattern.charAt(0).toUpperCase() +
                                    pattern.slice(1)}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Tags: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedProduct.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="rounded-lg"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full rounded-2xl"
                    onClick={() => handleAddToCart(selectedProduct)}
                    disabled={
                      selectedProduct.status === "out_of_stock" ||
                      selectedProduct.status === "discontinued"
                    }
                  >
                    เพิ่มเข้าตะกร้าสินค้า
                  </Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}

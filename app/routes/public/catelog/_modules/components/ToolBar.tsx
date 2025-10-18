import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Filter, Search } from "lucide-react";
import { FilterPanel } from "./FilterPanel";
import type { FilterOptions, ProductQueryState } from "../types/product";

interface ToolbarProps {
  queryState: ProductQueryState;
  filterOptions: FilterOptions;
  onUpdateQuery: (updates: Partial<ProductQueryState>) => void;
  totalProducts: number;
  children?: React.ReactNode; // For mobile filter panel
}

export function Toolbar({
  queryState,
  filterOptions,
  onUpdateQuery,
  totalProducts,
}: //   children,
ToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, SKU, or tags..."
              value={queryState.q || ""}
              onChange={(e) =>
                onUpdateQuery({ q: e.target.value || undefined })
              }
              className="pl-10 rounded-2xl bg-card border-0 shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile filter button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-2xl">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="p-6">
                  <FilterPanel
                    queryState={queryState}
                    filterOptions={filterOptions}
                    onUpdateQuery={onUpdateQuery}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Select
            value={queryState.sort || "new"}
            onValueChange={(value) =>
              onUpdateQuery({ sort: value as ProductQueryState["sort"] })
            }
          >
            <SelectTrigger className="w-48 rounded-2xl bg-card border-0 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Newest First</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {totalProducts} {totalProducts === 1 ? "product" : "products"} found
        </p>
      </div>
    </div>
  );
}

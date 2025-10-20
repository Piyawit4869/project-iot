export type ProductAvailabilityStatus =
  | "in_stock"
  | "out_of_stock"
  | "pending_restock"
  | "discontinued"
  | "reserved";

export interface Product {
  id: string;
  name: string;
  sku: string;
  imageUrl?: string;
  price: number;
  comparePrice?: number;
  status: ProductAvailabilityStatus;
  category?: string;
  tags?: string[];
  attributes?: {
    size?: string[];
    color?: string[];
    pattern?: string[];
  };
}

export interface ProductQueryState {
  q?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  status?: ProductAvailabilityStatus;
  attrs?: {
    size?: string[];
    color?: string[];
    pattern?: string[];
  };
  sort?: "new" | "price_asc" | "price_desc" | "popular";
  page?: number;
  pageSize?: number;
}

export interface FilterOptions {
  categories: string[];
  sizes: string[];
  colors: string[];
  patterns: string[];
  statuses: { value: ProductAvailabilityStatus; label: string }[];
}

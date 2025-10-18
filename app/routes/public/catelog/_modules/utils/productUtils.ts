import type { ProductAvailabilityStatus } from "../types/product";

export const calculateDiscountPercent = (
  price: number,
  comparePrice?: number
): number => {
  if (!comparePrice || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
};

export const getStatusBadgeVariant = (
  status: ProductAvailabilityStatus
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "in_stock":
      return "default";
    case "out_of_stock":
      return "destructive";
    case "pending_restock":
      return "secondary";
    case "discontinued":
      return "outline";
    case "reserved":
      return "secondary";
    default:
      return "default";
  }
};

export const getStatusLabel = (status: ProductAvailabilityStatus): string => {
  switch (status) {
    case "in_stock":
      return "In Stock";
    case "out_of_stock":
      return "Out of Stock";
    case "pending_restock":
      return "Pending Restock";
    case "discontinued":
      return "Discontinued";
    case "reserved":
      return "Reserved";
    default:
      return status;
  }
};

export const isProductAddToCartDisabled = (
  status: ProductAvailabilityStatus
): boolean => {
  return status === "out_of_stock" || status === "discontinued";
};

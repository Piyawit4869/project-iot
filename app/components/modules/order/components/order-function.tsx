import { useEffect, useState } from "react";
import type { ProductColumn } from "~/schemas/order/type";

export function calculateTotals(productsSelected: ProductColumn[]) {
  const Price = productsSelected.reduce(
    (sum, p) => sum + (p.salePrice || 0) * (p.quantity ?? 1),
    0
  );

  const totalVat = Price * 0.07;

  const totalWht = productsSelected.reduce(
    (sum, p) => sum + (p.wht || 0) * (p.quantity ?? 1),
    0
  );

  const totalDiscount = productsSelected.reduce(
    (sum, p) => sum + (p.discountPrice || 0) * (p.quantity ?? 1),
    0
  );

  const totalNet = Price + totalVat;

  const totalPrice = Price + totalVat - totalWht - totalDiscount;

  return { Price, totalVat, totalWht, totalDiscount, totalPrice, totalNet };
}

export function generateOrderNumber(): string {
  const now = new Date();

  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);

  const dateStr = `${dd}${mm}${yy}`;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomCode = "";
  for (let i = 0; i < 4; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `ORD${dateStr}-${randomCode}`;
}

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

import { useMemo, useCallback } from "react";
import type {
  FilterOptions,
  Product,
  ProductQueryState,
} from "../types/product";
import { useLocation, useNavigate, useSearchParams } from "react-router";

export const useProductFilters = (products: Product[]) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pathname = useLocation();

  // Parse URL params to query state
  const queryState = useMemo<ProductQueryState>(() => {
    const get = (k: string) => searchParams.get(k);

    const q = get("q") || undefined;
    const category = get("category") || undefined;
    const priceMin = get("priceMin") ? Number(get("priceMin")) : undefined;
    const priceMax = get("priceMax") ? Number(get("priceMax")) : undefined;
    const status = (get("status") as ProductQueryState["status"]) || undefined;
    const sort = (get("sort") as ProductQueryState["sort"]) || "new";
    const page = get("page") ? Number(get("page")) : 1;
    const pageSize = 12;

    const attrs: ProductQueryState["attrs"] = {};
    const sizeParam = get("size");
    if (sizeParam) attrs.size = sizeParam.split(",");
    const colorParam = get("color");
    if (colorParam) attrs.color = colorParam.split(",");
    const patternParam = get("pattern");
    if (patternParam) attrs.pattern = patternParam.split(",");

    return {
      q,
      category,
      priceMin,
      priceMax,
      status,
      attrs,
      sort,
      page,
      pageSize,
    };
  }, [searchParams]);

  // Update URL params (via next/navigation)
  const updateQuery = useCallback(
    (updates: Partial<ProductQueryState>) => {
      // Make a mutable copy
      const newParams = new URLSearchParams(searchParams?.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          // Remove param if empty/undefined
          if (key === "attrs") {
            ["size", "color", "pattern"].forEach((attrKey) =>
              newParams.delete(attrKey)
            );
          } else {
            newParams.delete(key);
          }
          return;
        }

        if (key === "attrs" && typeof value === "object") {
          const attrs = value as ProductQueryState["attrs"];
          ["size", "color", "pattern"].forEach((attrKey) => {
            const attrValue = attrs?.[attrKey as keyof typeof attrs];
            if (attrValue && attrValue.length > 0) {
              newParams.set(attrKey, attrValue.join(","));
            } else {
              newParams.delete(attrKey);
            }
          });
        } else {
          newParams.set(key, String(value));
        }
      });

      // Reset to page 1 unless explicitly changing page
      if (!("page" in updates)) {
        newParams.set("page", "1");
      }

      // Replace current URL without scrolling
      const qs = newParams.toString();
      navigate(qs ? `${pathname}?${qs}` : pathname, {
        preventScrollReset: true,
      });
    },
    [searchParams, navigate, pathname]
  );

  // Filter + sort
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Text search
    if (queryState.q) {
      const q = queryState.q.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (queryState.category) {
      filtered = filtered.filter((p) => p.category === queryState.category);
    }

    // Price range
    if (queryState.priceMin !== undefined) {
      filtered = filtered.filter((p) => p.price >= queryState.priceMin!);
    }
    if (queryState.priceMax !== undefined) {
      filtered = filtered.filter((p) => p.price <= queryState.priceMax!);
    }

    // Status
    if (queryState.status) {
      filtered = filtered.filter((p) => p.status === queryState.status);
    }

    // Attributes
    if (queryState.attrs) {
      const { size, color, pattern } = queryState.attrs;

      if (size?.length) {
        filtered = filtered.filter((p) =>
          p.attributes?.size?.some((s) => size.includes(s))
        );
      }
      if (color?.length) {
        filtered = filtered.filter((p) =>
          p.attributes?.color?.some((c) => color.includes(c))
        );
      }
      if (pattern?.length) {
        filtered = filtered.filter((p) =>
          p.attributes?.pattern?.some((pt) => pattern.includes(pt))
        );
      }
    }

    // Sort
    switch (queryState.sort) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => {
          const score = (s: Product["status"]) => (s === "in_stock" ? 1 : 0);
          return score(b.status) - score(a.status);
        });
        break;
      case "new":
      default:
        // keep original order (assumed newest first)
        break;
    }

    return filtered;
  }, [products, queryState]);

  // Pagination slice
  const paginatedProducts = useMemo(() => {
    const { page = 1, pageSize = 12 } = queryState;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filteredAndSortedProducts.slice(start, end);
  }, [filteredAndSortedProducts, queryState]);

  // Build filter options for UI
  const filterOptions = useMemo<FilterOptions>(() => {
    const categories = [
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ] as string[];

    const sizes = [
      ...new Set(products.flatMap((p) => p.attributes?.size || [])),
    ];
    const colors = [
      ...new Set(products.flatMap((p) => p.attributes?.color || [])),
    ];
    const patterns = [
      ...new Set(products.flatMap((p) => p.attributes?.pattern || [])),
    ];

    const statuses = [
      { value: "in_stock" as const, label: "In Stock" },
      { value: "out_of_stock" as const, label: "Out of Stock" },
      { value: "pending_restock" as const, label: "Pending Restock" },
      { value: "discontinued" as const, label: "Discontinued" },
      { value: "reserved" as const, label: "Reserved" },
    ];

    return { categories, sizes, colors, patterns, statuses };
  }, [products]);

  // Pagination meta
  const totalProducts = filteredAndSortedProducts.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalProducts / (queryState.pageSize || 12))
  );
  const currentPage = queryState.page || 1;

  return {
    queryState,
    updateQuery,
    filteredProducts: paginatedProducts,
    filterOptions,
    totalProducts,
    totalPages,
    currentPage,
  };
};

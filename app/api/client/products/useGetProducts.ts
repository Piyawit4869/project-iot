import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { type SortingState } from "@tanstack/react-table";
import {
  fetchCreateProducts,
  fetchDeleteProducts,
  fetchGetProducts,
  fetchProduct,
  fetchProducts,
  fetchProductsSummary,
  fetchUpdateProducts,
} from "~/api/server/products/products";
import type { Product } from "~/schemas/product/product";

export const useProductPaginate = ({
  pageIndex,
  pageSize,
  sorting,
  status = "",
  limit,
  sku,
  name,
  barcode,
  available,
  availableForSale,
  matType,
  salePrice,
  vatPrice,
  createdBy,
  updatedBy,
  // createdAt,
  // updatedAt,
  createdFrom,
  createdTo,
  updatedFrom,
  updatedTo,
}: {
  pageIndex: number;
  pageSize: number;
  sorting: SortingState;
  status?: string;
  limit: number;
  sku?: string;
  name?: string;
  barcode?: string;
  available?: number;
  availableForSale?: number;
  matType?: string;
  salePrice?: number;
  vatPrice?: number;
  createdBy?: string;
  updatedBy?: string;
  // createdAt?: string;
  // updatedAt?: string;
  createdFrom?: string;
  createdTo?: string;
  updatedFrom?: string;
  updatedTo?: string;
}) => {
  return useQuery({
    queryKey: [
      "product-paginate",
      sorting,
      pageIndex,
      pageSize,
      status,
      limit,
      sku,
      name,
      barcode,
      available,
      availableForSale,
      matType,
      salePrice,
      vatPrice,
      createdBy,
      updatedBy,
      createdFrom,
      createdTo,
      updatedFrom,
      updatedTo,
    ],
    queryFn: () =>
      fetchProduct({
        page: pageIndex,
        limit: pageSize,
        sorting,
        status,
        sku,
        name,
        barcode,
        available,
        availableForSale,
        matType,
        salePrice,
        vatPrice,
        createdBy,
        updatedBy,
        createdFrom,
        createdTo,
        updatedFrom,
        updatedTo,
      } as any),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize,
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products-all"],
    queryFn: () => fetchProducts({}),
    placeholderData: keepPreviousData,
  });
};

export const useProductsWithEnable = ({
  enabled = true,
}: {
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["products-all"],
    queryFn: () => fetchProducts({}),
    placeholderData: keepPreviousData,
    enabled: enabled,
  });
};

export const useGetProducts = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchGetProducts(id),
    enabled: !!id,
  });
};

export const useCreateProducts = () => {
  return useMutation({
    mutationFn: (values: Product) => fetchCreateProducts(values),
  });
};

export const useUpdateProducts = (id: string) => {
  return useMutation({
    mutationFn: (values: Product) => fetchUpdateProducts(id, values),
  });
};

export const useDeleteProducts = () => {
  return useMutation({
    mutationFn: (id: string) => fetchDeleteProducts(id),
  });
};

export const useAllProductsSummary = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: () => fetchProductsSummary(),
    enabled: true,
  });
};

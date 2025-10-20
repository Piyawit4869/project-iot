import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  createInventory,
  deleteInventory,
  fetchInventorysSummary,
  getInventories,
  getInventory,
  getInventoryPaginate,
  updateInventory,
} from "~/api/server/inventories/inventories";

export const usePaginate = ({
  pageIndex,
  pageSize,
  status = "",
  limit,
  name,
  productCount,
  productCanSale,
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
  status: string;
  limit: number;
  name?: string;
  productCount?: string;
  productCanSale?: string;
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
      "paginate",
      pageIndex,
      pageSize,
      status,
      limit,
      name,
      productCount,
      productCanSale,
      createdBy,
      updatedBy,
      createdFrom,
      createdTo,
      updatedFrom,
      updatedTo,
    ],
    queryFn: () =>
      getInventoryPaginate({
        page: pageIndex,
        limit: pageSize,
        status: status,
        name,
        productCount,
        productCanSale,
        createdBy,
        updatedBy,
        createdFrom,
        createdTo,
        updatedFrom,
        updatedTo,
      }),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize,
  });
};

export const useInventories = () => {
  return useQuery({
    queryKey: ["get-inventories"],
    queryFn: () => getInventories(),
  });
};

export const useInventory = (id: string) => {
  return useQuery({
    queryKey: ["get-inventory", id],
    queryFn: () => getInventory(id),
    enabled: !!id,
  });
};

export const useCreateInventory = () => {
  return useMutation({
    mutationFn: (body: object) => createInventory(body),
  });
};

export const useUpdateInventory = (id: string) => {
  return useMutation({
    mutationFn: (body: object) => updateInventory(id, body),
  });
};

export const useDeleteInventory = () => {
  return useMutation({
    mutationFn: (id: string) => deleteInventory(id),
  });
};

export const useAllInventorysSummary = () => {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: () => fetchInventorysSummary(),
    enabled: true,
  });
};

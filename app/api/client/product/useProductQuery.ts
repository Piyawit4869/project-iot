import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductPaginate,
  getProducts,
  updateProduct,
} from "~/api/server/product/productApi";

export const usePaginate = ({
  pageIndex,
  pageSize,
  name,
}: {
  pageIndex: number;
  pageSize: number;
  name?: string;
}) => {
  return useQuery({
    queryKey: ["paginate", pageIndex, pageSize, name],
    queryFn: () =>
      getProductPaginate({ page: pageIndex, limit: pageSize, name: name }),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["get-material", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["get-products"],
    queryFn: () => getProducts(),
  });
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["get-products"],
    queryFn: () => getProducts(),
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (body: object) => createProduct(body),
  });
};

export const useUpdateProduct = (id: string) => {
  return useMutation({
    mutationFn: (body: object) => updateProduct(id, body),
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
  });
};

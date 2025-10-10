import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  getCategoryPaginate,
  updateCategory,
} from "~/api/server/categories/categories";

export const usePaginate = ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["paginate", pageIndex, pageSize],
    queryFn: () => getCategoryPaginate({ page: pageIndex, limit: pageSize }),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["get-categories"],
    queryFn: () => getCategories(),
    placeholderData: keepPreviousData,
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["get-category", id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (body: object) => createCategory(body),
  });
};

export const useUpdateCategory = (id: string) => {
  return useMutation({
    mutationFn: (body: object) => updateCategory(id, body),
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
  });
};

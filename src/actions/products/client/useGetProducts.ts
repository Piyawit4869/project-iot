import { useSession } from "next-auth/react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchCreateProducts,
  fetchDeleteProducts,
  fetchGetProducts,
  fetchMe,
  fetchProducts,
  fetchUpdateProducts,
} from "../server/products";
import { ProductsFormValues } from "@/schemas/products/product";

export const useGetMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

export const usePaginate = ({
  pageIndex,
  pageSize = 10,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useQuery({
    queryKey: ["paginate", pageIndex, pageSize],
    queryFn: () =>
      fetchProducts({ page: pageIndex, itemsPerPage: pageSize }, accessToken),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize && !!accessToken,
  });
};

export const useGetProducts = (id: string) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchGetProducts(id, accessToken),
    enabled: !!id && !!accessToken,
  });
};

export const useCreateProducts = () => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (values: ProductsFormValues) =>
      fetchCreateProducts(values, accessToken),
  });
};

export const useUpdateProducts = (id: string) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (values: ProductsFormValues) =>
      fetchUpdateProducts(id, accessToken, values),
  });
};

export const useDeleteProducts = () => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (id: string) => fetchDeleteProducts(id, accessToken),
  });
};

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: fetchMe,
  });

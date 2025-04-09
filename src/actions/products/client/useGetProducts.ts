import { useSession } from "next-auth/react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchMe,
  fetchProducts,
  fetchCreateProducts,
} from "../server/products";
import { CreateFormValues } from "@/schemas/products/create";

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

export const useCreateProduct = () => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (values: CreateFormValues) =>
      fetchCreateProducts(values, accessToken),
  });
};

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: fetchMe,
  });

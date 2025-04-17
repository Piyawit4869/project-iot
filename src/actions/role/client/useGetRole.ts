import { useSession } from "next-auth/react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { RoleFormValues } from "@/schemas/role/role";
import {
  fetchCreateRole,
  fetchDeleteRole,
  fetchGetRole,
  fetchMe,
  fetchRole,
  fetchUpdateRole,
} from "../server/role";

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
      fetchRole({ page: pageIndex, itemsPerPage: pageSize }, accessToken),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize && !!accessToken,
  });
};

export const useGetRole = (id: string) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useQuery({
    queryKey: ["role", id],
    queryFn: () => fetchGetRole(id, accessToken),
    enabled: !!id && !!accessToken,
  });
};

export const useCreateRole = () => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (values: RoleFormValues) =>
      fetchCreateRole(values, accessToken),
  });
};

export const useUpdateRole = (id: string) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (values: RoleFormValues) =>
      fetchUpdateRole(id, accessToken, values),
  });
};

export const useDeleteRole = () => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (id: string) => fetchDeleteRole(id, accessToken),
  });
};

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: fetchMe,
  });

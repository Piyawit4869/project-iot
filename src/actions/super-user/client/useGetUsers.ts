import { useSession } from "next-auth/react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchCreateUsers,
  fetchDeleteUsers,
  fetchGetUsers,
  fetchMe,
  fetchUpdateUsers,
  fetchUsers,
} from "../server/user";
import { super_UsersFormValues } from "@/schemas/super-users/users";

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
      fetchUsers({ page: pageIndex, itemsPerPage: pageSize }, accessToken),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize && !!accessToken,
  });
};

export const useGetUsers = (id: string) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchGetUsers(id, accessToken),
    enabled: !!id && !!accessToken,
  });
};

export const useCreateUsers = () => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (values: super_UsersFormValues) =>
      fetchCreateUsers(values, accessToken),
  });
};

export const useUpdateUsers = (id: string) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (values: super_UsersFormValues) =>
      fetchUpdateUsers(id, accessToken, values),
  });
};

export const useDeleteUsers = () => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (id: string) => fetchDeleteUsers(id, accessToken),
  });
};

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: fetchMe,
  });

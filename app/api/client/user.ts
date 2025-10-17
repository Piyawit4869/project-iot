import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchChangePassword,
  fetchCreateUser,
  fetchDeleteUsers,
  fetchGetAllUsers,
  fetchUserById,
  fetchUpdateUsers,
  fetchUserPagination,
  fetchGetAllUsersLimit,
  fetchGetAllDepartments,
  fetchUserSummary,
} from "../server/user";
import type { UsersFormValues } from "~/schemas/users/user";
import type { PasswordFormValues } from "~/schemas/users/password-user";

export const usePaginate = ({
  pageIndex,
  status = "",
  limit,
  name,
}: {
  pageIndex: number;
  status?: string;
  limit: number;
  name?: string;
}) => {
  return useQuery({
    queryKey: ["paginate", pageIndex, status, limit, name],
    queryFn: () =>
      fetchUserPagination({
        page: pageIndex,
        status: status,
        limit: limit,
        name: name,
      }),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex,
  });
};

export const useGetUsers = (id: string) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });

export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["user-all"],
    queryFn: () => fetchGetAllUsers(),
  });

export const useGetAllUsersLimit = (isAll: boolean) =>
  useQuery({
    queryKey: ["user-all"],
    queryFn: () => fetchGetAllUsersLimit({ isAll }),
  });

export const useCreateUsers = () => {
  return useMutation({
    mutationFn: (values: UsersFormValues) => fetchCreateUser(values),
  });
};

export const useUpdateUsers = (id: string) => {
  return useMutation({
    mutationFn: (values: UsersFormValues) => fetchUpdateUsers(id, values),
  });
};

export const useChangePassword = (id: string) => {
  return useMutation({
    mutationFn: (values: PasswordFormValues) => fetchChangePassword(id, values),
  });
};

export const useDeleteUsers = () => {
  return useMutation({
    mutationFn: (id: string) => fetchDeleteUsers(id),
  });
};

export const useGetAllDepartments = (isAll: boolean) =>
  useQuery({
    queryKey: ["user-all"],
    queryFn: () => fetchGetAllDepartments({ isAll }),
  });

export const useAllUserSummary = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: () => fetchUserSummary(),
    enabled: true,
  });
};

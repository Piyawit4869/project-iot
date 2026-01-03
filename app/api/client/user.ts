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
  fetchSearchUserOrgs,
  fetchSearchUserBranches,
  changeActiveOrg,
  checkUserEmailDuplicate,
  fetchGetSearchlUsers,
} from "../server/user";
import type { UsersFormValues } from "~/schemas/users/user";
import type { PasswordFormValues } from "~/schemas/users/password-user";
import { getCurrentMe, getMe } from "../server/auth";
import { fetchUserPersonalSummary } from "../server/customer/user";

export const usePaginate = ({
  pageIndex,
  status = "",
  limit,
  userName,
  fullname,
  email,
  emId,
  active,
  phone,
  gender,
  createdBy,
  updatedBy,
  createdFrom,
  createdTo,
  updatedFrom,
  updatedTo,
}: {
  pageIndex: number;
  status?: string;
  limit: number;
  userName?: string;
  fullname?: string;
  email?: string;
  emId?: string;
  active?: boolean;
  phone?: string;
  gender?: number;
  createdBy?: string;
  updatedBy?: string;
  createdFrom?: string;
  createdTo?: string;
  updatedFrom?: string;
  updatedTo?: string;
}) => {
  return useQuery({
    queryKey: [
      "paginate",
      pageIndex,
      status,
      limit,
      userName,
      fullname,
      email,
      emId,
      active,
      phone,
      gender,
      createdBy,
      updatedBy,
      createdFrom,
      createdTo,
      updatedFrom,
      updatedTo,
    ],
    queryFn: () =>
      fetchUserPagination({
        page: pageIndex,
        status: status,
        limit: limit,
        userName,
        fullname,
        email,
        emId,
        active,
        phone,
        gender,
        createdBy,
        updatedBy,
        createdFrom,
        createdTo,
        updatedFrom,
        updatedTo,
      }),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex,
  });
};

export const useGetMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: () => getCurrentMe(),
  });

export const useGetUsers = (id: string) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
export const useGetUsersPersonalSummary = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: ["user-personality", userId],
    queryFn: () => fetchUserPersonalSummary(userId),
    enabled: enabled && !!userId,
  });
};

export const useGetAllUsers = (role?: string | null) =>
  useQuery({
    queryKey: ["user-all"],
    queryFn: () => fetchGetAllUsers({ role }),
  });

export const useGetAllUsersLimit = (isAll: boolean) =>
  useQuery({
    queryKey: ["user-all"],
    queryFn: () => fetchGetAllUsersLimit({ isAll }),
    enabled: !!isAll,
  });

export const useGetSearchUsers = (search?: string) =>
  useQuery({
    queryKey: ["user-search", search],
    queryFn: () => fetchGetSearchlUsers({ search }),
    enabled: true,
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

export const useSearchUserOrgs = (search?: string) => {
  return useQuery({
    queryKey: ["get-orgs", search],
    queryFn: () => fetchSearchUserOrgs(search),
    enabled: true,
  });
};

export const useGetUserBranches = (groupId: string, search?: string) => {
  return useQuery({
    queryKey: ["get-org-branches", search, groupId],
    queryFn: () => fetchSearchUserBranches(groupId, search),
    enabled: !!groupId,
  });
};

export const useChangeActiveOrg = (userId: string) => {
  return useMutation({
    mutationFn: (payload: { organizationId: string }) =>
      changeActiveOrg(userId, payload),
  });
};

export const useCheckUserEmailDuplicate = () => {
  return useMutation({
    mutationFn: (payload: { email: string }) =>
      checkUserEmailDuplicate(payload),
  });
};

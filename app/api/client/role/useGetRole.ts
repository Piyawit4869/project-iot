import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import type { UsersFormValues } from "~/schemas/users/user";
import type { PasswordFormValues } from "~/schemas/users/password-user";
import {
  fetchCreateRoles,
  fetchGrantUsers,
  fetchRolesById,
  fetchRolesPagination,
  fetchUpdateRoles,
} from "~/api/server/role/role";
import type { RolesFormValues } from "~/schemas/roles/roles";

export const usePaginate = ({
  pageIndex,
  limit,
  name,
  description,
}: {
  pageIndex: number;
  limit: number;
  name: string;
  description: string;
}) => {
  return useQuery({
    queryKey: ["paginate", pageIndex, limit, name, description],
    queryFn: () =>
      fetchRolesPagination({
        page: pageIndex,
        limit: limit,
        name,
        description,
      }),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex,
  });
};

export const useGetRoles = (id: string) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchRolesById(id),
    enabled: !!id,
  });

export const useCreateRoles = () => {
  return useMutation({
    mutationFn: (values: RolesFormValues) => fetchCreateRoles(values),
  });
};

export const useUpdateRoles = (id: string) => {
  return useMutation({
    mutationFn: (values: RolesFormValues) => fetchUpdateRoles(id, values),
  });
};

export const useGrantUsers = (id: string) => {
  return useMutation({
    mutationFn: (values: { userIds: string[] }) => fetchGrantUsers(id, values),
  });
};

// export const useChangePassword = (id: string) => {
//   return useMutation({
//     mutationFn: (values: PasswordFormValues) => fetchChangePassword(id, values),
//   });
// };

// export const useDeleteUsers = () => {
//   return useMutation({
//     mutationFn: (id: string) => fetchDeleteUsers(id),
//   });
// };

// export const useGetAllDepartments = (isAll: boolean) =>
//   useQuery({
//     queryKey: ["user-all"],
//     queryFn: () => fetchGetAllDepartments({ isAll }),
//   });

// export const useAllUserSummary = () => {
//   return useQuery({
//     queryKey: ["contacts"],
//     queryFn: () => fetchUserSummary(),
//     enabled: true,
//   });
// };

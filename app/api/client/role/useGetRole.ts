import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import type { UsersFormValues } from "~/schemas/users/user";
import type { PasswordFormValues } from "~/schemas/users/password-user";
import { fetchCreateRoles, fetchRolesPagination } from "~/api/server/role/role";
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

// export const useGetUsers = (id: string) =>
//   useQuery({
//     queryKey: ["user", id],
//     queryFn: () => fetchUserById(id),
//     enabled: !!id,
//   });

// export const useGetAllUsers = () =>
//   useQuery({
//     queryKey: ["user-all"],
//     queryFn: () => fetchGetAllUsers(),
//   });

// export const useGetAllUsersLimit = (isAll: boolean) =>
//   useQuery({
//     queryKey: ["user-all"],
//     queryFn: () => fetchGetAllUsersLimit({ isAll }),
//   });

export const useCreateRoles = () => {
  return useMutation({
    mutationFn: (values: RolesFormValues) => fetchCreateRoles(values),
  });
};

// export const useUpdateUsers = (id: string) => {
//   return useMutation({
//     mutationFn: (values: UsersFormValues) => fetchUpdateUsers(id, values),
//   });
// };

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

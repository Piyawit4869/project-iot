import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
  checkUserNameDuplicate,
  fetchLogsPagination,
  fetchFacesPagination,
  deleteFace,
} from "../server/user";
import type { UsersFormValues } from "~/schemas/users/user";
import type { PasswordFormValues } from "~/schemas/users/password-user";
import { getCurrentMe } from "../server/auth";

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

export const useLogsTableQuery = ({
  pageIndex,
  pageSize,
  sorting,
  name,
  ok,
  trigger,
}: {
  pageIndex: number;
  pageSize: number;
  sorting: any;
  name?: string;
  ok?: boolean;
  trigger?: string;
}) => {
  return useQuery({
    queryKey: ["logs", pageIndex, pageSize, sorting, name, ok, trigger],
    queryFn: async () => {
      const res = await fetchLogsPagination({
        page: pageIndex,
        limit: pageSize,
        name,
        ok,
        trigger,
        token: "supersecret",
      });

      return {
        items: res.data,
        meta: {
          totalItems: res.total,
          totalPages: Math.ceil(res.total / pageSize),
        },
      };
    },
    placeholderData: keepPreviousData,
  });
};

export const useFacesTableQuery = ({
  pageIndex,
  pageSize,
  name,
}: {
  pageIndex: number;
  pageSize: number;
  name?: string;
}) => {
  return useQuery({
    queryKey: ["faces", pageIndex, pageSize, name],
    queryFn: async () => {
      const res = await fetchFacesPagination({
        page: pageIndex,
        limit: pageSize,
        name,
        token: "supersecret",
      });

      return {
        items: res.data,
        meta: {
          totalItems: res.total,
          totalPages: Math.ceil(res.total / pageSize),
        },
      };
    },
    placeholderData: keepPreviousData,
  });
};

export const useDeleteFace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFace,
    onSuccess: () => {
      // รีเฟรช DataTable
      queryClient.invalidateQueries({
        queryKey: ["faces"],
      });
    },
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

export const useCheckUserNameDuplicate = () => {
  return useMutation({
    mutationFn: (payload: { username: string }) =>
      checkUserNameDuplicate(payload),
  });
};

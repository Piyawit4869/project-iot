"use server";

import type { UsersFormValues } from "~/schemas/users/user";
import type { PasswordFormValues } from "~/schemas/users/password-user";
import { ApiConfig } from "~/api/config";
import type { RolesFormValues } from "~/schemas/roles/roles";

export const fetchRolesPagination = async (params: {
  page: number;
  limit: number;
  name: string;
  description: string;
}) => {
  try {
    const p = { ...params } as any;

    const res = await ApiConfig.get(`/crud/organization-roles`, {
      params: p,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchRolesById = async (id: string) => {
  try {
    const { data } = await ApiConfig.get(`/crud/organization-roles/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchCreateRoles = async (payload: RolesFormValues) => {
  try {
    const { data } = await ApiConfig.post(
      `/crud/organization-roles/create`,
      payload
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchUpdateRoles = async (
  id: string,
  payload: RolesFormValues
) => {
  try {
    const res = await ApiConfig.put(
      `/crud/organization-roles/${id}/edit`,
      payload
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

// export const fetchChangePassword = async (
//   id: string,
//   payload: PasswordFormValues
// ) => {
//   try {
//     const { data } = await ApiConfig.put(
//       `/crud/users/change-password/${id}`,
//       payload
//     );
//     return data;
//   } catch (error) {
//     return error;
//   }
// };

// export const fetchDeleteUsers = async (id: string) => {
//   try {
//     const { data } = await ApiConfig.delete(`/crud/users/delete/${id}`);
//     return data;
//   } catch (error) {
//     return error;
//   }
// };

// export const fetchGetAllDepartments = async (params: { isAll: boolean }) => {
//   try {
//     const { data } = await ApiConfig.get(`/crud/departments/`, {
//       params: {
//         isAll: params.isAll,
//       },
//     });

//     return data;
//   } catch (error) {
//     return error;
//   }
// };

// export const fetchUserSummary = async () => {
//   try {
//     const res = await ApiConfig.get(`/crud/users/status-summary`);

//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };

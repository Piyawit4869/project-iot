import { env } from "@/constants/common";
import { apiAxios } from "@/utils/axiosInterceptor";
import axios from "axios";

export const fetchMe = async () => {
  try {
    const res = await apiAxios.get("/auth/me");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUsers = async (
  params: {
    page: number;
    itemsPerPage: number;
  },
  accessToken: string
) => {
  try {
    const res = await axios.get(`${env.base_url}/crud/users`, {
      params: {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.res;
  } catch (error) {
    return error;
  }
};

export const fetchGetUsers = async (id: string, accessToken: string) => {
  try {
    const res = await axios.get(`${env.base_url}/crud/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCreateUsers = async (
  payload: {
    email: string;
    userName: string;
    password: string;
    status: string;
    roleId: string;
    employeeRoleId: string;
    profile: {
      prefix: string;
      firstName: string;
      lastName: string;
      firstNameTh: string;
      lastNameTh: string;
      birthDate: string;
      phone: string;
    };
  },
  accessToken: string | undefined
) => {
  try {
    const res = await axios.post(
      `${env.base_url}/crud/users/create`,
      {
        email: payload.email,
        userName: payload.userName,
        password: payload.password,
        status: "active",
        roleId: payload.roleId,
        employeeRoleId: payload.employeeRoleId,
        branchId: "d562a08e-a76a-4e00-9991-ca6a2228e62f",
        profile: {
          prefix: payload.profile.prefix,
          firstName: payload.profile.firstName,
          lastName: payload.profile.lastName,
          firstNameTh: payload.profile.firstNameTh,
          lastNameTh: payload.profile.lastNameTh,
          birthDate: payload.profile.birthDate,
          phone: payload.profile.phone,
        },
        feature: ["101", "103"],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUpdateUsers = async (
  id: string,
  accessToken: string,
  payload: {
    email: string;
    userName: string;
    password: string;
    status: string;
    roleId: string;
    employeeRoleId: string;
    profile: {
      prefix: string;
      firstName: string;
      lastName: string;
      firstNameTh: string;
      lastNameTh: string;
      birthDate: string;
      phone: string;
    };
  }
) => {
  try {
    const res = await axios.put(
      `${env.base_url}/crud/users/edit/${id}`,
      {
        email: payload.email,
        userName: payload.userName,
        password: payload.password,
        status: "active",
        roleId: payload.roleId,
        employeeRoleId: payload.employeeRoleId,
        branchId: "d562a08e-a76a-4e00-9991-ca6a2228e62f",
        profile: {
          prefix: payload.profile.prefix,
          firstName: payload.profile.firstName,
          lastName: payload.profile.lastName,
          firstNameTh: payload.profile.firstNameTh,
          lastNameTh: payload.profile.lastNameTh,
          birthDate: payload.profile.birthDate,
          phone: payload.profile.phone,
        },
        feature: ["101", "103"],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchDeleteUsers = async (id: string, accessToken: string) => {
  try {
    const res = await axios.delete(`${env.base_url}/crud/users/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const signin = async () => {
  const res = await apiAxios.get("/api/signin");
  return res.data;
};

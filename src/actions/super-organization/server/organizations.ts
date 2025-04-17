import { env } from "@/constants/common";
import { apiAxios } from "@/utils/axiosInterceptor";
import axios from "axios";
import {
  CreateOrganizationFormValues,
  up_OrganizationFormValues,
} from "@/schemas/super-organization/organization";

export const fetchMe = async () => {
  try {
    const res = await apiAxios.get("/auth/me");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchOrganization = async (
  params: {
    page: number;
    itemsPerPage: number;
  },
  accessToken: string
) => {
  try {
    const res = await axios.get(`${env.base_url}/admin/organizations/`, {
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

export const fetchCreateOrganization = async (
  payload: CreateOrganizationFormValues,
  accessToken: string | undefined
) => {
  try {
    const res = await axios.post(
      `${env.base_url}/admin/organizations`,
      payload,
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

export const fetchGetOrganization = async (id: string, accessToken: string) => {
  try {
    const { data: response } = await axios.get(
      `${env.base_url}/admin/organizations/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.res.data;
  } catch (error) {
    return error;
  }
};
export const fetchUpdateOrganization = async (
  id: string,
  accessToken: string,
  payload: up_OrganizationFormValues
) => {
  try {
    const res = await axios.put(
      `${env.base_url}/admin/organizations/${id}`,
      payload,
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

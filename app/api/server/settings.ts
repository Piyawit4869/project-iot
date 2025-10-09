import type {
  AddressSchemaValues,
  OrganizationFormValues,
  SettingSchemaValues,
} from "~/schemas/settings";
import { ApiConfig } from "../config";
import { generateOrganizationCode } from "~/utils/organization";

export const fetchGetOrganizations = async () => {
  try {
    const res = await ApiConfig.get(`/configurations/organizations/details`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateOrganization = async (
  id: string,
  payload: OrganizationFormValues,
  userId: string
) => {
  try {
    const body = {
      ...payload,
      userId: userId,
      code: generateOrganizationCode(id, payload.code),
      status: payload.status || undefined,
      type: payload.branchType || undefined,
    };

    const res = await ApiConfig.put(
      `/configurations/organizations/details/edit`,
      body
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateSettingAddress = async (
  payload: AddressSchemaValues
) => {
  try {
    const res = await ApiConfig.put(
      `/configurations/organizations/details/addresses/edit`,
      payload
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateSetting = async (payload: SettingSchemaValues) => {
  try {
    const res = await ApiConfig.put(
      `/configurations/organizations/details/settings/edit/`,
      payload
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchBranchPagination = async (params: {
  page: number;
  limit: number;
}) => {
  try {
    const res = await ApiConfig.get(`/configurations/branches/paginate`, {
      params: {
        page: params.page,
        limit: params.limit,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchBranchPagination,
  fetchGetOrganizations,
  fetchUpdateOrganization,
  fetchUpdateSetting,
  fetchUpdateSettingAddress,
} from "../server/settings";
import type {
  AddressSchemaValues,
  OrganizationFormValues,
  SettingSchemaValues,
} from "~/schemas/settings";

export const useGetOrganizations = () =>
  useQuery({
    queryKey: ["organization"],
    queryFn: () => fetchGetOrganizations(),
  });

export const useUpdateOrganization = (
  organizationId: string,
  userId: string
) => {
  return useMutation({
    mutationFn: (values: OrganizationFormValues) =>
      fetchUpdateOrganization(organizationId, values, userId),
  });
};

export const useUpdateAddress = (settingAddressId: string, userId: string) => {
  return useMutation({
    mutationFn: (values: AddressSchemaValues) =>
      fetchUpdateSettingAddress(values),
  });
};

export const useUpdateSettings = (settingId: string, userId: string) => {
  return useMutation({
    mutationFn: (values: SettingSchemaValues) => fetchUpdateSetting(values),
  });
};

export const usePaginateBranch = ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["paginate", pageIndex, pageSize],
    queryFn: () => fetchBranchPagination({ page: pageIndex, limit: pageSize }),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize,
  });
};

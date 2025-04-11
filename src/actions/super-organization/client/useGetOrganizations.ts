import { useSession } from "next-auth/react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchMe,
  fetchOrganization,
  fetchCreateOrganization,
  fetchUpdateOrganization,
  fetchGetOrganization,
} from "../server/organizations";
import {
  cre_OrganizationFormValues,
  up_OrganizationFormValues,
} from "@/schemas/super-organization/organization";

export const useGetMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

export const usePaginate = ({
  pageIndex,
  pageSize = 10,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useQuery({
    queryKey: ["paginate", pageIndex, pageSize],
    queryFn: () =>
      fetchOrganization(
        { page: pageIndex, itemsPerPage: pageSize },
        accessToken
      ),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize && !!accessToken,
  });
};
export const useCreateOrganization = () => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (values: cre_OrganizationFormValues) =>
      fetchCreateOrganization(values, accessToken),
  });
};

export const useGetOrganization = (id: string) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useQuery({
    queryKey: ["organization", id],
    queryFn: () => fetchGetOrganization(id, accessToken),
    enabled: !!id && !!accessToken,
  });
};

export const useUpdateOrganization = (id: string) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (values: up_OrganizationFormValues) =>
      fetchUpdateOrganization(id, accessToken, values),
  });
};

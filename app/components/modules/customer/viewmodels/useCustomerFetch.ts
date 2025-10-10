"use client";

import { useParams, useRouteLoaderData, useSearchParams } from "react-router";
import {
  useAllContactsByCustomer,
  useAllCustomer,
  useAllCustomerSummary,
  useCustomerPaginate,
} from "~/api/client/customer/useCustomer";

export const useCustomerFetch = () => {
  const { me: user } = useRouteLoaderData("root");
  const params = useParams();
  const id = params?.id as string;

  const {
    data: contacts,
    isLoading: loadContacts,
    refetch: refetchContacts,
  } = useAllContactsByCustomer(id);

  const {
    data: allCustomers,
    isLoading: loadCustomers,
    refetch: refetchCustomers,
  } = useAllCustomer();

  const { data, isLoading } = useAllCustomerSummary();

  return {
    me: user,
    contacts: contacts ?? [],
    refetchContacts,
    categories: data,
    loading: {
      me: user,
      loadContacts,
      loadCategories: isLoading,
    },

    allCustomers: allCustomers ?? [],
    loadingCustomers: loadCustomers,
    refetchCustomers,

    customerPagination: useCustomerPaginate,
  };
};

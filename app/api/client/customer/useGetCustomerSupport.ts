import { useMutation } from "@tanstack/react-query";
import {
  fetchCreateCustomerSupport,
  fetchDeleteCustomerSupport,
} from "../../server/customer/customerSupport";
import type { CustomerSupportFormValues } from "~/schemas/customer/support/support";

export const useCreateCustomerSupoort = (id: string) => {
  return useMutation({
    mutationFn: (values: CustomerSupportFormValues) =>
      fetchCreateCustomerSupport(id, values),
  });
};

export const useDeleteCustomerSupport = () => {
  return useMutation({
    mutationFn: (id: string) => fetchDeleteCustomerSupport(id),
  });
};

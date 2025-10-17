import { useMutation } from "@tanstack/react-query";
import {
  fetchCreateCustomerSupport,
  fetchDeleteCustomerSupport,
} from "../../server/customer/customerSupport";
import type { CustomerSupportFormValues } from "~/schemas/customer/support/support";

export const useCreateCustomerSupoort = () => {
  return useMutation({
    mutationFn: (values: CustomerSupportFormValues) =>
      fetchCreateCustomerSupport(values),
  });
};

export const useDeleteCustomerSupport = () => {
  return useMutation({
    mutationFn: (id: string) => fetchDeleteCustomerSupport(id),
  });
};

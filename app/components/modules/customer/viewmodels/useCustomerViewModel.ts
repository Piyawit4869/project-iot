import { useCustomerAction } from "./useCustomerAction";
import { useCustomerFetch } from "./useCustomerFetch";
import { useCustomerSetup } from "./useCustomerSetup";

export const useCustomerViewModel = () => {
  const customer = useCustomerFetch();
  const actions = useCustomerAction();
  const state = useCustomerSetup();

  return { ...customer, state, actions };
};

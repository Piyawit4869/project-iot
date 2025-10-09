import { useOrderAction } from "./useOrderAction";
import { useOrderFetch } from "./useOrderFetch";
import { useOrderSetup } from "./useOrderSetup";

export const useOrderViewModel = () => {
  const Orders = useOrderFetch();
  const actions = useOrderAction();
  const state = useOrderSetup();

  return { ...Orders, state, actions };
};

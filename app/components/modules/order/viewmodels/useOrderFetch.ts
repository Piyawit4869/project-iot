import { useParams, useRouteLoaderData } from "react-router";
import { useGetOrder, useOrdersPaginate } from "~/api/client/order/useGetOrder";

export const useOrderFetch = () => {
  const { me: user } = useRouteLoaderData("root");
  const params = useParams();
  const id = params?.id as string;

  const {
    data: order,
    isLoading: loadOrder,
    refetch: refetchOrder,
  } = useGetOrder(id);

  return {
    me: user,
    loading: {
      me: user,
    },
    order: order ?? [],
    loadingOrder: loadOrder,
    refetchOrder,
    orderPagination: useOrdersPaginate,
  };
};

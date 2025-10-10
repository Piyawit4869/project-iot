// import { GlobalModal } from "@/components/shared/modal/modal";

import { useNavigate, useParams } from "react-router";
import { useUpdateOrder } from "~/api/client/order/useGetOrder";
import type { OrderFormValues } from "~/schemas/order/order";

// import { toast } from "sonner";

export const useOrderAction = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id as string;

  const { mutate: update } = useUpdateOrder(id);

  const onUpdate = (values: OrderFormValues) => {
    if (!id) return;
    update(values, {
      onSuccess: () => {
        // success logic
      },
      onError: () => {
        // error logic
      },
    });
  };

  const onNavigateCreate = () => {
    navigate("/orders/create");
  };

  return {
    onUpdate,
    onNavigateCreate,
  };
};

import { useNavigate, useParams } from "react-router";
import { useFormInventoryAction } from "./useFormInventoryAction";
import { useFormInventorySetup } from "./useFormInventorySetup";

export const useInventoryViewModel = () => {
  const params = useParams<{ id: string }>();
  const formControl = useFormInventorySetup(params.id ?? "");
  const actions = useFormInventoryAction(params.id ?? "");

  return { ...formControl, actions };
};

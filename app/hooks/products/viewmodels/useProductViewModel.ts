import { useFormProductSetup } from "./useFormProductSetup";
import { useFormProductAction } from "./useFormProductAction";
import { useNavigate, useParams } from "react-router";

export const useProductViewModel = () => {
  const params = useParams<{ id: string }>();
  const router = useNavigate();
  const formControl = useFormProductSetup(params.id ?? "");
  const actions = useFormProductAction(params.id ?? "", router);

  return { ...formControl, actions, router };
};

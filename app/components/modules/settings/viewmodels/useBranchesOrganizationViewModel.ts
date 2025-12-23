import { useOrganizationAction } from "./useOrganizationAction";
// import { useOrganizationFetch } from "./useOrganizationFetch";
import { useOrganizationSetup } from "./useOrganizationSetup";

export const useBranchesOrganizationViewModel = () => {
  // const Organization = useOrganizationFetch();
  const actions = useOrganizationAction();
  const state = useOrganizationSetup();

  return { state, actions };
};

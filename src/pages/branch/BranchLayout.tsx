import { Outlet } from "react-router-dom";
import * as API from "@src/apis";

export async function branchLoader({ params }: any) {
  try {
    const { data } = await API.user.get(params.id);

    return { branch: data.data };
  } catch (error) {
    return { data: null };
  }
}

export const BranchLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

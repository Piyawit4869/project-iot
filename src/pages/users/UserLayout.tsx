import { Outlet } from "react-router-dom";
import * as API from "@src/apis";

export async function userLoader({ params }: any) {
  try {
    const { data } = await API.user.get(params.id);

    return { user: data.data };
  } catch (error) {
    return { data: null };
  }
}

export const UserLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

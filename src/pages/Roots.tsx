import * as API from "@src/apis";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

import { AuthContext } from "@contexts/AuthContext";
import { Spin } from "antd";
export async function RootLoader() {
  try {
    const me = await API.user.getMe();
    me.data.role = "super_admin";
    console.log(me);
    localStorage.setItem("me", JSON.stringify(me.data));
    return { me: me.data };
  } catch (e: any) {
    return redirect("/login");
  }
}

export const Root = () => {
  const { state } = useNavigation();
  const { me } = useLoaderData() as any;

  return (
    <AuthContext.Provider value={{ user: me }}>
      <Spin spinning={state === "loading" || state === "submitting"}>
        <Outlet />
      </Spin>
    </AuthContext.Provider>
  );
};

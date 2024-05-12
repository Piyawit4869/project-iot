import {
  Outlet,
  // , useNavigation
} from "react-router-dom";
// import { Spin } from "antd";

// import { AppLayout } from "@layout/AppLayout";
import { AuthContext } from "@contexts/AuthContext";

// export async function RootLoader() {
//   try {
//     const me = await API.user.getMe();
//     localStorage.setItem("me", JSON.stringify(me.data));
//     return { me: me.data };
//   } catch (e: any) {
//     return redirect("/login");
//   }
// }

export const Root = () => {
  // const { state } = useNavigation();

  // const { me } = useLoaderData() as any;
  // console.log(me);

  return (
    <AuthContext.Provider value={{ user: {} }}>
      {/* <AppLayout> */}
      {/* <Spin spinning={state === "loading" || state === "submitting"}> */}
      <Outlet />
      {/* </Spin> */}
      {/* </AppLayout> */}
    </AuthContext.Provider>
  );
};

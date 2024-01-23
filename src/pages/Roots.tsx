import {
  Outlet,
  // redirect,
  // useLoaderData,
  useNavigation,
} from "react-router-dom";
import { Spin, notification } from "antd";
import { AppLayout } from "@layout/AppLayout";

// import * as API from "../apis";
import { AuthContext } from "@contexts/AuthContext";

type NotificationType = "success" | "info" | "warning" | "error";

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
  const { state } = useNavigation();

  // const { me } = useLoaderData() as any;

  // console.log("---------------------------------");

  // console.log(me);

  const onResponse = (status: NotificationType, message: string) => {
    notification[status]({
      message: message,
      placement: "bottomLeft",
      duration: 5,
    });
  };

  return (
    <AuthContext.Provider value={{ onResponse }}>
      <AppLayout>
        <Spin spinning={state === "loading" || state === "submitting"}>
          <Outlet />
        </Spin>
      </AppLayout>
    </AuthContext.Provider>
  );
};

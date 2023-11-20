import { Outlet, useNavigation } from "react-router-dom";
import { Spin } from "antd";
import { UtotechLayout } from "../../layout/UtotechLayout";

export async function RootLoader() {}

export const UtotechRoot = () => {
  const { state } = useNavigation();

  return (
    <UtotechLayout>
      <Spin spinning={state === "loading" || state === "submitting"}>
        <Outlet />
      </Spin>
    </UtotechLayout>
  );
};

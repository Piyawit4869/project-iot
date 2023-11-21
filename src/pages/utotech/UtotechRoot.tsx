import { Outlet, useNavigation } from "react-router-dom";
import { ConfigProvider, Spin } from "antd";
import { UtotechLayout } from "../../layout/UtotechLayout";
import { theme } from "../../components/utotech/theme";

export async function RootLoader() {}

export const UtotechRoot = () => {
  const { state } = useNavigation();

  return (
    <ConfigProvider theme={theme}>
      <UtotechLayout>
        <Spin spinning={state === "loading" || state === "submitting"}>
          <Outlet />
        </Spin>
      </UtotechLayout>
    </ConfigProvider>
  );
};

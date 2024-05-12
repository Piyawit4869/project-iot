import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider } from "antd";

import { ThemeConfig } from "@styles/theme.ts";

import "@styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={ThemeConfig.ThemeColorsV2}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

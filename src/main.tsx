import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@styles/index.css";
import { ConfigProvider } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeConfig } from "@styles/theme.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ConfigProvider theme={ThemeConfig.ThemeColorsV2}>
        <App />
      </ConfigProvider>
    </DndProvider>
  </React.StrictMode>
);

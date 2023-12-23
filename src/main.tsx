import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@styles/index.css";
import { ConfigProvider } from "antd";
// import { ThemeColors } from "@src/styles/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ConfigProvider
			theme={{
				token: {
					colorLink: "#000308",
				},
				components: {
					Card: {
						colorBgContainer: "rgb(228, 111, 27)",
					},
				},
			}}
		>
			<App />
		</ConfigProvider>
	</React.StrictMode>
);

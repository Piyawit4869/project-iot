import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import mkcert from "vite-plugin-mkcert";

export default ({ mode }) => {
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      // https: true,
      port: 8080,
      // proxy: {
      //   "/api": {
      //     target: process.env.VITE_APP_API_BASE_URL,
      //     changeOrigin: true,
      //     secure: false,
      //   },
      // },
    },
    // plugins: [react(), mkcert()],

    // resolve: {
    //   alias: {
    //     src: "/src",
    //     components: "/src/components",
    //     assets: "/src/assets",
    //     apis: "/src/apis",
    //   },
    // },
    plugins: [react()],
  });
};
// https://vitejs.dev/config/

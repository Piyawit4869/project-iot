import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default () => {
  return defineConfig({
    server: {
      port: 8080,
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"),
        components: path.resolve(__dirname, "/src/components"),
        assets: path.resolve(__dirname, "/src/assets"),
        images: path.resolve(__dirname, "/src/assets/images"),
        apis: path.resolve(__dirname, "/src/apis"),
        contexts: path.resolve(__dirname, "/src/contexts"),
        forms: path.resolve(__dirname, "/src/forms"),
        layout: path.resolve(__dirname, "/src/layout"),
        pages: path.resolve(__dirname, "/src/pages"),
        styles: path.resolve(__dirname, "/src/styles"),
      },
    },
    plugins: [react()],
  });
};

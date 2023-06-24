import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // https: true,
    port: 8080,
  },
  // plugins: [react(), mkcert()],
  define: {
    "process.env": {},
  },
});

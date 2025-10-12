import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: { mode: any }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    define: {
      "import.meta.env.PUBLIC_API_URL": JSON.stringify(env.PUBLIC_API_URL),
      "import.meta.env.SESSION_SECRET": JSON.stringify(env.SESSION_SECRET),
      "import.meta.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
      "import.meta.env.BASE_URL": JSON.stringify(env.BASE_URL),
    },
  });
};

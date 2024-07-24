import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      port: 8080,
    },
    resolve: {
      alias: {
        '@src': '/src',
        '@components': '/src/components',
        '@assets': '/src/assets',
        '@contexts': '/src/contexts',
        '@layout': '/src/layout',
        '@styles': '/src/styles',
        '@utils': '/src/utils',
        '@forms': '/src/forms',
      },
    },
    plugins: [react()],
  });
};

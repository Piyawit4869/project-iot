/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Declare specific env vars you use, with the right type, or use the index signature for a more general approach
  readonly VITE_APP_API_BASE_URL?: string;
  // More environment variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

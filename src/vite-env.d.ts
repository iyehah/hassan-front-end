/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HF_API_BASE_URL: string;
  readonly VITE_HF_API_PROXY_PATH: string;
  readonly VITE_HF_API_ENDPOINT: string;
  readonly VITE_HF_MODEL: string;
  readonly VITE_HF_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_CMS_API_URL: string
  // add other VITE_ variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
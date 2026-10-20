/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public Web3Forms access key (safe to expose; it only allows sending to your inbox). */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

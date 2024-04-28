/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  // Add other environment variables here
}

// Extend the existing ImportMeta interface
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  VITE_APP_API_URL: string;
  VITE_STRIPE_PUBLISHABLE_KEY: string;
  // Add other environment variables here
}

// Extend the existing ImportMeta interface
interface ImportMeta {
  env: ImportMetaEnv;
}

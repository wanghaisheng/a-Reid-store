import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // define: {
  //   'import.meta.env': {
  //     VITE_APP_API_URL: JSON.stringify(process.env.VITE_APP_API_URL),
  //   },
  // },
  plugins: [react()],
  server: { port: 3000 },
});

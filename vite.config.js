import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add your absolute import aliases here
      "@components": "/src/components",
      "@utils": "/src/utils",
      // ...other aliases
    },
  },
});

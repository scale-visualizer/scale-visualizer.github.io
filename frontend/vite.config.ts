import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { config } from "./config";

const serverOptions = {
  port: config.port,
  host: true,
};

export default defineConfig({
  base: config.basePublicPath,
  plugins: [react()],
  preview: serverOptions,
  server: serverOptions,
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "@emotion/styled"],
          ui: ["@mui/material", "@mui/icons-material"],
        },
      },
    },
  },
});

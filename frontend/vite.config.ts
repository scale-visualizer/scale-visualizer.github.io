import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { config } from "./config";

const serverOptions = {
  port: config.port,
  host: true,
  allowedHosts: true as const,
};

export default defineConfig({
  base: config.basePublicPath,
  plugins: [react()],
  preview: serverOptions,
  server: serverOptions,
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("@emotion/styled")
          ) {
            return "vendor";
          }

          if (id.includes("@mui/material")) {
            return "ui";
          }
        },
      },
    },
  },
});

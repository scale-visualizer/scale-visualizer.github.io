import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { htmlInjectionPlugin } from "vite-plugin-html-injection";

import { config } from "./config";

const serverOptions = {
  port: config.port,
  host: true,
};

export default defineConfig({
  base: config.basePublicPath,
  plugins: [
    config.isDev &&
      htmlInjectionPlugin({
        injections: [
          {
            name: "React scan",
            path: "./react-scan.html",
            type: "raw",
            injectTo: "head",
          },
        ],
      }),
    react(),
  ],
  preview: serverOptions,
  server: serverOptions,
});

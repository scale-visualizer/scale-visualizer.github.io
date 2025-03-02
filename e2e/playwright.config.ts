import { defineConfig, devices } from "@playwright/test";
import { config } from "./config";

/**
 * @see https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  tsconfig: "./tsconfig.json",
  snapshotPathTemplate: "./snapshots/{testFilePath}/{projectName}/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: config.isCi,
  retries: config.isCi ? 2 : 0,
  timeout: 5000,
  workers: config.isCi ? 1 : undefined,
  reporter: [
    [
      "html",
      {
        open: config.isCi ? "never" : "always",
      },
    ],
  ],
  use: {
    baseURL: config.baseUrl,
    trace: "on-first-retry",
    screenshot: "on-first-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});

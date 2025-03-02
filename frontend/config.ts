import dotenv from "dotenv";

const env = {
  ...process.env,
} as Record<string, string>;

dotenv.config({
  path: "../.env",
  processEnv: env,
});

const FRONTEND_PORT = parseInt(env.FRONTEND_PORT || "");

export const config = {
  port: FRONTEND_PORT,
  isDev: env.NODE_ENV === "development",
  /**
   * @see .github/workflows/preview.yml
   */
  basePublicPath: env.STATIC_PATH,
};

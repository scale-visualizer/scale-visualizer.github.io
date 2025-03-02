import * as dotenv from "dotenv";

const env = {
  ...process.env,
} as Record<string, string>;

if (!env.CI) {
  dotenv.config({
    path: "../.env",
    processEnv: env,
  });
}

const BASE_URL = env.BASE_URL;
if (!BASE_URL) {
  throw new Error("BASE_URL is not specified");
}

export const config = {
  baseUrl: BASE_URL,
  isCi: Boolean(env.CI),
};

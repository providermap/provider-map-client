// Constants
export const env = process.env.NODE_ENV;
export const isDev = process.env.NODE_ENV !== "production";
export const isProd = process.env.NODE_ENV === "production";
export const envPrefix = isProd ? "prod" : "dev";
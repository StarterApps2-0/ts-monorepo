export enum Environment {
  PROD = "production",
  DEV = "development",
  LOCAL = "local",
}

export const getEnvironment = (): Environment => {
  const environment = process.env.NODE_ENV;
  if (environment === Environment.PROD) {
    return Environment.PROD;
  }
  if (environment === Environment.DEV) {
    return Environment.DEV;
  }
  return Environment.LOCAL;
};

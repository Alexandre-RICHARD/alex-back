export {};

declare global {
  namespace NodeJS {
    type ProcessEnv = {
      LOCAL_PORT: string;
      LOCAL_ADDRESS: string;
      CORS_ORIGIN: string;
    };
  }
}

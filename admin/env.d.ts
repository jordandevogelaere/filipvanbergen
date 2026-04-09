// Extend CloudflareEnv with our custom bindings
declare global {
  interface CloudflareEnv {
    DB: D1Database;
    IMAGES: R2Bucket;
    GITHUB_TOKEN: string;
    GITHUB_REPO: string;
    R2_PUBLIC_URL: string;
  }
}

export {};

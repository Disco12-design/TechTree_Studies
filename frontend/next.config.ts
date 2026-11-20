import type { NextConfig } from "next";

const backendOrigin =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, "") ??
  "http://localhost:5000";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://*.clerk.accounts.dev https://cdn.protect.clerk.com blob:",
              "script-src-elem 'self' 'unsafe-inline' https://challenges.cloudflare.com https://*.clerk.accounts.dev https://cdn.protect.clerk.com",
              "worker-src 'self' blob:",
              `connect-src 'self' ${backendOrigin} https://challenges.cloudflare.com https://*.challenges.cloudflare.com https://ca1.cloudflarecaptcha.com https://ca2.cloudflarecaptcha.com https://*.clerk.accounts.dev wss://*.clerk.accounts.dev https://clerk-telemetry.com`,
              "img-src 'self' data: https:",
              "style-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev",
              "font-src 'self' data: https:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

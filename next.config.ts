import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env : {
    API_BASE_URL : process.env.API_BASE_URL ?? "https://dev.naai.in",
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
};

export default nextConfig;

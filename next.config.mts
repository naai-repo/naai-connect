import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env : {
    API_BASE_URL : process.env.API_BASE_URL ?? "https://dev.naai.in",
    MAP_BOX_API_KEY : process.env.MAP_BOX_API_KEY ?? ""
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "naaibucket.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "assets.softr-files.com",
      },
    ],
    },
};

export default nextConfig;

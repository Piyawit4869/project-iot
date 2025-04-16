import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    domains: ["ui-avatars.com", "storage.googleapis.com", "example.com"],
  },
};

export default nextConfig;

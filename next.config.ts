import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  
  // Image optimization for production
  images: {
    unoptimized: false,
  },
}

export default nextConfig;

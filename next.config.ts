import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixes the WebSocket/HMR connection issue by allowing the project to accept requests from the local network IP.
  // @ts-ignore - Some versions of NextConfig types may not have this key yet but the runtime supports it.
  allowedDevOrigins: ['192.168.1.85', 'localhost:3000'],
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

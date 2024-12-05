import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Matches all paths under this domain
      },
    ],
  },
    typescript: {
    ignoreBuildErrors: true,
  },
};
export default nextConfig;

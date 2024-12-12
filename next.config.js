/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        // disableStaticImages: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,  // Disable ESLint during production builds
    },
  }
  
  module.exports = nextConfig;
  
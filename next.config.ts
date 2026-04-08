import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      { source: "/b2b", destination: "/empresa", permanent: true },
      { source: "/b2b/horeca", destination: "/horeca", permanent: true },
      { source: "/b2b/exportacion", destination: "/empresa/exportacion", permanent: true },
      { source: "/b2b/comeberries-comesano", destination: "/empresa/comeberries-comesano", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "i.redd.it", // 🔹 Agregado para permitir imágenes de Reddit
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"], // tambahkan domain ini biar gambar dari TMDB bisa dipakai
  },
};

export default nextConfig;

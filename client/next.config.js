/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/public/*",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/assets/*",
      },
    ],
  },
};

module.exports = nextConfig;

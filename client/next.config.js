/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp", "image/avif"], // specify preferred image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // specify device sizes for automatic resizing
    imageSizes: [16, 32, 48, 64, 96], // specify image sizes for automatic resizing
    loader: "default", // specify image loader, options: 'default', 'imgix', 'cloudinary', etc.
    placeholder: "empty", // specify image placeholder, options: 'empty', 'emptyImage', 'blurred', 'emptyDataUrl', etc.
    optimizeImages: true, // specify whether to disable image optimization
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

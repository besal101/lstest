/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  swcMinify: true,
  i18n,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "ciseco-reactjs.vercel.app",
      "cdn.lifesmile.ae",
      "picsum.photos",
      "placekitten.com",
    ],
  },
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     require("./scripts/sitemap-generator");
  //   }
  //   return config;
  // },
};

module.exports = nextConfig;

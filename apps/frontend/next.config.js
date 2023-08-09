/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
});

const { version } = require("./package.json");

module.exports = {
  publicRuntimeConfig: {
    version,
  },
};

module.exports = {
  plugins: ["tailwindcss"],
  extends: [
    "custom",
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  settings: {
    tailwindcss: {
      groupByResponsive: true,
      whitelist: [],
    },
  },
  root: true,
};

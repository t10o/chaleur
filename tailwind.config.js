const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*"],
  theme: {
    extend: {
      colors: {
        primary: "#1e90ff",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("not-last", "&:not(:last-child)");
      addVariant("not-first", "&:not(:first-child)");
    }),
  ],
};

import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "*.html"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    styled: true,
    themes: ["coffee"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ui-100": "#3A3A3A",
        "ui-200": "#1E1E1E",
        "ui-300": "#141414",
        "ui-400": "#0B0B0B",
        "ui-positive": "#4A734A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // include all your components and pages
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shine: "shine 1.2s linear infinite",
      },
    },
  },
  plugins: [],
};

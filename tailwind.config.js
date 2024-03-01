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
        'light-indigo-blue': '#b3c6ff', // Customize the color as needed
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [
    require('tailwindcss-filters'),
    require('@tailwindcss/forms'),
  ],
};

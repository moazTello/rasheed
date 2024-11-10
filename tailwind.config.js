/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // primary: "#4364F6",
        primary: "#532DF8",
        secondary: "#FDFEFE",
        brandGreen: "#51B279",
        brandViolet: "#3E2BF1",
        brandRed: "#D0352A",
        brandAzure: "#63C0B7",
        brandOrange: "#F4B85C",
        brandText: "#1C1C1E",
      },
    },
  },
  plugins: [],
};

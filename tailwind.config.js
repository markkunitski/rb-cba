/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      colors: {
        myred: 'rgb(var(--color-red) / <alpha-value>)',
        myblue: 'rgb(var(--color-blue) / <alpha-value>)',
      },
    },
  },
  plugins: [require("daisyui")],
}

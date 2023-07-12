/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '.625rem',
        xs: '.75rem',
        sm: '.875rem',
        regular: '15px',
        lg: '18px',
        xl: '26px',
        '2xl': '35px',
        '3xl': '40px',
        '4xl': '50px',
        '5xl': '70px',
      },
      colors: {
        'theme-c1': '#006c32',
        'theme-c1-b': '#6c8213',
        'theme-c2': '#000000',
        'theme-c3': '#ffffff',
      }
    },
  },
  plugins: [],
}

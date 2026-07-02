/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lagoon': '#0EA5B8',
        'crystal': '#E0F7FA',
        'sand': '#F5F0E8',
        'tropical': '#2D8C4A',
        'deep-navy': '#0C2D3F',
      },
      fontFamily: {
        'display': ['Playfair Display', 'VANITAS', 'serif'],
        'body': ['Lota Grotesque', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

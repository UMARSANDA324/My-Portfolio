/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        primary: '#3b82f6',
        accent: '#22c55e',
        slate: {
          900: '#0f172a',
          800: '#1e293b',
        },
      },
    },
  },
  plugins: [],
}

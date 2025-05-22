/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // For React projects
    "./pages/**/*.{js,jsx,ts,tsx}", // For Next.js projects
    "./components/**/*.{js,jsx,ts,tsx}", // Common component directory
    "./**/*.html",  // For plain HTML files
    // Add any other file patterns where you use Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
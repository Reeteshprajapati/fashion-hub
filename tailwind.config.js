/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dedicated luxury custom brand keys
        brand: {
          rose: "#EFA9BF",     // Medium Rose Pink Accent
          blush: "#F9CBD9",    // Soft blush pink
          ivory: "#FFF0E6",    // Soft warm ivory (secondary bg)
          linen: "#FFFDFB",    // Pure linen-ivory (primary bg)
          tan: "#E2A884",      // Sandy Tan / Camel Accent Highlight
          darktan: "#CD926D",  // Deeper tan
          clay: "#D8B6A8",     // Warm clay
          espresso: "#2E1C16", // Primary text (Obsidian Espresso)
          muted: "#A37E6F",    // Muted text
          border: "#EAD2C6",   // Standard border color
          surface: "#FFF5EF"   // Surface color
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Cinzel", "serif"],
      }
    },
  },
  plugins: [],
}

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "xs": "480px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)'],
        brand: ['var(--font-kodchasan)'],
      },
      colors: {
        'strive-primary': '#911CBE',
        'strive-light': '#B175D1',
        'strive-dark': '#6E0F94',
        'background': '#FFFFFF',
        'foreground': '#333333',
        'card': '#FFFFFF',
        'card-foreground': '#333333',
        'primary': '#911CBE',
        'primary-foreground': '#FFFFFF',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;

import type { Config } from 'tailwindcss';
const {nextui} = require("@nextui-org/react");

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    
    // NextUI 
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#19142a',
        secondary: '#A79DB4',
        foreground: 'var(--foreground)',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;

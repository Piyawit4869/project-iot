import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',

    // NextUI
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryFont: 'var(--primaryFont)',
        secondaryFont: 'var(--secondaryFont)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent1: 'var(--accent1)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
        foreground: 'var(--foreground)',
        headFont: 'var(--headFont)',
        whiteFont: 'var(--whiteFont)',
      },
    },
  },
  darkMode: 'selector',
  plugins: [nextui()],
} satisfies Config;

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
        primary: '#5555',
        secondary: '#5555',
        foreground: 'var(--foreground)',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
} satisfies Config;

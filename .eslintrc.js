module.exports = {
  parser: '@typescript-eslint/parser', // Use TypeScript parser
  extends: [
    'eslint:recommended',
    'next/core-web-vitals', // Next.js-specific rules
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json', // Path to your tsconfig.json
    tsconfigRootDir: __dirname, // Ensure correct root directory
    ecmaVersion: 2020, // Modern JavaScript
    sourceType: 'module', // Use ES Modules
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};

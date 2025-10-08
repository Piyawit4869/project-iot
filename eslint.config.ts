import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // ข้ามโฟลเดอร์ที่ไม่ต้องตรวจ
  {
    ignores: ["**/node_modules/**", ".react-router/**", "dist/**", "build/**"],
  },

  // ฐานสำหรับไฟล์ทุกชนิด
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    // ใช้ config พื้นฐานของ JS
    extends: [js.configs.recommended],
    plugins: {
      // react ใช้ผ่านบล็อกแยกด้านล่าง (configs.flat)
      // typescript-eslint ใช้ผ่านบล็อกแยกด้านล่าง (configs.recommended)
      "unused-imports": unusedImports,
    },
    rules: {
      // ตั้งตามสไตล์ Next.js ที่คุณต้องการ
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
    },
  },

  // เพิ่ม React แนะนำแบบ flat
  reactPlugin.configs.flat.recommended,

  // บล็อกสำหรับ TypeScript (รวม @typescript-eslint)
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    // ใช้ชุดกฎแนะนำของ @typescript-eslint
    extends: [
      ...tseslint.configs.recommended, // ถ้าต้องการ type-aware ใช้ recommendedTypeChecked และใส่ project ด้านล่าง
    ],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // ถ้าอยากให้เป็น type-aware ให้ปลดคอมเมนต์สองบรรทัดล่างนี้
        // project: ["./tsconfig.json"],
        // tsconfigRootDir: import.meta.dirname,
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    rules: {
      // สไตล์แบบ Next.js ที่ต้องการ
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

  // บล็อกเฉพาะ React/JSX เพิ่มเติม (ถ้าต้องการ)
  {
    files: ["**/*.{jsx,tsx}"],
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // ใส่กฎ React เพิ่มได้ เช่น:
      // "react/jsx-uses-react": "off", // ไม่จำเป็นกับ React 17+
      "react/react-in-jsx-scope": "off",
    },
  },
]);

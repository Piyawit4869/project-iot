// eslint.config.js (Flat Config)
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1) ข้ามโฟลเดอร์ที่ไม่ต้องตรวจ
  {
    ignores: ["**/node_modules/**", ".react-router/**", "dist/**", "build/**"],
  },

  // 2) ฐานสำหรับทุกไฟล์
  {
    files: ["**/*.{js,cjs,mjs,jsx,ts,tsx,mts,cts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
    },
    settings: {
      react: { version: "detect" },
    },
    // ฐานกฎของ JS
    extends: [js.configs.recommended],
    rules: {
      // เปิดเตือน "อิมพอร์ตไม่ได้ใช้" ให้เป็นเส้นเหลือง
      "unused-imports/no-unused-imports": "warn",

      // ป้องกันกรณีประกาศแต่ไม่ใช้ (ฝั่ง JS) ให้เตือนเป็นเส้นเหลือง
      // และยกเว้นตัวที่ตั้งชื่อขึ้นต้นด้วย "_" (รองรับ loader/action ของ React Router 7)
      "no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // React/Vite quality-of-life
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // 3) กฎสำหรับ TypeScript เพิ่มเติม (จะ override ของ JS แบบพอดีงาน TS)
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    // ชุดแนะนำของ @typescript-eslint (แบบ non-type-aware)
    extends: [...tseslint.configs.recommended],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // ถ้าต้องการ type-aware linting ให้ปลดคอมเมนต์ 2 บรรทัดล่างและติดตั้ง project references ให้พร้อม
        // project: ["./tsconfig.json"],
        // tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // ใช้กฎของ TS แทน base rule (เตือนเป็นเส้นเหลือง)

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // ยังเตือนอิมพอร์ตที่ไม่ได้ใช้
      "unused-imports/no-unused-imports": "warn",

      // ปิดข้อห้าม any (ปรับตามสไตล์ที่ต้องการได้)
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);

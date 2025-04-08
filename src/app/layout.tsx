/** @format */

import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";

// import "@/styles/global.css";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "ROME",
  description: "ROME Backoffice app",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      {/* { isAuth ? <AuthLayout/> :  <PublucLayout />  } */}

      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </Providers>
  );
}

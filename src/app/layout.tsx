import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'sonner';
import { Providers } from './providers';

const ibmPlexSans = localFont({
  src: '../assets/fonts/IBMPlexSansThai-Regular.ttf',
  variable: '--font-ibm-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Rome',
  description: `If you haven't figured out how to build Rome in a day. let us show you how with the ROME platform`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${ibmPlexSans.variable}  antialiased`}>
          <NextUIProvider locale="en-GB">
            <Toaster position="bottom-left" richColors expand />
            {/* <main>{children}</main> */}
            <main>{children}</main>
          </NextUIProvider>
        </body>
      </html>
    </Providers>
  );
}

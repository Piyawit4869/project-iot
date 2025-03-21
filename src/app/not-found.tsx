// app/not-found.tsx or pages/404.tsx

'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-800 px-6 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">ไม่พบหน้าที่คุณต้องการ</p>
      <p className="text-gray-600 mb-6">หน้าดังกล่าวอาจถูกลบหรือย้ายไปแล้ว</p>
      <Link
        href="/"
        className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-gray-700 transition"
      >
        กลับหน้าหลัก
      </Link>
    </div>
  );
}

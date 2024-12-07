'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export function SuperAdminSideBar() {
  const pathname = usePathname();

  return (
    <div className="flex ">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shadow-md">
        <div className="flex flex-col items-center py-6">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <h1 className="text-xl font-bold text-gray-700">Super Admin</h1>
        </div>

        <nav className="flex flex-col h-full p-4 space-y-4">
          <Link
            href="/superadmin/analytic"
            className={`block px-4 py-2 rounded-md text-lg font-medium ${
              pathname === '/superadmin/analytic'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Analytic
          </Link>
          <Link
            href="/superadmin/organization"
            className={`block px-4 py-2 rounded-md text-lg font-medium ${
              pathname === '/superadmin/organization'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Organization
          </Link>
          <Link
            href="/superadmin/user"
            className={`block px-4 py-2 rounded-md text-lg font-medium ${
              pathname === '/superadmin/user'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            User
          </Link>
        </nav>
      </aside>
    </div>
  );
}

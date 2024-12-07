'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function SideBar() {
  const pathname = usePathname();

  return (
    <nav>
      <Link
        className={`link ${pathname === '/home' ? 'active' : ''}`}
        href="/home"
      >
        Home
      </Link>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
        Welcome
      </Link>
    </nav>
  );
}

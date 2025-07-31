'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  return (
<nav className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-4
  bg-[#121212]/99 backdrop-blur-md border-b border-white/10 text-white shadow-sm">


      {/* Logo */}
     <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent tracking-wide">
  <Link href="/">Snapverse</Link>
</div>


      {/* Center Links */}
      <div className="flex gap-6 text-lg font-semibold">
        <Link
          href="/Home#features"
          className={`${styles.navLink} ${pathname.includes('features') ? 'text-purple-400' : ''}`}
        >
          Features
        </Link>
        <Link
          href="/Home#ai-generation"
          className={`${styles.navLink} ${pathname.includes('ai-generation') ? 'text-purple-400' : ''}`}
        >
          AI Generation
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        <Link
          href="/auth/login"
          className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition font-medium"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition font-medium"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/context';
import Button from './ui/Button';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">SecureVault</Link>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 hidden sm:block">{user?.email}</span>
              <Button onClick={logout} variant="secondary">Logout</Button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link href="/login"><Button variant="secondary">Login</Button></Link>
              <Link href="/register"><Button>Register</Button></Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
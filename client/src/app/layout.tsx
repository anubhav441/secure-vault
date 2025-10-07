import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/context';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Secure Vault',
  description: 'A secure password generator and vault',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <AuthProvider>
          <Toaster position="top-center" />
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context';
import PasswordGenerator from '@/components/PasswordGenerator';
import VaultList from '@/components/VaultList';
import api from '@/lib/api';
import { decryptData } from '@/lib/crypto';

export interface VaultItem {
  _id: string;
  title: string;
  username: string;
  password?: string;
  url?: string;
  notes?: string;
}

export default function VaultPage() {
  const { isAuthenticated, user, encryptionKey, logout, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const [decryptedItems, setDecryptedItems] = useState<VaultItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAndDecryptVault = useCallback(async () => {
    if (!encryptionKey || !user) return;
    setIsLoading(true);
    try {
      const { data } = await api.get('/vault');
      const decrypted = data
        .map((item: { _id: string; encryptedData: string }) => {
          const decryptedData = decryptData<Omit<VaultItem, '_id'>>(item.encryptedData, encryptionKey, user.email);
          return decryptedData ? { _id: item._id, ...decryptedData } : null;
        })
        .filter(Boolean);
      setDecryptedItems(decrypted as VaultItem[]);
    } catch (error) {
      if ((error as any).response?.status === 401) logout();
    } finally {
      setIsLoading(false);
    }
  }, [encryptionKey, user, logout]);

  useEffect(() => {
    if (!isAuthLoading) {
      if (!isAuthenticated) router.push('/login');
      else fetchAndDecryptVault();
    }
  }, [isAuthenticated, isAuthLoading, router, fetchAndDecryptVault]);

  if (isAuthLoading || isLoading) {
    return <div className="text-center pt-20">Loading Vault...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Password Generator</h1>
      <PasswordGenerator />
      <div className="mt-12">
        <VaultList items={decryptedItems} refreshItems={fetchAndDecryptVault} />
      </div>
    </div>
  );
}
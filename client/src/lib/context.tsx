'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User { _id: string; email: string; }
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  encryptionKey: string | null;
  login: (userData: User & { token: string }, masterKey: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [encryptionKey, setEncryptionKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User & { token: string }, masterKey: string) => {
    const userToStore = { _id: userData._id, email: userData.email };
    localStorage.setItem('user', JSON.stringify(userToStore));
    localStorage.setItem('token', userData.token);
    setUser(userToStore);
    setEncryptionKey(masterKey);
    router.push('/vault');
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setEncryptionKey(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, isLoading, user, login, logout, encryptionKey }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
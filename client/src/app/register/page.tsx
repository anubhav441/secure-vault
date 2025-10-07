'use client';
import { useState, FormEvent } from 'react';
import { useAuth } from '@/lib/context';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error('Password must be at least 8 characters long.');
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/register', { email, password });
      login(data, password);
      toast.success('Registration successful!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="flex flex-col items-center justify-center min-h-screen -mt-20 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white">Create your  Securevault</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
           <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
           <Input type="password" placeholder="Master Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
           <Button type="submit" className="w-full !py-3 text-base" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</Button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
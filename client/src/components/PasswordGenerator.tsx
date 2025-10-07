'use client';
import { useState, useEffect } from 'react';
import { useCopyToClipboard } from '@/lib/hooks';
import Button from './ui/Button';
import { Copy, Check } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeLookAlikes, setExcludeLookAlikes] = useState(true);
  const { isCopied, copy } = useCopyToClipboard();

  useEffect(() => {
    generatePassword();
  }, []);

  const generatePassword = () => {
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    if (excludeLookAlikes) charset = charset.split('').filter(char => !'l1O0I'.includes(char)).join('');
    
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg">
      <div className="flex items-center bg-gray-700 rounded-md">
        <input type="text" value={password} readOnly placeholder="Generate a password" className="w-full p-3 bg-transparent text-xl font-mono focus:outline-none tracking-wider" />
        <button onClick={() => copy(password)} className="p-3 text-gray-400 hover:text-white transition-colors" disabled={!password}>
          {isCopied ? <Check size={22} className="text-green-400" /> : <Copy size={22} />}
        </button>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="length" className="text-gray-300 font-medium">Password Length</label>
          <span className="text-lg font-semibold text-indigo-400">{length}</span>
        </div>
        <input id="length" type="range" min="8" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value, 10))} className="w-full" />
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-700 transition-colors">
            <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} className="form-checkbox h-5 w-5 text-indigo-500 bg-gray-600 border-gray-500 rounded focus:ring-indigo-500" />
            <span className="text-gray-200">Numbers</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-700 transition-colors">
            <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} className="form-checkbox h-5 w-5 text-indigo-500 bg-gray-600 border-gray-500 rounded focus:ring-indigo-500" />
            <span className="text-gray-200">Symbols</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-700 transition-colors">
            <input type="checkbox" checked={excludeLookAlikes} onChange={() => setExcludeLookAlikes(!excludeLookAlikes)} className="form-checkbox h-5 w-5 text-indigo-500 bg-gray-600 border-gray-500 rounded focus:ring-indigo-500" />
            <span className="text-gray-200">Exclude Look-alikes</span>
          </label>
        </div>
      </div>
      <Button onClick={generatePassword} className="w-full mt-6 !py-3 text-base">Generate New Password</Button>
    </div>
  );
}
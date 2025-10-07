'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copy = (text: string, successMessage = 'Copied to clipboard!') => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      toast.success(successMessage);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 15000); 
    }).catch(err => {
      toast.error('Failed to copy!');
      console.error('Copy failed', err);
    });
  };

  return { isCopied, copy };
}
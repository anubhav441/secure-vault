'use client';
import { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Button from './ui/Button';
import { VaultItem } from '@/app/vault/page';
import { useAuth } from '@/lib/context';
import { encryptData } from '@/lib/crypto';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshItems: () => void;
  itemToEdit?: VaultItem | null;
}

export default function AddItemModal({ isOpen, onClose, refreshItems, itemToEdit }: AddItemModalProps) {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const { encryptionKey, user } = useAuth();

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title || ''); setUsername(itemToEdit.username || ''); setPassword(itemToEdit.password || ''); setUrl(itemToEdit.url || ''); setNotes(itemToEdit.notes || '');
    } else {
      setTitle(''); setUsername(''); setPassword(''); setUrl(''); setNotes('');
    }
  }, [itemToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !username || !password || !encryptionKey || !user) return toast.error('Title, Username, and Password are required.');
    
    const vaultItemData = { title, username, password, url, notes };
    const encryptedData = encryptData(vaultItemData, encryptionKey, user.email);

    try {
      const promise = itemToEdit ? api.put(`/vault/${itemToEdit._id}`, { encryptedData }) : api.post('/vault', { encryptedData });
      await toast.promise(promise, {
        loading: 'Saving...',
        success: `Item ${itemToEdit ? 'updated' : 'added'}!`,
        error: 'Failed to save item.',
      });
      refreshItems();
      onClose();
    } catch (error) {}
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={itemToEdit ? 'Edit Item' : 'Add New Item'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Input label="Username/Email" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Input label="URL (optional)" value={url} onChange={(e) => setUrl(e.target.value)} />
        <textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" rows={3} />
        <div className="flex justify-end space-x-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">{itemToEdit ? 'Save Changes' : 'Add Item'}</Button>
        </div>
      </form>
    </Modal>
  );
}
'use client';
import { useState } from 'react';
import { VaultItem } from '@/app/vault/page';
import { useCopyToClipboard } from '@/lib/hooks';
import Button from './ui/Button';
import Input from './ui/Input';
import AddItemModal from './AddItemModal';
import { Copy, Edit, Trash2, PlusCircle } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function VaultList({ items, refreshItems }: { items: VaultItem[], refreshItems: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VaultItem | null>(null);
  const { copy } = useCopyToClipboard();

  const openEditModal = (item: VaultItem) => { setEditingItem(item); setIsModalOpen(true); };
  const openAddModal = () => { setEditingItem(null); setIsModalOpen(true); };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/vault/${id}`);
        toast.success('Item deleted');
        refreshItems();
      } catch {
        toast.error('Failed to delete item');
      }
    }
  };

  const filteredItems = items.filter(item =>
    Object.values(item).some(value => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-white">Your Vault ({items.length})</h2>
        <div className="w-full sm:w-64">
          <Input type="search" placeholder="Search vault..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Button onClick={openAddModal} className="w-full sm:w-auto flex items-center justify-center gap-2">
          <PlusCircle size={20} /> Add New Item
        </Button>
      </div>
      <div className="space-y-3">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item._id} className="p-4 bg-gray-700 rounded-lg flex items-center justify-between transition-colors hover:bg-gray-600/50">
              <div>
                <h3 className="font-semibold text-lg text-gray-100">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.username}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => copy(item.password || '', 'Password copied!')} className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-full transition-all">
                  <Copy size={18} />
                </button>
                <button onClick={() => openEditModal(item)} className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-full transition-all">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/50 rounded-full transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-10">
            <h3 className="text-lg font-semibold">Your vault is empty</h3>
            <p className="mt-1">Click "Add New Item" to get started.</p>
          </div>
        )}
      </div>
      <AddItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} refreshItems={refreshItems} itemToEdit={editingItem} />
    </div>
  );
}
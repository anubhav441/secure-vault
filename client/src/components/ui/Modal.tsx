import { ReactNode } from 'react';

interface ModalProps { isOpen: boolean; onClose: () => void; title: string; children: ReactNode; }

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 m-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
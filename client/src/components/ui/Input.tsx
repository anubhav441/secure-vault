import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, id, className, ...props }: InputProps) {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>}
      <input
        id={id}
        className={`w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-gray-100
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none
                    transition duration-200 ${className}`}
        {...props}
      />
    </div>
  );
}
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500",
    secondary: "bg-gray-600 text-gray-200 hover:bg-gray-500 focus:ring-gray-500",
  };

  return <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>{children}</button>;
}
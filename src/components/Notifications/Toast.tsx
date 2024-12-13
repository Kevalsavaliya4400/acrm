import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: AlertCircle
  };

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  const Icon = icons[type];

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-lg border ${styles[type]} shadow-lg animate-slide-up`}>
      <Icon className="w-5 h-5" />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
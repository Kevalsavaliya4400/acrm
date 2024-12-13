import React from 'react';
import { motion } from 'framer-motion';
import { Toast } from '../../Notifications/Toast';

interface AuthFormLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  toast: { message: string; type: 'success' | 'error' } | null;
  onToastClose: () => void;
}

export function AuthFormLayout({ title, subtitle, children, toast, onToastClose }: AuthFormLayoutProps) {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-sm text-gray-600"
        >
          {subtitle}
        </motion.p>
      </div>

      {children}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={onToastClose}
        />
      )}
    </div>
  );
}
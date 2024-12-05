import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'bottom' | 'right';
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Sheet({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = 'bottom',
  showBackButton,
  onBack 
}: SheetProps) {
  const variants = {
    bottom: {
      hidden: { y: '100%' },
      visible: { y: 0 },
    },
    right: {
      hidden: { x: '100%' },
      visible: { x: 0 },
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants[position]}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed z-50 glass-panel-darker overflow-hidden
              ${position === 'bottom' ? 
                'inset-x-0 bottom-0 rounded-t-2xl max-h-[90vh]' : 
                'top-0 right-0 h-full w-full sm:w-[400px] max-w-full'}`}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
              <div className="flex items-center gap-3">
                {showBackButton && (
                  <button
                    onClick={onBack}
                    className="p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
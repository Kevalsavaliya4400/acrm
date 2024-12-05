import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Action {
  label: string;
  icon?: React.ElementType;
  onClick: () => void;
  destructive?: boolean;
}

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  actions: Action[];
}

export function ActionSheet({ isOpen, onClose, title, actions }: ActionSheetProps) {
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
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 glass-panel-darker rounded-t-2xl overflow-hidden"
          >
            <div className="p-2 flex justify-end">
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {title && (
              <div className="px-6 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              </div>
            )}
            
            <div className="px-2 pb-6 space-y-1">
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      action.onClick();
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
                      ${action.destructive ? 
                        'text-red-600 hover:bg-red-50' : 
                        'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span className="font-medium">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
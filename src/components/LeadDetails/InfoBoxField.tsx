import React, { useState } from 'react';
import { LucideIcon, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoBoxFieldProps {
  icon: LucideIcon;
  label: string;
  value: string;
  action?: string;
  className?: string;
  editable?: boolean;
  editComponent?: React.ReactNode;
  customComponent?: React.ReactNode;
  highlight?: boolean;
}

export function InfoBoxField({ 
  icon: Icon, 
  label, 
  value, 
  action, 
  className = '',
  editable,
  editComponent,
  customComponent,
  highlight
}: InfoBoxFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const content = customComponent ? customComponent : action ? (
    <a
      href={action}
      className="font-medium text-gray-900 hover:text-blue-600 flex items-center gap-1 transition-colors"
    >
      {value}
    </a>
  ) : (
    <div className="flex items-center justify-between gap-2">
      <p className="font-medium text-gray-900">{value}</p>
      {editable && isHovered && !isEditing && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-gray-400 hover:text-blue-500 transition-colors"
          onClick={() => setIsEditing(true)}
        >
          <Edit3 className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );

  return (
    <motion.div 
      className={`group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer
        ${className}
        ${highlight ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
        ${editable ? 'hover:bg-gray-50' : ''}`}
      onClick={() => editable && setIsEditing(!isEditing)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-3">
        <motion.div 
          className="flex-shrink-0"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className={`w-5 h-5 ${highlight ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'} transition-colors`} />
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <AnimatePresence mode="wait">
            {isEditing && editComponent ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {editComponent}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
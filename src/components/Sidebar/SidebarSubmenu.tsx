import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarLink } from './SidebarLink';

interface SidebarSubmenuProps {
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  items: Array<{
    to: string;
    label: string;
    isActive: boolean;
  }>;
}

export function SidebarSubmenu({ icon: Icon, label, isCollapsed, items }: SidebarSubmenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isAnyItemActive = items.some(item => item.isActive);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors relative
          ${isAnyItemActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
      >
        <Icon className={`w-5 h-5 ${isAnyItemActive ? 'text-blue-700' : 'text-gray-400'}`} />
        {!isCollapsed && (
          <div className="flex items-center justify-between flex-1">
            <span>{label}</span>
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        )}
        {isAnyItemActive && (
          <motion.div
            className="absolute inset-y-0 left-0 w-1 bg-blue-600 rounded-r"
            layoutId="activeIndicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && !isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 py-2 space-y-1">
              {items.map((item) => (
                <SidebarLink
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  icon={() => <div className="w-2 h-2 rounded-full bg-current" />}
                  isCollapsed={false}
                  isActive={item.isActive}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
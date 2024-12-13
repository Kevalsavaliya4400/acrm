import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SettingsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  isCollapsible?: boolean;
  defaultCollapsed?: boolean;
}

export function SettingsCard({ 
  title, 
  description, 
  children, 
  icon: Icon,
  isCollapsible = false,
  defaultCollapsed = false
}: SettingsCardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <motion.div
        className={`px-6 py-4 border-b border-gray-200 ${isCollapsible ? 'cursor-pointer' : ''}`}
        onClick={() => isCollapsible && setIsCollapsed(!isCollapsed)}
        whileHover={isCollapsible ? { backgroundColor: '#F9FAFB' } : undefined}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"
              >
                <Icon className="w-5 h-5 text-blue-600" />
              </motion.div>
            )}
            <div>
              <h3 className="text-base font-medium text-gray-900">{title}</h3>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
          </div>
          {isCollapsible && (
            <motion.div
              animate={{ rotate: isCollapsed ? 0 : 90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          height: isCollapsed ? 0 : 'auto',
          opacity: isCollapsed ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className={`px-6 py-4 ${isCollapsed ? 'hidden' : ''}`}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
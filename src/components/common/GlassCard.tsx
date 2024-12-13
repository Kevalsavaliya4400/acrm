import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  darker?: boolean;
  hover?: boolean;
}

export function GlassCard({ children, className = '', darker = false, hover = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        ${darker ? 'glass-panel-darker' : 'glass-panel'}
        rounded-xl p-6
        ${hover ? 'transition-all duration-300 hover:shadow-lg hover:scale-[1.02]' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';

interface GlassLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GlassLoader({ size = 'md', className = '' }: GlassLoaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`glass-panel rounded-full flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      <div className="loader" style={{ 
        width: size === 'sm' ? '24px' : size === 'md' ? '32px' : '40px',
        height: size === 'sm' ? '24px' : size === 'md' ? '32px' : '40px'
      }} />
    </motion.div>
  );
}
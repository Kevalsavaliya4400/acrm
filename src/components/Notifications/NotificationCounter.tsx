import React from 'react';
import { Calendar, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { NotificationCount } from '../../types';

interface NotificationCounterProps {
  counts: NotificationCount;
}

export function NotificationCounter({ counts }: NotificationCounterProps) {
  const counters = [
    {
      count: counts.dueToday,
      label: 'due today',
      icon: Calendar,
      className: 'bg-blue-50 text-blue-700'
    },
    {
      count: counts.dueTomorrow,
      label: 'due tomorrow',
      icon: Calendar,
      className: 'bg-purple-50 text-purple-700'
    },
    {
      count: counts.overdue,
      label: 'overdue',
      icon: AlertTriangle,
      className: 'bg-red-50 text-red-700'
    }
  ];

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {counters.map(({ count, label, icon: Icon, className }) => count > 0 && (
        <motion.span
          key={label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium ${className}`}
        >
          <Icon className="w-3.5 h-3.5" />
          <span>{count} {label}</span>
        </motion.span>
      ))}
    </div>
  );
}
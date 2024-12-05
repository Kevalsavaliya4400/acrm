import React from 'react';
import { format } from 'date-fns';
import { Bell, Calendar, AlertTriangle, BarChart2 } from 'lucide-react';
import type { Notification } from '../../types';
import { motion } from 'framer-motion';

interface NotificationItemProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'lead_due':
        return Calendar;
      case 'lead_overdue':
        return AlertTriangle;
      case 'analytics':
        return BarChart2;
      default:
        return Bell;
    }
  };

  const Icon = getIcon(notification.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      onClick={() => onClick(notification)}
      className={`group p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all
        ${!notification.isRead ? 'bg-blue-50/50' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 rounded-lg p-2 transition-colors group-hover:scale-110 ${
          notification.type === 'lead_overdue' ? 'bg-red-100 text-red-600 group-hover:bg-red-200' :
          notification.type === 'lead_due' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200' :
          'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
        }`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {notification.title}
            </p>
            {!notification.isRead && (
              <motion.span
                layoutId={`unread-${notification.id}`}
                className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full"
              />
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2 group-hover:text-gray-600">
            {notification.message}
          </p>
          <p className="mt-1 text-xs text-gray-400 group-hover:text-gray-500">
            {format(new Date(notification.timestamp), 'MMM d, h:mm a')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
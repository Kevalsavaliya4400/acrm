import React from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../hooks/useNotifications';
import { NotificationItem } from './NotificationItem';
import { NotificationCounter } from './NotificationCounter';

export function NotificationPanel() {
  const { notifications, counts, loading, handleNotificationClick } = useNotifications();

  if (loading) {
    return (
      <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          {counts.unreadTotal > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {counts.unreadTotal} new
            </motion.span>
          )}
        </div>
        
        <NotificationCounter counts={counts} />
      </div>

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center text-gray-500"
            >
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-base">No notifications</p>
              <p className="text-sm text-gray-400 mt-1">
                You're all caught up!
              </p>
            </motion.div>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={handleNotificationClick}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
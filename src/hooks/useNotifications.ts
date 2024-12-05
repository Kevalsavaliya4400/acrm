import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { leadService } from '../services/leadService';
import { notificationService } from '../services/notificationService';
import type { Notification, NotificationCount } from '../types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [counts, setCounts] = useState<NotificationCount>({
    dueToday: 0,
    dueTomorrow: 0,
    overdue: 0,
    unreadTotal: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getNotifications();
      setNotifications(data);
      updateCounts();
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCounts = async () => {
    try {
      const counts = await notificationService.getNotificationCounts();
      setCounts(counts);
    } catch (error) {
      console.error('Failed to fetch notification counts:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
      updateCounts();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    await markAsRead(notification.id);

    if (notification.data?.leadId) {
      navigate(`/leads/${notification.data.leadId}`);
    } else if (notification.data?.route) {
      navigate(notification.data.route);
    }

    if (notification.data?.componentId) {
      const element = document.getElementById(notification.data.componentId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.classList.add('highlight-pulse');
        setTimeout(() => {
          element.classList.remove('highlight-pulse');
        }, 3000);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 2 * 60 * 60 * 1000); // 2 hours
    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    counts,
    loading,
    markAsRead,
    handleNotificationClick,
    refresh: fetchNotifications
  };
}
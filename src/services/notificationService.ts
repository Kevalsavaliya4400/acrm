import { supabase } from '../lib/supabase';
import type { Notification, NotificationCount } from '../types';
import { isToday, isTomorrow, isBefore, startOfDay } from 'date-fns';

export const notificationService = {
  async getNotifications() {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data as Notification[];
  },

  async getNotificationCounts(): Promise<NotificationCount> {
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .is('deleted_at', null);

    if (error) throw error;

    const now = new Date();
    const counts = {
      dueToday: 0,
      dueTomorrow: 0,
      overdue: 0,
      unreadTotal: 0
    };

    leads.forEach(lead => {
      const followupDate = new Date(lead.next_followup);
      
      if (isToday(followupDate)) {
        counts.dueToday++;
      } else if (isTomorrow(followupDate)) {
        counts.dueTomorrow++;
      } else if (isBefore(followupDate, startOfDay(now))) {
        counts.overdue++;
      }
    });

    const { count } = await supabase
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('isRead', false);

    counts.unreadTotal = count || 0;

    return counts;
  },

  async markAsRead(id: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ isRead: true })
      .eq('id', id);

    if (error) throw error;
  },

  async createNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{
        ...notification,
        timestamp: new Date().toISOString(),
        isRead: false
      }])
      .select()
      .single();

    if (error) throw error;
    return data as Notification;
  }
};
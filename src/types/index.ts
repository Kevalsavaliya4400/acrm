// ... existing types ...

export interface Notification {
  id: string;
  type: 'lead_due' | 'lead_overdue' | 'analytics' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  data?: {
    leadId?: string;
    componentId?: string;
    route?: string;
  };
}

export interface NotificationCount {
  dueToday: number;
  dueTomorrow: number;
  overdue: number;
  unreadTotal: number;
}
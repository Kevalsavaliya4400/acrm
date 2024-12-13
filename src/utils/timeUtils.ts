import { formatDistanceToNow } from 'date-fns';

export const getRelativeTime = (date: string | Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const isNewLead = (createdAt: string) => {
  const leadDate = new Date(createdAt);
  const now = new Date();
  const hoursDiff = (now.getTime() - leadDate.getTime()) / (1000 * 60 * 60);
  return hoursDiff <= 24; // Consider leads newer than 24 hours as "new"
};
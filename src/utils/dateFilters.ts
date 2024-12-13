import { Lead } from '../types';

export function filterLeadsByDate(leads: Lead[], year: number, month: number | 'all'): Lead[] {
  return leads.filter(lead => {
    const leadDate = new Date(lead.created_at);
    const leadYear = leadDate.getFullYear();
    const leadMonth = leadDate.getMonth() + 1;

    if (month === 'all') {
      return leadYear === year;
    }

    return leadYear === year && leadMonth === month;
  });
}
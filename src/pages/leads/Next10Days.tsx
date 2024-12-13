import React from 'react';
import { format, addDays, isWithinInterval } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { LeadList } from '../../components/LeadList';
import { PageHeader } from '../../components/Layout/PageHeader';
import type { Lead } from '../../types';

export function Next10Days() {
  const filterLeads = (leads: Lead[]) => {
    const startDate = new Date();
    const endDate = addDays(startDate, 10);
    
    return leads.filter(lead => {
      const followUpDate = new Date(lead.next_followup);
      return isWithinInterval(followUpDate, { start: startDate, end: endDate });
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Next 10 Days"
        icon={CalendarDays}
        subtitle={
          <span className="text-sm text-gray-500">
            Leads due between {format(new Date(), 'MMM d')} and {format(addDays(new Date(), 10), 'MMM d, yyyy')}
          </span>
        }
      />
      <LeadList filterFn={filterLeads} />
    </div>
  );
}
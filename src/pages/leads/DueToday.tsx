import React from 'react';
import { format, isToday } from 'date-fns';
import { Clock } from 'lucide-react';
import { LeadList } from '../../components/LeadList';
import { PageHeader } from '../../components/Layout/PageHeader';
import type { Lead } from '../../types';

export function DueToday() {
  const filterLeads = (leads: Lead[]) => {
    return leads.filter(lead => isToday(new Date(lead.next_followup)));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Due Today"
        icon={Clock}
        subtitle={
          <span className="text-sm text-gray-500">
            Leads that require follow-up today ({format(new Date(), 'MMMM d, yyyy')})
          </span>
        }
      />
      <LeadList filterFn={filterLeads} />
    </div>
  );
}
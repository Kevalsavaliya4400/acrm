import React from 'react';
import { format, addDays, isTomorrow } from 'date-fns';
import { Calendar } from 'lucide-react';
import { LeadList } from '../../components/LeadList';
import { PageHeader } from '../../components/Layout/PageHeader';
import type { Lead } from '../../types';

export function DueTomorrow() {
  const filterLeads = (leads: Lead[]) => {
    return leads.filter(lead => isTomorrow(new Date(lead.next_followup)));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Due Tomorrow"
        icon={Calendar}
        subtitle={
          <span className="text-sm text-gray-500">
            Leads that require follow-up tomorrow ({format(addDays(new Date(), 1), 'MMMM d, yyyy')})
          </span>
        }
      />
      <LeadList filterFn={filterLeads} />
    </div>
  );
}
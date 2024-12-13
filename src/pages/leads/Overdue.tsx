import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { LeadList } from '../../components/LeadList';
import { PageHeader } from '../../components/Layout/PageHeader';
import { getOverdueLeads } from '../../utils/followupUtils';
import type { Lead } from '../../types';

export function Overdue() {
  const filterLeads = (leads: Lead[]) => {
    return getOverdueLeads(leads);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Overdue Follow-ups"
        icon={AlertTriangle}
        subtitle={
          <span className="text-sm text-gray-500">
            Leads that require immediate attention - past their follow-up date
          </span>
        }
      />
      <LeadList filterFn={filterLeads} />
    </div>
  );
}
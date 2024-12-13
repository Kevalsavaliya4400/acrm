import React from 'react';
import { Activity, Tag } from 'lucide-react';
import { CategoryBox } from './CategoryBox';
import type { Lead } from '../../../types';

interface LeadStatusProps {
  lead: Lead;
}

export function LeadStatus({ lead }: LeadStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-green-600';
      case 'contacted': return 'text-blue-600';
      case 'qualified': return 'text-purple-600';
      case 'proposal': return 'text-yellow-600';
      case 'negotiation': return 'text-orange-600';
      case 'closed': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const fields = [
    {
      icon: Activity,
      label: 'Status',
      value: lead.status.charAt(0).toUpperCase() + lead.status.slice(1),
      className: getStatusColor(lead.status)
    },
    {
      icon: Tag,
      label: 'Source',
      value: lead.source.charAt(0).toUpperCase() + lead.source.slice(1)
    }
  ];

  return (
    <CategoryBox title="Lead Status" fields={fields} />
  );
}
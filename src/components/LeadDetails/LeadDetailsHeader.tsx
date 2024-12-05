import React from 'react';
import { Activity, Brain, BarChart } from 'lucide-react';
import { format } from 'date-fns';
import type { Lead } from '../../types';
import { calculateLeadScore } from '../../utils/leadScoring';

interface LeadDetailsHeaderProps {
  lead: Lead;
}

export function LeadDetailsHeader({ lead }: LeadDetailsHeaderProps) {
  const headerFields = [
    {
      icon: Activity,
      label: 'Status',
      value: lead.status.charAt(0).toUpperCase() + lead.status.slice(1),
      className: 'bg-blue-50',
    },
    {
      icon: Brain,
      label: 'Lead Score',
      value: `${calculateLeadScore(lead)}/100`,
      className: 'bg-purple-50',
    },
    {
      icon: BarChart,
      label: 'Follow-up',
      value: format(new Date(lead.next_followup), 'MMM d, yyyy'),
      className: 'bg-green-50',
    },
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Lead Information</h2>
      <div className="flex gap-3">
        {headerFields.map((field) => (
          <div
            key={field.label}
            className={`px-4 py-2 rounded-lg ${field.className} flex items-center gap-2`}
          >
            <field.icon className="w-5 h-5" />
            <div>
              <p className="text-xs font-medium text-gray-600">{field.label}</p>
              <p className="text-sm font-semibold">{field.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
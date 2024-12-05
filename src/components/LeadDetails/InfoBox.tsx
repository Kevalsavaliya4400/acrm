import React from 'react';
import { User, Mail, Phone, DollarSign, Home, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { Lead } from '../../types';

interface InfoBoxProps {
  lead: Lead;
}

export function InfoBox({ lead }: InfoBoxProps) {
  const fields = [
    {
      icon: User,
      label: 'Name',
      value: lead.name,
    },
    {
      icon: Mail,
      label: 'Email',
      value: lead.email,
      action: `mailto:${lead.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: lead.phone,
      action: `tel:${lead.phone}`,
    },
    {
      icon: DollarSign,
      label: 'Budget',
      value: lead.budget ? `$${lead.budget.toLocaleString()}` : 'Not specified',
    },
    {
      icon: Home,
      label: 'Property Interest',
      value: lead.property_interest || 'Not specified',
    },
    {
      icon: Calendar,
      label: 'Next Follow-up',
      value: format(new Date(lead.next_followup), 'MMM d, yyyy'),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6" role="region" aria-label="Lead Information">
      <h2 className="text-xl font-semibold mb-6">Lead Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ icon: Icon, label, value, action }) => (
          <div key={label} className="group">
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">{label}</p>
                {action ? (
                  <a
                    href={action}
                    className="font-medium text-gray-900 hover:text-blue-600 flex items-center gap-1"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="font-medium text-gray-900">{value}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
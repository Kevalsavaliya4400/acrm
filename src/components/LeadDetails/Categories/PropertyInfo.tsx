import React from 'react';
import { Home, DollarSign } from 'lucide-react';
import { CategoryBox } from './CategoryBox';
import type { Lead } from '../../../types';

interface PropertyInfoProps {
  lead: Lead;
}

export function PropertyInfo({ lead }: PropertyInfoProps) {
  const fields = [
    {
      icon: Home,
      label: 'Property Interest',
      value: lead.property_interest || 'Not specified'
    },
    {
      icon: DollarSign,
      label: 'Budget',
      value: lead.budget ? `$${lead.budget.toLocaleString()}` : 'Not specified'
    }
  ];

  return (
    <CategoryBox title="Property Details" fields={fields} />
  );
}
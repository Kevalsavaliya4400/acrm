import React, { useState } from 'react';
import { User, Mail, Phone, DollarSign, Home, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { InfoBoxField } from './InfoBoxField';
import { FollowUpEditor } from './FollowUpEditor';
import type { Lead } from '../../../types';

interface InfoFieldsProps {
  lead: Lead;
  onUpdate: (lead: Lead) => Promise<void>;
}

export function InfoFields({ lead, onUpdate }: InfoFieldsProps) {
  const [editingFollowUp, setEditingFollowUp] = useState(false);

  const handleFollowUpUpdate = async (updatedLead: Lead) => {
    try {
      await onUpdate(updatedLead);
      setEditingFollowUp(false);
    } catch (error) {
      console.error('Failed to update follow-up date:', error);
      throw error;
    }
  };

  const fields = [
    {
      icon: User,
      label: 'Full Name',
      value: lead.name,
    },
    {
      icon: Mail,
      label: 'Email Address',
      value: lead.email,
      action: `mailto:${lead.email}`,
    },
    {
      icon: Phone,
      label: 'Phone Number',
      value: lead.phone,
      action: `tel:${lead.phone}`,
    },
    {
      icon: DollarSign,
      label: 'Budget Range',
      value: lead.budget ? `$${lead.budget.toLocaleString()}` : 'Not specified',
    },
    {
      icon: Home,
      label: 'Property Interest',
      value: lead.property_interest || 'Not specified',
    },
    {
      icon: MapPin,
      label: 'Lead Source',
      value: lead.source.charAt(0).toUpperCase() + lead.source.slice(1),
    },
    {
      icon: Clock,
      label: 'Next Follow-up',
      value: format(new Date(lead.next_followup), 'MMM d, yyyy'),
      editable: true,
      highlight: true,
      editComponent: editingFollowUp ? (
        <FollowUpEditor
          lead={lead}
          onUpdate={handleFollowUpUpdate}
          onCancel={() => setEditingFollowUp(false)}
        />
      ) : undefined,
      onEditStart: () => setEditingFollowUp(true),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {fields.map((field) => (
        <InfoBoxField
          key={field.label}
          icon={field.icon}
          label={field.label}
          value={field.value}
          action={field.action}
          editable={field.editable}
          highlight={field.highlight}
          editComponent={field.editComponent}
          onEditStart={field.onEditStart}
        />
      ))}
    </div>
  );
}
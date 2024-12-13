import React from 'react';
import { User, Mail, Phone, DollarSign, Home, MapPin, Clock, MapPinned } from 'lucide-react';
import { format } from 'date-fns';
import { InfoBoxField } from './InfoBoxField';
import { FollowUpEditor } from './FollowUpEditor';
import { LocationDisplay } from './LocationDisplay';
import type { Lead } from '../../types';

interface InfoFieldsProps {
  lead: Lead;
  onUpdate: (lead: Lead) => Promise<void>;
}

export function InfoFields({ lead, onUpdate }: InfoFieldsProps) {
  const handleFollowUpUpdate = async (date: string) => {
    try {
      await onUpdate({
        ...lead,
        next_followup: date
      });
    } catch (error) {
      console.error('Failed to update follow-up date:', error);
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
      icon: MapPinned,
      label: 'Location',
      value: lead.location || 'Not specified',
      customComponent: lead.location ? (
        <LocationDisplay location={lead.location} />
      ) : undefined,
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
      editComponent: (
        <FollowUpEditor
          lead={lead}
          onUpdate={handleFollowUpUpdate}
        />
      ),
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
          customComponent={field.customComponent}
        />
      ))}
    </div>
  );
}
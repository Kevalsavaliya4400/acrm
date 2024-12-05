import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { CategoryBox } from './CategoryBox';
import { DatePicker } from '../../common/DatePicker';
import type { Lead } from '../../../types';

interface FollowUpInfoProps {
  lead: Lead;
  onUpdateFollowUp: (date: string) => Promise<void>;
}

export function FollowUpInfo({ lead, onUpdateFollowUp }: FollowUpInfoProps) {
  const fields = [
    {
      icon: Clock,
      label: 'Last Contact',
      value: format(new Date(lead.last_contact), 'MMM d, yyyy')
    },
    {
      icon: Calendar,
      label: 'Next Follow-up',
      value: format(new Date(lead.next_followup), 'MMM d, yyyy'),
      editable: true,
      component: (
        <DatePicker
          value={lead.next_followup}
          onChange={onUpdateFollowUp}
          minDate={new Date()}
        />
      )
    }
  ];

  return (
    <CategoryBox title="Follow-up Schedule" fields={fields} />
  );
}
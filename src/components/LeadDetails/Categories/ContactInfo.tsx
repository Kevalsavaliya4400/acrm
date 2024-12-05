import React from 'react';
import { Mail, Phone, User } from 'lucide-react';
import { CategoryBox } from './CategoryBox';
import type { Lead } from '../../../types';

interface ContactInfoProps {
  lead: Lead;
}

export function ContactInfo({ lead }: ContactInfoProps) {
  const fields = [
    { icon: User, label: 'Name', value: lead.name },
    { icon: Mail, label: 'Email', value: lead.email, action: `mailto:${lead.email}` },
    { icon: Phone, label: 'Phone', value: lead.phone, action: `tel:${lead.phone}` },
  ];

  return (
    <CategoryBox title="Contact Information" fields={fields} />
  );
}
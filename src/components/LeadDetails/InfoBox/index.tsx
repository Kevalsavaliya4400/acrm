import React from 'react';
import { LeadDetailsHeader } from '../LeadDetailsHeader';
import { InfoFields } from './InfoFields';
import { LeadNotes } from './LeadNotes';
import type { Lead } from '../../../types';

interface InfoBoxProps {
  lead: Lead;
}

export function InfoBox({ lead }: InfoBoxProps) {
  return (
    <div className="space-y-6" role="region" aria-label="Lead Information">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <LeadDetailsHeader lead={lead} />
        <InfoFields lead={lead} />
        {lead.notes && <LeadNotes notes={lead.notes} />}
      </div>
    </div>
  );
}
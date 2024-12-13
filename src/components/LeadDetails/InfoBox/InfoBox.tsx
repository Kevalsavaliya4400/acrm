import React from 'react';
import { LeadDetailsHeader } from '../LeadDetailsHeader';
import { InfoFields } from './InfoFields';
import { LeadNotes } from './LeadNotes';
import { LeadActions } from './LeadActions';
import type { Lead } from '../../../types';

interface InfoBoxProps {
  lead: Lead;
  onUpdate: (lead: Lead) => Promise<void>;
  onDelete: () => void;
}

export function InfoBox({ lead, onUpdate, onDelete }: InfoBoxProps) {
  return (
    <div className="space-y-6" role="region" aria-label="Lead Information">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <LeadDetailsHeader lead={lead} />
          <LeadActions lead={lead} onDelete={onDelete} />
        </div>
        <InfoFields lead={lead} onUpdate={onUpdate} />
        {lead.notes && <LeadNotes notes={lead.notes} />}
      </div>
    </div>
  );
}
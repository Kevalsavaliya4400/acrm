import React from 'react';
import { InfoBox } from './InfoBox/InfoBox';
import { ConversationReport } from '../ConversationReport';
import { AIAnalytics } from '../AIAnalytics';
import type { Lead } from '../../types';

interface LeadDetailsProps {
  lead: Lead;
  onUpdate: (lead: Lead) => Promise<void>;
}

export function LeadDetails({ lead, onUpdate }: LeadDetailsProps) {
  const handleFollowUpUpdate = async (updatedLead: Lead) => {
    try {
      await onUpdate(updatedLead);
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <InfoBox 
        lead={lead} 
        onUpdate={handleFollowUpUpdate}
      />
      <AIAnalytics lead={lead} />
      <ConversationReport 
        lead={lead} 
        onUpdate={handleFollowUpUpdate}
      />
    </div>
  );
}
import React from 'react';
import { ThumbsUp, ThumbsDown, Clock, Phone, Mail } from 'lucide-react';
import { leadService } from '../../services/leadService';
import { conversationService } from '../../services/conversationService';
import type { Lead } from '../../types';

interface QuickActionsProps {
  lead: Lead;
  onUpdate: (lead: Lead) => void;
  onSuccess?: () => void;
}

export function QuickActions({ lead, onUpdate, onSuccess }: QuickActionsProps) {
  const handleQuickResponse = async (response: string, icon: string) => {
    try {
      // Add conversation
      await conversationService.addConversation({
        lead_id: lead.id,
        type: 'call',
        notes: `Quick response: ${response}`,
        date: new Date().toISOString(),
        outcome: response
      });

      // Update lead status
      const status = response === 'Interested' ? 'qualified' : 
                    response === 'Not Interested' ? 'closed' : lead.status;

      const updatedLead = await leadService.updateLead(lead.id, {
        status,
        last_contact: new Date().toISOString(),
        next_followup: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });

      onUpdate(updatedLead);
      onSuccess?.();

      // Show notification
      const notification = new Notification('Lead Updated', {
        body: `Lead ${lead.name} marked as ${response}`,
        icon
      });
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleQuickResponse('Interested', '👍')}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-green-50 text-green-700 hover:bg-green-100"
      >
        <ThumbsUp className="w-4 h-4" />
        Interested
      </button>

      <button
        onClick={() => handleQuickResponse('Not Interested', '👎')}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100"
      >
        <ThumbsDown className="w-4 h-4" />
        Not Interested
      </button>

      <button
        onClick={() => handleQuickResponse('Follow Up Later', '⏰')}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
      >
        <Clock className="w-4 h-4" />
        Follow Up Later
      </button>

      <a
        href={`tel:${lead.phone}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
      >
        <Phone className="w-4 h-4" />
        Call
      </a>

      <a
        href={`mailto:${lead.email}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-purple-50 text-purple-700 hover:bg-purple-100"
      >
        <Mail className="w-4 h-4" />
        Email
      </a>
    </div>
  );
}
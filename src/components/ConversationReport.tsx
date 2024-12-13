import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ConversationTabs } from './ConversationReport/ConversationTabs';
import { QuickComment } from './ConversationReport/QuickComment';
import { useConversations } from '../hooks/useConversations';
import type { Lead } from '../types';

interface ConversationReportProps {
  lead: Lead;
  onUpdate?: (lead: Lead) => void;
}

export function ConversationReport({ lead, onUpdate }: ConversationReportProps) {
  const { conversations, loading, error, addConversation, deleteConversation } = useConversations(lead.id);

  if (loading) {
    return <div className="text-gray-600">Loading conversations...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Communication History</h3>
      </div>

      <QuickComment
        leadId={lead.id}
        onSubmit={addConversation}
      />

      <ConversationTabs
        lead={lead}
        conversations={conversations}
        onDelete={deleteConversation}
      />
    </div>
  );
}
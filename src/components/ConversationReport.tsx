import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { MessageSquare, Phone, Video, Mail } from 'lucide-react';
import { conversationService } from '../services/conversationService';
import type { Conversation, Lead } from '../types';

interface ConversationReportProps {
  lead: Lead;
}

const iconMap = {
  call: Phone,
  email: Mail,
  meeting: Video,
};

export function ConversationReport({ lead }: ConversationReportProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await conversationService.getConversations(lead.id);
        setConversations(data);
      } catch (err) {
        setError('Failed to load conversations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [lead.id]);

  if (loading) {
    return <div className="text-gray-600">Loading conversations...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Conversation History
        </h3>
      </div>

      <div className="space-y-4">
        {conversations.length === 0 ? (
          <p className="text-gray-500">No conversations recorded yet.</p>
        ) : (
          conversations.map((conversation) => {
            const Icon = iconMap[conversation.type] || MessageSquare;
            return (
              <div
                key={conversation.id}
                className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">
                        {conversation.type.charAt(0).toUpperCase() + conversation.type.slice(1)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(conversation.date), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                    {conversation.outcome}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{conversation.notes}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
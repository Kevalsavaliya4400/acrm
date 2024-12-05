import React from 'react';
import { format } from 'date-fns';
import { Phone, Mail, Video, Trash2 } from 'lucide-react';
import type { Conversation } from '../../types';

interface ManualConversationListProps {
  conversations: Conversation[];
  onDelete: (id: string) => Promise<void>;
}

export function ManualConversationList({ conversations, onDelete }: ManualConversationListProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'meeting': return Video;
      default: return Phone;
    }
  };

  return (
    <div className="space-y-4">
      {conversations.map((conversation) => {
        const Icon = getIcon(conversation.type);
        return (
          <div
            key={conversation.id}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-900 capitalize">
                  {conversation.type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {format(new Date(conversation.date), 'MMM d, yyyy h:mm a')}
                </span>
                <button
                  onClick={() => onDelete(conversation.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 whitespace-pre-wrap">{conversation.notes}</p>
          </div>
        );
      })}
    </div>
  );
}
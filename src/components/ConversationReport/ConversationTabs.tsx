import React, { useState } from 'react';
import { MessageSquare, Zap, FileText } from 'lucide-react';
import { QuickResponseList } from './QuickResponseList';
import { ManualConversationList } from './ManualConversationList';
import { BrochureHistory } from './BrochureHistory';
import type { Conversation, Lead } from '../../types';

interface ConversationTabsProps {
  lead: Lead;
  conversations: Conversation[];
  onDelete: (id: string) => Promise<void>;
}

export function ConversationTabs({ lead, conversations, onDelete }: ConversationTabsProps) {
  const [activeTab, setActiveTab] = useState('quick');

  const quickResponses = conversations.filter(c => c.notes.startsWith('Quick response:'));
  const manualConversations = conversations.filter(c => !c.notes.startsWith('Quick response:'));

  const tabs = [
    { id: 'quick', label: 'Quick Responses', icon: Zap, count: quickResponses.length },
    { id: 'manual', label: 'Conversations', icon: MessageSquare, count: manualConversations.length },
    { id: 'brochures', label: 'Brochures', icon: FileText },
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 px-4" aria-label="Tabs">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center px-3 py-2 text-sm font-medium border-b-2 ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
              {count !== undefined && (
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4">
        {activeTab === 'quick' && (
          <QuickResponseList
            responses={quickResponses}
            onDelete={onDelete}
          />
        )}
        {activeTab === 'manual' && (
          <ManualConversationList
            conversations={manualConversations}
            onDelete={onDelete}
          />
        )}
        {activeTab === 'brochures' && (
          <BrochureHistory lead={lead} />
        )}
      </div>
    </div>
  );
}
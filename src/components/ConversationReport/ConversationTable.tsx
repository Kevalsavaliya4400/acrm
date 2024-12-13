import React from 'react';
import { format } from 'date-fns';
import { Phone, Mail, Video, MessageSquare, Trash2 } from 'lucide-react';
import type { Conversation } from '../../types';

interface ConversationTableProps {
  conversations: Conversation[];
  onDelete: (id: string) => void;
}

const typeIcons = {
  call: Phone,
  email: Mail,
  meeting: Video,
};

export function ConversationTable({ conversations, onDelete }: ConversationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Outcome
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {conversations.map((conversation) => {
            const Icon = typeIcons[conversation.type] || MessageSquare;
            return (
              <tr key={conversation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 text-gray-400" />
                    <span className="ml-2 capitalize">{conversation.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(conversation.date), 'MMM d, yyyy h:mm a')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {conversation.notes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {conversation.outcome}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDelete(conversation.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
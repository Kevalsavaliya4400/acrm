import React from 'react';
import { format } from 'date-fns';
import { ThumbsUp, ThumbsDown, Clock, Trash2 } from 'lucide-react';
import type { Conversation } from '../../types';

interface QuickResponseListProps {
  responses: Conversation[];
  onDelete: (id: string) => Promise<void>;
}

export function QuickResponseList({ responses, onDelete }: QuickResponseListProps) {
  const getIcon = (outcome: string) => {
    switch (outcome) {
      case 'Interested': return ThumbsUp;
      case 'Not Interested': return ThumbsDown;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-4">
      {responses.map((response) => {
        const Icon = getIcon(response.outcome);
        return (
          <div
            key={response.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">
                  {response.outcome}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(response.date), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            </div>
            <button
              onClick={() => onDelete(response.id)}
              className="text-gray-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
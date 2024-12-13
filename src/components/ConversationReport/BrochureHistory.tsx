import React from 'react';
import { FileText, Check, X, Send } from 'lucide-react';
import type { Lead } from '../../types';

interface BrochureHistoryProps {
  lead: Lead;
}

export function BrochureHistory({ lead }: BrochureHistoryProps) {
  const brochures = [
    {
      id: 1,
      name: 'Property Portfolio 2024',
      sent: '2024-03-15',
      opened: true,
      openCount: 3
    },
    {
      id: 2,
      name: 'Investment Properties Guide',
      sent: '2024-03-10',
      opened: false,
      openCount: 0
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Sent Brochures</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          <Send className="w-4 h-4" />
          Send New Brochure
        </button>
      </div>

      {brochures.map((brochure) => (
        <div
          key={brochure.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">{brochure.name}</p>
              <p className="text-sm text-gray-500">Sent on {brochure.sent}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {brochure.opened ? (
              <div className="flex items-center gap-1 text-green-600">
                <Check className="w-4 h-4" />
                <span className="text-sm">Opened {brochure.openCount}x</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-400">
                <X className="w-4 h-4" />
                <span className="text-sm">Not opened</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
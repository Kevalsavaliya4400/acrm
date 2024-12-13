import React from 'react';
import { format } from 'date-fns';
import { Phone, Mail, Calendar, DollarSign, Circle } from 'lucide-react';
import type { Lead } from '../../types';
import { SourceTag } from './SourceTag';

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

export function LeadCard({ lead, onClick }: LeadCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900">{lead.name}</h4>
            {!lead.optin_viewed_at && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Circle className="w-2 h-2 fill-blue-600" fill="currentColor" />
                New
              </span>
            )}
          </div>
          <SourceTag source={lead.source} className="mt-1" />
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium relative">
          {lead.name.charAt(0)}
          {!lead.optin_viewed_at && (
            <Circle 
              className="absolute -top-1 -right-1 w-3 h-3 fill-blue-600 text-blue-600" 
              fill="currentColor"
            />
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4" />
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{lead.phone}</span>
        </div>
        {lead.budget && (
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span>${lead.budget.toLocaleString()}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Follow-up: {format(new Date(lead.next_followup), 'MMM d')}</span>
        </div>
      </div>
    </div>
  );
}
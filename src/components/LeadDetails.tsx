import React from 'react';
import { User, Mail, Phone, DollarSign, Home, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { Lead } from '../types';
import { ConversationReport } from './ConversationReport';
import { AIAnalytics } from './AIAnalytics';

interface LeadDetailsProps {
  lead: Lead;
}

export function LeadDetails({ lead }: LeadDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Lead Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{lead.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{lead.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{lead.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Budget</p>
              <p className="font-medium">
                {lead.budget ? `$${lead.budget.toLocaleString()}` : 'Not specified'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Home className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Property Interest</p>
              <p className="font-medium">{lead.property_interest || 'Not specified'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Next Follow-up</p>
              <p className="font-medium">
                {format(new Date(lead.next_followup), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AIAnalytics lead={lead} />
      <ConversationReport lead={lead} />
    </div>
  );
}
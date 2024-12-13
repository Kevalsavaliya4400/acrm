import React from 'react';
import { ArrowUpDown, Phone, Mail, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { SourceTag } from './SourceTag';
import { getRelativeTime } from '../../utils/timeUtils';
import type { Lead } from '../../types';

interface LeadTableProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

export function LeadTable({ leads, onSelectLead }: LeadTableProps) {
  const handleLeadClick = (lead: Lead) => {
    onSelectLead(lead);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Name
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Follow-up
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleLeadClick(lead)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium relative">
                      {lead.name.charAt(0)}
                      {!lead.optin_viewed_at && (
                        <Circle 
                          className="absolute -top-1 -right-1 w-3 h-3 fill-blue-600 text-blue-600" 
                          fill="currentColor"
                        />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {lead.name}
                        {!lead.optin_viewed_at && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Circle className="w-2 h-2 fill-blue-600" fill="currentColor" />
                            New
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        Added {getRelativeTime(lead.created_at)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{lead.email}</div>
                  <div className="text-sm text-gray-500">{lead.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    lead.status === 'new' ? 'bg-green-100 text-green-800' :
                    lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                    lead.status === 'qualified' ? 'bg-purple-100 text-purple-800' :
                    lead.status === 'proposal' ? 'bg-yellow-100 text-yellow-800' :
                    lead.status === 'negotiation' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SourceTag 
                    source={lead.source}
                    className="bg-gray-100 text-gray-800"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(lead.created_at), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(lead.next_followup), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-gray-400 hover:text-blue-600"
                      title="Call"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-gray-400 hover:text-purple-600"
                      title="Email"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
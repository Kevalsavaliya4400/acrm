import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import type { Lead } from '../../types';

interface LeadTableProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

export function LeadTable({ leads, onSelectLead }: LeadTableProps) {
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
                Next Follow-up
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onSelectLead(lead)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                      {lead.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{lead.name}</div>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {lead.source}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(lead.next_followup), 'MMM d, yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
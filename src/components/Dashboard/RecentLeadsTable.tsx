import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { SourceTag } from '../Leads/SourceTag';
import { getRelativeTime } from '../../utils/timeUtils';
import type { Lead } from '../../types';

interface RecentLeadsTableProps {
  leads: Lead[];
}

export function RecentLeadsTable({ leads }: RecentLeadsTableProps) {
  const navigate = useNavigate();
  const recentLeads = leads
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
          <button
            onClick={() => navigate('/leads')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View all
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Added
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Follow-up
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentLeads.map((lead) => (
              <tr 
                key={lead.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/leads/${lead.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">{lead.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SourceTag source={lead.source} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium
                    ${lead.status === 'new' ? 'bg-green-100 text-green-800' :
                    lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                    lead.status === 'qualified' ? 'bg-purple-100 text-purple-800' :
                    lead.status === 'proposal' ? 'bg-yellow-100 text-yellow-800' :
                    lead.status === 'negotiation' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'}`}
                  >
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getRelativeTime(lead.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {format(new Date(lead.next_followup), 'MMM d')}
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
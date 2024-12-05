import React from 'react';
import { motion } from 'framer-motion';
import type { Lead } from '../../types';
import { LeadCard } from './LeadCard';

interface PipelineViewProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

export function PipelineView({ leads, onSelectLead }: PipelineViewProps) {
  const statusColumns = [
    { status: 'new', label: 'New Leads' },
    { status: 'contacted', label: 'Contacted' },
    { status: 'qualified', label: 'Qualified' },
    { status: 'proposal', label: 'Proposal' },
    { status: 'negotiation', label: 'Negotiation' },
    { status: 'closed', label: 'Closed' },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {statusColumns.map(({ status, label }) => {
        const columnLeads = leads.filter((lead) => lead.status === status);
        
        return (
          <div
            key={status}
            className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">{label}</h3>
              <span className="text-sm font-medium text-gray-500">
                {columnLeads.length}
              </span>
            </div>
            
            <div className="space-y-3">
              {columnLeads.map((lead) => (
                <motion.div
                  key={lead.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <LeadCard lead={lead} onClick={() => onSelectLead(lead)} />
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
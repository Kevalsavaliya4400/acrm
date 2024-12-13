import React from 'react';
import { motion } from 'framer-motion';
import type { Lead } from '../../types';

interface ConversionFunnelProps {
  leads: Lead[];
}

export function ConversionFunnel({ leads }: ConversionFunnelProps) {
  const stages = [
    { status: 'new', label: 'New Leads' },
    { status: 'contacted', label: 'Contacted' },
    { status: 'qualified', label: 'Qualified' },
    { status: 'proposal', label: 'Proposal' },
    { status: 'negotiation', label: 'Negotiation' },
    { status: 'closed', label: 'Closed' },
  ];

  const leadsByStage = stages.map(stage => ({
    ...stage,
    count: leads.filter(lead => lead.status === stage.status).length,
    percentage: (leads.filter(lead => lead.status === stage.status).length / leads.length) * 100,
  }));

  const maxCount = Math.max(...leadsByStage.map(stage => stage.count));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
      <div className="space-y-4">
        {leadsByStage.map((stage, index) => (
          <div key={stage.status} className="relative">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{stage.label}</span>
              <span className="text-sm text-gray-500">
                {stage.count} ({stage.percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stage.count / maxCount) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`h-full rounded-full ${
                  index === stages.length - 1 ? 'bg-green-500' : 'bg-blue-500'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
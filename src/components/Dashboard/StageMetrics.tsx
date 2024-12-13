import React from 'react';
import { motion } from 'framer-motion';
import type { Lead } from '../../types';

interface StageMetricsProps {
  leads: Lead[];
}

export function StageMetrics({ leads }: StageMetricsProps) {
  const stages = [
    { status: 'new', label: 'New Leads' },
    { status: 'contacted', label: 'Contacted' },
    { status: 'qualified', label: 'Qualified' },
    { status: 'proposal', label: 'Proposal' },
    { status: 'negotiation', label: 'Negotiation' },
    { status: 'closed', label: 'Closed' }
  ];

  const getStageMetrics = () => {
    const metrics = stages.map(stage => ({
      ...stage,
      count: leads.filter(lead => lead.status === stage.status).length,
      percentage: (leads.filter(lead => lead.status === stage.status).length / leads.length) * 100
    }));

    return metrics;
  };

  const stageMetrics = getStageMetrics();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Pipeline Stages</h2>

      <div className="space-y-4">
        {stageMetrics.map((stage, index) => (
          <div key={stage.status}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-600">{stage.label}</span>
              <span className="text-sm text-gray-500">
                {stage.count} ({stage.percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stage.percentage}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`h-full rounded-full ${
                  stage.status === 'closed' ? 'bg-green-500' :
                  stage.status === 'negotiation' ? 'bg-orange-500' :
                  stage.status === 'proposal' ? 'bg-yellow-500' :
                  stage.status === 'qualified' ? 'bg-purple-500' :
                  stage.status === 'contacted' ? 'bg-blue-500' :
                  'bg-gray-500'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
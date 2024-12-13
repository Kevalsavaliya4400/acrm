import React from 'react';
import { AlertCircle } from 'lucide-react';
import type { Lead } from '../../types';
import { generateLeadInsights } from '../../utils/leadScoring';

interface AIInsightsProps {
  lead: Lead;
}

export function AIInsights({ lead }: AIInsightsProps) {
  const insights = generateLeadInsights(lead);

  return (
    <div className="bg-purple-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="w-5 h-5 text-purple-500" />
        <h4 className="font-medium">Key Insights</h4>
      </div>
      <ul className="space-y-2">
        {insights.map((insight, index) => (
          <li key={index} className="text-sm text-purple-700 flex items-start gap-2">
            <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-purple-500" />
            {insight}
          </li>
        ))}
        {insights.length === 0 && (
          <li className="text-sm text-purple-700">
            All key information collected. Lead is progressing well.
          </li>
        )}
      </ul>
    </div>
  );
}
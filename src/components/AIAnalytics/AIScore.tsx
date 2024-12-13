import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { Lead } from '../../types';
import { calculateLeadScore } from '../../utils/leadScoring';

interface AIScoreProps {
  lead: Lead;
}

export function AIScore({ lead }: AIScoreProps) {
  const leadScore = calculateLeadScore(lead);

  return (
    <div className="bg-purple-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-5 h-5 text-purple-500" />
        <h4 className="font-medium">Lead Score</h4>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-purple-700">{leadScore}</div>
        <div className="text-sm text-purple-600">/100</div>
      </div>
    </div>
  );
}
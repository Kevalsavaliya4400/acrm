import React from 'react';
import { Brain } from 'lucide-react';
import type { Lead } from '../../types';
import { AIScore } from './AIScore';
import { AIInsights } from './AIInsights';

interface AIAnalyticsProps {
  lead: Lead;
}

export function AIAnalytics({ lead }: AIAnalyticsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-purple-500" />
        <h3 className="text-lg font-semibold">AI Analytics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AIScore lead={lead} />
        <AIInsights lead={lead} />
      </div>
    </div>
  );
}
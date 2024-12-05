import React from 'react';
import { Brain, TrendingUp, AlertCircle } from 'lucide-react';
import type { Lead } from '../../types';

interface AIInsightsPopupProps {
  lead: Lead;
  position: { x: number; y: number };
  onClose: () => void;
}

export function AIInsightsPopup({ lead, position, onClose }: AIInsightsPopupProps) {
  const leadScore = calculateLeadScore(lead);
  const insights = generateInsights(lead);

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-xl p-6 w-96"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          <h3 className="text-lg font-semibold">AI Insights</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
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

        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-purple-500" />
            <h4 className="font-medium">Key Insights</h4>
          </div>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-purple-700">
                <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-purple-500" />
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function calculateLeadScore(lead: Lead): number {
  let score = 0;
  
  if (lead.email) score += 20;
  if (lead.phone) score += 20;
  if (lead.property_interest) score += 15;
  if (lead.budget) score += 15;
  if (lead.notes) score += 10;
  
  const daysSinceLastContact = Math.floor(
    (new Date().getTime() - new Date(lead.last_contact).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysSinceLastContact < 7) score += 20;
  
  return score;
}

function generateInsights(lead: Lead): string[] {
  const insights: string[] = [];
  
  const daysSinceLastContact = Math.floor(
    (new Date().getTime() - new Date(lead.last_contact).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysSinceLastContact > 7) {
    insights.push('Follow-up required: No contact in the past week');
  }
  
  if (lead.status === 'new' && !lead.property_interest) {
    insights.push('Missing property preferences - Important to collect during next contact');
  }
  
  if (lead.status === 'qualified' && !lead.budget) {
    insights.push('Budget information needed to move forward');
  }
  
  return insights;
}
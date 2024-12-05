import React from 'react';
import { Brain, TrendingUp, AlertCircle } from 'lucide-react';
import type { Lead } from '../types';

interface AIAnalyticsProps {
  lead: Lead;
}

export function AIAnalytics({ lead }: AIAnalyticsProps) {
  // Calculate lead score based on various factors
  const calculateLeadScore = (lead: Lead): number => {
    let score = 0;
    
    // Score based on completeness of information
    if (lead.email) score += 20;
    if (lead.phone) score += 20;
    if (lead.property_interest) score += 15;
    if (lead.budget) score += 15;
    if (lead.notes) score += 10;
    
    // Score based on engagement level
    const daysSinceLastContact = Math.floor(
      (new Date().getTime() - new Date(lead.last_contact).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceLastContact < 7) score += 20;
    
    return score;
  };

  const leadScore = calculateLeadScore(lead);
  
  // Generate insights based on lead data
  const generateInsights = (lead: Lead): string[] => {
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
  };

  const insights = generateInsights(lead);

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-purple-500" />
        <h3 className="text-lg font-semibold">AI Analytics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}
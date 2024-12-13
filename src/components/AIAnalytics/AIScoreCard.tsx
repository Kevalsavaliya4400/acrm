import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { AIInsightsPopup } from './AIInsightsPopup';
import type { Lead } from '../../types';

interface AIScoreCardProps {
  lead: Lead;
}

export function AIScoreCard({ lead }: AIScoreCardProps) {
  const [showInsights, setShowInsights] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.right + 10,
      y: rect.top,
    });
    setShowInsights(true);
  };

  return (
    <div className="relative">
      <div
        className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowInsights(false)}
      >
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          <span className="font-medium">AI Score</span>
        </div>
        <div className="mt-2 text-2xl font-bold text-purple-700">
          {calculateLeadScore(lead)}/100
        </div>
      </div>

      {showInsights && (
        <AIInsightsPopup
          lead={lead}
          position={position}
          onClose={() => setShowInsights(false)}
        />
      )}
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
import type { Lead } from '../types';

export function calculateLeadScore(lead: Lead): number {
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
}

export function generateLeadInsights(lead: Lead): string[] {
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
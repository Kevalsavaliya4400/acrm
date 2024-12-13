import { addDays } from 'date-fns';
import type { Lead } from '../types';

export const INITIAL_FOLLOWUP_DAYS = 3;
export const EXTENSION_DAYS = 2;

export function calculateInitialFollowupDate(): string {
  return addDays(new Date(), INITIAL_FOLLOWUP_DAYS).toISOString();
}

export function calculateExtendedFollowupDate(currentFollowup: string): string {
  return addDays(new Date(currentFollowup), EXTENSION_DAYS).toISOString();
}

export function isOverdue(lead: Lead): boolean {
  const followupDate = new Date(lead.next_followup);
  const now = new Date();
  return followupDate < now;
}

export function getOverdueLeads(leads: Lead[]): Lead[] {
  return leads.filter(isOverdue);
}
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  source: string;
  notes: string;
  created_at: string;
  last_contact: string;
  next_followup: string;
  property_interest?: string;
  budget?: number;
}

export interface Conversation {
  id: string;
  lead_id: string;
  date: string;
  type: 'call' | 'email' | 'meeting';
  notes: string;
  outcome: string;
}

export interface Analytics {
  total_leads: number;
  conversion_rate: number;
  average_response_time: number;
  leads_by_source: Record<string, number>;
  leads_by_status: Record<string, number>;
}
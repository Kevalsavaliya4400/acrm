export interface Lead {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'deleted';
  source: string;
  notes?: string;
  created_at: string;
  last_contact: string;
  next_followup: string;
  property_interest?: string;
  budget?: number;
  location?: string;
  deleted_at?: string;
  optin_status: boolean;
  optin_viewed_at?: string;
}

// ... rest of the types remain the same
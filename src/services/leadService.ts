import { supabase } from '../lib/supabase';
import type { Lead, Analytics } from '../types';

export const leadService = {
  async getLeads() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Lead[];
  },

  async createLead(lead: Omit<Lead, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('leads')
      .insert([{ ...lead, created_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data as Lead;
  },

  async updateLead(id: string, updates: Partial<Lead>) {
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Lead;
  },

  async getLeadAnalytics(): Promise<Analytics> {
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*');
    
    if (error) throw error;
    
    const leads_by_status = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const leads_by_source = leads.reduce((acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate average response time (in hours)
    const response_times = leads.map(lead => {
      const created = new Date(lead.created_at);
      const contacted = new Date(lead.last_contact);
      return (contacted.getTime() - created.getTime()) / (1000 * 60 * 60);
    });

    const average_response_time = response_times.length
      ? response_times.reduce((a, b) => a + b, 0) / response_times.length
      : 0;

    return {
      total_leads: leads.length,
      conversion_rate: (leads_by_status.closed || 0) / leads.length,
      average_response_time,
      leads_by_source,
      leads_by_status,
    };
  }
};
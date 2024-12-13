import { supabase } from '../lib/supabase';
import type { Lead } from '../types';

export const facebookAdsService = {
  async handleWebhook(payload: any) {
    const { data: leadData } = payload;
    
    // Create lead from Facebook Ads data
    const lead: Omit<Lead, 'id' | 'created_at'> = {
      name: `${leadData.first_name} ${leadData.last_name}`,
      email: leadData.email,
      phone: leadData.phone || '',
      status: 'new',
      source: 'facebook-ads',
      notes: `Lead from Facebook Ad Campaign: ${leadData.campaign_name}`,
      last_contact: new Date().toISOString(),
      next_followup: new Date().toISOString(),
      property_interest: leadData.property_type || '',
      budget: leadData.budget ? parseFloat(leadData.budget) : undefined
    };

    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getCampaignStats() {
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .eq('source', 'facebook-ads');

    if (error) throw error;

    const stats = {
      total_leads: leads.length,
      conversion_rate: leads.filter(l => l.status === 'closed').length / leads.length,
      campaigns: {} as Record<string, number>
    };

    leads.forEach(lead => {
      const campaign = lead.notes.match(/Campaign: (.+)$/)?.[1] || 'Unknown';
      stats.campaigns[campaign] = (stats.campaigns[campaign] || 0) + 1;
    });

    return stats;
  }
};
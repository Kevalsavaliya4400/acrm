import { supabase, handleSupabaseError, withErrorHandling } from '../lib/supabase';
import { calculateInitialFollowupDate } from '../utils/followupUtils';
import type { Lead } from '../types';

export const leadService = {
  async getLeads() {
    return withErrorHandling(async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Lead[];
    });
  },

  async createLead(lead: Omit<Lead, 'id' | 'created_at' | 'optin_status' | 'optin_viewed_at' | 'user_id'>) {
    return withErrorHandling(async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('leads')
        .insert([{ 
          ...lead,
          user_id: user.id,
          created_at: new Date().toISOString(),
          optin_status: false,
          next_followup: calculateInitialFollowupDate()
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data as Lead;
    });
  },

  async updateLead(id: string, updates: Partial<Lead>) {
    return withErrorHandling(async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Lead;
    });
  },

  async deleteLead(id: string) {
    return withErrorHandling(async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
    });
  }
};
import { supabase, handleSupabaseError } from '../lib/supabase';
import type { LeadSource, AppSettings } from '../types';

export const settingsService = {
  async getSettings(): Promise<AppSettings> {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as AppSettings;
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async getLeadSources(): Promise<LeadSource[]> {
    try {
      const { data, error } = await supabase
        .from('lead_sources')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as LeadSource[];
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async createLeadSource(source: Omit<LeadSource, 'id' | 'created_at' | 'user_id'>): Promise<LeadSource> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('lead_sources')
        .insert([{ 
          ...source, 
          user_id: user.id,
          created_at: new Date().toISOString() 
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data as LeadSource;
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async updateLeadSource(id: string, updates: Partial<LeadSource>): Promise<LeadSource> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('lead_sources')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id) // Ensure we only update user's own records
        .select()
        .single();
      
      if (error) throw error;
      return data as LeadSource;
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async deleteLeadSource(id: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('lead_sources')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // Ensure we only delete user's own records
      
      if (error) throw error;
    } catch (error) {
      throw handleSupabaseError(error);
    }
  }
};
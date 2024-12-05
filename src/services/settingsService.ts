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

  async createLeadSource(source: Omit<LeadSource, 'id' | 'created_at'>): Promise<LeadSource> {
    try {
      const { data, error } = await supabase
        .from('lead_sources')
        .insert([{ ...source, created_at: new Date().toISOString() }])
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
      const { data, error } = await supabase
        .from('lead_sources')
        .update(updates)
        .eq('id', id)
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
      const { error } = await supabase
        .from('lead_sources')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      throw handleSupabaseError(error);
    }
  }
};
import { supabase, handleSupabaseError, withConnectionCheck } from '../lib/supabase';
import { calculateInitialFollowupDate, calculateExtendedFollowupDate } from '../utils/followupUtils';
import type { Lead, Analytics } from '../types';

export const leadService = {
  async getLeads() {
    try {
      return await withConnectionCheck(async () => {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .is('deleted_at', null)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data as Lead[];
      });
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async getDeletedLeads() {
    try {
      return await withConnectionCheck(async () => {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .not('deleted_at', 'is', null)
          .order('deleted_at', { ascending: false });
        
        if (error) throw error;
        return data as Lead[];
      });
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async createLead(lead: Omit<Lead, 'id' | 'created_at' | 'optin_status' | 'optin_viewed_at'>) {
    try {
      return await withConnectionCheck(async () => {
        const { data, error } = await supabase
          .from('leads')
          .insert([{ 
            ...lead, 
            created_at: new Date().toISOString(),
            optin_status: false,
            next_followup: calculateInitialFollowupDate()
          }])
          .select()
          .single();
        
        if (error) throw error;
        return data as Lead;
      });
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async updateLead(id: string, updates: Partial<Lead>) {
    try {
      return await withConnectionCheck(async () => {
        let followupDate = updates.next_followup;
        
        if (!followupDate && updates.status !== 'closed') {
          const { data: currentLead } = await supabase
            .from('leads')
            .select('next_followup')
            .eq('id', id)
            .single();
            
          if (currentLead) {
            followupDate = calculateExtendedFollowupDate(currentLead.next_followup);
          }
        }

        const formattedUpdates = {
          ...updates,
          next_followup: followupDate ? new Date(followupDate).toISOString() : undefined,
          last_contact: updates.last_contact ? new Date(updates.last_contact).toISOString() : undefined,
          optin_viewed_at: !updates.optin_viewed_at && updates.optin_status ? new Date().toISOString() : updates.optin_viewed_at
        };

        const { data, error } = await supabase
          .from('leads')
          .update(formattedUpdates)
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return data as Lead;
      });
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async softDeleteLead(id: string) {
    try {
      // First check if the lead exists
      const { data: existingLead, error: checkError } = await supabase
        .from('leads')
        .select('id')
        .eq('id', id)
        .single();

      if (checkError) {
        throw new Error('Lead not found');
      }

      // Then perform the soft delete
      const { data, error } = await supabase
        .from('leads')
        .update({
          status: 'deleted',
          deleted_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw new Error(`Failed to delete lead: ${error.message}`);
      }

      return data as Lead;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete lead';
      throw new Error(message);
    }
  },

  async restoreLead(id: string) {
    try {
      // First check if the lead exists and is deleted
      const { data: existingLead, error: checkError } = await supabase
        .from('leads')
        .select('id, deleted_at')
        .eq('id', id)
        .single();

      if (checkError || !existingLead) {
        throw new Error('Lead not found');
      }

      if (!existingLead.deleted_at) {
        throw new Error('Lead is not deleted');
      }

      // Then perform the restore
      const { data, error } = await supabase
        .from('leads')
        .update({
          status: 'new',
          deleted_at: null
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw new Error(`Failed to restore lead: ${error.message}`);
      }

      return data as Lead;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to restore lead';
      throw new Error(message);
    }
  },

  async permanentlyDeleteLead(id: string) {
    try {
      // First check if the lead exists and is soft-deleted
      const { data: existingLead, error: checkError } = await supabase
        .from('leads')
        .select('id, deleted_at')
        .eq('id', id)
        .single();

      if (checkError || !existingLead) {
        throw new Error('Lead not found');
      }

      if (!existingLead.deleted_at) {
        throw new Error('Lead must be soft-deleted first');
      }

      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error(`Failed to permanently delete lead: ${error.message}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to permanently delete lead';
      throw new Error(message);
    }
  },

  async cleanupOldDeletedLeads() {
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    try {
      await withConnectionCheck(async () => {
        const { data: expiredLeads, error: fetchError } = await supabase
          .from('leads')
          .select('id')
          .lt('deleted_at', fifteenDaysAgo.toISOString())
          .not('deleted_at', 'is', null);

        if (fetchError) throw fetchError;

        if (expiredLeads && expiredLeads.length > 0) {
          const { error: deleteError } = await supabase
            .from('leads')
            .delete()
            .in('id', expiredLeads.map(lead => lead.id));

          if (deleteError) throw deleteError;
        }
      });
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async getLeadAnalytics(): Promise<Analytics> {
    try {
      return await withConnectionCheck(async () => {
        const { data: leads, error } = await supabase
          .from('leads')
          .select('*')
          .is('deleted_at', null);
        
        if (error) throw error;
        
        const leads_by_status = leads.reduce((acc, lead) => {
          acc[lead.status] = (acc[lead.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const leads_by_source = leads.reduce((acc, lead) => {
          acc[lead.source] = (acc[lead.source] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

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
      });
    } catch (error) {
      throw handleSupabaseError(error);
    }
  }
};
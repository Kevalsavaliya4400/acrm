import { handleSupabaseError, withConnectionCheck } from '../../lib/supabase';
import { leadQueries } from './leadQueries';
import { leadValidation } from './leadValidation';
import { calculateInitialFollowupDate, calculateExtendedFollowupDate } from '../../utils/followupUtils';
import type { Lead } from '../../types';
import type { CreateLeadDTO, UpdateLeadDTO } from './types';

export const leadService = {
  async getLeads() {
    try {
      return await withConnectionCheck(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await leadQueries.getAll(user.id);
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
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await leadQueries.getDeleted(user.id);
        if (error) throw error;
        return data as Lead[];
      });
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async createLead(leadData: CreateLeadDTO) {
    try {
      const validationError = leadValidation.validateCreate(leadData);
      if (validationError) throw new Error(validationError);

      return await withConnectionCheck(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await leadQueries.create(user.id, {
          ...leadData,
          next_followup: calculateInitialFollowupDate()
        });
        if (error) throw error;
        return data as Lead;
      });
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async updateLead(id: string, updates: UpdateLeadDTO) {
    try {
      const validationError = leadValidation.validateUpdate(updates);
      if (validationError) throw new Error(validationError);

      return await withConnectionCheck(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        let followupDate = updates.next_followup;
        
        if (!followupDate && updates.status !== 'closed') {
          const { data: currentLead } = await leadQueries.update(user.id, id, {});
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

        const { data, error } = await leadQueries.update(user.id, id, formattedUpdates);
        if (error) throw error;
        return data as Lead;
      });
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async softDeleteLead(id: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: existingLead, error: checkError } = await leadQueries.update(user.id, id, {});
      if (checkError || !existingLead) {
        throw new Error('Lead not found');
      }

      const { data, error } = await leadQueries.softDelete(user.id, id);
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: existingLead, error: checkError } = await leadQueries.update(user.id, id, {});
      if (checkError || !existingLead) {
        throw new Error('Lead not found');
      }

      if (!existingLead.deleted_at) {
        throw new Error('Lead is not deleted');
      }

      const { data, error } = await leadQueries.restore(user.id, id);
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: existingLead, error: checkError } = await leadQueries.update(user.id, id, {});
      if (checkError || !existingLead) {
        throw new Error('Lead not found');
      }

      if (!existingLead.deleted_at) {
        throw new Error('Lead must be soft-deleted first');
      }

      const { error } = await leadQueries.permanentDelete(user.id, id);
      if (error) {
        throw new Error(`Failed to permanently delete lead: ${error.message}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to permanently delete lead';
      throw new Error(message);
    }
  }
};
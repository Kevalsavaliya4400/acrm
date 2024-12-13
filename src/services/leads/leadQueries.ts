import { supabase } from '../../lib/supabase';
import type { Lead } from '../../types';
import type { CreateLeadDTO, UpdateLeadDTO } from './types';

export const leadQueries = {
  getAll: (userId: string) => (
    supabase
      .from('leads')
      .select('*')
      .eq('user_id', userId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
  ),

  getDeleted: (userId: string) => (
    supabase
      .from('leads')
      .select('*')
      .eq('user_id', userId)
      .not('deleted_at', 'is', null)
      .order('deleted_at', { ascending: false })
  ),

  create: (userId: string, lead: CreateLeadDTO) => (
    supabase
      .from('leads')
      .insert([{
        ...lead,
        user_id: userId,
        created_at: new Date().toISOString(),
        optin_status: false,
        last_contact: new Date().toISOString(),
        next_followup: new Date().toISOString()
      }])
      .select()
      .single()
  ),

  update: (userId: string, leadId: string, updates: UpdateLeadDTO) => (
    supabase
      .from('leads')
      .update(updates)
      .eq('id', leadId)
      .eq('user_id', userId)
      .select()
      .single()
  ),

  softDelete: (userId: string, leadId: string) => (
    supabase
      .from('leads')
      .update({
        status: 'deleted',
        deleted_at: new Date().toISOString()
      })
      .eq('id', leadId)
      .eq('user_id', userId)
      .select()
      .single()
  ),

  restore: (userId: string, leadId: string) => (
    supabase
      .from('leads')
      .update({
        status: 'new',
        deleted_at: null
      })
      .eq('id', leadId)
      .eq('user_id', userId)
      .select()
      .single()
  ),

  permanentDelete: (userId: string, leadId: string) => (
    supabase
      .from('leads')
      .delete()
      .eq('id', leadId)
      .eq('user_id', userId)
  )
};
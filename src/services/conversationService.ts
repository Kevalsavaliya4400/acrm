import { supabase } from '../lib/supabase';
import type { Conversation } from '../types';

export const conversationService = {
  async getConversations(leadId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('lead_id', leadId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data as Conversation[];
  },

  async addConversation(conversation: Omit<Conversation, 'id'>) {
    const { data, error } = await supabase
      .from('conversations')
      .insert([conversation])
      .select()
      .single();
    
    if (error) throw error;
    return data as Conversation;
  },

  async updateConversation(id: string, updates: Partial<Conversation>) {
    const { data, error } = await supabase
      .from('conversations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Conversation;
  },

  async deleteConversation(id: string) {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
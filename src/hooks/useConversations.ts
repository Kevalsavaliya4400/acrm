import { useState, useEffect } from 'react';
import { conversationService } from '../services/conversationService';
import type { Conversation } from '../types';

export function useConversations(leadId: string) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await conversationService.getConversations(leadId);
        setConversations(data);
      } catch (err) {
        setError('Failed to load conversations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [leadId]);

  const addConversation = async (conversation: Omit<Conversation, 'id'>) => {
    try {
      const newConversation = await conversationService.addConversation(conversation);
      setConversations([newConversation, ...conversations]);
    } catch (err) {
      console.error('Failed to add conversation:', err);
      throw err;
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      await conversationService.deleteConversation(id);
      setConversations(conversations.filter(c => c.id !== id));
    } catch (err) {
      console.error('Failed to delete conversation:', err);
      throw err;
    }
  };

  return {
    conversations,
    loading,
    error,
    addConversation,
    deleteConversation
  };
}
import React, { useState } from 'react';
import { X, MessageSquare, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { conversationService } from '../services/conversationService';
import { leadService } from '../services/leadService';
import type { Lead, Conversation } from '../types';

interface LeadDetailsModalProps {
  lead: Lead;
  onClose: () => void;
  onUpdate: (lead: Lead) => void;
}

export function LeadDetailsModal({ lead, onClose, onUpdate }: LeadDetailsModalProps) {
  const [newComment, setNewComment] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const conversation = await conversationService.addConversation({
        lead_id: lead.id,
        date: new Date().toISOString(),
        type: 'call',
        notes: newComment,
        outcome: 'Contacted',
      });

      const updatedLead = await leadService.updateLead(lead.id, {
        last_contact: new Date().toISOString(),
        next_followup: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });

      setConversations([conversation, ...conversations]);
      setNewComment('');
      onUpdate(updatedLead);
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold">{lead.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 p-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg border p-4">
              <h4 className="text-lg font-semibold mb-4">Lead Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{lead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{lead.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="capitalize">{lead.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Source</p>
                  <p className="capitalize">{lead.source}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Property Interest</p>
                  <p>{lead.property_interest || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p>{lead.budget ? `$${lead.budget.toLocaleString()}` : 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-4">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Conversations
              </h4>
              
              <form onSubmit={handleAddComment} className="mb-4">
                <div className="flex gap-2">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a new comment..."
                    className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-gray-500">
                        {format(new Date(conversation.date), 'MMM d, yyyy h:mm a')}
                      </p>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {conversation.type}
                      </span>
                    </div>
                    <p className="text-gray-700">{conversation.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg border p-4">
              <h4 className="text-lg font-semibold mb-4">Follow-up</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Last Contact</p>
                <p>{format(new Date(lead.last_contact), 'MMM d, yyyy')}</p>
                <p className="text-sm text-gray-500 mt-4">Next Follow-up</p>
                <p>{format(new Date(lead.next_followup), 'MMM d, yyyy')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
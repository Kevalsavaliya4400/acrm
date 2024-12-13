import React, { useState } from 'react';
import { X, Edit2 } from 'lucide-react';
import { EditLeadForm } from './Leads/EditLeadForm';
import { LeadDetails } from './LeadDetails/LeadDetails';
import { SourceTag } from './Leads/SourceTag';
import { Toast } from './Notifications/Toast';
import { leadService } from '../services/leadService';
import type { Lead } from '../types';

interface LeadDetailsModalProps {
  lead: Lead;
  onClose: () => void;
  onUpdate: (lead: Lead) => void;
}

export function LeadDetailsModal({ lead, onClose, onUpdate }: LeadDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Mark lead as viewed when modal opens
  React.useEffect(() => {
    const markAsViewed = async () => {
      if (!lead.optin_viewed_at) {
        try {
          const updatedLead = await leadService.updateLead(lead.id, {
            optin_viewed_at: new Date().toISOString()
          });
          onUpdate(updatedLead);
        } catch (error) {
          console.error('Failed to mark lead as viewed:', error);
        }
      }
    };
    markAsViewed();
  }, [lead.id, lead.optin_viewed_at]);

  const handleUpdate = async (updatedLead: Lead) => {
    try {
      await onUpdate(updatedLead);
      setToast({ message: 'Lead updated successfully', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to update lead', type: 'error' });
      throw error;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <h3 id="modal-title" className="text-xl font-semibold">{lead.name}</h3>
            <SourceTag 
              source={lead.source} 
              className="bg-blue-50 text-blue-700"
            />
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Edit lead"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-4rem)]">
          {isEditing ? (
            <EditLeadForm
              lead={lead}
              onSuccess={(updatedLead) => {
                handleUpdate(updatedLead);
                setIsEditing(false);
              }}
            />
          ) : (
            <LeadDetails
              lead={lead}
              onUpdate={handleUpdate}
            />
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
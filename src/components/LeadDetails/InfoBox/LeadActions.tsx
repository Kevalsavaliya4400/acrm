import React, { useState } from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';
import { leadService } from '../../../services/leadService';
import type { Lead } from '../../../types';

interface LeadActionsProps {
  lead: Lead;
  onDelete: () => void;
}

export function LeadActions({ lead, onDelete }: LeadActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this lead? It will be moved to the recycle bin.')) {
      try {
        await leadService.softDeleteLead(lead.id);
        onDelete();
      } catch (error) {
        console.error('Failed to delete lead:', error);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <MoreVertical className="w-5 h-5 text-gray-500" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
              Delete Lead
            </button>
          </div>
        </>
      )}
    </div>
  );
}
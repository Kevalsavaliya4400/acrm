import React from 'react';
import { FileText } from 'lucide-react';
import type { Lead } from '../../../types';

interface NotesProps {
  lead: Lead;
}

export function Notes({ lead }: NotesProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-gray-400" />
        <h3 className="text-lg font-semibold">Notes</h3>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-700 whitespace-pre-wrap">
          {lead.notes || 'No notes available.'}
        </p>
      </div>
    </div>
  );
}
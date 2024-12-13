import React from 'react';

interface LeadNotesProps {
  notes: string;
}

export function LeadNotes({ notes }: LeadNotesProps) {
  return (
    <div className="mt-6 bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Notes</h3>
      <p className="text-gray-900 whitespace-pre-wrap">{notes}</p>
    </div>
  );
}
import React from 'react';
import { LayoutGrid, Table } from 'lucide-react';

interface ViewToggleProps {
  view: 'table' | 'pipeline';
  onViewChange: (view: 'table' | 'pipeline') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg border p-1">
      <button
        onClick={() => onViewChange('table')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          view === 'table'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Table className="w-4 h-4" />
        Table
      </button>
      <button
        onClick={() => onViewChange('pipeline')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          view === 'pipeline'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        Pipeline
      </button>
    </div>
  );
}
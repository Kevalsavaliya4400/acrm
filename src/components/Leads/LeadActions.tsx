import React from 'react';
import { Plus, Search, Download, Upload, ListFilter, LayoutGrid, Table } from 'lucide-react';

interface LeadActionsProps {
  view: 'table' | 'pipeline';
  onViewChange: (view: 'table' | 'pipeline') => void;
  onAddLead: () => void;
  onSearch: (term: string) => void;
  onExport: () => void;
  onImport: () => void;
  onOpenFilters: () => void;
}

export function LeadActions({
  view,
  onViewChange,
  onAddLead,
  onSearch,
  onExport,
  onImport,
  onOpenFilters
}: LeadActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search leads..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
        <button
          onClick={() => onViewChange('table')}
          className={`p-1.5 rounded-lg ${
            view === 'table'
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Table className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewChange('pipeline')}
          className={`p-1.5 rounded-lg ${
            view === 'pipeline'
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
        <button
          onClick={onOpenFilters}
          className="p-1.5 text-gray-500 hover:bg-gray-50 rounded-lg"
        >
          <ListFilter className="w-4 h-4" />
        </button>
        <button
          onClick={onExport}
          className="p-1.5 text-gray-500 hover:bg-gray-50 rounded-lg"
        >
          <Download className="w-4 h-4" />
        </button>
        <button
          onClick={onImport}
          className="p-1.5 text-gray-500 hover:bg-gray-50 rounded-lg"
        >
          <Upload className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={onAddLead}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors ml-3"
      >
        <Plus className="w-4 h-4" />
        Add Lead
      </button>
    </div>
  );
}
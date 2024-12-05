import React from 'react';
import { Plus, Search, Download, Upload } from 'lucide-react';

interface LeadTableActionsProps {
  onAddLead: () => void;
  onSearch: (term: string) => void;
  onExport: () => void;
  onImport: () => void;
}

export function LeadTableActions({
  onAddLead,
  onSearch,
  onExport,
  onImport
}: LeadTableActionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leads by name, email, or phone..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <button
              onClick={onExport}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200"
              title="Export Leads"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onImport}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200"
              title="Import Leads"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onAddLead}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Lead</span>
          </button>
        </div>
      </div>
    </div>
  );
}
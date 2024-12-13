import React, { useState } from 'react';
import { X, Calendar, Search } from 'lucide-react';
import { format } from 'date-fns';

interface FilterState {
  status: string;
  source: string;
  startDate: string;
  endDate: string;
  minBudget: string;
  maxBudget: string;
  highPriority: boolean;
  location: string;
}

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export function AdvancedFilters({ isOpen, onClose, onApplyFilters }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: '',
    source: '',
    startDate: '',
    endDate: '',
    minBudget: '',
    maxBudget: '',
    highPriority: false,
    location: ''
  });

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      status: '',
      source: '',
      startDate: '',
      endDate: '',
      minBudget: '',
      maxBudget: '',
      highPriority: false,
      location: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold">Advanced Filters</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lead Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
              <select
                value={filters.source}
                onChange={(e) => setFilters(f => ({ ...f, source: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Sources</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="zillow">Zillow</option>
                <option value="realtor">Realtor.com</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
                  placeholder="City, State, or Region"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters(f => ({ ...f, startDate: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters(f => ({ ...f, endDate: e.target.value }))}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    value={filters.minBudget}
                    onChange={(e) => setFilters(f => ({ ...f, minBudget: e.target.value }))}
                    placeholder="Min"
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <span className="text-gray-500">to</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    value={filters.maxBudget}
                    onChange={(e) => setFilters(f => ({ ...f, maxBudget: e.target.value }))}
                    placeholder="Max"
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.highPriority}
                onChange={(e) => setFilters(f => ({ ...f, highPriority: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Only show high-priority leads</span>
            </label>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Reset Filters
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { Trash2, RefreshCw, AlertTriangle, Search, Filter, MoreVertical, CheckSquare, Square, ChevronDown } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { SettingsSection } from '../SettingsSection';
import { leadService } from '../../../services/leadService';
import { Toast } from '../../Notifications/Toast';
import type { Lead } from '../../../types';

export function RecycleBin() {
  const [deletedLeads, setDeletedLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    daysRemaining: 'all',
    source: 'all'
  });
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDeletedLeads = async () => {
    try {
      const leads = await leadService.getDeletedLeads();
      setDeletedLeads(leads);
    } catch (err) {
      setError('Failed to load deleted leads');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeletedLeads();
  }, []);

  const handleRestore = async (id: string) => {
    try {
      await leadService.restoreLead(id);
      setDeletedLeads(prevLeads => prevLeads.filter(lead => lead.id !== id));
      setToast({ message: 'Lead restored successfully', type: 'success' });
      setSelectedLeads(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : 'Failed to restore lead', type: 'error' });
    }
  };

  const handlePermanentDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this lead? This action cannot be undone.')) return;
    
    setIsDeleting(true);
    try {
      await leadService.permanentlyDeleteLead(id);
      setDeletedLeads(prevLeads => prevLeads.filter(lead => lead.id !== id));
      setToast({ message: 'Lead permanently deleted', type: 'success' });
      setSelectedLeads(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : 'Failed to delete lead', type: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkRestore = async () => {
    try {
      await Promise.all(Array.from(selectedLeads).map(id => leadService.restoreLead(id)));
      setDeletedLeads(prevLeads => prevLeads.filter(lead => !selectedLeads.has(lead.id)));
      setToast({ message: 'Selected leads restored successfully', type: 'success' });
      setSelectedLeads(new Set());
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : 'Failed to restore some leads', type: 'error' });
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete ${selectedLeads.size} leads? This action cannot be undone.`)) return;
    
    setIsDeleting(true);
    try {
      await Promise.all(Array.from(selectedLeads).map(id => leadService.permanentlyDeleteLead(id)));
      setDeletedLeads(prevLeads => prevLeads.filter(lead => !selectedLeads.has(lead.id)));
      setToast({ message: 'Selected leads permanently deleted', type: 'success' });
      setSelectedLeads(new Set());
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : 'Failed to delete some leads', type: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedLeads.size === filteredLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filteredLeads.map(lead => lead.id)));
    }
  };

  const getDaysRemaining = (deletedAt: string) => {
    const deleteDate = new Date(deletedAt);
    const expiryDate = new Date(deleteDate);
    expiryDate.setDate(expiryDate.getDate() + 15);
    return Math.max(0, differenceInDays(expiryDate, new Date()));
  };

  const filteredLeads = deletedLeads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const daysLeft = getDaysRemaining(lead.deleted_at!);
    const matchesDaysFilter = 
      filters.daysRemaining === 'all' ||
      (filters.daysRemaining === 'critical' && daysLeft <= 3) ||
      (filters.daysRemaining === 'normal' && daysLeft > 3);

    const matchesSource = 
      filters.source === 'all' ||
      lead.source === filters.source;

    return matchesSearch && matchesDaysFilter && matchesSource;
  });

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Recycle Bin"
        description="Manage deleted leads. Leads are permanently deleted after 15 days."
      >
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search deleted leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </button>
                  
                  {showFilters && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Days Remaining</label>
                          <select
                            value={filters.daysRemaining}
                            onChange={(e) => setFilters(prev => ({ ...prev, daysRemaining: e.target.value }))}
                            className="w-full border border-gray-300 rounded-md p-2"
                          >
                            <option value="all">All</option>
                            <option value="critical">Critical (≤ 3 days)</option>
                            <option value="normal">Normal (&gt; 3 days)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                          <select
                            value={filters.source}
                            onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
                            className="w-full border border-gray-300 rounded-md p-2"
                          >
                            <option value="all">All Sources</option>
                            {Array.from(new Set(deletedLeads.map(lead => lead.source))).map(source => (
                              <option key={source} value={source}>
                                {source.charAt(0).toUpperCase() + source.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {selectedLeads.size > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setShowActions(!showActions)}
                      className="flex items-center gap-2 px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      disabled={isDeleting}
                    >
                      <span>Actions</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {showActions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
                        <button
                          onClick={handleBulkRestore}
                          disabled={isDeleting}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Restore Selected
                        </button>
                        <button
                          onClick={handleBulkDelete}
                          disabled={isDeleting}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Selected
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Trash2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No deleted leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleSelectAll}
                          className="text-gray-400 hover:text-gray-500"
                          disabled={isDeleting}
                        >
                          {selectedLeads.size === filteredLeads.length ? (
                            <CheckSquare className="w-5 h-5" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lead
                        </span>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deleted On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days Remaining
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.map((lead) => {
                    const daysRemaining = getDaysRemaining(lead.deleted_at!);
                    const isSelected = selectedLeads.has(lead.id);

                    return (
                      <tr key={lead.id} className={isSelected ? 'bg-blue-50' : undefined}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                setSelectedLeads(prev => {
                                  const next = new Set(prev);
                                  if (isSelected) {
                                    next.delete(lead.id);
                                  } else {
                                    next.add(lead.id);
                                  }
                                  return next;
                                });
                              }}
                              disabled={isDeleting}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              {isSelected ? (
                                <CheckSquare className="w-5 h-5 text-blue-600" />
                              ) : (
                                <Square className="w-5 h-5" />
                              )}
                            </button>
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-gray-500 font-medium">
                                  {lead.name.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {lead.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {lead.email}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                            {lead.source}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(lead.deleted_at!), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {daysRemaining <= 3 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {daysRemaining} days left
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">
                              {daysRemaining} days left
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => {
                                const leadId = lead.id;
                                setDeletedLeads(prev => 
                                  prev.map(l => ({
                                    ...l,
                                    showActions: l.id === leadId ? !l.showActions : false
                                  }))
                                );
                              }}
                              disabled={isDeleting}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                            
                            {lead.showActions && (
                              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                <div className="py-1">
                                  <button
                                    onClick={() => handleRestore(lead.id)}
                                    disabled={isDeleting}
                                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                  >
                                    <RefreshCw className="w-4 h-4" />
                                    Restore
                                  </button>
                                  <button
                                    onClick={() => handlePermanentDelete(lead.id)}
                                    disabled={isDeleting}
                                    className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Permanently
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </SettingsSection>

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
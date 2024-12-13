import React, { useEffect, useState } from 'react';
import { leadService } from '../services/leadService';
import { LeadDetailsModal } from './LeadDetailsModal';
import { LeadTable } from './Leads/LeadTable';
import { LeadActions } from './Leads/LeadActions';
import { AdvancedFilters } from './Leads/AdvancedFilters';
import { ImportLeadsModal } from './Leads/ImportLeadsModal';
import { AddLeadModal } from './Leads/AddLeadModal';
import { Toast } from './Notifications/Toast';
import { ViewToggle } from './Leads/ViewToggle';
import { PipelineView } from './Leads/PipelineView';
import { Pagination } from './Leads/Pagination';
import { DateGrouping } from './Leads/DateGrouping';
import { exportLeadsToCSV } from '../utils/csvHelpers';
import type { Lead } from '../types';

interface LeadListProps {
  filterFn?: (leads: Lead[]) => Lead[];
}

export function LeadList({ filterFn }: LeadListProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [filters, setFilters] = useState<any>({});
  const [view, setView] = useState<'table' | 'pipeline'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const fetchLeads = async () => {
    try {
      const data = await leadService.getLeads();
      setLeads(data);
    } catch (err) {
      setError('Failed to load leads');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLeadAdded = async () => {
    await fetchLeads();
    setShowAddModal(false);
    setToast({ message: 'Lead added successfully', type: 'success' });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleExport = () => {
    try {
      exportLeadsToCSV(filteredLeads);
      setToast({ message: 'Leads exported successfully', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to export leads', type: 'error' });
    }
  };

  const handleImport = async (importedLeads: Partial<Lead>[]) => {
    try {
      for (const lead of importedLeads) {
        await leadService.createLead(lead as Omit<Lead, 'id' | 'created_at'>);
      }
      await fetchLeads();
      setShowImportModal(false);
      setToast({ message: 'Leads imported successfully', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to import leads', type: 'error' });
      throw err;
    }
  };

  let filteredLeads = leads.filter(lead => {
    const matchesSearch = searchTerm === '' || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filters.status || lead.status === filters.status;
    const matchesSource = !filters.source || lead.source === filters.source;
    const matchesLocation = !filters.location || 
      lead.location?.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesBudget = (!filters.minBudget || (lead.budget && lead.budget >= Number(filters.minBudget))) &&
      (!filters.maxBudget || (lead.budget && lead.budget <= Number(filters.maxBudget)));

    const matchesDate = (!filters.startDate || new Date(lead.created_at) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(lead.created_at) <= new Date(filters.endDate));

    return matchesSearch && matchesStatus && matchesSource && matchesLocation && 
           matchesBudget && matchesDate;
  });

  // Apply custom filter if provided
  if (filterFn) {
    filteredLeads = filterFn(filteredLeads);
  }

  const totalPages = Math.ceil(filteredLeads.length / pageSize);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
      <div className="flex items-center justify-between">
        <DateGrouping leads={filteredLeads} />
        <LeadActions
          view={view}
          onViewChange={setView}
          onAddLead={() => setShowAddModal(true)}
          onSearch={handleSearch}
          onExport={handleExport}
          onImport={() => setShowImportModal(true)}
          onOpenFilters={() => setShowAdvancedFilters(true)}
        />
      </div>

      <div className="max-w-[2000px] mx-auto">
        {view === 'table' ? (
          <LeadTable
            leads={paginatedLeads}
            onSelectLead={setSelectedLead}
          />
        ) : (
          <PipelineView
            leads={paginatedLeads}
            onSelectLead={setSelectedLead}
          />
        )}

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            totalItems={filteredLeads.length}
          />
        </div>
      </div>

      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={(updatedLead) => {
            setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l));
            setSelectedLead(updatedLead);
            setToast({ message: 'Lead updated successfully', type: 'success' });
          }}
        />
      )}

      <AddLeadModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onLeadAdded={handleLeadAdded}
      />

      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApplyFilters={setFilters}
      />

      <ImportLeadsModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImport}
      />

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
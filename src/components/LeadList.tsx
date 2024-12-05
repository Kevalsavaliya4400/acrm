import React, { useEffect, useState } from 'react';
import { Users, Plus, Search } from 'lucide-react';
import { leadService } from '../services/leadService';
import { LeadDetailsModal } from './LeadDetailsModal';
import { LeadTable } from './Leads/LeadTable';
import type { Lead } from '../types';

export function LeadList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
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

    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading leads...</div>;
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6" />
          Leads
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Lead
          </button>
        </div>
      </div>

      <LeadTable leads={filteredLeads} onSelectLead={setSelectedLead} />

      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={(updatedLead) => {
            setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l));
            setSelectedLead(updatedLead);
          }}
        />
      )}
    </div>
  );
}
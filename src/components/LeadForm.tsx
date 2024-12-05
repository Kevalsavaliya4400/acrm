import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { leadService } from '../services/leadService';
import type { Lead } from '../types';

export function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    notes: '',
    property_interest: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await leadService.createLead({
        ...formData,
        status: 'new',
        next_followup: new Date().toISOString(),
        last_contact: new Date().toISOString(),
        budget: formData.budget ? Number(formData.budget) : undefined,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        source: '',
        notes: '',
        property_interest: '',
        budget: '',
      });
    } catch (err) {
      setError('Failed to create lead. Please try again.');
      console.error('Error creating lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <PlusCircle className="w-6 h-6" />
        Add New Lead
      </h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Source</label>
          <select
            value={formData.source}
            onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isSubmitting}
          >
            <option value="">Select source</option>
            <option value="website">Website</option>
            <option value="referral">Referral</option>
            <option value="zillow">Zillow</option>
            <option value="realtor">Realtor.com</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Property Interest</label>
          <input
            type="text"
            value={formData.property_interest}
            onChange={(e) => setFormData(prev => ({ ...prev, property_interest: e.target.value }))}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Budget</label>
          <input
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Adding Lead...' : 'Add Lead'}
        </button>
      </div>
    </form>
  );
}
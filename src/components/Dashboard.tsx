import React, { useEffect, useState } from 'react';
import { PerformanceMetrics } from './Analytics/PerformanceMetrics';
import { LeadTrendChart } from './Analytics/LeadTrendChart';
import { ConversionFunnel } from './Analytics/ConversionFunnel';
import { LeadSourceAnalytics } from './Analytics/LeadSourceAnalytics';
import { AIInsightsSummary } from './Dashboard/AIInsightsSummary';
import { FloatingAIAssistant } from './FloatingAIAssistant';
import { leadService } from '../services/leadService';
import type { Lead } from '../types';

export function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await leadService.getLeads();
        setLeads(data);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

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
    <>
      <div className="space-y-6">
        <PerformanceMetrics leads={leads} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LeadTrendChart leads={leads} />
          <LeadSourceAnalytics leads={leads} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConversionFunnel leads={leads} />
          <AIInsightsSummary leads={leads} />
        </div>
      </div>
      <FloatingAIAssistant />
    </>
  );
}
import React, { useEffect, useState } from 'react';
import { PerformanceMetrics } from './Analytics/PerformanceMetrics';
import { LeadTrendChart } from './Analytics/LeadTrendChart';
import { ConversionFunnel } from './Analytics/ConversionFunnel';
import { LeadSourceAnalytics } from './Analytics/LeadSourceAnalytics';
import { AIInsightsSummary } from './Dashboard/AIInsightsSummary';
import { FloatingAIAssistant } from './FloatingAIAssistant';
import { RecentLeadsTable } from './Dashboard/RecentLeadsTable';
import { ResponseMetrics } from './Dashboard/Metrics/ResponseMetrics';
import { StageMetrics } from './Dashboard/StageMetrics';
import { DateRangeFilter } from './Dashboard/Filters/DateRangeFilter';
import { filterLeadsByDate } from '../utils/dateFilters';
import { leadService } from '../services/leadService';
import type { Lead } from '../types';

export function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState<number | 'all'>('all');

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

  const filteredLeads = filterLeadsByDate(leads, year, month);

  return (
    <>
      <div className="space-y-6">
        <DateRangeFilter
          year={year}
          month={month}
          onYearChange={setYear}
          onMonthChange={setMonth}
        />

        <PerformanceMetrics leads={filteredLeads} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LeadTrendChart leads={filteredLeads} />
          <LeadSourceAnalytics leads={filteredLeads} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConversionFunnel leads={filteredLeads} />
          <AIInsightsSummary leads={filteredLeads} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ResponseMetrics leads={filteredLeads} />
          <StageMetrics leads={filteredLeads} />
        </div>

        <RecentLeadsTable leads={filteredLeads} />
      </div>
      <FloatingAIAssistant />
    </>
  );
}
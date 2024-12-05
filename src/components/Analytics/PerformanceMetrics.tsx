import React from 'react';
import { Users, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { AnalyticsCard } from './AnalyticsCard';
import type { Lead } from '../../types';

interface PerformanceMetricsProps {
  leads: Lead[];
}

export function PerformanceMetrics({ leads }: PerformanceMetricsProps) {
  const calculateMetrics = () => {
    const totalLeads = leads.length;
    const closedLeads = leads.filter(lead => lead.status === 'closed').length;
    const conversionRate = (closedLeads / totalLeads) * 100;

    const responseTimes = leads.map(lead => {
      const created = new Date(lead.created_at);
      const contacted = new Date(lead.last_contact);
      return (contacted.getTime() - created.getTime()) / (1000 * 60 * 60);
    });
    const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;

    const totalPotentialValue = leads.reduce((sum, lead) => sum + (lead.budget || 0), 0);

    return {
      totalLeads,
      conversionRate,
      avgResponseTime,
      totalPotentialValue
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnalyticsCard
        title="Total Leads"
        value={metrics.totalLeads}
        icon={Users}
        color="blue"
        change={12}
      />
      <AnalyticsCard
        title="Conversion Rate"
        value={`${metrics.conversionRate.toFixed(1)}%`}
        icon={TrendingUp}
        color="green"
        change={5}
      />
      <AnalyticsCard
        title="Avg. Response Time"
        value={metrics.avgResponseTime.toFixed(1)}
        description="hours"
        icon={Clock}
        color="purple"
        change={-15}
      />
      <AnalyticsCard
        title="Pipeline Value"
        value={`$${(metrics.totalPotentialValue / 1000000).toFixed(1)}M`}
        icon={DollarSign}
        color="orange"
        change={8}
      />
    </div>
  );
}
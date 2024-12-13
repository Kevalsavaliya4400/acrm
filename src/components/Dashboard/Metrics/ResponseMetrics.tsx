import React from 'react';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { differenceInHours } from 'date-fns';
import type { Lead } from '../../../types';
import { MetricCard } from './MetricCard';

interface ResponseMetricsProps {
  leads: Lead[];
}

export function ResponseMetrics({ leads }: ResponseMetricsProps) {
  const calculateMetrics = () => {
    const responseTimes = leads.map(lead => {
      const created = new Date(lead.created_at);
      const contacted = new Date(lead.last_contact);
      return differenceInHours(contacted, created);
    });

    const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    const quickResponses = responseTimes.filter(time => time <= 24).length;
    const slowResponses = responseTimes.filter(time => time > 48).length;

    return {
      avgResponseTime: Math.round(avgResponseTime),
      quickResponseRate: (quickResponses / leads.length) * 100,
      slowResponseCount: slowResponses
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Response Metrics</h2>
      
      <div className="space-y-6">
        <MetricCard
          icon={Clock}
          iconColor="blue"
          label="Average Response Time"
          value={`${metrics.avgResponseTime} hours`}
        />

        <MetricCard
          icon={CheckCircle}
          iconColor="green"
          label="24h Response Rate"
          value={`${metrics.quickResponseRate.toFixed(1)}%`}
        />

        <MetricCard
          icon={AlertTriangle}
          iconColor="red"
          label="Slow Responses (48h+)"
          value={metrics.slowResponseCount.toString()}
        />
      </div>
    </div>
  );
}
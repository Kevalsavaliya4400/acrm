import React from 'react';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { differenceInHours } from 'date-fns';
import type { Lead } from '../../types';

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Response Time</p>
              <p className="text-xl font-semibold">{metrics.avgResponseTime} hours</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">24h Response Rate</p>
              <p className="text-xl font-semibold">{metrics.quickResponseRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Slow Responses (>48h)</p>
              <p className="text-xl font-semibold">{metrics.slowResponseCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
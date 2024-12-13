import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileBarChart, ArrowUp, ArrowDown } from 'lucide-react';
import { PageHeader } from '../../components/Layout/PageHeader';
import { leadService } from '../../services/leadService';
import type { Lead } from '../../types';

interface SourceStats {
  source: string;
  total: number;
  converted: number;
  conversionRate: number;
  averageResponseTime: number;
}

export function SourceReport() {
  const [stats, setStats] = useState<SourceStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const leads = await leadService.getLeads();
        const sourceStats = calculateSourceStats(leads);
        setStats(sourceStats);
      } catch (err) {
        setError('Failed to load source statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const calculateSourceStats = (leads: Lead[]): SourceStats[] => {
    const sourceMap = new Map<string, {
      total: number;
      converted: number;
      responseTimes: number[];
    }>();

    leads.forEach(lead => {
      const stats = sourceMap.get(lead.source) || {
        total: 0,
        converted: 0,
        responseTimes: [],
      };

      stats.total++;
      if (lead.status === 'closed') {
        stats.converted++;
      }

      const responseTime = (new Date(lead.last_contact).getTime() - 
                          new Date(lead.created_at).getTime()) / (1000 * 60 * 60);
      stats.responseTimes.push(responseTime);

      sourceMap.set(lead.source, stats);
    });

    return Array.from(sourceMap.entries()).map(([source, stats]) => ({
      source: source.charAt(0).toUpperCase() + source.slice(1),
      total: stats.total,
      converted: stats.converted,
      conversionRate: (stats.converted / stats.total) * 100,
      averageResponseTime: stats.responseTimes.reduce((a, b) => a + b, 0) / stats.responseTimes.length,
    }));
  };

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
      <PageHeader
        title="Lead Source Report"
        icon={FileBarChart}
        subtitle={
          <span className="text-sm text-gray-500">
            Performance analysis by lead source
          </span>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">Conversion Rates by Source</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="conversionRate" fill="#3B82F6" name="Conversion Rate" unit="%" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Source Performance</h3>
          <div className="space-y-4">
            {stats.sort((a, b) => b.conversionRate - a.conversionRate).map((stat) => (
              <div key={stat.source} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{stat.source}</h4>
                  <span className="text-sm text-gray-500">
                    {stat.converted} / {stat.total} converted
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    {stat.conversionRate > 20 ? (
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className="font-medium">
                      {stat.conversionRate.toFixed(1)}% conversion
                    </span>
                  </div>
                  <span className="text-gray-500">
                    {stat.averageResponseTime.toFixed(1)}h avg. response
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
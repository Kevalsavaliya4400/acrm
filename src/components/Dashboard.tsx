import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { leadService } from '../services/leadService';
import { Users, TrendingUp, Phone } from 'lucide-react';
import type { Analytics } from '../types';

export function Dashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await leadService.getLeadAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data');
      }
    };
    fetchAnalytics();
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
        {error}
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  const statusData = Object.entries(analytics.leads_by_status).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="w-12 h-12 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.total_leads}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="w-12 h-12 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {((analytics.leads_by_status.closed || 0) / analytics.total_leads * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Phone className="w-12 h-12 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Follow-ups Due</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analytics.leads_by_status.contacted || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Leads by Status</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
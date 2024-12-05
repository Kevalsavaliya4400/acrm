import React from 'react';
import { Users, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Analytics } from '../../types';

interface DashboardMetricsProps {
  analytics: Analytics;
}

export function DashboardMetrics({ analytics }: DashboardMetricsProps) {
  const metrics = [
    {
      title: 'Total Leads',
      value: analytics.total_leads,
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Conversion Rate',
      value: `${(analytics.conversion_rate * 100).toFixed(1)}%`,
      change: '+5%',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Avg. Response Time',
      value: `${analytics.average_response_time.toFixed(1)}h`,
      change: '-2h',
      icon: Clock,
      color: 'purple'
    },
    {
      title: 'Revenue Pipeline',
      value: '$1.2M',
      change: '+18%',
      icon: DollarSign,
      color: 'yellow'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-lg bg-${metric.color}-50`}>
              <metric.icon className={`w-6 h-6 text-${metric.color}-500`} />
            </div>
            <span className={`text-sm font-medium ${
              metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.change}
            </span>
          </div>
          
          <div className="mt-4">
            <h3 className="text-2xl font-bold">{metric.value}</h3>
            <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
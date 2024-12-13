import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  description?: string;
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
  red: 'bg-red-50 text-red-600',
};

export function AnalyticsCard({ title, value, change, icon: Icon, color, description }: AnalyticsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {typeof change !== 'undefined' && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">{value}</span>
        {description && (
          <span className="text-sm text-gray-500">{description}</span>
        )}
      </div>
    </motion.div>
  );
}
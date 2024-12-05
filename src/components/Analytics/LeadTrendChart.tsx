import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { format, startOfMonth, eachDayOfInterval, subMonths } from 'date-fns';
import type { Lead } from '../../types';

interface LeadTrendChartProps {
  leads: Lead[];
}

export function LeadTrendChart({ leads }: LeadTrendChartProps) {
  const startDate = startOfMonth(subMonths(new Date(), 2));
  const dates = eachDayOfInterval({
    start: startDate,
    end: new Date()
  });

  const data = dates.map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return {
      date: dateStr,
      leads: leads.filter(lead => 
        format(new Date(lead.created_at), 'yyyy-MM-dd') === dateStr
      ).length
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Acquisition Trend</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={date => format(new Date(date), 'MMM d')}
              interval={Math.floor(data.length / 6)}
            />
            <YAxis />
            <Tooltip
              labelFormatter={date => format(new Date(date), 'MMM d, yyyy')}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                      <p className="font-medium text-gray-900">
                        {format(new Date(label), 'MMM d, yyyy')}
                      </p>
                      <p className="text-blue-600 font-medium">
                        {payload[0].value} new leads
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#leadGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
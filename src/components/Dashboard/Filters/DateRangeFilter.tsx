import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangeFilterProps {
  year: number;
  month: number | 'all';
  onYearChange: (year: number) => void;
  onMonthChange: (month: number | 'all') => void;
}

export function DateRangeFilter({ year, month, onYearChange, onMonthChange }: DateRangeFilterProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filter by Date:</span>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            value={month === 'all' ? 'all' : month}
            onChange={(e) => onMonthChange(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Months</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
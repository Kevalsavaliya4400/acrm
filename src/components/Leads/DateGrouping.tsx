import React, { useState } from 'react';
import { format, isToday, isYesterday, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { Calendar, ChevronDown } from 'lucide-react';
import type { Lead } from '../../types';

interface DateGroupingProps {
  leads: Lead[];
}

export function DateGrouping({ leads }: DateGroupingProps) {
  const [isOpen, setIsOpen] = useState(false);

  const groupLeadsByDate = (leads: Lead[]) => {
    const groups: Record<string, { label: string; count: number }> = {
      today: { label: 'Today', count: 0 },
      yesterday: { label: 'Yesterday', count: 0 },
      thisWeek: { label: 'This Week', count: 0 },
      thisMonth: { label: 'This Month', count: 0 },
      older: { label: 'Older', count: 0 },
    };

    leads.forEach((lead) => {
      const date = new Date(lead.created_at);
      
      if (isToday(date)) {
        groups.today.count++;
      } else if (isYesterday(date)) {
        groups.yesterday.count++;
      } else if (isWithinInterval(date, {
        start: startOfWeek(new Date()),
        end: endOfWeek(new Date())
      })) {
        groups.thisWeek.count++;
      } else if (date.getMonth() === new Date().getMonth()) {
        groups.thisMonth.count++;
      } else {
        groups.older.count++;
      }
    });

    return groups;
  };

  const groups = groupLeadsByDate(leads);
  const totalLeads = Object.values(groups).reduce((sum, group) => sum + group.count, 0);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Calendar className="w-4 h-4" />
        <span>{totalLeads} Total Leads</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="space-y-3">
            {Object.entries(groups).map(([key, { label, count }]) => (
              <div
                key={key}
                className="flex items-center justify-between text-sm"
              >
                <span className="font-medium text-gray-700">{label}</span>
                <span className="text-gray-500">{count}</span>
              </div>
            ))}
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{totalLeads}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
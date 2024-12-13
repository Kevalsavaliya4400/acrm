import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { format, addDays, addWeeks, addMonths } from 'date-fns';

interface FollowUpDatePickerProps {
  currentDate: string;
  onUpdate: (date: string) => Promise<void>;
}

export function FollowUpDatePicker({ currentDate, onUpdate }: FollowUpDatePickerProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuickUpdate = async (date: Date) => {
    setIsUpdating(true);
    try {
      await onUpdate(date.toISOString());
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-400" />
        <span className="text-sm text-gray-500">Next Follow-up:</span>
        <span className="font-medium">
          {format(new Date(currentDate), 'MMM d, yyyy')}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Tomorrow', date: addDays(new Date(), 1) },
          { label: 'Next Week', date: addWeeks(new Date(), 1) },
          { label: 'Next Month', date: addMonths(new Date(), 1) },
        ].map(({ label, date }) => (
          <button
            key={label}
            onClick={() => handleQuickUpdate(date)}
            disabled={isUpdating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            <Clock className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
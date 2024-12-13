import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { format, addDays, addWeeks, addMonths } from 'date-fns';
import { motion } from 'framer-motion';
import { leadService } from '../../../services/leadService';
import type { Lead } from '../../../types';

interface FollowUpEditorProps {
  lead: Lead;
  onUpdate: (lead: Lead) => Promise<void>;
  onCancel: () => void;
}

export function FollowUpEditor({ lead, onUpdate, onCancel }: FollowUpEditorProps) {
  const [selectedDate, setSelectedDate] = useState(format(new Date(lead.next_followup), 'yyyy-MM-dd'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const updatedLead = await leadService.updateLead(lead.id, {
        next_followup: new Date(selectedDate).toISOString()
      });
      await onUpdate(updatedLead);
      onCancel();
    } catch (error) {
      console.error('Failed to update follow-up date:', error);
      setError('Failed to update date. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickSelect = (date: Date) => {
    setSelectedDate(format(date, 'yyyy-MM-dd'));
  };

  const quickOptions = [
    { label: 'Tomorrow', date: addDays(new Date(), 1), icon: Clock },
    { label: 'Next Week', date: addWeeks(new Date(), 1), icon: Calendar },
    { label: 'Next Month', date: addMonths(new Date(), 1), icon: ArrowRight },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {quickOptions.map(({ label, date, icon: Icon }) => (
          <motion.button
            key={label}
            type="button"
            onClick={() => handleQuickSelect(date)}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon className="w-4 h-4" />
            {label}
          </motion.button>
        ))}
      </div>

      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={format(new Date(), 'yyyy-MM-dd')}
          disabled={isSubmitting}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
import React from 'react';
import { format } from 'date-fns';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => Promise<void>;
  minDate?: Date;
}

export function DatePicker({ value, onChange, minDate }: DatePickerProps) {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await onChange(new Date(e.target.value).toISOString());
    } catch (error) {
      console.error('Error updating date:', error);
    }
  };

  return (
    <input
      type="date"
      value={format(new Date(value), 'yyyy-MM-dd')}
      min={minDate ? format(minDate, 'yyyy-MM-dd') : undefined}
      onChange={handleChange}
      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
}
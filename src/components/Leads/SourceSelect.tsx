import React from 'react';
import * as Icons from 'lucide-react';
import { useLeadSources } from '../../hooks/useLeadSources';

interface SourceSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function SourceSelect({ value, onChange, disabled, required, className }: SourceSelectProps) {
  const { sources, loading } = useLeadSources();

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || loading}
        required={required}
        className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      >
        <option value="">Select source</option>
        {sources.map(source => {
          const Icon = Icons[source.icon as keyof typeof Icons] || Icons.Globe;
          return (
            <option key={source.id} value={source.name.toLowerCase()}>
              {source.name}
            </option>
          );
        })}
      </select>
      {loading && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}
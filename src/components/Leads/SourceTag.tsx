import React from 'react';
import * as Icons from 'lucide-react';
import { useLeadSources } from '../../hooks/useLeadSources';

interface SourceTagProps {
  source: string;
  className?: string;
}

export function SourceTag({ source, className = '' }: SourceTagProps) {
  const { getSourceConfig } = useLeadSources();
  const sourceConfig = getSourceConfig(source);
  const Icon = sourceConfig?.icon ? 
    (Icons[sourceConfig.icon as keyof typeof Icons] || Icons.Globe) : 
    Icons.Globe;

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}
      style={{ 
        backgroundColor: sourceConfig?.color ? `${sourceConfig.color}15` : '#E5E7EB',
        color: sourceConfig?.color || '#374151'
      }}
    >
      <Icon className="w-3.5 h-3.5" />
      {sourceConfig?.name || source.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')}
    </span>
  );
}
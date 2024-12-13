import React from 'react';
import { ExternalLink } from 'lucide-react';

interface LocationDisplayProps {
  location: string;
}

export function LocationDisplay({ location }: LocationDisplayProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium text-gray-900">{location}</span>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
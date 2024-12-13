import { LeadSource } from '../types';

// Predefined source configurations with brand colors
export const DEFAULT_LEAD_SOURCES: Omit<LeadSource, 'id' | 'created_at'>[] = [
  // Social Media
  { name: 'Facebook', icon: 'Facebook', color: '#1877F2', is_active: true },
  { name: 'Instagram', icon: 'Instagram', color: '#E4405F', is_active: true },
  { name: 'LinkedIn', icon: 'Linkedin', color: '#0A66C2', is_active: true },
  { name: 'Twitter', icon: 'Twitter', color: '#1DA1F2', is_active: true },
  { name: 'YouTube', icon: 'Youtube', color: '#FF0000', is_active: true },
  { name: 'Pinterest', icon: 'Image', color: '#E60023', is_active: true },
  { name: 'TikTok', icon: 'Video', color: '#000000', is_active: true },
  
  // Real Estate Platforms
  { name: 'Zillow', icon: 'Home', color: '#006AFF', is_active: true },
  { name: 'Realtor.com', icon: 'Building', color: '#D92228', is_active: true },
  { name: 'Trulia', icon: 'House', color: '#62DE4A', is_active: true },
  { name: 'Redfin', icon: 'Building2', color: '#A02021', is_active: true },
  
  // Marketing Channels
  { name: 'Website', icon: 'Globe', color: '#0EA5E9', is_active: true },
  { name: 'Email', icon: 'Mail', color: '#8B5CF6', is_active: true },
  { name: 'Cold Call', icon: 'Phone', color: '#EF4444', is_active: true },
  { name: 'Referral', icon: 'Users', color: '#10B981', is_active: true },
  { name: 'Open House', icon: 'Door', color: '#F59E0B', is_active: true },
  
  // Advertising
  { name: 'Google Ads', icon: 'Search', color: '#4285F4', is_active: true },
  { name: 'Bing Ads', icon: 'Search', color: '#00897B', is_active: true },
  { name: 'Display Ads', icon: 'Image', color: '#F43F5E', is_active: true },
  
  // Other
  { name: 'Direct Mail', icon: 'Mail', color: '#6366F1', is_active: true },
  { name: 'Event', icon: 'Calendar', color: '#8B5CF6', is_active: true },
  { name: 'Partner', icon: 'Handshake', color: '#059669', is_active: true }
];

// Get color for a specific source
export const getSourceColor = (source: string): string => {
  const sourceConfig = DEFAULT_LEAD_SOURCES.find(
    s => s.name.toLowerCase() === source.toLowerCase()
  );
  return sourceConfig?.color || '#64748B'; // Default color if not found
};

// Get icon for a specific source
export const getSourceIcon = (source: string): string => {
  const sourceConfig = DEFAULT_LEAD_SOURCES.find(
    s => s.name.toLowerCase() === source.toLowerCase()
  );
  return sourceConfig?.icon || 'Globe'; // Default icon if not found
};
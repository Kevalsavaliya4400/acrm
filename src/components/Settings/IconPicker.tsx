import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { Search, X } from 'lucide-react';

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  onClose: () => void;
}

// Comprehensive icon categories
const ICON_CATEGORIES = {
  'Common': [
    'Home', 'User', 'Settings', 'Mail', 'Phone', 'Calendar', 'Clock', 'Search',
    'Bell', 'Heart', 'Star', 'Flag', 'Bookmark', 'Eye', 'Lock', 'Key'
  ],
  'Business': [
    'Building', 'Briefcase', 'DollarSign', 'CreditCard', 'PieChart', 'TrendingUp',
    'BarChart', 'LineChart', 'Activity', 'Target', 'Award', 'Trophy', 'Percent',
    'Calculator', 'Wallet', 'Receipt', 'ShoppingBag', 'ShoppingCart', 'Package',
    'Gift', 'Tag', 'Tags', 'Banknote'
  ],
  'Communication': [
    'MessageSquare', 'MessageCircle', 'Mail', 'Phone', 'PhoneCall', 'Send',
    'Share2', 'Bell', 'BellRing', 'BellPlus', 'MessagesSquare', 'AtSign',
    'Hash', 'Link', 'Link2', 'Paperclip', 'Quote', 'Forward', 'Reply'
  ],
  'Social Media': [
    // Platform Icons
    'Facebook', 'Twitter', 'Instagram', 'Linkedin', 'Youtube', 'Github',
    'Twitch', 'Discord', 'Slack', 'Dribbble', 'Figma', 'Chrome', 'Rss',
    // Social Actions
    'Share', 'ThumbsUp', 'ThumbsDown', 'Heart', 'Star', 'Users', 'UserPlus',
    'UserMinus', 'UserCheck', 'Share2', 'Send', 'MessageCircle'
  ],
  'Real Estate': [
    'Home', 'Building', 'Building2', 'Warehouse', 'Hotel', 'House', 'Door',
    'Key', 'Lock', 'Map', 'MapPin', 'Navigation', 'Ruler', 'Scan', 'Search',
    'Camera', 'Image', 'Images', 'Video', 'Calendar', 'DollarSign'
  ],
  'Interface': [
    'Check', 'X', 'Plus', 'Minus', 'Search', 'Filter', 'Menu', 'MoreHorizontal',
    'MoreVertical', 'Settings', 'Sliders', 'Toggle', 'Maximize', 'Minimize',
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ChevronUp', 'ChevronDown',
    'ChevronLeft', 'ChevronRight', 'ChevronsUp', 'ChevronsDown', 'ChevronsLeft',
    'ChevronsRight'
  ],
  'Files & Data': [
    'File', 'FileText', 'FilePlus', 'FileMinus', 'FileCheck', 'FileX',
    'Files', 'Folder', 'FolderPlus', 'FolderMinus', 'FolderOpen', 'Archive',
    'Database', 'HardDrive', 'Save', 'Upload', 'Download', 'Import', 'Export',
    'Printer', 'Clipboard', 'ClipboardCheck', 'ClipboardList'
  ],
  'Analytics': [
    'BarChart', 'BarChart2', 'LineChart', 'PieChart', 'TrendingUp',
    'TrendingDown', 'Activity', 'AlertTriangle', 'AlertCircle', 'AlertOctagon',
    'ChartBar', 'ChartLine', 'ChartPie', 'Analytics', 'Gauge', 'Timer',
    'Clock', 'History'
  ],
  'Weather & Nature': [
    'Sun', 'Moon', 'Cloud', 'CloudRain', 'CloudSnow', 'CloudLightning',
    'Wind', 'Umbrella', 'Thermometer', 'Sunrise', 'Sunset', 'Tree', 'Flower',
    'Leaf', 'Mountain', 'Globe'
  ],
  'Status': [
    'CheckCircle', 'XCircle', 'AlertCircle', 'AlertTriangle', 'Info',
    'HelpCircle', 'MinusCircle', 'PlusCircle', 'Clock', 'Loader', 'Refresh',
    'RotateCw', 'RotateCcw', 'Shield', 'ShieldCheck', 'ShieldAlert'
  ],
  'Devices': [
    'Smartphone', 'Tablet', 'Laptop', 'Desktop', 'Monitor', 'Tv', 'Camera',
    'Video', 'Headphones', 'Speaker', 'Battery', 'BatteryCharging', 'Wifi',
    'Bluetooth', 'Cast', 'Airplay', 'Radio', 'Mic'
  ]
};

export function IconPicker({ value, onChange, onClose }: IconPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Common');

  // Create a map of all available icons
  const availableIcons = useMemo(() => {
    const icons: Record<string, boolean> = {};
    Object.values(ICON_CATEGORIES).flat().forEach(icon => {
      if (Icons[icon as keyof typeof Icons]) {
        icons[icon] = true;
      }
    });
    return icons;
  }, []);

  // Filter icons based on search term
  const filteredIcons = useMemo(() => {
    if (!searchTerm) {
      return ICON_CATEGORIES[selectedCategory] || [];
    }

    return Object.keys(availableIcons).filter(icon =>
      icon.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, selectedCategory, availableIcons]);

  const handleSelectIcon = (iconName: string) => {
    onChange(iconName);
    onClose();
  };

  // Preview component for the currently selected icon
  const PreviewIcon = value ? Icons[value as keyof typeof Icons] : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">Select Icon</h3>
              {PreviewIcon && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">
                  <PreviewIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">{value}</span>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-1"
              aria-label="Close icon picker"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {!searchTerm && (
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pb-2">
              {Object.keys(ICON_CATEGORIES).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {filteredIcons.map((iconName) => {
              const IconComponent = Icons[iconName as keyof typeof Icons];
              if (!IconComponent) return null;

              return (
                <button
                  key={iconName}
                  onClick={() => handleSelectIcon(iconName)}
                  className={`p-4 rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2 group ${
                    value === iconName ? 'bg-blue-50 ring-2 ring-blue-500' : ''
                  }`}
                  title={iconName}
                >
                  <IconComponent className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                  <span className="text-xs text-gray-600 truncate w-full text-center group-hover:text-blue-600">
                    {iconName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { 
  Settings, Globe, Bell, Users, Link, Shield, 
  ChevronRight, Check, Trash2
} from 'lucide-react';

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const tabs = [
    { id: 'general', label: 'General', icon: Settings, description: 'Basic CRM settings and preferences' },
    { id: 'sources', label: 'Lead Sources', icon: Globe, description: 'Manage lead source configurations' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Configure notification preferences' },
    { id: 'team', label: 'Team', icon: Users, description: 'Manage team members and roles' },
    { id: 'integrations', label: 'Integrations', icon: Link, description: 'Connect with external services' },
    { id: 'security', label: 'Security', icon: Shield, description: 'Security and privacy settings' },
    { id: 'recycle-bin', label: 'Recycle Bin', icon: Trash2, description: 'Manage deleted leads' },
  ];

  return (
    <div className="w-80 bg-white rounded-lg border border-gray-200 overflow-hidden shrink-0">
      {tabs.map(({ id, label, icon: Icon, description }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`w-full px-4 py-3 flex items-center gap-3 text-left border-l-2 hover:bg-gray-50 transition-colors
            ${activeTab === id 
              ? 'border-blue-500 bg-blue-50 hover:bg-blue-50' 
              : 'border-transparent'}`}
        >
          <Icon className={`w-5 h-5 ${activeTab === id ? 'text-blue-500' : 'text-gray-400'}`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className={`font-medium ${activeTab === id ? 'text-blue-700' : 'text-gray-700'}`}>
                {label}
              </span>
              <div className="flex items-center gap-2">
                {activeTab === id && <Check className="w-4 h-4 text-blue-500" />}
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <p className="text-sm text-gray-500 truncate">{description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
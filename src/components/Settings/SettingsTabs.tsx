import React from 'react';
import { 
  Settings, Globe, Bell, Users, Link, Shield, 
  ChevronRight, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);

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
    <div className="w-[68px] hover:w-80 transition-all duration-300 bg-white rounded-lg border border-gray-200 overflow-hidden group">
      {tabs.map(({ id, label, icon: Icon, description }) => {
        const isActive = activeTab === id;
        const isHovered = hoveredTab === id;

        return (
          <motion.button
            key={id}
            onClick={() => onTabChange(id)}
            onMouseEnter={() => setHoveredTab(id)}
            onMouseLeave={() => setHoveredTab(null)}
            className={`w-full flex items-center gap-3 p-4 text-left transition-all relative
              ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}
              whileHover={{ scale: 1.1 }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
            </motion.div>
            
            <AnimatePresence>
              {(isHovered || isActive || document.querySelector('.group:hover')) && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center justify-between flex-1 overflow-hidden whitespace-nowrap"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-sm">{label}</span>
                    <span className="text-xs text-gray-500 truncate">{description}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-y-0 left-0 w-1 bg-blue-600 rounded-r"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
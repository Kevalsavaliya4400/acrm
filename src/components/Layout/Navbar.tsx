import React, { useState } from 'react';
import { Bell, Hexagon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { UserProfile } from '../User/UserProfile';
import { NotificationPanel } from '../Notifications/NotificationPanel';
import { MenuToggleButton } from './MenuToggleButton';
import { PageTitle } from './PageTitle';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  onMenuToggle: () => void;
}

export function Navbar({ isMobileMenuOpen, onMenuToggle }: NavbarProps) {
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="glass-panel-darker sticky top-0 z-30 px-4 py-3" aria-label="Main navigation">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <MenuToggleButton 
            isOpen={isMobileMenuOpen}
            onClick={onMenuToggle}
          />
          <PageTitle />
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsNotificationsPanelOpen(!isNotificationsPanelOpen)}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-full transition-colors"
              aria-label={`${isNotificationsPanelOpen ? 'Close' : 'Open'} notifications`}
              aria-expanded={isNotificationsPanelOpen}
              aria-controls="notifications-panel"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" 
                    aria-label="New notifications available" />
            </button>
            {isNotificationsPanelOpen && (
              <div
                id="notifications-panel"
                role="region"
                aria-label="Notifications"
                className="absolute right-0 mt-2 w-80 z-50"
              >
                <NotificationPanel />
              </div>
            )}
          </div>
          <UserProfile />
        </div>
      </div>
    </nav>
  );
}
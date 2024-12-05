import React from 'react';
import { Home, Users, BarChart2, Settings, ChevronLeft, ChevronRight, Hexagon, AlertTriangle } from 'lucide-react';
import { SidebarLink } from './SidebarLink';
import { SidebarSubmenu } from './SidebarSubmenu';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, isMobileOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  
  const leadSubmenuItems = [
    { to: '/leads', label: 'All Leads', isActive: location.pathname === '/leads' },
    { to: '/leads/overdue', label: 'Overdue', isActive: location.pathname === '/leads/overdue' },
    { to: '/leads/today', label: 'Due Today', isActive: location.pathname === '/leads/today' },
    { to: '/leads/tomorrow', label: 'Due Tomorrow', isActive: location.pathname === '/leads/tomorrow' },
    { to: '/leads/next-10-days', label: 'Next 10 Days', isActive: location.pathname === '/leads/next-10-days' },
    { to: '/leads/source-report', label: 'Source Report', isActive: location.pathname === '/leads/source-report' },
  ];
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        id="sidebar"
        role="navigation"
        aria-label="Main navigation"
        className={`bg-white border-r border-gray-200 fixed h-screen z-30
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-all duration-300 ease-in-out`}
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 overflow-hidden"
            animate={{ opacity: isCollapsed ? 0 : 1 }}
          >
            <Hexagon className="w-8 h-8 text-blue-600" />
            {!isCollapsed && (
              <motion.h1
                className="text-xl font-bold text-gray-900"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                Real Estate CRM
              </motion.h1>
            )}
          </motion.div>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hidden lg:block"
            aria-label={`${isCollapsed ? 'Expand' : 'Collapse'} sidebar`}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <SidebarLink 
            to="/" 
            icon={Home} 
            label="Dashboard" 
            isCollapsed={isCollapsed} 
            isActive={location.pathname === '/'} 
          />
          
          <SidebarSubmenu
            icon={Users}
            label="Leads"
            isCollapsed={isCollapsed}
            items={leadSubmenuItems}
          />
          
          <SidebarLink 
            to="/analytics" 
            icon={BarChart2} 
            label="Analytics" 
            isCollapsed={isCollapsed} 
            isActive={location.pathname === '/analytics'} 
          />
          
          <SidebarLink 
            to="/settings" 
            icon={Settings} 
            label="Settings" 
            isCollapsed={isCollapsed} 
            isActive={location.pathname === '/settings'} 
          />
        </nav>
      </motion.div>
    </AnimatePresence>
  );
}
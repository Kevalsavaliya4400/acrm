import React from 'react';
import { Home, Users, BarChart2, Settings } from 'lucide-react';
import { UserProfile } from './UserProfile';
import { SidebarLink } from './SidebarLink';

export function Sidebar() {
  return (
    <div className="bg-white w-64 border-r border-gray-200 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Real Estate CRM</h1>
      </div>
      
      <UserProfile />
      
      <nav className="flex-1 p-4 space-y-1">
        <SidebarLink to="/" icon={Home} label="Dashboard" />
        <SidebarLink to="/leads" icon={Users} label="Leads" />
        <SidebarLink to="/analytics" icon={BarChart2} label="Analytics" />
        <SidebarLink to="/settings" icon={Settings} label="Settings" />
      </nav>
    </div>
  );
}
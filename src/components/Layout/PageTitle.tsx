import React from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart2, Settings, Hexagon } from 'lucide-react';

export function PageTitle() {
  const location = useLocation();
  
  const getPageInfo = () => {
    switch (location.pathname) {
      case '/':
        return { title: 'Dashboard', icon: LayoutDashboard };
      case '/leads':
        return { title: 'Leads Management', icon: Users };
      case '/analytics':
        return { title: 'Analytics', icon: BarChart2 };
      case '/settings':
        return { title: 'Settings', icon: Settings };
      default:
        return { title: 'Real Estate CRM', icon: Hexagon };
    }
  };

  const pageInfo = getPageInfo();
  const Icon = pageInfo.icon;

  return (
    <div className="flex items-center gap-3">
      <Icon className={`w-6 h-6 ${pageInfo.title === 'Real Estate CRM' ? 'text-blue-600' : 'text-gray-600'}`} />
      <h1 className="text-xl font-semibold text-gray-900">{pageInfo.title}</h1>
    </div>
  );
}
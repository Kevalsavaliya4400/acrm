import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

export function SidebarLink({ to, icon: Icon, label }: SidebarLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
      {label}
    </Link>
  );
}
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  icon: LucideIcon;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageHeader({ title, icon: Icon, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-[2000px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Icon className="w-6 h-6 text-gray-700" />
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            </div>
            {subtitle && (
              <div className="hidden md:block">
                {subtitle}
              </div>
            )}
          </div>
          {actions}
        </div>
        {subtitle && (
          <div className="mt-4 md:hidden">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
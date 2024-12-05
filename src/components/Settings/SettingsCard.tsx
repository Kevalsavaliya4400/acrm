import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SettingsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}

export function SettingsCard({ title, description, children, icon: Icon }: SettingsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
          )}
          <div>
            <h3 className="text-base font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );
}
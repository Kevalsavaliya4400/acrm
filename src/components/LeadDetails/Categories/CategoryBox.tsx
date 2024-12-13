import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Field {
  icon: LucideIcon;
  label: string;
  value: string;
  action?: string;
  editable?: boolean;
  component?: React.ReactNode;
  className?: string;
}

interface CategoryBoxProps {
  title: string;
  fields: Field[];
}

export function CategoryBox({ title, fields }: CategoryBoxProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ icon: Icon, label, value, action, editable, component, className }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${className || 'text-gray-400'}`} />
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              {component ? (
                component
              ) : action ? (
                <a
                  href={action}
                  className="font-medium text-gray-900 hover:text-blue-600"
                >
                  {value}
                </a>
              ) : (
                <p className={`font-medium ${className || 'text-gray-900'}`}>{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
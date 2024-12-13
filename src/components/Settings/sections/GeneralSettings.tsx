import React from 'react';
import { SettingsSection } from '../SettingsSection';
import { SettingsCard } from '../SettingsCard';

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <SettingsSection title="General Settings" description="Configure basic CRM settings">
        <SettingsCard
          title="Company Information"
          description="Update your company details and branding"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your Company Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Regional Settings"
          description="Configure timezone and currency preferences"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Timezone</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Eastern Time (ET)</option>
                <option>Pacific Time (PT)</option>
                <option>Central Time (CT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Currency</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Lead Management"
          description="Configure default lead settings"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Default Follow-up Time</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>24 hours</option>
                <option>48 hours</option>
                <option>72 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lead Assignment</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Round Robin</option>
                <option>Manual</option>
                <option>Load Balanced</option>
              </select>
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}
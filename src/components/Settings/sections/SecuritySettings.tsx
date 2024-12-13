import React from 'react';
import { Shield, Key, Lock, Fingerprint } from 'lucide-react';
import { SettingsSection } from '../SettingsSection';
import { SettingsCard } from '../SettingsCard';

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <SettingsSection 
        title="Security Settings" 
        description="Manage security and authentication settings"
      >
        <SettingsCard
          title="Authentication"
          description="Configure authentication methods"
          icon={Key}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Enable
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Single Sign-On (SSO)</h4>
                <p className="text-sm text-gray-500">Enable SSO with your identity provider</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                Configure
              </button>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Password Policy"
          description="Set password requirements"
          icon={Lock}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Minimum Password Length</h4>
                <p className="text-sm text-gray-500">Set minimum characters required</p>
              </div>
              <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>8 characters</option>
                <option>10 characters</option>
                <option>12 characters</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Password Expiration</h4>
                <p className="text-sm text-gray-500">Require password change periodically</p>
              </div>
              <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Never</option>
                <option>30 days</option>
                <option>60 days</option>
                <option>90 days</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Password Requirements</h4>
                <p className="text-sm text-gray-500">Set complexity requirements</p>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Require uppercase</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Require numbers</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray -gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Require special characters</span>
                </label>
              </div>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Session Management"
          description="Configure session settings"
          icon={Fingerprint}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Session Timeout</h4>
                <p className="text-sm text-gray-500">Automatically log out after inactivity</p>
              </div>
              <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Active Sessions</h4>
                <p className="text-sm text-gray-500">View and manage active sessions</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                View Sessions
              </button>
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}
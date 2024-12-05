import React from 'react';
import { Link2, Facebook, Mail, Phone, MessageSquare } from 'lucide-react';
import { SettingsSection } from '../SettingsSection';
import { SettingsCard } from '../SettingsCard';

export function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <SettingsSection 
        title="Integrations" 
        description="Connect your CRM with other services"
      >
        <SettingsCard
          title="Connected Services"
          description="Manage your connected services and integrations"
          icon={Link2}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Facebook className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Facebook Lead Ads</h4>
                  <p className="text-sm text-gray-500">Automatically import leads from Facebook</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Connect
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email Integration</h4>
                  <p className="text-sm text-gray-500">Connect your email service</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                Connect
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">VoIP Integration</h4>
                  <p className="text-sm text-gray-500">Connect your phone system</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                Connect
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">SMS Integration</h4>
                  <p className="text-sm text-gray-500">Connect SMS service provider</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700">
                Connect
              </button>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title="API Access"
          description="Manage API keys and webhooks"
          icon={Link2}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">API Key</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  readOnly
                  value="sk_test_4eC39HqLyjWDarjtT1zdp7dc"
                  className="flex-1 block w-full rounded-l-md border-gray-300 bg-gray-50"
                />
                <button className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Copy
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Webhook URL</label>
              <div className="mt-1">
                <input
                  type="url"
                  placeholder="https://your-domain.com/webhook"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}
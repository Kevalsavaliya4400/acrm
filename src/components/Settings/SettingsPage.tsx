import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { PageHeader } from '../Layout/PageHeader';
import { SettingsTabs } from './SettingsTabs';
import { GeneralSettings } from './sections/GeneralSettings';
import { LeadSourceSettings } from './sections/LeadSourceSettings';
import { NotificationSettings } from './sections/NotificationSettings';
import { TeamSettings } from './sections/TeamSettings';
import { IntegrationSettings } from './sections/IntegrationSettings';
import { SecuritySettings } from './sections/SecuritySettings';
import { RecycleBin } from './sections/RecycleBin';

export function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('general');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        icon={SettingsIcon}
        subtitle={
          <span className="text-sm text-gray-500">
            Manage your CRM settings and preferences
          </span>
        }
      />

      <div className="flex gap-6">
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1">
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'sources' && <LeadSourceSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'team' && <TeamSettings />}
          {activeTab === 'integrations' && <IntegrationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'recycle-bin' && <RecycleBin />}
        </div>
      </div>
    </div>
  );
}
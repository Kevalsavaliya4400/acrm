import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="Settings"
        icon={SettingsIcon}
        subtitle={
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-500"
          >
            Manage your CRM settings and preferences
          </motion.span>
        }
      />

      <div className="flex gap-6">
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'sources' && <LeadSourceSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'team' && <TeamSettings />}
          {activeTab === 'integrations' && <IntegrationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'recycle-bin' && <RecycleBin />}
        </motion.div>
      </div>
    </motion.div>
  );
}
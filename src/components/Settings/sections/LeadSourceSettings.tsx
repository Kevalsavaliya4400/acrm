import React from 'react';
import { SettingsSection } from '../SettingsSection';
import { SourceSettings } from '../SourceSettings';

export function LeadSourceSettings() {
  return (
    <div className="space-y-6">
      <SettingsSection 
        title="Lead Source Management" 
        description="Configure and manage your lead sources"
      >
        <SourceSettings />
      </SettingsSection>
    </div>
  );
}
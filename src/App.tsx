import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './components/Dashboard';
import { LeadList } from './components/LeadList';
import { DueToday } from './pages/leads/DueToday';
import { DueTomorrow } from './pages/leads/DueTomorrow';
import { Next10Days } from './pages/leads/Next10Days';
import { Overdue } from './pages/leads/Overdue';
import { SourceReport } from './pages/leads/SourceReport';
import { SettingsPage } from './components/Settings/SettingsPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<LeadList />} />
          <Route path="/leads/overdue" element={<Overdue />} />
          <Route path="/leads/today" element={<DueToday />} />
          <Route path="/leads/tomorrow" element={<DueTomorrow />} />
          <Route path="/leads/next-10-days" element={<Next10Days />} />
          <Route path="/leads/source-report" element={<SourceReport />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
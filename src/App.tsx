import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './components/Dashboard';
import { LeadList } from './components/LeadList';
import { DueToday } from './pages/leads/DueToday';
import { DueTomorrow } from './pages/leads/DueTomorrow';
import { Next10Days } from './pages/leads/Next10Days';
import { Overdue } from './pages/leads/Overdue';
import { SourceReport } from './pages/leads/SourceReport';
import { SettingsPage } from './components/Settings/SettingsPage';
import { AuthPage } from './components/Auth/AuthPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          } />
          
          <Route path="/" element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } />
          
          <Route path="/leads" element={
            <PrivateRoute>
              <Layout>
                <LeadList />
              </Layout>
            </PrivateRoute>
          } />
          
          <Route path="/leads/overdue" element={
            <PrivateRoute>
              <Layout>
                <Overdue />
              </Layout>
            </PrivateRoute>
          } />
          
          <Route path="/leads/today" element={
            <PrivateRoute>
              <Layout>
                <DueToday />
              </Layout>
            </PrivateRoute>
          } />
          
          <Route path="/leads/tomorrow" element={
            <PrivateRoute>
              <Layout>
                <DueTomorrow />
              </Layout>
            </PrivateRoute>
          } />
          
          <Route path="/leads/next-10-days" element={
            <PrivateRoute>
              <Layout>
                <Next10Days />
              </Layout>
            </PrivateRoute>
          } />
          
          <Route path="/leads/source-report" element={
            <PrivateRoute>
              <Layout>
                <SourceReport />
              </Layout>
            </PrivateRoute>
          } />
          
          <Route path="/settings" element={
            <PrivateRoute>
              <Layout>
                <SettingsPage />
              </Layout>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
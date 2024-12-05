import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar';
import { LeadList } from './components/LeadList';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<LeadList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
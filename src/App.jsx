import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { ErrorBoundary } from './components/common';
import MainLayout from './layouts/MainLayout';
import { FeatureGate } from './components/common/FeatureGate';
// Standard Imports for critical pathways to prevent chunk load failures
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import FAQ from './pages/FAQ';

// Admin Section Imports
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminModeration from './pages/admin/AdminModeration';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPortal from './pages/AdminPortal';
import AdminSales from './pages/admin/AdminSales';
import AdminSalesTeam from './pages/admin/AdminSalesTeam';
import AdminSalesLeads from './pages/admin/AdminSalesLeads';

// Removed Sales and Support pages

import './App.css';



const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '200px', color: '#64748B' }}>
    Loading...
  </div>
);

const GlobalAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const originalAlert = window.alert;
    window.alert = (msg) => {
      setMessage(msg);
      setIsOpen(true);
    };
    return () => {
      window.alert = originalAlert;
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', padding: '2rem', animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '400px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #E2E8F0',
        transform: 'translateY(0)', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1E293B', textAlign: 'center', marginBottom: '0.75rem', lineHeight: '1.4', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {String(message)}
        </h3>
        <button 
          onClick={() => setIsOpen(false)}
          style={{
            width: '100%', padding: '0.85rem', marginTop: '1.5rem', borderRadius: '14px', border: 'none',
            background: '#3B82F6', color: 'white', fontWeight: '800', fontSize: '1rem', cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)'
          }}
        >
          Got it
        </button>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
};

const GlobalConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [resolvePromise, setResolvePromise] = useState(null);

  useEffect(() => {
    const originalConfirm = window.confirm;
    window.confirm = (msg) => {
      setMessage(msg);
      setIsOpen(true);
      return new Promise((resolve) => {
        setResolvePromise(() => resolve);
      });
    };
    return () => {
      window.confirm = originalConfirm;
    };
  }, []);

  const handleAction = (result) => {
    setIsOpen(false);
    if (resolvePromise) resolvePromise(result);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', padding: '2rem', animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '400px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #E2E8F0',
        transform: 'translateY(0)', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1E293B', textAlign: 'center', marginBottom: '1.5rem', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
          {String(message)}
        </h3>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={() => handleAction(false)}
            style={{
              flex: 1, padding: '0.85rem', borderRadius: '14px', border: '1px solid #E2E8F0',
              background: '#F8FAFC', color: '#64748B', fontWeight: '800', fontSize: '1rem', cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button 
            onClick={() => handleAction(true)}
            style={{
              flex: 1, padding: '0.85rem', borderRadius: '14px', border: 'none',
              background: '#EF4444', color: 'white', fontWeight: '800', fontSize: '1rem', cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.2)'
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

function AuthenticatedApp() {
  const location = useLocation();

  return (
    <ProtectedRoute>
      <ErrorBoundary>
        <MainLayout>
          <div key={location.pathname} className="main-content-wrapper" style={{ height: '100%', width: '100%', minHeight: 0 }}>
            <Suspense fallback={<PageLoader />}>
              <Routes location={location}>
                {/* Root Redirect to Admin */}
                <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />

                {/* Admin Control Center */}
                <Route path="/admin/*" element={
                  <ProtectedRoute role="admin">
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="moderation" element={<AdminModeration />} />
                      <Route path="logs" element={<AdminAuditLogs />} />
                      <Route path="settings" element={<AdminSettings />} />
                      <Route path="sales" element={<AdminSales />} />
                      <Route path="sales-team" element={<AdminSalesTeam />} />
                      <Route path="sales-leads" element={<AdminSalesLeads />} />
                      <Route path="faq" element={<FAQ />} />
                    </Routes>
                  </ProtectedRoute>
                } />

              </Routes>
            </Suspense>
          </div>
        </MainLayout>
      </ErrorBoundary>
    </ProtectedRoute>
  );
}

function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route path="/login" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={
          <Suspense fallback={<PageLoader />}>
            <AdminLogin />
          </Suspense>
        } />
        <Route path="/adminlogin" element={
          <Suspense fallback={<PageLoader />}>
            <AdminPortal />
          </Suspense>
        } />
        
        {/* Protected Routes - All routes within MainLayout require authentication */}
        <Route path="*" element={<AuthenticatedApp />} />
      </Routes>
    </Router>
  );
}

import { LanguageProvider } from './context';

function App() {
  return (
    <LanguageProvider>
      <GlobalAlert />
      <GlobalConfirm />
      <AppContent />
    </LanguageProvider>
  );
}

export default App;



import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AppShell } from './components/AppShell';
import { LoginPage } from './pages/LoginPage';

// Pages
import { ManagerDashboard } from './pages/ManagerDashboard';
import { Campaigns } from './pages/Campaigns';
import { SurveyResults } from './pages/SurveyResults';
import { LeadPipeline } from './pages/LeadPipeline';
import { AgentPortal } from './pages/AgentPortal';
import { SurveyForm } from './pages/SurveyForm';
import { SurveyHistory } from './pages/SurveyHistory';
import { CampaignPerformance } from './pages/CampaignPerformance';
import { CampaignDetails } from './pages/CampaignDetails';
import { PlatformAnalytics } from './pages/PlatformAnalytics';
import { CompanyDirectory } from './pages/CompanyDirectory';
import { ApprovalsQueue } from './pages/ApprovalsQueue';
import { FieldOperations } from './pages/FieldOperations';
import { Downloads } from './pages/Downloads';
import { SupportCenter } from './pages/SupportCenter';
import { Employees } from './pages/Employees';
import { FieldPosts } from './pages/FieldPosts';
import { ManagerReports } from './pages/ManagerReports';
import { SettingsPage } from './pages/Settings';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="min-h-screen grid place-items-center bg-slate-50 font-bold text-slate-400 uppercase tracking-widest animate-pulse font-sans">Initializing System...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return <>{children}</>;
};

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role === 'super_admin') return <Navigate to="/admin/dashboard" />;
  if (user.role === 'manager') return <Navigate to="/manager/dashboard" />;
  if (user.role === 'client') return <Navigate to="/client/dashboard" />;
  if (user.role === 'employee') return <Navigate to="/agent/portal" />;
  return <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <AppShell>
                <Routes>
                  <Route path="dashboard" element={<PlatformAnalytics />} />
                  <Route path="companies" element={<CompanyDirectory />} />
                  <Route path="pipeline" element={<LeadPipeline />} />
                  <Route path="approvals" element={<ApprovalsQueue />} />
                  <Route path="analytics" element={<PlatformAnalytics />} />
                </Routes>
              </AppShell>
            </ProtectedRoute>
          } />

          {/* Client Routes */}
          <Route path="/client/*" element={
            <ProtectedRoute allowedRoles={['client']}>
              <AppShell>
                <Routes>
                  <Route path="dashboard" element={<CampaignPerformance />} />
                  {/* Reuse components for placeholders */}
                  <Route path="campaigns" element={<Campaigns />} />
                  <Route path="campaigns/:id" element={<CampaignDetails />} />
                  <Route path="performance" element={<CampaignPerformance />} />
                  <Route path="surveys" element={<SurveyResults />} />
                  <Route path="reports" element={<Downloads />} />
                </Routes>
              </AppShell>
            </ProtectedRoute>
          } />

          {/* Manager Routes */}
          <Route path="/manager/*" element={
            <ProtectedRoute allowedRoles={['manager']}>
              <AppShell>
                <Routes>
                  <Route path="dashboard" element={<ManagerDashboard />} />
                  <Route path="employees" element={<Employees />} />
                  <Route path="posts" element={<FieldPosts />} />
                  <Route path="operations" element={<FieldOperations />} />
                  <Route path="campaigns" element={<Campaigns />} />
                  <Route path="campaigns/:id" element={<CampaignDetails />} />
                  <Route path="results" element={<SurveyResults />} />
                  <Route path="reports" element={<ManagerReports />} />
                  <Route path="support" element={<SupportCenter />} />
                </Routes>
              </AppShell>
            </ProtectedRoute>
          } />

          {/* Agent Routes */}
          <Route path="/agent/*" element={
            <ProtectedRoute allowedRoles={['employee']}>
              <div className="min-h-screen bg-slate-50 p-4 pb-20 font-sans">
                <Routes>
                  <Route path="portal" element={<AgentPortal />} />
                  <Route path="survey" element={<SurveyForm />} />
                  <Route path="history" element={<SurveyHistory />} />
                </Routes>
              </div>
            </ProtectedRoute>
          } />

          {/* Settings Route */}
          <Route path="/settings" element={
            <ProtectedRoute allowedRoles={['super_admin', 'manager', 'client', 'employee']}>
              <AppShell>
                <SettingsPage />
              </AppShell>
            </ProtectedRoute>
          } />

          <Route path="/" element={<DashboardRedirect />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}



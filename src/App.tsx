
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastProvider } from './components/feedback/enhanced-toast';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import { PermissionsProvider } from './contexts/PermissionsContext';
import { KeyboardShortcutsProvider } from './contexts/KeyboardShortcutsContext';
import Index from './pages/Index';
import { AuthLayout } from './components/layout/AuthLayout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import AMSLayout from './layouts/AMSLayout';
import { Dashboard } from './pages/Dashboard';
import AMSDashboard from './pages/ams/Dashboard';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/index';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { EmailVerification } from './pages/auth/EmailVerification';
import { Onboarding } from './pages/Onboarding';
import { ClientsPage } from './pages/ams/clients';
import ClientDetailsPage from './pages/ams/clients/ClientDetailsPage';
import { VendorsPage } from './pages/ams/vendors';
import { TalentAcquisitionPage } from './pages/ams/ta';
import { HumanResourcesPage } from './pages/ams/hr';
import GamificationPage from './pages/gamification';
import TAManagementPage from './pages/ams/ta/TAManagementPage';
import InterviewPanelistLibraryPage from './pages/ams/InterviewPanelistLibraryPage';
import RequirementsPage from './pages/ams/RequirementsPage';
import RolesLibraryPage from './pages/ams/RolesLibraryPage';
import SkillsPage from './pages/ams/SkillsPage';
import ChecklistsPage from './pages/ams/ChecklistsPage';
import CertificationsPage from './pages/ams/CertificationsPage';
import VendorManagementPage from './pages/ams/VendorManagementPage';
import CommissionsPage from './pages/ams/CommissionsPage';
import CandidatePoolPage from './pages/ams/hr/CandidatePoolPage';
import RoleManagementPage from './pages/ams/hr/RoleManagementPage';
import HRDashboardPage from './pages/ams/hr/HRDashboardPage';
import ExecutiveDashboardPage from './pages/ams/executive/ExecutiveDashboardPage';
import ExecutiveClientPage from './pages/ams/executive/ExecutiveClientPage';
import UserManagementPage from './pages/ams/admin/UserManagementPage';
import InterviewerDashboardPage from './pages/ams/interviewer/InterviewerDashboardPage';
import CandidateDashboardPage from './pages/ams/candidate/CandidateDashboardPage';
import VendorDetailPage from './pages/ams/vendors/VendorDetailPage';
import MyInterviewsPage from './pages/ams/interviewer/MyInterviewsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PermissionsProvider>
            <KeyboardShortcutsProvider>
              <ToastProvider position="top-right" maxToasts={5}>
                <PersistGate loading={null} persistor={persistor}>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      
                      {/* Auth Routes - No actual authentication required */}
                      <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="/verify-email/:token" element={<EmailVerification />} />
                      </Route>

                      {/* AMS Routes with Sidebar */}
                      <Route element={<AMSLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/ams/dashboard" element={<AMSDashboard />} />
                        <Route path="/onboarding" element={<Onboarding />} />
                        <Route path="/ams/clients" element={<ClientsPage />} />
                        <Route path="/ams/clients/:clientId" element={<ClientDetailsPage />} />
                        <Route path="/ams/requirements" element={<RequirementsPage />} />
                        <Route path="/ams/roles" element={<RolesLibraryPage />} />
                        <Route path="/ams/skills/library" element={<SkillsPage />} />
                        <Route path="/ams/vendors" element={<VendorsPage />} />
                        <Route path="/ams/talent-acquisition" element={<TalentAcquisitionPage />} />
                        <Route path="/ams/ta/management" element={<TAManagementPage />} />
                        <Route path="/ams/ta/mission-control" element={<TalentAcquisitionPage />} />
                        <Route path="/ams/human-resources" element={<HumanResourcesPage />} />
                        <Route path="/ams/hr/dashboard" element={<HRDashboardPage />} />
                        <Route path="/ams/hr/candidate-pool" element={<CandidatePoolPage />} />
                        <Route path="/ams/hr/role-management" element={<RoleManagementPage />} />
                        
                        {/* Consolidated candidate dashboard routes - both point to the new candidate dashboard */}
                        <Route path="/ams/candidate/dashboard" element={<CandidateDashboardPage />} />
                        <Route path="/ams/candidate-dashboard" element={<CandidateDashboardPage />} />
                        
                        <Route path="/ams/executive/dashboard" element={<ExecutiveDashboardPage />} />
                        <Route path="/ams/executive/clients" element={<ExecutiveClientPage />} />
                        <Route path="/ams/interviewer/dashboard" element={<InterviewerDashboardPage />} />
                        <Route path="/ams/interviewer/my-interviews" element={<MyInterviewsPage />} />
                        <Route path="/ams/checklist-bar" element={<ChecklistsPage />} />
                        <Route path="/ams/interview-panelists" element={<InterviewPanelistLibraryPage />} />
                        <Route path="/ams/checklists" element={<ChecklistsPage />} />
                        <Route path="/ams/certifications" element={<CertificationsPage />} />
                        <Route path="/ams/vendor-management" element={<VendorManagementPage />} />
                        <Route path="/ams/vendor-management/:vendorId" element={<VendorDetailPage />} />
                        <Route path="/ams/commissions" element={<CommissionsPage />} />
                        <Route path="/ams/analytics" element={<Dashboard />} />
                        <Route path="/ams/admin/users" element={<UserManagementPage />} />
                        <Route path="/gamification" element={<GamificationPage />} />
                      </Route>
                    </Routes>
                    <Toaster />
                  </BrowserRouter>
                </PersistGate>
              </ToastProvider>
            </KeyboardShortcutsProvider>
          </PermissionsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

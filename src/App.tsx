
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastProvider } from './components/feedback/enhanced-toast';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/Index';
import { AuthLayout } from './components/layout/AuthLayout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import AMSLayout from './layouts/AMSLayout';
import { Dashboard } from './pages/Dashboard';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/index';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { EmailVerification } from './pages/auth/EmailVerification';
import { Onboarding } from './pages/Onboarding';
import { ClientsPage } from './pages/ams/clients';
import { VendorsPage } from './pages/ams/vendors';
import { TalentAcquisitionPage } from './pages/ams/ta';
import { HumanResourcesPage } from './pages/ams/hr';
import { GamificationPage } from './pages/gamification';
import TAManagementPage from './pages/ams/ta/TAManagementPage';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
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
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/ams/clients" element={<ClientsPage />} />
                  <Route path="/ams/vendors" element={<VendorsPage />} />
                  <Route path="/ams/talent-acquisition" element={<TalentAcquisitionPage />} />
                  <Route path="/ams/ta/management" element={<TAManagementPage />} />
                  <Route path="/ams/human-resources" element={<HumanResourcesPage />} />
                  <Route path="/gamification" element={<GamificationPage />} />
                </Route>
              </Routes>
              <Toaster />
            </BrowserRouter>
          </PersistGate>
        </ToastProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

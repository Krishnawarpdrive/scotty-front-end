
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { AuthProvider } from "./contexts/AuthContext";
import { KeyboardShortcutsProvider } from "./contexts/KeyboardShortcutsContext";
import { UnifiedToastProvider } from './providers/UnifiedToastProvider';
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import { Dashboard } from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SupportPage from "./pages/SupportPage";
import NotFound from "./pages/NotFound";
import { Onboarding } from "./pages/Onboarding";
import { EnhancedAMSLayout } from "./layouts/EnhancedAMSLayout";
import { PersonaLayout } from "./layouts/PersonaLayout";
import AMSRoutes from "./pages/ams/index";
import HRDashboard from "./pages/personas/hr/HRDashboard";
import TADashboard from "./pages/personas/ta/TADashboard";
import CandidatePortal from "./pages/personas/candidate/CandidatePortal";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <KeyboardShortcutsProvider>
                <UnifiedToastProvider>
                  <div className="min-h-screen bg-background">
                    <Suspense fallback={<div>Loading...</div>}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/support" element={<SupportPage />} />
                        <Route path="/onboarding" element={<Onboarding />} />
                        
                        {/* AMS Admin Routes */}
                        <Route path="/ams/*" element={
                          <EnhancedAMSLayout>
                            <AMSRoutes />
                          </EnhancedAMSLayout>
                        } />
                        
                        {/* Persona-based Routes */}
                        <Route path="/personas/*" element={<PersonaLayout />}>
                          <Route path="hr/dashboard" element={<HRDashboard />} />
                          <Route path="ta/dashboard" element={<TADashboard />} />
                          <Route path="candidate/dashboard" element={<CandidatePortal />} />
                        </Route>
                        
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </div>
                  <Toaster />
                </UnifiedToastProvider>
              </KeyboardShortcutsProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

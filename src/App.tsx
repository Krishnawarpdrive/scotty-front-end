
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientDashboardPage from "@/pages/ams/ClientDashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/theme/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AMSLayout from "./layouts/AMSLayout";
import Dashboard from "./pages/ams/Dashboard";
import ClientsPage from "./pages/ams/ClientsPage";
import SkillsPage from "./pages/ams/SkillsPage";
import ChecklistsPage from "./pages/ams/ChecklistsPage";
import CertificationsPage from "./pages/ams/CertificationsPage";
import CommissionsPage from "./pages/ams/CommissionsPage";
import RequirementsPage from "./pages/ams/RequirementsPage";
import HRDashboardPage from "./pages/ams/hr/HRDashboardPage";
import CandidatePoolPage from "./pages/ams/hr/CandidatePoolPage";
import RoleManagementPage from "./pages/ams/hr/RoleManagementPage";
import TAMissionControlPage from "./pages/ams/ta/TAMissionControlPage";
import CreateRolePage from "./pages/ams/roles/CreateRolePage";
import RoleLibraryPage from "./pages/ams/roles/RoleLibraryPage";
import RolesLibraryPage from "./pages/ams/roles/RolesLibraryPage";
import SkillsLibraryPage from "./pages/ams/skills/SkillsLibraryPage";
import ClientAccountCreationPage from "./pages/ams/clients/ClientAccountCreationPage";
import ClientDetailsPage from "./pages/ams/clients/ClientDetailsPage";
import CandidateDashboardPage from "./pages/ams/CandidateDashboardPage";
import ClientRolesRequirementsPage from "./pages/ams/ClientRolesRequirementsPage";
import VendorManagementPage from "./pages/ams/VendorManagementPage";
import VendorDetailPage from "./pages/ams/vendors/VendorDetailPage";
import { KeyboardShortcutsProvider } from "@/contexts/KeyboardShortcutsContext";
import { KeyboardShortcutsModal } from "@/components/ui/keyboard-shortcuts-modal";
import { KeyboardHintsOverlay } from "@/components/ui/keyboard-hints-overlay";
import { useGlobalShortcuts } from "@/hooks/useGlobalShortcuts";

const queryClient = new QueryClient();

function AppContent() {
  useGlobalShortcuts();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ams" element={<AMSLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="candidate-dashboard" element={<CandidateDashboardPage />} />
          <Route path="client-roles-requirements" element={<ClientRolesRequirementsPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="clients/create" element={<ClientAccountCreationPage />} />
          <Route path="client-dashboard" element={<ClientDashboardPage />} />
          <Route path="clients/:clientId" element={<ClientDetailsPage />} />
          <Route path="vendor-management" element={<VendorManagementPage />} />
          <Route path="vendor-management/:vendorId" element={<VendorDetailPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="skills/library" element={<SkillsLibraryPage />} />
          <Route path="checklists" element={<ChecklistsPage />} />
          <Route path="certifications" element={<CertificationsPage />} />
          <Route path="commissions" element={<CommissionsPage />} />
          <Route path="requirements" element={<RequirementsPage />} />
          <Route path="roles" element={<RolesLibraryPage />} />
          <Route path="roles/create" element={<CreateRolePage />} />
          <Route path="roles/library" element={<RoleLibraryPage />} />
          <Route path="hr/dashboard" element={<HRDashboardPage />} />
          <Route path="hr/candidate-pool" element={<CandidatePoolPage />} />
          <Route path="hr/role-management" element={<RoleManagementPage />} />
          <Route path="ta/mission-control" element={<TAMissionControlPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <KeyboardShortcutsModal />
      <KeyboardHintsOverlay />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <KeyboardShortcutsProvider>
            <TooltipProvider>
              <Toaster />
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </TooltipProvider>
          </KeyboardShortcutsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

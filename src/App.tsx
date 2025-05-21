
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AMSLayout from "./layouts/AMSLayout";
import AMSDashboard from "./pages/ams/Dashboard";
import ClientsPage from "./pages/ams/ClientsPage";
import ClientAccountCreationPage from "./pages/ams/clients/ClientAccountCreationPage";
import RolesLibraryPage from "./pages/ams/RolesLibraryPage";
import RequirementsPage from "./pages/ams/RequirementsPage";
import SkillsPage from "./pages/ams/SkillsPage";
import ChecklistsPage from "./pages/ams/ChecklistsPage";
import CertificationsPage from "./pages/ams/CertificationsPage";
import CommissionsPage from "./pages/ams/CommissionsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* AMS Routes */}
          <Route path="/ams" element={<AMSLayout />}>
            <Route path="dashboard" element={<AMSDashboard />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="clients/account-creation" element={<ClientAccountCreationPage />} />
            <Route path="roles" element={<RolesLibraryPage />} />
            <Route path="requirements" element={<RequirementsPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="checklists" element={<ChecklistsPage />} />
            <Route path="certifications" element={<CertificationsPage />} />
            <Route path="commissions" element={<CommissionsPage />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

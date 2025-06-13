import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import EnhancedAMSDashboard from "./pages/ams/EnhancedDashboard";
import { InterviewDashboard } from "./pages/ams/interview/components/InterviewDashboard";
import CertificationsPage from "./pages/ams/CertificationsPage";
import SkillsLibraryPage from "./pages/ams/skills/SkillsLibraryPage";
import { ClientsPage } from "./pages/ams/clients";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ams/dashboard" element={<EnhancedAMSDashboard />} />
            <Route path="/ams/interview" element={<InterviewDashboard />} />
            <Route path="/ams/certifications" element={<CertificationsPage />} />
            <Route path="/ams/skills" element={<SkillsLibraryPage />} />
            <Route path="/ams/clients" element={<ClientsPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

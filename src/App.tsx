
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AMSLayout from "./layouts/AMSLayout";
import AMSDashboard from "./pages/ams/Dashboard";

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
            <Route path="clients" element={<div>Clients Page</div>} />
            <Route path="roles" element={<div>Roles Library Page</div>} />
            <Route path="requirements" element={<div>Requirements Page</div>} />
            <Route path="skills" element={<div>Skill Master Page</div>} />
            <Route path="checklists" element={<div>Checklist Master Page</div>} />
            <Route path="certifications" element={<div>Certifications Page</div>} />
            <Route path="commissions" element={<div>Commission Tracker Page</div>} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

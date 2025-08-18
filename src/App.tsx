import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { KeyboardShortcutsProvider } from "@/contexts/KeyboardShortcutsContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Register from "./pages/auth/Register";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <KeyboardShortcutsProvider>
          <AuthProvider>
            <Router>
              <div className="min-h-screen bg-background font-sans antialiased">
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Navigate to="/register" replace />} />
                </Routes>
                <Toaster />
                <Sonner />
              </div>
            </Router>
          </AuthProvider>
        </KeyboardShortcutsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

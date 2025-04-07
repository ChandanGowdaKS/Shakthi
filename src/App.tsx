
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SafetyProvider } from "@/contexts/SafetyContext";

// Pages
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import EmergencyPage from "@/pages/EmergencyPage";
import ContactsPage from "@/pages/ContactsPage";
import RoutesPage from "@/pages/RoutesPage";
import SettingsPage from "@/pages/SettingsPage";

const queryClient = new QueryClient();

// Update the document title
document.title = "Shakthi Guard";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SafetyProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SafetyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

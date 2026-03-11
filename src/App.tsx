import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import CreatorProfilePage from "./pages/CreatorProfilePage";
import BrandProfilePage from "./pages/BrandProfilePage";
import DiscoverPage from "./pages/DiscoverPage";
import CampaignsPage from "./pages/CampaignsPage";
import CampaignDetailsPage from "./pages/CampaignDetailsPage";
import MessagesPage from "./pages/MessagesPage";
import CreatorDashboard from "./pages/CreatorDashboard";
import BrandDashboard from "./pages/BrandDashboard";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/profile/creator/:id" element={<CreatorProfilePage />} />
              <Route path="/profile/brand/:id" element={<BrandProfilePage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/campaign/:id" element={<CampaignDetailsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/creator-dashboard" element={<CreatorDashboard />} />
              <Route path="/brand-dashboard" element={<BrandDashboard />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

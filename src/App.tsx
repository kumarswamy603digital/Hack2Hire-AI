import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import JDAnalysis from "./pages/JDAnalysis";
import Interview from "./pages/Interview";
import Practice from "./pages/Practice";
import Coding from "./pages/Coding";
import SkillPlan from "./pages/SkillPlan";
import CandidateComparison from "./pages/CandidateComparison";
import Analytics from "./pages/Analytics";
import Auth from "./pages/Auth";
import Unauthorized from "./pages/Unauthorized";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/analyze" element={<ResumeAnalysis />} />
            <Route path="/jd-analysis" element={<JDAnalysis />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/coding" element={<Coding />} />
            <Route path="/skill-plan" element={<SkillPlan />} />
            <Route path="/comparison" element={<CandidateComparison />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

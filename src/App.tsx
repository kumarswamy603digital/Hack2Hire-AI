import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import History from "./pages/History";
import VoiceInterview from "./pages/VoiceInterview";
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
            <Route path="/analyze" element={
              <ProtectedRoute>
                <ResumeAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/jd-analysis" element={
              <ProtectedRoute>
                <JDAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/interview" element={
              <ProtectedRoute>
                <Interview />
              </ProtectedRoute>
            } />
            <Route path="/practice" element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            } />
            <Route path="/coding" element={
              <ProtectedRoute>
                <Coding />
              </ProtectedRoute>
            } />
            <Route path="/skill-plan" element={
              <ProtectedRoute>
                <SkillPlan />
              </ProtectedRoute>
            } />
            <Route path="/comparison" element={
              <ProtectedRoute>
                <CandidateComparison />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requiredRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            } />
            <Route path="/voice-interview" element={
              <ProtectedRoute>
                <VoiceInterview />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

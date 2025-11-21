import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import CropRecommendation from "./pages/CropRecommendation";
import CropCalendar from "./pages/CropCalendar";
import Pesticides from "./pages/Pesticides";
import CostEstimator from "./pages/CostEstimator";
import ActivityLog from "./pages/ActivityLog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/crop-recommendation" element={<CropRecommendation />} />
            <Route path="/crop-calendar" element={<CropCalendar />} />
            <Route path="/pesticides" element={<Pesticides />} />
            <Route path="/cost-estimator" element={<CostEstimator />} />
            <Route path="/activity-log" element={<ActivityLog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

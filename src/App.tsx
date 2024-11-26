import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Mood from "./pages/Mood";
import Activity from "./pages/Activity";
import Food from "./pages/Food";
import Calendar from "./pages/Calendar";
import Preview from "./pages/Preview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mood" element={<Mood />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/food" element={<Food />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </BrowserRouter>
      </main>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
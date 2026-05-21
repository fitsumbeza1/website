import { useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CMSProvider } from "@/contexts/CMSContext";
import { AuthProvider } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";
import Work from "./pages/Work";
import CategoryPage from "./pages/CategoryPage";
import VideoDetail from "./pages/VideoDetail";
import PhotosPage from "./pages/PhotosPage";
import CoffeeProject from "./pages/CoffeeProject";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/coffee" element={<CoffeeProject />} />
        <Route path="/work/:categoryId" element={<CategoryPage />} />
        <Route path="/work/:categoryId/:videoId" element={<VideoDetail />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show loading on first visit
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setIsLoading(false);
    } else {
      sessionStorage.setItem("hasLoaded", "true");
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CMSProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter basename={window.location.hostname === 'fitsumbeza1.github.io' ? '/website' : '/'}>

                <ScrollToTop />
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
                  ) : (
                    <AnimatedRoutes key="content" />
                  )}
                </AnimatePresence>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </CMSProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

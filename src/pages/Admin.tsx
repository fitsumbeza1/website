import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  MessageSquare,
  MessageCircle,
  Users,
  User,
  Sliders,
  Image as ImageIcon,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  Star,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import PortfolioManager from "@/components/admin/PortfolioManager";
import HeroSlidesManager from "@/components/admin/HeroSlidesManager";
import RubySlidesManager from "@/components/admin/RubySlidesManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import MessagesManager from "@/components/admin/MessagesManager";
import ClientsManager from "@/components/admin/ClientsManager";
import AboutProfileManager from "@/components/admin/AboutProfileManager";
import AboutPageManager from "@/components/admin/AboutPageManager";
import FeaturedSectionManager from "@/components/admin/FeaturedSectionManager";

type AdminSection = "portfolio" | "hero" | "ruby-slides" | "testimonials" | "messages" | "clients" | "about" | "about-page" | "featured";

const Admin = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>("portfolio");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { id: "portfolio", label: "Portfolio", icon: Film },
    { id: "featured", label: "Featured", icon: Star },
    { id: "ruby-slides", label: "Ruby Slides", icon: ImageIcon },
    { id: "hero", label: "Hero Videos", icon: Sliders },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "clients", label: "Clients", icon: Users },
    { id: "about", label: "About Profile", icon: User },
    { id: "about-page", label: "About Page", icon: FileText },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "portfolio":
        return <PortfolioManager />;
      case "featured":
        return <FeaturedSectionManager />;
      case "hero":
        return <HeroSlidesManager />;
      case "testimonials":
        return <TestimonialsManager />;
      case "messages":
        return <MessagesManager />;
      case "clients":
        return <ClientsManager />;
      case "ruby-slides":
        return <RubySlidesManager />;
      case "about":
        return <AboutProfileManager />;
      case "about-page":
        return <AboutPageManager />;
      default:
        return <PortfolioManager />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background/95 backdrop-blur z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <h1 className="text-xl font-bold">Ruby Pictures Admin</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 border-r bg-background transition-all duration-300 z-30 ${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as AdminSection)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="p-6 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Admin;

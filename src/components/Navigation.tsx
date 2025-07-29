// Finalized Navigation.tsx - Glassmorphic mobile menu with animation and swipe-to-close (fixed X button + removed fade effect)

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "Prompts", path: "/prompts" },
    { name: "About", path: "/about" },
  ];
  const isActive = (path: string) => location.pathname === path;
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current !== null) {
        const diff = e.touches[0].clientY - touchStartY.current;
        if (diff < -50) setIsOpen(false);
      }
    };
    const ref = panelRef.current;
    if (ref) {
      ref.addEventListener("touchstart", handleTouchStart);
      ref.addEventListener("touchmove", handleTouchMove);
    }
    return () => {
      if (ref) {
        ref.removeEventListener("touchstart", handleTouchStart);
        ref.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-card group-hover:shadow-glow transition-all duration-300">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Thư Viện AI
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-primary bg-primary/10 shadow-card"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" onClick={() => setIsOpen(false)} />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full flex justify-center transition-[max-height] duration-300 ease-out z-50 pointer-events-none ${
          isOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div
          ref={panelRef}
          className={`w-[90%] pointer-events-auto shadow-card border border-white/20 rounded-xl mt-2 p-4 space-y-2 transform transition-transform duration-500 ease-out bg-white/20 backdrop-blur-md backdrop-saturate-150 ${
            isOpen ? "scale-100 translate-y-0" : "scale-95 -translate-y-4"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-md text-base font-medium transition-transform duration-300 ease-in-out ${
                isActive(item.path)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

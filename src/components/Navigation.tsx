// Fixed Navigation.tsx - Glassmorphic mobile menu with proper blur effect and global swipe-to-close

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

// Animated hamburger menu component
const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center">
      <div
        className="absolute w-5 h-0.5 bg-current transition-all duration-300 ease-in-out"
        style={{
          transform: isOpen ? "rotate(45deg)" : "translateY(-6px)",
          opacity: 1,
        }}
      />
      <div
        className="absolute w-5 h-0.5 bg-current transition-all duration-300 ease-in-out"
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? "translateX(20px)" : "translateY(0px)",
        }}
      />
      <div
        className="absolute w-5 h-0.5 bg-current transition-all duration-300 ease-in-out"
        style={{
          transform: isOpen ? "rotate(-45deg)" : "translateY(6px)",
          opacity: 1,
        }}
      />
    </div>
  );
};

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
      if (touchStartY.current !== null && isOpen) {
        const diff = e.touches[0].clientY - touchStartY.current;
        if (diff < -50) {
          setIsOpen(false);
          touchStartY.current = null;
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
    };

    if (isOpen) {
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen]);

  // Đóng menu khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
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
                className="p-2"
                onClick={() => setIsOpen(true)} // ✅ mở menu khi bấm vào hamburger
              >
                <AnimatedMenuIcon isOpen={isOpen} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full flex justify-center transition-all duration-300 ease-out z-50 pointer-events-none ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          ref={panelRef}
          className={`w-[90%] pointer-events-auto shadow-xl border border-white/30 rounded-xl mt-2 p-4 space-y-2 transform transition-all duration-500 ease-out backdrop-blur-xl backdrop-saturate-150 ${
            isOpen ? "scale-100 translate-y-0" : "scale-95 -translate-y-4"
          }`}
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          {navItems.map((item, idx) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-md text-base font-medium transition-all duration-500 ease-in-out ${
                isActive(item.path)
                  ? "text-primary bg-primary/15 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/40"
              }`}
              style={{
                animationDelay: `${idx * 75}ms`,
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;

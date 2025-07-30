// Navigation.tsx - Fixed: tách nút mở và nút X hiển thị

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

// Icon động ba gạch / X với hiệu ứng đẹp mắt
const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center overflow-hidden">
      {/* Gạch thứ nhất - xoay thành X trên */}
      <div
        className="absolute w-5 h-0.5 bg-current transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
        style={{
          transform: isOpen 
            ? "rotate(45deg) scale(1.1)" 
            : "translateY(-6px) scale(1)",
          opacity: 1,
          transformOrigin: "center",
        }}
      />
      
      {/* Gạch thứ hai - bay lượn và biến thành menu */}
      <div
        className="absolute w-5 h-0.5 bg-current transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen 
            ? "translateX(100px) scale(3) rotate(180deg)" 
            : "translateY(0px) scale(1) rotate(0deg)",
          transformOrigin: "left center",
        }}
      />
      
      {/* Gạch thứ ba - xoay thành X dưới */}
      <div
        className="absolute w-5 h-0.5 bg-current transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
        style={{
          transform: isOpen 
            ? "rotate(-45deg) scale(1.1)" 
            : "translateY(6px) scale(1)",
          opacity: 1,
          transformOrigin: "center",
        }}
      />
      
      {/* Hiệu ứng sóng lan tỏa khi mở */}
      <div
        className="absolute inset-0 rounded-full border-2 border-current transition-all duration-600"
        style={{
          opacity: isOpen ? 0 : 0,
          transform: isOpen ? "scale(4)" : "scale(0.8)",
          animation: isOpen ? "pulse 0.6s ease-out" : "none",
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

  // Swipe để đóng menu
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

  // Click ra ngoài để đóng
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

            {/* Desktop menu */}
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

            {/* Mobile button: Chỉ hiện nút khi menu đang đóng */}
            <div className="md:hidden">
              {!isOpen ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2"
                  onClick={() => setIsOpen(true)}
                >
                  <AnimatedMenuIcon isOpen={false} />
                </Button>
              ) : (
                <div className="p-2">
                  <AnimatedMenuIcon isOpen={true} />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu panel */}
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

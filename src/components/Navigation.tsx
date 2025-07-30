import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, Menu, Sun, Moon, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

// Animated hamburger/X icon
const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center overflow-hidden">
      <div
        className="absolute w-5 h-0.5 bg-current transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
        style={{
          transform: isOpen
            ? "rotate(45deg) translateY(0px)"
            : "rotate(0deg) translateY(-6px)",
          transformOrigin: "center",
        }}
      />
      <div
        className="absolute w-5 h-0.5 bg-current transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen
            ? "rotate(180deg) scale(0.3)"
            : "rotate(0deg) scale(1)",
          transformOrigin: "center",
        }}
      />
      <div
        className="absolute w-5 h-0.5 bg-current transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
        style={{
          transform: isOpen
            ? "rotate(-45deg) translateY(0px)"
            : "rotate(0deg) translateY(6px)",
          transformOrigin: "center",
        }}
      />
      <div
        className="absolute inset-0 rounded-full transition-all duration-300"
        style={{
          boxShadow: isOpen
            ? "0 0 20px rgba(var(--primary-rgb), 0.3)"
            : "none",
          transform: isOpen ? "scale(1.5)" : "scale(1)",
        }}
      />
    </div>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const desktopNavItems = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "Prompts", path: "/prompts" },
  ];

  const mobileNavItems = [
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        isOpen
      ) {
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
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-card group-hover:shadow-glow transition-all duration-300">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Thư Viện AI
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              {desktopNavItems.map((item) => (
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

              {/* Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-border/50">
                  <DropdownMenuItem asChild>
                    <Link to="/about">{t("about")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setLanguage("en")}>
                    <Globe className="h-4 w-4 mr-2" />
                    English {language === "en" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("vi")}>
                    <Globe className="h-4 w-4 mr-2" />
                    Tiếng Việt {language === "vi" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>{t("theme")}</DropdownMenuLabel>
                  <DropdownMenuItem onClick={toggleTheme}>
                    {theme === "light" ? (
                      <>
                        <Moon className="h-4 w-4 mr-2" />
                        {t("darkMode")}
                      </>
                    ) : (
                      <>
                        <Sun className="h-4 w-4 mr-2" />
                        {t("lightMode")}
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile button */}
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
          {mobileNavItems.map((item, idx) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ease-in-out ${
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

          {/* Mobile Settings */}
          <div className="border-t border-white/20 pt-3 mt-3">
            <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
              {t("settings")}
            </div>

            {/* Language */}
            <div className="space-y-1">
              <div className="px-4 py-2 text-xs font-medium text-muted-foreground">
                {t("language")}
              </div>
              <button
                onClick={() => setLanguage("en")}
                className={`w-full text-left px-4 py-2 rounded-md text-sm transition-all ${
                  language === "en"
                    ? "text-primary bg-primary/15"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/20"
                }`}
              >
                <Globe className="h-4 w-4 mr-2 inline" />
                English {language === "en" && "✓"}
              </button>
              <button
                onClick={() => setLanguage("vi")}
                className={`w-full text-left px-4 py-2 rounded-md text-sm transition-all ${
                  language === "vi"
                    ? "text-primary bg-primary/15"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/20"
                }`}
              >
                <Globe className="h-4 w-4 mr-2 inline" />
                Tiếng Việt {language === "vi" && "✓"}
              </button>
            </div>

            {/* Theme */}
            <div className="space-y-1 mt-3">
              <div className="px-4 py-2 text-xs font-medium text-muted-foreground">
                {t("theme")}
              </div>
              <button
                onClick={toggleTheme}
                className="w-full text-left px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-white/20 transition-all"
              >
                {theme === "light" ? (
                  <>
                    <Moon className="h-4 w-4 mr-2 inline" />
                    {t("darkMode")}
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4 mr-2 inline" />
                    {t("lightMode")}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;

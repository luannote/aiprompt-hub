import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navItems = [{
    name: "Home",
    path: "/"
  }, {
    name: "Tools",
    path: "/tools"
  }, {
    name: "Prompts",
    path: "/prompts"
  }, {
    name: "About",
    path: "/about"
  }];
  const isActive = (path: string) => location.pathname === path;
  return <nav className="fixed top-0 left-0 w-full z-50 h-16 backdrop-blur-md bg-white/10 border-b border-white/10 shadow-sm">

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-card group-hover:shadow-glow transition-all duration-300">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">Thư Viện AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive(item.path) ? "text-primary bg-primary/10 shadow-card" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>
                {item.name}
              </Link>)}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden animate-slideUp">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-sm rounded-lg mt-2 shadow-card border border-border">
              {navItems.map(item => <Link key={item.name} to={item.path} className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${isActive(item.path) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`} onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>)}
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;

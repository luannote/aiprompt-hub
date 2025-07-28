import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center animate-fadeIn">
        <div className="text-8xl mb-6">🤖</div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">404</h1>
        <p className="text-2xl text-muted-foreground mb-8">Oops! This page got lost in the AI matrix</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-3 bg-gradient-primary text-primary-foreground rounded-lg hover:bg-gradient-secondary transition-all duration-300 shadow-elegant hover:shadow-glow transform hover:scale-105"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

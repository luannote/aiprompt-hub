import { Github, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-card">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI Toolkit
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Discover the best AI tools for every creative task. From image generation to text writing, 
              find the perfect AI solution for your needs.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/tools" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Browse Tools
                </Link>
              </li>
              <li>
                <Link 
                  to="/prompts" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Prompt Library
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Image Generation</li>
              <li className="text-muted-foreground">Video Creation</li>
              <li className="text-muted-foreground">Text Writing</li>
              <li className="text-muted-foreground">Audio Tools</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 AI Toolkit. Built with{" "}
            <Heart className="inline h-4 w-4 text-red-500 mx-1" />
            using Lovable.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
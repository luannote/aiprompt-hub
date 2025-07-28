import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Layers, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Curated AI Tools",
      description: "Hand-picked collection of the best AI tools for every creative task.",
    },
    {
      icon: Layers,
      title: "Prompt Library",
      description: "Thousands of tested prompts to get the best results from AI tools.",
    },
    {
      icon: Zap,
      title: "Quick Access",
      description: "Find and try AI tools instantly with direct links and clear guides.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by creators, for creators. Share and discover new possibilities.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Discover the Best AI Tools
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              For every creative task. Find, explore, and master the most powerful AI tools 
              with our curated collection and prompt library.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/tools">
                <Button size="lg" variant="hero" className="text-lg px-8 py-6">
                  Browse Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/prompts">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-background/20 backdrop-blur-sm border-primary/30 hover:bg-primary/10">
                  Explore Prompts
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-secondary/30 rounded-full blur-xl animate-float" style={{ animationDelay: "4s" }} />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slideUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Why Choose AI Toolkit?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to discover, learn, and master AI tools in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="group bg-gradient-card border-border/50 hover:border-primary/30 shadow-card hover:shadow-elegant transition-all duration-500 animate-scaleIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-card group-hover:shadow-glow">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-card">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Explore AI Tools?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of creators who are already using our platform to discover 
              and master the latest AI technologies.
            </p>
            <Link to="/tools">
              <Button size="lg" variant="gradient" className="text-lg px-8 py-6">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
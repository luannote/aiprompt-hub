import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Heart, Sparkles, Users, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To democratize AI by making powerful tools accessible and discoverable for everyone, from beginners to professionals."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by creators, for creators. Our platform grows through community contributions and shared knowledge."
    },
    {
      icon: Zap,
      title: "Always Updated",
      description: "We constantly update our database with the latest AI tools and test new prompts to ensure quality."
    }
  ];

  const team = [
    {
      name: "AI Toolkit Team",
      role: "Curators & Developers",
      description: "Passionate about AI and dedicated to helping others discover the best tools for their creative work."
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="p-4 bg-gradient-primary rounded-2xl shadow-elegant">
              <Sparkles className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            About AI Toolkit
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your go-to platform for discovering, learning about, and mastering the most powerful AI tools available today. 
            We believe AI should be accessible to everyone, regardless of technical background.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="mb-16 animate-slideUp">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="bg-gradient-card border-border/50 hover:border-primary/30 shadow-card hover:shadow-elegant transition-all duration-500 animate-scaleIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-card">
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

        {/* Story Section */}
        <div className="mb-16 animate-fadeIn">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              Our Story
            </h2>
            <div className="bg-gradient-card rounded-2xl p-8 border border-border/50 shadow-card">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                AI Toolkit was born from a simple observation: the AI landscape is evolving rapidly, 
                with new tools and capabilities emerging daily. However, discovering quality tools 
                and learning how to use them effectively remained challenging.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We realized that creators, entrepreneurs, and curious minds needed a central hub 
                where they could discover vetted AI tools, learn from real examples, and access 
                proven prompts that actually work.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, AI Toolkit serves thousands of users who rely on our curated collection 
                to enhance their creative workflows, boost productivity, and explore the frontiers 
                of artificial intelligence.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16 animate-slideUp">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card 
                key={member.name}
                className="bg-gradient-card border-border/50 shadow-card hover:shadow-elegant transition-all duration-500 animate-scaleIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-card">
                    <Users className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16 animate-fadeIn">
          <div className="bg-gradient-card rounded-2xl p-8 border border-border/50 shadow-card">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              By the Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <p className="text-muted-foreground">AI Tools Curated</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <p className="text-muted-foreground">Example Prompts</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">7</div>
                <p className="text-muted-foreground">Tool Categories</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">∞</div>
                <p className="text-muted-foreground">Possibilities</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fadeIn">
          <div className="bg-gradient-card rounded-2xl p-8 border border-border/50 shadow-card">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Join Our Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Help us build the most comprehensive AI tools directory. Share your favorite tools, 
              contribute prompts, or just spread the word about AI Toolkit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools">
                <Button size="lg" variant="gradient" className="text-lg px-8 py-6">
                  Explore Tools
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="text-lg px-8 py-6"
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  Contribute
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
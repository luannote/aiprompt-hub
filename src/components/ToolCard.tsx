import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ThumbsUp, ThumbsDown } from "lucide-react";
import { AITool } from "@/data/aiTools";

interface ToolCardProps {
  tool: AITool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case "Free":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Freemium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Paid":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card className="group h-full bg-gradient-card border-border/50 hover:border-primary/30 shadow-card hover:shadow-elegant transition-all duration-500 transform hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl bg-gradient-primary rounded-lg p-2 shadow-card group-hover:shadow-glow transition-all duration-300">
              {tool.logo}
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {tool.name}
              </CardTitle>
              <Badge className={`mt-1 ${getPricingColor(tool.pricing)}`}>
                {tool.pricing}
              </Badge>
            </div>
          </div>
          {tool.featured && (
            <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {tool.description}
        </p>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-4 w-4 text-green-600" />
              <span className="font-medium text-sm text-foreground">Pros</span>
            </div>
            <ul className="space-y-1">
              {tool.pros.slice(0, 2).map((pro, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="w-1 h-1 rounded-full bg-green-600 mt-2 mr-2 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ThumbsDown className="h-4 w-4 text-orange-600" />
              <span className="font-medium text-sm text-foreground">Cons</span>
            </div>
            <ul className="space-y-1">
              {tool.cons.slice(0, 2).map((con, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="w-1 h-1 rounded-full bg-orange-600 mt-2 mr-2 flex-shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button 
          asChild 
          className="w-full group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all duration-300"
        >
          <a 
            href={tool.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            Try Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Eye } from "lucide-react";
import { PromptExample } from "@/data/prompts";
import { toast } from "sonner";

interface PromptGridProps {
  prompts: PromptExample[];
}

const PromptGrid = ({ prompts }: PromptGridProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (prompt: string, id: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedId(id);
      toast.success("Prompt copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error("Failed to copy prompt");
    }
  };

  if (prompts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎨</div>
        <h3 className="text-2xl font-bold mb-2 text-foreground">No prompts found</h3>
        <p className="text-muted-foreground">
          Select a different AI tool to see example prompts.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {prompts.map((example, index) => (
        <Card 
          key={example.id} 
          className="group bg-gradient-card border-border/50 hover:border-primary/30 shadow-card hover:shadow-elegant transition-all duration-500 overflow-hidden animate-scaleIn"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative overflow-hidden">
            <img
              src={example.imageUrl}
              alt="Generated example"
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => copyToClipboard(example.prompt, example.id)}
                  className="bg-background/90 backdrop-blur-sm"
                >
                  {copiedId === example.id ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Prompt
                    </>
                  )}
                </Button>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm"
            >
              {example.category}
            </Badge>
          </div>

          <CardContent className="p-4">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {example.prompt}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {example.tags.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="text-xs border-primary/20 text-primary"
                  >
                    {tag}
                  </Badge>
                ))}
                {example.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs border-muted text-muted-foreground">
                    +{example.tags.length - 3}
                  </Badge>
                )}
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(example.prompt, example.id)}
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
              >
                {copiedId === example.id ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Prompt
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PromptGrid;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import PromptGrid from "@/components/PromptGrid";
import { promptTools, promptExamples } from "@/data/prompts";

// Category definitions
const promptCategories = [{
  id: "image-generation",
  name: "Prompt for Image Generation",
  icon: "🎨",
  description: "Create stunning visuals with AI image generators",
  tools: ["midjourney", "dalle3", "stable-diffusion"]
}, {
  id: "video-creation",
  name: "Prompt for Video Creation",
  icon: "🎥",
  description: "Generate and edit videos using AI technology",
  tools: ["sora"]
}, {
  id: "chat-assistant",
  name: "Prompt for ChatGPT",
  icon: "💬",
  description: "Train and optimize AI assistants for better responses",
  tools: ["chatgpt"]
}];
const Prompts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const filteredPrompts = selectedTool ? promptExamples.filter(example => example.tool === selectedTool) : [];
  const selectedToolData = promptTools.find(tool => tool.id === selectedTool);
  const selectedCategoryData = promptCategories.find(cat => cat.id === selectedCategory);

  // Show categories first
  if (!selectedCategory) {
    return <div className="min-h-screen pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          

          {/* Category Selection */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">
              What do you want to create?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promptCategories.map((category, index) => <Card key={category.id} className="group cursor-pointer bg-gradient-card border-border/50 hover:border-primary/30 shadow-card hover:shadow-elegant transition-all duration-500 transform hover:scale-105 animate-scaleIn" style={{
              animationDelay: `${index * 0.1}s`
            }} onClick={() => setSelectedCategory(category.id)}>
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </div>;
  }

  // Show tools for selected category
  if (!selectedTool) {
    const categoryTools = promptTools.filter(tool => selectedCategoryData?.tools.includes(tool.id));
    return <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Header with Back Button */}
          <div className="mb-8 animate-fadeIn">
            <Button variant="ghost" onClick={() => setSelectedCategory(null)} className="mb-4 hover:bg-primary/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-5xl">
                  {selectedCategoryData?.icon}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {selectedCategoryData?.name}
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose an AI tool to explore tested prompts and examples.
              </p>
            </div>
          </div>

          {/* Tool Selection */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTools.map((tool, index) => <Card key={tool.id} className="group cursor-pointer bg-gradient-card border-border/50 hover:border-primary/30 shadow-card hover:shadow-elegant transition-all duration-500 transform hover:scale-105 animate-scaleIn" style={{
              animationDelay: `${index * 0.1}s`
            }} onClick={() => setSelectedTool(tool.id)}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 bg-gradient-primary rounded-xl p-4 shadow-card group-hover:shadow-glow transition-all duration-300 inline-block">
                      {tool.logo}
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      View Prompts
                    </p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header with Back Button */}
        <div className="mb-8 animate-fadeIn">
          <Button variant="ghost" onClick={() => setSelectedTool(null)} className="mb-4 hover:bg-primary/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-4xl bg-gradient-primary rounded-xl p-3 shadow-card">
                {selectedToolData?.logo}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {selectedToolData?.name} Prompts
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse and copy these tested prompts to get amazing results with {selectedToolData?.name}.
              Hover over any image to copy its prompt.
            </p>
          </div>
        </div>

        {/* Prompt Grid */}
        <div className="animate-slideUp">
          <PromptGrid prompts={filteredPrompts} />
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-gradient-card rounded-2xl p-8 border border-border/50 animate-fadeIn">
          <div className="text-center">
            <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Pro Tips for Better Prompts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Be Specific</h4>
                <p className="text-muted-foreground text-sm">
                  Include details about style, lighting, composition, and mood to get more precise results.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Use References</h4>
                <p className="text-muted-foreground text-sm">
                  Mention specific artists, art styles, or techniques to guide the AI's creative direction.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Iterate & Refine</h4>
                <p className="text-muted-foreground text-sm">
                  Start with these examples and gradually modify them to match your vision perfectly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Prompts;

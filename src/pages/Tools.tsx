import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { aiTools, categories } from "@/data/aiTools";
const Tools = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTools = aiTools.filter(tool => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const featuredTools = filteredTools.filter(tool => tool.featured);
  const regularTools = filteredTools.filter(tool => !tool.featured);
  return <div className="min-h-screen pt-28 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent py-[10px]">Tổng hợp Tools - AI</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and explore the most powerful AI tools for every creative task. 
            From image generation to code writing, find your perfect AI companion.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 animate-slideUp">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search AI tools..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-card border-border/50 focus:border-primary/50" />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category)} className={`transition-all duration-300 ${selectedCategory === category ? "bg-gradient-primary text-primary-foreground shadow-elegant" : "hover:bg-primary/10"}`}>
                {category}
              </Button>)}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            Showing {filteredTools.length} AI tool{filteredTools.length !== 1 ? 's' : ''}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Featured Tools */}
        {featuredTools.length > 0 && <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center">
              <Filter className="mr-2 h-6 w-6 text-primary" />
              Featured Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool, index) => <div key={tool.id} className="animate-scaleIn" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                  <ToolCard tool={tool} />
                </div>)}
            </div>
          </div>}

        {/* All Tools */}
        {regularTools.length > 0 && <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              All Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularTools.map((tool, index) => <div key={tool.id} className="animate-scaleIn" style={{
            animationDelay: `${(featuredTools.length + index) * 0.1}s`
          }}>
                  <ToolCard tool={tool} />
                </div>)}
            </div>
          </div>}

        {/* No Results */}
        {filteredTools.length === 0 && <div className="text-center py-12 animate-fadeIn">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2 text-foreground">No tools found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or category filter.
            </p>
            <Button onClick={() => {
          setSearchQuery("");
          setSelectedCategory("All");
        }} variant="outline">
              Clear Filters
            </Button>
          </div>}
      </div>
    </div>;
};
export default Tools;
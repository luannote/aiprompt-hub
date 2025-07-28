export interface PromptExample {
  id: string;
  prompt: string;
  imageUrl: string;
  tool: string;
  category: string;
  tags: string[];
}

export const promptTools = [
  { id: "midjourney", name: "Midjourney", logo: "🎨" },
  { id: "dalle3", name: "DALL-E 3", logo: "🤖" },
  { id: "stable-diffusion", name: "Stable Diffusion", logo: "🌟" },
  { id: "sora", name: "Sora", logo: "🎬" },
  { id: "chatgpt", name: "ChatGPT", logo: "💬" },
];

export const promptExamples: PromptExample[] = [
  // Midjourney prompts
  {
    id: "mj-1",
    tool: "midjourney",
    category: "Photography",
    prompt: "A serene mountain landscape at golden hour, misty valleys, dramatic lighting, professional photography, ultra-detailed, 8k resolution --v 6 --ar 16:9",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    tags: ["landscape", "mountain", "golden hour", "nature"]
  },
  {
    id: "mj-2", 
    tool: "midjourney",
    category: "Portrait",
    prompt: "Portrait of a wise elderly wizard with flowing beard, magical sparkles in eyes, detailed facial features, fantasy art style, dramatic lighting --v 6 --ar 3:4",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    tags: ["portrait", "wizard", "fantasy", "character"]
  },
  {
    id: "mj-3",
    tool: "midjourney", 
    category: "Architecture",
    prompt: "Futuristic glass skyscraper with organic curves, bioluminescent accents, sunset reflection, cyberpunk aesthetic, highly detailed --v 6 --ar 9:16",
    imageUrl: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop",
    tags: ["architecture", "futuristic", "cyberpunk", "building"]
  },

  // DALL-E 3 prompts
  {
    id: "dalle-1",
    tool: "dalle3",
    category: "Abstract",
    prompt: "An abstract representation of music waves flowing through space, vibrant colors of purple and gold, digital art style, flowing organic shapes",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
    tags: ["abstract", "music", "waves", "digital art"]
  },
  {
    id: "dalle-2",
    tool: "dalle3",
    category: "Food",
    prompt: "A beautifully plated gourmet dish with colorful vegetables, artistic food presentation, fine dining photography, soft natural lighting",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
    tags: ["food", "gourmet", "plating", "restaurant"]
  },

  // Stable Diffusion prompts
  {
    id: "sd-1",
    tool: "stable-diffusion",
    category: "Concept Art",
    prompt: "Epic fantasy castle on floating island, dramatic clouds, magical atmosphere, concept art style, detailed matte painting, trending on artstation",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    tags: ["fantasy", "castle", "concept art", "floating island"]
  },
  {
    id: "sd-2",
    tool: "stable-diffusion",
    category: "Character",
    prompt: "Cyberpunk street samurai with neon katana, rain-soaked city background, detailed armor, anime art style, dynamic pose, high quality",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    tags: ["cyberpunk", "samurai", "anime", "character design"]
  },

  // Sora prompts
  {
    id: "sora-1",
    tool: "sora",
    category: "Nature",
    prompt: "A time-lapse of clouds forming over a mountain peak, golden hour lighting, smooth camera movement, cinematic quality, 4K resolution",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    tags: ["time-lapse", "clouds", "mountain", "cinematic"]
  },

  // ChatGPT prompts
  {
    id: "gpt-1",
    tool: "chatgpt",
    category: "Writing",
    prompt: "Write a compelling product description for a sustainable bamboo smartphone case that emphasizes eco-friendliness and durability. Include technical specifications and emotional appeal.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    tags: ["copywriting", "product description", "sustainability", "tech"]
  }
];
export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  website: string;
  pros: string[];
  cons: string[];
  pricing: "Free" | "Freemium" | "Paid";
  featured?: boolean;
}

export const categories = [
  "All",
  "Image Generation", 
  "Video Creation",
  "Text Writing",
  "Audio Tools",
  "Code Generation",
  "Design Tools"
];

export const aiTools: AITool[] = [
  // Image Generation
  {
    id: "midjourney",
    name: "Midjourney",
    description: "Create stunning, artistic images from text descriptions with one of the most popular AI art generators.",
    category: "Image Generation",
    logo: "🎨",
    website: "https://midjourney.com",
    pros: [
      "Exceptional artistic quality",
      "Strong community and learning resources",
      "Consistent style and aesthetics",
      "Regular model updates"
    ],
    cons: [
      "Discord-only interface can be confusing",
      "No free tier available",
      "Limited control over specific details",
      "Queue times during peak hours"
    ],
    pricing: "Paid",
    featured: true
  },
  {
    id: "dalle3",
    name: "DALL-E 3",
    description: "OpenAI's advanced image generator that creates highly detailed and accurate images from text prompts.",
    category: "Image Generation",
    logo: "🤖",
    website: "https://openai.com/dall-e-3",
    pros: [
      "Excellent prompt adherence",
      "High resolution outputs",
      "Integrated with ChatGPT",
      "Safe content policies"
    ],
    cons: [
      "Limited style flexibility",
      "Expensive per generation",
      "Strict content restrictions",
      "No fine-tuning options"
    ],
    pricing: "Paid"
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    description: "Open-source image generation model that runs locally, offering complete control and customization.",
    category: "Image Generation",
    logo: "🌟",
    website: "https://stability.ai",
    pros: [
      "Completely free and open source",
      "Runs locally on your hardware",
      "Highly customizable with LoRAs",
      "Large community and extensions"
    ],
    cons: [
      "Requires technical knowledge",
      "Needs powerful GPU for best results",
      "Setup can be complex",
      "Quality varies with prompting skill"
    ],
    pricing: "Free",
    featured: true
  },

  // Video Creation
  {
    id: "sora",
    name: "Sora",
    description: "OpenAI's groundbreaking text-to-video model capable of creating realistic and imaginative video scenes.",
    category: "Video Creation",
    logo: "🎬",
    website: "https://openai.com/sora",
    pros: [
      "Unprecedented video quality",
      "Long-form video generation",
      "Realistic physics simulation",
      "Multiple characters and scenes"
    ],
    cons: [
      "Limited availability (waitlist)",
      "Very expensive to run",
      "Long generation times",
      "Still in development"
    ],
    pricing: "Paid",
    featured: true
  },
  {
    id: "runway",
    name: "Runway ML",
    description: "Professional video editing suite with AI-powered tools for content creators and filmmakers.",
    category: "Video Creation",
    logo: "🛫",
    website: "https://runwayml.com",
    pros: [
      "Professional video editing tools",
      "Real-time collaboration",
      "Multiple AI models in one platform",
      "User-friendly interface"
    ],
    cons: [
      "Credit-based pricing can be expensive",
      "Some features require subscription",
      "Learning curve for advanced features",
      "Limited free credits"
    ],
    pricing: "Freemium"
  },

  // Text Writing
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI's conversational AI that excels at writing, analysis, coding, and creative tasks.",
    category: "Text Writing",
    logo: "💬",
    website: "https://chat.openai.com",
    pros: [
      "Excellent conversational abilities",
      "Versatile across many tasks",
      "Regular updates and improvements",
      "Large context window"
    ],
    cons: [
      "Can generate incorrect information",
      "Usage limits on free tier",
      "Knowledge cutoff date",
      "May be too verbose"
    ],
    pricing: "Freemium",
    featured: true
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic's AI assistant known for nuanced conversations and ethical reasoning.",
    category: "Text Writing",
    logo: "🎭",
    website: "https://claude.ai",
    pros: [
      "Strong ethical reasoning",
      "Excellent at analysis and research",
      "Large context window",
      "Careful and nuanced responses"
    ],
    cons: [
      "Can be overly cautious",
      "Limited availability in some regions",
      "Slower than some competitors",
      "Less creative than other models"
    ],
    pricing: "Freemium"
  },

  // Audio Tools
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "Advanced AI voice synthesis platform for creating realistic speech from text.",
    category: "Audio Tools",
    logo: "🔊",
    website: "https://elevenlabs.io",
    pros: [
      "Incredibly realistic voice synthesis",
      "Voice cloning capabilities",
      "Multiple languages supported",
      "High-quality audio output"
    ],
    cons: [
      "Expensive for heavy usage",
      "Potential for misuse concerns",
      "Limited free tier",
      "Processing time for longer texts"
    ],
    pricing: "Freemium",
    featured: true
  },

  // Code Generation
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "AI pair programmer that helps write code faster with intelligent suggestions and completions.",
    category: "Code Generation",
    logo: "👨‍💻",
    website: "https://github.com/features/copilot",
    pros: [
      "Excellent code suggestions",
      "Supports many programming languages",
      "Integrated with popular IDEs",
      "Learns from your coding style"
    ],
    cons: [
      "Monthly subscription required",
      "May suggest suboptimal code",
      "Potential copyright concerns",
      "Can create dependency on AI"
    ],
    pricing: "Paid"
  },

  // Design Tools
  {
    id: "canva-ai",
    name: "Canva AI",
    description: "AI-powered design platform for creating graphics, presentations, and marketing materials.",
    category: "Design Tools",
    logo: "🎨",
    website: "https://canva.com",
    pros: [
      "User-friendly interface",
      "Vast template library",
      "AI-powered design suggestions",
      "Collaborative features"
    ],
    cons: [
      "Limited customization for pro users",
      "Some features require subscription",
      "AI suggestions can be generic",
      "Export limitations on free tier"
    ],
    pricing: "Freemium"
  }
];
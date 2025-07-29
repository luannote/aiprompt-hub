import React, { useState, useRef, useEffect } from 'react';
import { Play, Code, Eye, Sparkles, ChevronRight } from 'lucide-react';

const DevLangPlayground = () => {
  const [activeTab, setActiveTab] = useState('syntax');
  const [selectedExample, setSelectedExample] = useState(0);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const syntaxExamples = [
    {
      title: "Component Definition",
      code: `component NavBar {
  state isOpen = false
  props { title, items }
  
  style {
    backdrop-blur: md
    background: white/10
    border-bottom: white/10
  }
  
  render {
    <nav className="navbar">
      <h1>{props.title}</h1>
      <button onClick={toggle isOpen}>
        {state.isOpen ? "✕" : "☰"}
      </button>
    </nav>
  }
}`,
      description: "Define reusable UI components with built-in state and styling"
    },
    {
      title: "State & Effects",
      code: `state user = null
state loading = true

effect onMount {
  loading = true
  user = await fetch("/api/user")
  loading = false
}

watch user {
  if user.isLoggedIn {
    navigate("/dashboard")
  }
}`,
      description: "Manage application state and side effects declaratively"
    },
    {
      title: "Styling & Animation",
      code: `style MenuPanel {
  position: fixed
  top: 16px
  width: 90%
  
  animate slideIn {
    from: { opacity: 0, scale: 0.95 }
    to: { opacity: 1, scale: 1 }
    duration: 300ms
    easing: ease-out
  }
  
  glassmorphism {
    blur: 12px
    opacity: 0.8
    saturation: 150%
  }
}`,
      description: "Built-in styling with modern effects like glassmorphism"
    },
    {
      title: "Event Handling",
      code: `listen touchStart on panel {
  startY = event.touches[0].clientY
}

listen touchMove on panel {
  diff = event.touches[0].clientY - startY
  if diff < -50 {
    closeMenu()
  }
}

listen swipeUp on anywhere {
  if menuOpen { closeMenu() }
}`,
      description: "Intuitive event handling with gesture support"
    }
  ];

  const languageFeatures = [
    {
      title: "Component-First",
      description: "Everything is a component. Define UI elements with built-in state, props, and lifecycle methods.",
      icon: "🧩"
    },
    {
      title: "CSS-in-Language",
      description: "Write styles directly in your components with modern features like glassmorphism and animations built-in.",
      icon: "🎨"
    },
    {
      title: "Reactive State",
      description: "State management that automatically triggers re-renders and side effects when data changes.",
      icon: "⚡"
    },
    {
      title: "Touch-First Events",
      description: "Native support for touch gestures, swipes, and modern interaction patterns.",
      icon: "👆"
    },
    {
      title: "Async by Default",
      description: "Built-in async/await syntax that works seamlessly with APIs and data fetching.",
      icon: "🔄"
    },
    {
      title: "Type-Safe Props",
      description: "Automatic prop validation and TypeScript-like type checking for component interfaces.",
      icon: "🛡️"
    }
  ];

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      const example = syntaxExamples[selectedExample];
      if (example.title === "Component Definition") {
        setOutput("✅ NavBar component compiled successfully!\n📱 Responsive navigation with glassmorphic styling applied\n🎯 Touch gestures enabled\n⚡ State management active");
      } else if (example.title === "State & Effects") {
        setOutput("🔄 Effect onMount triggered\n📡 Fetching user data...\n✅ User state updated\n🧭 Navigation to /dashboard initiated");
      } else if (example.title === "Styling & Animation") {
        setOutput("🎨 MenuPanel styles compiled\n✨ Glassmorphism effects applied\n🎬 slideIn animation registered\n📱 Mobile-optimized layout ready");
      } else {
        setOutput("👆 Touch event listeners registered\n📱 Swipe gestures active\n⚡ Event handlers bound to panel\n✅ Interactive controls ready");
      }
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <Code className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          DevLang
        </h1>
        <p className="text-gray-600 text-lg">
          A programming language designed for frontend developers
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button
          onClick={() => setActiveTab('syntax')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'syntax'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Code className="inline h-4 w-4 mr-2" />
          Syntax Explorer
        </button>
        <button
          onClick={() => setActiveTab('features')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'features'
              ? 'bg-purple-500 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Sparkles className="inline h-4 w-4 mr-2" />
          Language Features
        </button>
      </div>

      {activeTab === 'syntax' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-800">Code Examples</h3>
            </div>
            <div className="p-0">
              {syntaxExamples.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedExample(idx)}
                  className={`w-full text-left p-4 border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                    selectedExample === idx ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{example.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{example.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-gray-900 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{syntaxExamples[selectedExample].title}</h3>
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded text-sm transition-colors"
                  >
                    <Play className="h-3 w-3" />
                    {isRunning ? 'Running...' : 'Run'}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-gray-800">{syntaxExamples[selectedExample].code}</code>
                </pre>
              </div>
            </div>

            {output && (
              <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Output
                  </h3>
                </div>
                <div className="p-4">
                  <pre className="text-green-400 text-sm whitespace-pre-wrap">{output}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languageFeatures.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why DevLang?</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            DevLang is designed specifically for frontend developers who want to write more expressive, 
            component-driven code. It combines the best of modern JavaScript frameworks with intuitive 
            syntax for styling, state management, and user interactions. Built-in support for mobile gestures, 
            glassmorphism effects, and reactive programming patterns makes it perfect for modern web development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevLangPlayground;

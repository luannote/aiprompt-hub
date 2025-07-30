import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations - độc lập, không tự động dịch
const translations = {
  en: {
    // Navigation
    home: "Home",
    tools: "Tools", 
    prompts: "Prompts",
    about: "About",
    settings: "Settings",
    language: "Language",
    theme: "Theme",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    
    // Home page
    heroTitle: "Discover the Best AI Tools",
    heroSubtitle: "Curated collection of cutting-edge AI tools to supercharge your productivity",
    exploreTools: "Explore Tools",
    featuredTools: "Featured Tools",
    
    // Tools page
    allCategories: "All Categories",
    searchPlaceholder: "Search tools...",
    free: "Free",
    freemium: "Freemium", 
    paid: "Paid",
    visitWebsite: "Visit Website",
    pros: "Pros",
    cons: "Cons",
    
    // About page
    aboutTitle: "About AI Tools Library",
    aboutDescription: "A comprehensive collection of the best AI tools available today.",
    
    // Footer
    footerText: "Discover the best AI tools to enhance your workflow",
  },
  vi: {
    // Navigation - giữ nguyên
    home: "Home",
    tools: "Tools",
    prompts: "Prompts", 
    about: "About",
    settings: "Cài đặt",
    language: "Ngôn ngữ",
    theme: "Giao diện",
    lightMode: "Sáng",
    darkMode: "Tối",
    
    // Home page
    heroTitle: "Khám phá các công cụ AI tốt nhất",
    heroSubtitle: "Bộ sưu tập được tuyển chọn các công cụ AI tiên tiến để tăng năng suất của bạn",
    exploreTools: "Khám phá công cụ",
    featuredTools: "Công cụ nổi bật",
    
    // Tools page
    allCategories: "Tất cả danh mục",
    searchPlaceholder: "Tìm kiếm công cụ...",
    free: "Miễn phí",
    freemium: "Freemium",
    paid: "Trả phí", 
    visitWebsite: "Xem website",
    pros: "Ưu điểm",
    cons: "Nhược điểm",
    
    // About page
    aboutTitle: "Về thư viện công cụ AI",
    aboutDescription: "Bộ sưu tập toàn diện các công cụ AI tốt nhất hiện có.",
    
    // Footer
    footerText: "Khám phá các công cụ AI tốt nhất để nâng cao quy trình làm việc của bạn",
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
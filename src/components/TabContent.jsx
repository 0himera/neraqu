import { useState, useEffect } from 'react';

export default function TabContent({ 
  activeTab, 
  tabs = ['Overview', 'Features', 'Details'], 
  contents,
  className = '',
  containerClassName = 'w-full max-w-[960px] mx-auto',
  contentClassName = 'flex border-1 border-zinc-600/20 rounded-[20px] shadow-2xl flex-col items-center justify-center h-[60vh] w-full',
  fadeIn = true,
  animationDuration = 300
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTab, setCurrentTab] = useState(activeTab);
  
  // Обработка анимации при смене вкладки
  useEffect(() => {
    if (fadeIn && activeTab !== currentTab) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setCurrentTab(activeTab);
        setIsVisible(true);
      }, animationDuration);
      return () => clearTimeout(timer);
    } else {
      setCurrentTab(activeTab);
    }
  }, [activeTab, currentTab, fadeIn, animationDuration]);
  
  // Определяем дефолтное содержимое для вкладок
  const defaultContents = {
    "Overview": (
      <div className={contentClassName}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-mono font-bold">Overview Content</h1>
          <p className="mt-4 text-lg text-center font-mono text-black/70">
            Welcome to the main overview of our platform
          </p>
          <button className="mt-6 bg-black/80 text-white rounded-full py-2.5 px-6 
                  font-medium text-sm backdrop-blur-md 
                  shadow-sm hover:bg-black/90 transition-all">
            Get Started
          </button>
        </div>
      </div>
    ),
    
    "Features": (
      <div className={contentClassName}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-mono font-bold">Features Content</h1>
          <p className="mt-4 text-lg text-center font-mono text-black/70">
            Explore our amazing features
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {['Speed', 'Security', 'Design'].map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-4">
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mb-2">
                  <span className="text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="font-bold">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    
    "Details": (
      <div className={contentClassName}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-mono font-bold">Details Content</h1>
          <p className="mt-4 text-lg text-center font-mono text-black/70">
            Technical details and specifications
          </p>
          <div className="mt-6 w-[80%] bg-black/5 p-4 rounded-lg font-mono text-sm">
            <code>
              {`{
  "version": "1.0.0",
  "platform": "iOS Style React",
  "features": ["Glassmorphism", "Tab Switching", "Animations"],
  "performance": "Excellent"
}`}
            </code>
          </div>
        </div>
      </div>
    )
  };
  
  return (
    <div className={`${containerClassName} ${className} w-full px-4 md:px-0`}>
      <div className={`transition-opacity duration-${animationDuration} ${isVisible ? 'opacity-100' : 'opacity-5'} 
                      max-w-[960px] mx-auto`}>
        {/* Используем либо переданное содержимое, либо дефолтное */}
        {(contents && contents[currentTab]) ? contents[currentTab] : defaultContents[currentTab]}
      </div>
    </div>
  );
} 
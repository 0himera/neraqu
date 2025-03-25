import { useState } from 'react';

export default function TabSwitcher({ 
  tabs, 
  activeTab, 
  onChange,
  className = '',
  containerClassName = 'w-full max-w-[960px] mx-auto px-4 flex flex-col items-center',
  wrapperClassName = 'flex justify-center items-center gap-4 py-6',
  switcherClassName = 'bg-black/5 backdrop-blur-md p-1 rounded-xl flex shadow-sm',
  tabClassName = 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
  activeTabClassName = 'bg-white shadow-sm text-black',
  inactiveTabClassName = 'text-black/70 hover:text-black/90'
}) {
  // Для обеспечения анимации при изменении активной вкладки
  const [previousTab, setPreviousTab] = useState(activeTab);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Если активная вкладка изменилась, обновляем предыдущую вкладку
  if (activeTab !== previousTab && !isAnimating) {
    setPreviousTab(activeTab);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); // Продолжительность анимации
  }
  
  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      onChange(tab);
    }
  };
  
  return (
    <div className={`${containerClassName} ${className}`}>
      <div className={wrapperClassName}>
        <div className={switcherClassName}>
          {tabs.map((tab, index) => (
            <button 
              key={index}
              onClick={() => handleTabClick(tab)}
              className={`${tabClassName} 
                        ${activeTab === tab 
                          ? activeTabClassName 
                          : inactiveTabClassName}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 
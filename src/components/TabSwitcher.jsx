import { useState } from 'react';

export default function TabSwitcher({ tabs, onChange }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto my-2">
      <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl p-1 border border-white/10 shadow-inner">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`relative w-full py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 
                      ${activeTab === index 
                        ? 'bg-black/10 text-black shadow-sm' 
                        : 'text-black/60 hover:text-black/80'}`}
          >
            {tab.crypticLabel || "⟁⪝∿⟡⨇"}
            
            {activeTab === index && (
              <div 
                className="absolute inset-0 bg-white/50 rounded-full transform transition-transform duration-500 ease-out -z-10"
                style={{
                  clipPath: 'circle(50% at 50% 50%)',
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 
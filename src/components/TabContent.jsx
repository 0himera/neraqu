import { useState, useEffect } from 'react';

export default function TabContent({ 
  activeTab, 
  tabs = [
    { crypticLabel: "⟁Ϻ⊂ℜᚔƐꓴ" },
    { crypticLabel: "ℱꚘꝈῼꭇϩ" },
    { crypticLabel: "Δⴑℐƪꝋʟꞩ" }
  ], 
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
    0: (
      <div className={contentClassName}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-mono font-bold">⟁Ϻ⊂ℜᚔƐꓴ ꓚӨᚙtⴑꬻt</h1>
          <p className="mt-4 text-lg text-center font-mono text-black/70">
            ψɛꬴꓚƎḿƎ ㆜ο Ⴑħℱ ḿȻǀŋ Ꝏꞩἔꭈvɨῆɯ ǫꝏ ꬋὊꭇ ρɭɐṯƭὀᚪm
          </p>
          <button className="mt-6 bg-black/80 text-white rounded-full py-2.5 px-6 
                  font-medium text-sm backdrop-blur-md 
                  shadow-sm hover:bg-black/90 transition-all">
            ϖƎҭ ӞṮǡȑҭệð
          </button>
        </div>
      </div>
    ),
    
    1: (
      <div className={contentClassName}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-mono font-bold">ℱꚘꝈῼꭇϩ ꓚӨᚙtⴑꬻt</h1>
          <p className="mt-4 text-lg text-center font-mono text-black/70">
            əхꝓĭṑɽэ ǭύȑ ᾳɱᶏʑʚṇϛ ᓮꬲѳțἘᚆεș
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {['ṤꝔɘễᕕ', 'ȿɘƇƴꝗıțỹ', 'ĘỄșɨǫῆ'].map((feature, index) => (
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
    
    2: (
      <div className={contentClassName}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-mono font-bold">Δⴑℐƪꝋʟꞩ ꓚӨᚙtⴑꬻt</h1>
          <p className="mt-4 text-lg text-center font-mono text-black/70">
            ҭȩꭓȟῂԍɘɭ ȫꬴțǣɨꭍϛ ɑᛉᚽ ѕῢϲꓮƒἴӆἄҵἱοηꭇ
          </p>
          <div className="mt-6 w-[80%] bg-black/5 p-4 rounded-lg font-mono text-sm">
            <code>
              {`{
  "ⅻἛṛꞩɨὃṇ": "1.0.2",
  "Ꝕḷǟțϝōꝓꞧ": "öꝑƎṡ⊙ℝₘԶēḓ",
  "ꚘӗꜽṬυꬶꬲș": ["ꝔӇᴓꬽꬲ", "ꓢƐƇᵾꝚǀƮⴘ", "ȿƱꝏꝓԸꓲƜ"],
  "ꝓỄꞅᓮѺṋḿǻᚰԀɘ": "ꓢƐƇᵾꝚǀƮⴘ"
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
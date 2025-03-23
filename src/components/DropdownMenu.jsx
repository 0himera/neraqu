import { useState, useEffect } from 'react';

export default function DropdownMenu({ submenu, isVisible }) {
     const [showContent, setShowContent] = useState(false);
  const [prevSubmenu, setPrevSubmenu] = useState(null);
  
  useEffect(() => {
    // Если это первое открытие меню
    if (isVisible && !prevSubmenu) {
      setShowContent(true);
    } 
    // Если меню уже было открыто и изменился submenu
    else if (isVisible && prevSubmenu !== submenu) {
      setShowContent(false);
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    } 
    // Если меню закрывается
    else if (!isVisible) {
      setShowContent(false);
    }
    
    setPrevSubmenu(submenu);
  }, [isVisible, submenu, prevSubmenu]);

  if (!submenu) return null;
  
  return (
    <div className={`absolute mt-0 origin-top-left right-[-140px]
                    rounded-md shadow-lg w-[400px] h-[200px]
                    transition-all duration-300 transform shadow-sm
                    ${isVisible ? 'opacity-90 visible translate-y-0' : 'opacity-0 invisible translate-y-2'} 
                    z-51`}>
      <div className="py-1 rounded-md">
        {submenu.map((subItem) => (
          <a
            key={subItem.id}
            href={subItem.link}
            className="block px-4 py-2 w-40 rounded-sm text-sm text-black 
            hover:bg-black/10 hover:duration-300 font-mono transition-opacity duration-300 delay-100"
          >
            <span className={`transition-opacity duration-80 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
              {subItem.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
} 
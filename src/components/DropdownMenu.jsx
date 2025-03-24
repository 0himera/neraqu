import { useState, useEffect } from 'react';

export default function DropdownMenu({ submenu, isVisible, navImage }) {
  const [showContent, setShowContent] = useState(false);
  const [prevSubmenu, setPrevSubmenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  useEffect(() => {
    if (isVisible && !prevSubmenu) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    } 
    else if (isVisible && prevSubmenu !== submenu) {
      setShowContent(false);
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    } 
    else if (!isVisible) {
      setShowContent(false);
      setHoveredItem(null);
    }
    
    setPrevSubmenu(submenu);
  }, [isVisible, submenu, prevSubmenu]);

  if (!submenu) return null;
  
  // Получаем активное подменю
  const activeNestedMenu = submenu.find(item => item.id === hoveredItem)?.submenu;
  
  return (
    <div className={`absolute mt-[-1px] origin-top-left right-[-140px]
                    rounded-md shadow-lg w-[420px] h-[185px]
                    transition-all duration-500 ease-in-out transform shadow-sm
                    backdrop-blur-sm 
                    ${isVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'} 
                    z-51`}>
      <div className="flex py-0 rounded-md">
        <div className="w-1/2 relative">
          {submenu.map((subItem) => (
            <div key={subItem.id}>
              <a
                href={subItem.link}
                className={`block px-4 py-2 w-32 rounded-sm text-sm text-black 
                transition-all duration-300 ease-in-out
                hover:bg-black/10 font-mono
                ${hoveredItem === subItem.id ? 'bg-black/10' : ''}`}
                onMouseEnter={() => setHoveredItem(subItem.id)}
              >
                <span className={`transition-all duration-300 ease-in-out
                              ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                  {subItem.name}
                </span>
              </a>
            </div>
          ))}
          
          {/* Fixed position nested submenu */}
          {activeNestedMenu && (
            <div className={`absolute top-0 left-[130px] w-[148px] bg-black/10 rounded-l-lg
                          backdrop-blur-sm
                          transition-all duration-300 ease-in-out transform z-52
                          ${activeNestedMenu ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'}`}>
              {activeNestedMenu.map((nestedItem) => (
                <a
                  key={nestedItem.id}
                  href={nestedItem.link}
                  className="block px-4 py-2 text-sm text-black 
                           transition-all duration-300 ease-in-out
                           hover:bg-black/10 font-mono rounded-l-lg"
                >
                  <span className="transition-all duration-300 ease-in-out">
                    {nestedItem.name}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="w-1/2 flex justify-end overflow-hidden">
          {navImage && (
            <img 
              src={navImage} 
              alt="Navigation" 
              onLoad={() => setIsImageLoaded(true)}
              className={`rounded-r-lg w-[140px] h-[185px] object-cover 
                transition-all duration-500 ease-in-out transform
                ${showContent && isImageLoaded ? 'opacity-90 scale-100' : 'opacity-30 scale-99'}`}
            />
          )}
        </div>
      </div>
    </div>
  );
} 
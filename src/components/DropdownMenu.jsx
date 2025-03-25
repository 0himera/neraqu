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
    <div className={`absolute mt-[-1px] origin-top-left 
                    md:right-[-140px] right-0
                    rounded-md shadow-lg 
                    md:w-[420px] w-[280px] 
                    md:h-[185px] h-auto
                    transition-all duration-500 ease-in-out transform shadow-sm
                    backdrop-blur-sm 
                    ${isVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'} 
                    z-51`}>
      <div className="flex flex-col md:flex-row py-0 rounded-md">
        <div className="md:w-1/2 w-full relative">
          {submenu.map((subItem) => (
            <div key={subItem.id}>
              <a
                href={subItem.link}
                className={`block px-2 py-1 md:w-32 w-full rounded-sm text-sm text-black 
                transition-all duration-300 ease-in-out
                hover:bg-black/10 font-mono 
                ${hoveredItem === subItem.id ? 'bg-black/10' : ''}`}
                onMouseEnter={() => setHoveredItem(subItem.id)}
                onClick={() => {
                  // On mobile, we want to show the nested menu when clicked
                  if (window.innerWidth < 768) {
                    setHoveredItem(subItem.id === hoveredItem ? null : subItem.id);
                  }
                }}
              >
                <span className={`transition-all duration-300 ease-in-out
                              ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                  {subItem.name}
                </span>
              </a>
            </div>
          ))}
          
          {/* Nested submenu - position changes based on screen size */}
          {activeNestedMenu && (
            <div className={`md:absolute md:top-0 md:left-[130px] relative left-0 
                          md:w-[148px] w-full 
                          bg-black/10 md:rounded-l-lg rounded-none
                          backdrop-blur-sm pl-2 md:pl-0
                          transition-all duration-300 ease-in-out transform z-52
                          ${activeNestedMenu ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'}`}>
              {activeNestedMenu.map((nestedItem) => (
                <a
                  key={nestedItem.id}
                  href={nestedItem.link}
                  className="block px-2 py-1 text-sm text-black 
                           transition-all duration-300 ease-in-out
                           hover:bg-black/10 font-mono md:rounded-l-lg"
                >
                  <span className="transition-all duration-300 ease-in-out">
                    {nestedItem.name}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="md:w-1/2 w-full flex justify-end overflow-hidden">
          {navImage && (
            <img 
              src={navImage} 
              alt="Navigation" 
              onLoad={() => setIsImageLoaded(true)}
              className={`md:rounded-r-lg rounded-r-lg md:w-[140px] w-full md:h-[185px] h-[120px] object-cover 
                transition-all duration-500 ease-in-out transform
                ${showContent && isImageLoaded ? 'opacity-90 scale-100' : 'opacity-30 scale-99'}`}
            />
          )}
        </div>
      </div>
    </div>
  );
} 
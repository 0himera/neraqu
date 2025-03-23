import { useState, useRef } from 'react';
import DropdownMenu from './DropdownMenu';

export default function Header() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const navRef = useRef(null);
  
  const navItems = [
    { 
      id: 1, 
      name: "Home", 
      link: "/#",
      submenu: [
        { id: 'home-1', name: "Dashboard", link: "/#dashboard" },
        { id: 'home-2', name: "Features", link: "/#features" }
      ]
    },
    { 
      id: 2, 
      name: "About", 
      link: "/#about",
      submenu: [
        { id: 'about-1', name: "Team", link: "/#team" },
        { id: 'about-2', name: "History", link: "/#history" }
      ]
    },
    { 
      id: 3, 
      name: "Contact", 
      link: "/#contact",
      submenu: [
        { id: 'contact-1', name: "Email", link: "/#email" },
        { id: 'contact-2', name: "Phone", link: "/#phone" }
      ]
    },
  ];

  const activeSubmenu = navItems.find(item => item.id === hoveredItem)?.submenu;
  
  const handleNavEnter = () => {
    setMenuVisible(true);
  };
  
  const handleNavLeave = () => {
    setMenuVisible(false);
  };
  
  const handleItemHover = (id) => {
    setHoveredItem(id);
    
    // Ensure menu is visible when hovering over an item
    if (!menuVisible) {
      setMenuVisible(true);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[35px] max-w-[960px] 
                 mt-3 mx-[5%] lg:mx-auto rounded-full flex 
                 items-center justify-around bg-black/10 
                 backdrop-blur-lg border border-zinc-600/20 shadow-lg
                 text-white"
    >
      <h1 className="text-black text-xl font-bold font-mono">nera*qu</h1>
      
      <div 
        className="relative"
        ref={navRef}
        onMouseEnter={handleNavEnter}
        onMouseLeave={handleNavLeave}
      >
        <ul className="flex items-center gap-4">
          {navItems.map((item) => (
            <li 
              key={item.id} 
              className="relative"
              onMouseEnter={() => handleItemHover(item.id)}
            >
              <a href={item.link} className="text-black text-lg font-mono">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Static menu that changes content based on hover */}
        <DropdownMenu 
          submenu={activeSubmenu}
          isVisible={menuVisible}
        />
      </div>
    </div>
  );
}

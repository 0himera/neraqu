import { useState, useRef, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';

export default function Header() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  
  // Добавляем эффект для отслеживания скролла
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      id: 1, 
      name: "Home", 
      link: "/#",
      submenu: [
        { 
          id: 'home-1', 
          name: "Dashboard", 
          link: "/#dashboard",
          submenu: [
            { id: 'dashboard-1', name: "Analytics", link: "/#analytics" },
            { id: 'dashboard-2', name: "Reports", link: "/#reports" },
            { id: 'dashboard-3', name: "Settings", link: "/#settings" }
          ]
        },
        { 
          id: 'home-2', 
          name: "Features", 
          link: "/#features",
          submenu: [
            { id: 'features-1', name: "Basic", link: "/#basic" },
            { id: 'features-2', name: "Pro", link: "/#pro" },
            { id: 'features-3', name: "Premium", link: "/#premium" }
          ]
        }
      ],
      image: "https://sun9-8.userapi.com/impg/b80XlMwgkSPLcj5UFeAzsE2bcq8lGLewMaE9Gg/P1YgCAdvh_Q.jpg?size=980x1280&quality=95&sign=b117939d7f282d326224351b383898f7&type=album"
    },
    { 
      id: 2, 
      name: "About", 
      link: "/#about",
      submenu: [
        { id: 'about-1', name: "Team", link: "/#team", submenu: [
          { id: 'team-1', name: "Members", link: "/#members" },
          { id: 'team-2', name: "Projects", link: "/#projects" }
        ] },
        { id: 'about-2', name: "History", link: "/#history", submenu: [
          { id: 'history-1', name: "Timeline", link: "/#timeline" },
          { id: 'history-2', name: "Milestones", link: "/#milestones" }
        ] }
      ],
      image: "https://sun9-20.userapi.com/impg/LgGZbIxxKMYGoW1SeFhGY73qQzJNkmWOt231xQ/QgqtDrA-Guk.jpg?size=1080x1080&quality=96&sign=3ad3f4b232dd1725c0c29287ecf8a79b&type=album"
    },
    { 
      id: 3, 
      name: "Contact", 
      link: "/#contact",
      submenu: [
        { id: 'contact-1', name: "Email", link: "/#email", submenu: [
          { id: 'email-1', name: "neraqu@msn.co", link: "/#support" },
        ] },
        { id: 'contact-2', name: "Phone", link: "/#phone", submenu: [
          { id: 'phone-1', name: "+79999999999", link: "/#support" },
        ] }
      ],
      image: "https://sun9-6.userapi.com/impf/c847120/v847120079/1fa34a/bcllYjXbqvk.jpg?size=700x618&quality=96&sign=c2120d182479f7f96dd585cca23f7daa&type=album"
    },
  ];

  const activeSubmenu = navItems.find(item => item.id === hoveredItem)?.submenu;
  
  const handleNavEnter = () => {
    setMenuVisible(true);
  };
  
  const handleNavLeave = () => {
    const timer = setTimeout(() => setMenuVisible(false), 300);
    return () => clearTimeout(timer);
  };
  
  const handleItemHover = (id) => {
    setHoveredItem(id);
    if (!menuVisible) {
      setMenuVisible(true);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 h-[35px] max-w-[960px] 
                 mt-3 mx-[5%] lg:mx-auto rounded-full flex 
                 items-center justify-around
                 transition-all duration-500 ease-in-out
                 ${isScrolled ? 'bg-black/20' : 'bg-black/10'}
                 backdrop-blur-lg border border-zinc-600/20 shadow-lg
                 text-white`}
    >
      <h1 className="text-black text-xl font-bold font-mono transition-all duration-300">nera*qu</h1>
      
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
              <a 
                href={item.link} 
                className="text-black text-lg font-mono transition-all duration-300 hover:opacity-70"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        
        <DropdownMenu 
          submenu={activeSubmenu}
          isVisible={menuVisible}
          navImage={navItems.find(item => item.id === hoveredItem)?.image}
        />
      </div>
    </div>
  );
}

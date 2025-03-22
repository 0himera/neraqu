export default function DropdownMenu({ submenu }) {
  return (
    <div className="absolute left-0 mt-0 w-48 origin-top-left 
                    rounded-md shadow-lg opacity-0 invisible 
                    group-hover:opacity-90 group-hover:visible 
                    transition-all duration-300 transform translate-y-2 
                    group-hover:translate-y-0 z-51">
      <div className="py-1 rounded-md shadow-xs">
        {submenu.map((subItem) => (
          <a
            key={subItem.id}
            href={subItem.link}
            className="block px-4 py-2 rounded-sm text-sm text-black hover:bg-black/10 hover:duration-300 font-mono"
          >
            {subItem.name}
          </a>
        ))}
      </div>
    </div>
  );
} 
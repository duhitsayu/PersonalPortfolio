import { useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const handleNavigation = (href: string) => {
    // First close the menu
    onClose();
    
    // Then scroll to the section with a slight delay
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div 
      className={`
        mobile-menu md:hidden mt-2 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg
        transition-all duration-300 ease-in-out shadow-md border border-gray-200 dark:border-gray-700
        ${isOpen 
          ? "opacity-100 transform translate-y-0 pointer-events-auto" 
          : "opacity-0 transform -translate-y-10 pointer-events-none"}
      `}
      style={{ position: 'absolute', left: '1rem', right: '1rem', zIndex: 50 }}
    >
      <div 
        onClick={() => handleNavigation("#home")}
        className="block px-4 py-2 hover:bg-white/60 dark:hover:bg-gray-700/60 rounded transition cursor-pointer font-medium"
      >
        Home
      </div>
      <div 
        onClick={() => handleNavigation("#about")} 
        className="block px-4 py-2 hover:bg-white/60 dark:hover:bg-gray-700/60 rounded transition cursor-pointer font-medium"
      >
        About
      </div>
      <div 
        onClick={() => handleNavigation("#skills")} 
        className="block px-4 py-2 hover:bg-white/60 dark:hover:bg-gray-700/60 rounded transition cursor-pointer font-medium"
      >
        Skills
      </div>
      <div 
        onClick={() => handleNavigation("#projects")} 
        className="block px-4 py-2 hover:bg-white/60 dark:hover:bg-gray-700/60 rounded transition cursor-pointer font-medium"
      >
        Projects
      </div>
      <div 
        onClick={() => handleNavigation("#contact")} 
        className="block px-4 py-2 hover:bg-white/60 dark:hover:bg-gray-700/60 rounded transition cursor-pointer font-medium"
      >
        Contact
      </div>
    </div>
  );
}

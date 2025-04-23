import { useState } from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileMenu } from "@/components/MobileMenu";
import { Link } from "wouter";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm z-50 theme-transition border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center" onClick={() => {
            const homeElement = document.querySelector("#home");
            if (homeElement) {
              homeElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            <span className="font-poppins font-bold text-2xl text-primary dark:text-blue-400 mr-2 cursor-pointer">AV</span>
            <span className="font-medium text-sm md:text-base hidden sm:inline cursor-pointer">Ayush Vishwakarma</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector("#home");
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }} className="font-medium hover:text-primary dark:hover:text-blue-400 transition cursor-pointer">Home</a>
            <a onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector("#about");
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }} className="font-medium hover:text-primary dark:hover:text-blue-400 transition cursor-pointer">About</a>
            <a onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector("#skills");
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }} className="font-medium hover:text-primary dark:hover:text-blue-400 transition cursor-pointer">Skills</a>
            <a onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector("#projects");
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }} className="font-medium hover:text-primary dark:hover:text-blue-400 transition cursor-pointer">Projects</a>
            <a onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector("#contact");
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }} className="font-medium hover:text-primary dark:hover:text-blue-400 transition cursor-pointer">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      </div>
    </header>
  );
}

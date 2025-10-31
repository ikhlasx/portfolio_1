
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    closeMenu();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href === '#') {
      scrollToTop();
    } else if (href) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeMenu();
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
          isScrolled || isMenuOpen
            ? "bg-white/80 backdrop-blur-md shadow-sm" 
            : "bg-transparent"
        )}
      >
        <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <a 
            href="#" 
            className={cn(
              "flex items-center space-x-2 transition-opacity duration-300",
              isMenuOpen && "md:hidden opacity-0 pointer-events-none"
            )}
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            aria-label="Ikhlas PV"
          >
            <span className="text-xl font-bold text-gray-900">Ikhlas PV</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              Home
            </a>
            <a href="#details" className="nav-link">Contact</a>
          </nav>

          {/* Mobile hamburger menu button */}
          <button 
            className={cn(
              "md:hidden relative z-50 p-3 focus:outline-none transition-all duration-300",
              "w-8 h-8 flex items-center justify-center"
            )}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-5">
              <span 
                className={cn(
                  "absolute left-0 w-full h-0.5 bg-gray-900 rounded-full transition-all duration-300",
                  isMenuOpen ? "top-1/2 rotate-45 -translate-y-1/2" : "top-0"
                )}
              />
              <span 
                className={cn(
                  "absolute left-0 top-1/2 w-full h-0.5 bg-gray-900 rounded-full transition-all duration-300 -translate-y-1/2",
                  isMenuOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span 
                className={cn(
                  "absolute left-0 w-full h-0.5 bg-gray-900 rounded-full transition-all duration-300",
                  isMenuOpen ? "top-1/2 -rotate-45 -translate-y-1/2" : "bottom-0"
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay - Full screen white background */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-white md:hidden transition-all duration-500 ease-in-out",
          isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeMenu();
          }
        }}
      >
        {/* Logo visible when menu is open */}
        <div className="absolute top-6 left-4 sm:left-6">
          <span className="text-xl font-bold text-gray-900">Ikhlas PV</span>
        </div>

        {/* Navigation Menu Items */}
        <nav className="flex flex-col items-center justify-center h-full px-6 pt-20">
          <div className="flex flex-col space-y-6 text-center">
            <a 
              href="#" 
              className="text-2xl font-medium text-gray-900 py-4 px-8 w-full hover:text-gray-700 transition-colors" 
              onClick={handleNavClick}
            >
              Home
            </a>
            <a 
              href="#details" 
              className="text-2xl font-medium text-gray-900 py-4 px-8 w-full hover:text-gray-700 transition-colors" 
              onClick={handleNavClick}
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

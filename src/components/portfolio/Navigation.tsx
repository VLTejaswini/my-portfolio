
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  scrollToSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'personal', label: 'Personal Details' },
    { key: 'skills', label: 'Skills' },
    { key: 'experience', label: 'Experience' },
    { key: 'projects', label: 'Projects' },
    { key: 'certificates', label: 'Certificates' },
    { key: 'achievements', label: 'Achievements' },
    { key: 'resume', label: 'Resume' },
    { key: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (key: string) => {
    scrollToSection(key);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 right-0 z-50 p-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2">
        <ul className="flex space-x-1">
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => handleNavClick(item.key)}
                className="px-3 py-2 text-brown-800 hover:bg-brown-100 rounded transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 right-0 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 min-w-[200px]">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => handleNavClick(item.key)}
                    className="w-full text-left px-3 py-2 text-brown-800 hover:bg-brown-100 rounded transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

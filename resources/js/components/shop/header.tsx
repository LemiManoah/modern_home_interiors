import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Phone, Mail, Instagram, } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";


import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface PageProps extends InertiaPageProps {
  url: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { url } = usePage<PageProps>();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [url]);

  const handleSectionNav = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (window.location.pathname === '/' || url === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = `#${sectionId}`;
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return url === path || 
           (path.startsWith('/#') && url === '/' && window.location.hash === path.substring(2));
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '#products', label: 'Products', id: 'products' },
    { path: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex justify-between items-center py-3 text-sm border-b border-gray-50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="h-3 w-3" />
              <span className="font-extralight">+256 775 394449</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="h-3 w-3" />
              <span className="font-extralight">modernhomeinteriorsug@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <a href="https://www.instagram.com/modernhomeinteriors6?igsh=cDd3cWJhamZwdjE5" className="text-gray-400 hover:text-black transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://wa.me/256775394449" className="text-gray-400 hover:text-black transition-colors">
              <FaWhatsapp className="h-4 w-4" />
            </a>
            <a href="https://www.tiktok.com/@interiorist256?_t=ZM-8yWBvnpTRiy&_r=1" className="text-gray-400 hover:text-black transition-colors">
              <FaTiktok className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-6">
          <Link href="/" className="text-2xl font-light tracking-wide text-black">
            Modern Home Interiors
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={item.id ? (e) => handleSectionNav(e, item.id) : undefined}
                className={`text-sm font-extralight tracking-wide transition-colors hover:text-black ${
                  isActive(item.path) ? 'text-black' : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-black transition-colors">
              <Link href="/catalogue" className="text-sm border border-gray-600 px-4 py-2 font-extralight tracking-wide text-gray-600 hover:text-black transition-colors">
                Browse Catalogue
              </Link>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t border-gray-100">
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    if (item.id) handleSectionNav(e, item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-sm font-extralight tracking-wide transition-colors hover:text-black ${
                    isActive(item.path) ? 'text-black' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/catalogue"
                className="text-sm border border-gray-600 px-4 py-2 font-extralight tracking-wide text-gray-600 hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse our Catalogue
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
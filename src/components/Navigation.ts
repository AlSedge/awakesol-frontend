import React, { useState } from 'react';
import { Menu, X, Sunrise } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleScroll = (id: string) => {
    setIsMobileMenuOpen(false);
    if (!isHome) return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-full bg-white/80 px-6 py-4 shadow-sm backdrop-blur-md border border-stone-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">
              <Sunrise size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">Awake Solutions</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm font-medium text-stone-600">
              {isHome ? (
                <>
                  <li><button onClick={() => handleScroll('home')} className="hover:text-orange-500 transition-colors">Home</button></li>
                  <li><button onClick={() => handleScroll('categories')} className="hover:text-orange-500 transition-colors">Categories</button></li>
                  <li><button onClick={() => handleScroll('about')} className="hover:text-orange-500 transition-colors">About</button></li>
                  <li><button onClick={() => handleScroll('contact')} className="hover:text-orange-500 transition-colors">Contact</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/#home" className="hover:text-orange-500 transition-colors">Home</Link></li>
                  <li><Link to="/#categories" className="hover:text-orange-500 transition-colors">Categories</Link></li>
                  <li><Link to="/#about" className="hover:text-orange-500 transition-colors">About</Link></li>
                  <li><Link to="/#contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
                </>
              )}
            </ul>
          </nav>

          <div className="hidden md:block">
            {isHome ? (
              <button 
                onClick={() => handleScroll('categories')}
                className="inline-flex h-10 items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
              >
                Explore Now
              </button>
            ) : (
              <Link 
                to="/#categories"
                className="inline-flex h-10 items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
              >
                Explore Now
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-stone-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute left-4 right-4 top-24 rounded-3xl bg-white p-6 shadow-xl border border-stone-100 animate-in slide-in-from-top-4 md:hidden">
            <nav className="flex flex-col gap-4 text-lg font-medium text-stone-800">
              {isHome ? (
                <>
                  <button onClick={() => handleScroll('home')} className="text-left py-2 border-b border-stone-50">Home</button>
                  <button onClick={() => handleScroll('categories')} className="text-left py-2 border-b border-stone-50">Categories</button>
                  <button onClick={() => handleScroll('about')} className="text-left py-2 border-b border-stone-50">About</button>
                  <button onClick={() => handleScroll('contact')} className="text-left py-2 border-b border-stone-50">Contact</button>
                </>
              ) : (
                <>
                  <Link to="/#home" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-stone-50">Home</Link>
                  <Link to="/#categories" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-stone-50">Categories</Link>
                  <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-stone-50">About</Link>
                  <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-stone-50">Contact</Link>
                </>
              )}
              {isHome ? (
                <button 
                  onClick={() => handleScroll('categories')}
                  className="mt-4 flex h-12 items-center justify-center rounded-full bg-orange-500 text-white"
                >
                  Explore Now
                </button>
              ) : (
                <Link 
                  to="/#categories" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 flex h-12 items-center justify-center rounded-full bg-orange-500 text-white"
                >
                  Explore Now
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
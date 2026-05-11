import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    
    if (!isHome) {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl py-4 shadow-sm border-b border-slate-100' : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 z-50 group">
          <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors">
            Awake <span className="text-teal-500">Sol</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 font-sans text-[15px] font-bold text-slate-600">
            <li><button onClick={() => handleScrollTo('learning')} className="hover:text-teal-600 transition-colors">Self Improvement</button></li>
            <li><button onClick={() => handleScrollTo('health')} className="hover:text-teal-600 transition-colors">Senior Health</button></li>
            <li><button onClick={() => handleScrollTo('nature')} className="hover:text-teal-600 transition-colors">Nature</button></li>
            <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-teal-600 transition-colors">About</Link></li>
            <li>
              <button
                onClick={() => handleScrollTo('contact')}
                className="ml-4 rounded-full bg-teal-600 px-6 py-2.5 text-white transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/20 hover:-translate-y-0.5"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 p-2 text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 z-40 bg-white transition-opacity duration-300 md:hidden flex flex-col justify-center items-center ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <nav className="flex flex-col items-center gap-8 font-sans text-2xl font-bold text-slate-800">
            <button onClick={() => handleScrollTo('learning')} className="hover:text-teal-600 transition-colors">Self Improvement</button>
            <button onClick={() => handleScrollTo('health')} className="hover:text-teal-600 transition-colors">Senior Health</button>
            <button onClick={() => handleScrollTo('nature')} className="hover:text-teal-600 transition-colors">Nature</button>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-teal-600 transition-colors">About</Link>
            <button
              onClick={() => handleScrollTo('contact')}
              className="mt-6 rounded-full bg-teal-600 px-10 py-4 text-xl text-white shadow-xl shadow-teal-600/20"
            >
              Contact Us
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
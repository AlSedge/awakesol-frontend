import { Sun, Twitter, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/#' + id);
      // Add a small delay to allow the page to render before scrolling
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 px-6 py-20 md:px-12 text-slate-300 font-sans rounded-t-[3rem] mt-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-10 w-64 h-64 bg-teal-900/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-900/20 rounded-full blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 mb-16 border-b border-slate-800 pb-16">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3 w-fit text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/20">
                <Sun size={24} strokeWidth={2.5} />
              </div>
              <span className="font-sans text-3xl font-extrabold tracking-tight">Awakesol</span>
            </div>
            <p className="max-w-md text-slate-400 leading-relaxed text-lg mb-8 font-medium">
              Awakesol is dedicated to providing quality information on self-learning, senior health, and connecting with nature. Start your journey to a richer life today.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com/awakesol" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-teal-600 hover:text-white transition-all hover:-translate-y-1">
                <Twitter size={20} fill="currentColor" />
              </a>
              <a href="https://instagram.com/awakesol" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-orange-500 hover:text-white transition-all hover:-translate-y-1">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com/awakesol" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1">
                <Facebook size={20} fill="currentColor" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="mb-8 font-sans text-lg font-bold text-white">Categories</h4>
            <ul className="space-y-4 font-medium">
              <li><button onClick={() => handleNav('learning')} className="hover:text-teal-400 hover:translate-x-1 transition-all text-base flex items-center gap-2">Self Learning</button></li>
              <li><button onClick={() => handleNav('health')} className="hover:text-teal-400 hover:translate-x-1 transition-all text-base flex items-center gap-2">Senior Health</button></li>
              <li><button onClick={() => handleNav('nature')} className="hover:text-teal-400 hover:translate-x-1 transition-all text-base flex items-center gap-2">Nature</button></li>
              <li><Link to="/about" className="hover:text-teal-400 hover:translate-x-1 transition-all text-base flex items-center gap-2">About Us</Link></li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="mb-8 font-sans text-lg font-bold text-white">Contact Us</h4>
            <p className="text-slate-400 mb-6 font-medium">Have questions, feedback, or a story to share? We'd love to hear from you.</p>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@awakesol.com" className="bg-teal-600 text-white rounded-xl px-4 py-3 font-bold hover:bg-teal-500 transition-colors flex items-center justify-center gap-2 group">
                Send an Email
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-medium text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Awakesol. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/cookie-policy-eu" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
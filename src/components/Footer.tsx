import React from 'react';
import { Sunrise } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white px-4 py-12 md:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4 lg:gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2 w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white">
                <Sunrise size={18} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-stone-900">Awake Solutions</span>
            </Link>
            <p className="max-w-sm text-stone-500">
              Empowering individuals through practical knowledge, continuous learning, and everyday solutions.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 font-bold text-stone-900">Categories</h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li><Link to="/#categories" className="hover:text-orange-500 transition-colors">Learning Online</Link></li>
              <li><Link to="/#categories" className="hover:text-orange-500 transition-colors">Home Economy</Link></li>
              <li><Link to="/#categories" className="hover:text-orange-500 transition-colors">Books</Link></li>
              <li><Link to="/#categories" className="hover:text-orange-500 transition-colors">Other</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-stone-900">Company</h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li><Link to="/#about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/#contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-stone-100 pt-8 text-sm text-stone-400">
          <p>© {new Date().getFullYear()} Awake Solutions. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Operated by <a href="https://awakesol.com" target="_blank" rel="noreferrer" className="text-stone-600 hover:text-orange-500 font-medium transition-colors">awakesol.com</a></p>
        </div>
      </div>
    </footer>
  );
}
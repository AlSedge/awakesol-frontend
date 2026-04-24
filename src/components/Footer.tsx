import { Sun, Twitter, Instagram, Facebook, ArrowRight } from 'lucide-react';

export default function Footer() {
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
              <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-teal-600 hover:text-white transition-all hover:-translate-y-1">
                <Twitter size={20} fill="currentColor" />
              </a>
              <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-orange-500 hover:text-white transition-all hover:-translate-y-1">
                <Instagram size={20} />
              </a>
              <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1">
                <Facebook size={20} fill="currentColor" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="mb-8 font-sans text-lg font-bold text-white">Categories</h4>
            <ul className="space-y-4 font-medium">
              <li><button onClick={() => document.getElementById('learning')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-teal-400 hover:translate-x-1 transition-all text-base flex items-center gap-2">Self Learning</button></li>
              <li><button onClick={() => document.getElementById('health')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-teal-400 hover:translate-x-1 transition-all text-base flex items-center gap-2">Senior Health</button></li>
              <li><button onClick={() => document.getElementById('nature')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-teal-400 hover:translate-x-1 transition-all text-base flex items-center gap-2">Nature</button></li>
              <li><button onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-teal-400 hover:translate-x-1 transition-all text-base flex items-center gap-2">About Us</button></li>
            </ul>
          </div>

          <div id="newsletter">
            <h4 className="mb-8 font-sans text-lg font-bold text-white">Newsletter</h4>
            <p className="text-slate-400 mb-6 font-medium">Get the best tips and resources delivered weekly to your inbox.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-800 border-none rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
              <button className="bg-teal-600 text-white rounded-xl px-4 py-3 font-bold hover:bg-teal-500 transition-colors flex items-center justify-center gap-2 group">
                Subscribe
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-medium text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Awakesol. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="/cookie-policy-eu" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
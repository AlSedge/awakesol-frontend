import React, { useEffect, useState } from 'react';
import { ArrowRight, MonitorPlay, Leaf, BookOpen, Sparkles, Mail, User, MessageSquare } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import LatestPosts from '../components/LatestPosts';

const categories = [
  {
    title: 'Learning Online',
    slug: 'learning-online',
    description: 'Master new skills from piano lessons to foreign languages, entirely at your own pace.',
    icon: MonitorPlay,
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop',
    accentColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    title: 'Home Economy',
    slug: 'home-economy',
    description: 'Cultivate your life with guides on gardening, wholesome cooking, and smart cost savings.',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1466692476877-6dca137b01d1?q=80&w=2070&auto=format&fit=crop',
    accentColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    title: 'Books',
    slug: 'books',
    description: 'Curated collections, deep dives, and summaries to expand your mind and horizons.',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop',
    accentColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    title: 'Other',
    slug: 'other',
    description: 'More exciting categories and resources are on the horizon. Stay tuned for what is next.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=2000&auto=format&fit=crop',
    accentColor: 'text-rose-600',
    bgColor: 'bg-rose-50',
  }
];

export default function Index() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    const articlesSection = document.getElementById('articles');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-orange-200 selection:text-orange-900 flex flex-col">
      <Navigation />

      <main className="flex-grow">
        <section id="home" className="relative px-4 pb-20 pt-12 md:px-8 md:pt-24 lg:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="max-w-2xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  Welcome to Awakesol.com
                </div>
                <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-stone-900 md:text-7xl lg:leading-[1.1]">
                  Awaken your <span className="text-orange-500">potential</span> today.
                </h1>
                <p className="mb-8 text-lg text-stone-600 md:text-xl leading-relaxed">
                  Discover curated resources across online learning, home economy, and literature. Equip yourself with the knowledge to thrive in everyday life.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a 
                    href="#categories" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex h-14 items-center justify-center rounded-full bg-orange-500 px-8 text-lg font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1 hover:shadow-orange-500/40 active:translate-y-0"
                  >
                    Discover Categories
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-orange-100 to-amber-50 opacity-50 blur-2xl"></div>
                <div className="relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                    alt="Students learning and collaborating" 
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="absolute -bottom-6 -left-6 md:-left-12 rounded-3xl bg-white p-6 shadow-xl border border-stone-100">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Leaf size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-500">Featured</p>
                      <p className="text-lg font-bold text-stone-900">Home Economy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="px-4 py-20 bg-stone-900 md:px-8 lg:py-32 rounded-[3rem] mx-2 md:mx-6 mb-6 scroll-mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 md:text-center">
              <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
                Explore our Worlds
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-stone-400">
                Dive into our carefully structured categories designed to help you learn, save, and grow.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden rounded-[2.5rem] bg-stone-800 p-2 transition-all hover:bg-stone-700 cursor-pointer"
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    <div className="flex flex-col sm:flex-row gap-6 h-full">
                      <div className="relative h-64 sm:h-auto sm:w-2/5 overflow-hidden rounded-[2rem]">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img 
                          src={category.image} 
                          alt={category.title} 
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex sm:w-3/5 flex-col justify-center p-6 sm:py-10 sm:pr-10 sm:pl-2">
                        <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${category.bgColor} ${category.accentColor}`}>
                          <Icon size={28} />
                        </div>
                        <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                          {category.title}
                        </h3>
                        <p className="mb-6 text-stone-400 leading-relaxed text-balance">
                          {category.description}
                        </p>
                        <button className="inline-flex items-center text-sm font-bold text-white group-hover:text-orange-400 transition-colors w-fit mt-auto">
                          View Articles
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="articles" className="px-4 py-20 bg-[#FAFAFA] md:px-8 lg:py-32 scroll-mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
                  Latest Updates
                </div>
                <h2 className="text-4xl font-extrabold text-stone-900 md:text-5xl">
                  Recent Articles
                </h2>
              </div>
            </div>

            <div className="mb-8 flex overflow-x-auto pb-4 hide-scrollbar gap-3 -mx-4 px-4 md:mx-0 md:px-0">
              <button 
                onClick={() => setActiveCategory(null)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-colors ${
                  activeCategory === null 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                All Articles
              </button>
              {categories.map((cat) => (
                <button 
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-colors ${
                    activeCategory === cat.slug 
                      ? 'bg-stone-900 text-white' 
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            <LatestPosts categorySlug={activeCategory} />
          </div>
        </section>

        <section id="about" className="px-4 py-20 md:px-8 lg:py-32 scroll-mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-stone-200 to-orange-100 opacity-50 blur-2xl"></div>
                <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                    alt="About Awake Solutions" 
                    className="h-full w-full object-cover aspect-[4/3] md:aspect-[3/2]"
                  />
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-600">
                  Our Mission
                </div>
                <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-stone-900 md:text-5xl">
                  About <span className="text-orange-500">Awake Solutions</span>
                </h2>
                <p className="mb-6 text-lg text-stone-600 leading-relaxed">
                  We believe that learning shouldn't stop at the classroom. Awake Solutions was founded on the principle that practical knowledge—whether it's mastering a new language, growing your own food, or making smart financial decisions—is the key to a fulfilling life.
                </p>
                <p className="mb-8 text-lg text-stone-600 leading-relaxed">
                  Our curated platform bridges the gap between ambition and achievement. We bring you carefully crafted guides, courses, and resources that fit seamlessly into your modern lifestyle.
                </p>
                <div className="flex gap-8">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-stone-900">4+</span>
                    <span className="text-sm font-semibold text-stone-500 uppercase tracking-wider mt-1">Core Categories</span>
                  </div>
                  <div className="w-px bg-stone-200"></div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-stone-900">100%</span>
                    <span className="text-sm font-semibold text-stone-500 uppercase tracking-wider mt-1">Commitment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-20 bg-white md:px-8 lg:py-32 border-t border-stone-100 scroll-mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
                  Contact Us
                </div>
                <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-stone-900 md:text-5xl">
                  Let's get in <span className="text-orange-500">touch</span>
                </h2>
                <p className="mb-10 text-lg text-stone-600 leading-relaxed max-w-lg">
                  Have a question, a suggestion for a new category, or just want to say hi? We'd love to hear from you. Fill out the form and our team will get back to you shortly.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Email Us</p>
                      <a href="mailto:hello@awakesol.com" className="text-lg font-bold text-stone-900 hover:text-orange-500 transition-colors">hello@awakesol.com</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-[2.5rem] bg-[#FAFAFA] p-6 shadow-sm border border-stone-100 sm:p-10">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! We'll be in touch soon."); }}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-stone-700 ml-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-stone-400">
                        <User size={18} />
                      </div>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        className="block w-full rounded-2xl border-0 py-4 pl-14 pr-4 text-stone-900 ring-1 ring-inset ring-stone-200 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-shadow bg-white" 
                        placeholder="Jane Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-stone-700 ml-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-stone-400">
                        <Mail size={18} />
                      </div>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="block w-full rounded-2xl border-0 py-4 pl-14 pr-4 text-stone-900 ring-1 ring-inset ring-stone-200 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-shadow bg-white" 
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-stone-700 ml-1">Message</label>
                    <div className="relative">
                      <div className="absolute top-4 left-0 flex items-start pl-5 pointer-events-none text-stone-400">
                        <MessageSquare size={18} />
                      </div>
                      <textarea 
                        id="message" 
                        rows={4} 
                        required
                        className="block w-full rounded-2xl border-0 py-4 pl-14 pr-4 text-stone-900 ring-1 ring-inset ring-stone-200 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-shadow bg-white resize-none" 
                        placeholder="How can we help you?"
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full h-14 items-center justify-center rounded-2xl bg-orange-500 px-8 text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1 hover:shadow-orange-500/40 active:translate-y-0"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-24 md:px-8 bg-white">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[3rem] bg-orange-500 relative">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-400 opacity-50 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-orange-600 opacity-50 blur-3xl"></div>
            
            <div className="relative p-10 md:p-20 text-center">
              <h2 className="mb-6 text-4xl font-extrabold text-white md:text-5xl">
                Ready to start your journey?
              </h2>
              <p className="mb-10 text-lg text-orange-100 max-w-2xl mx-auto">
                Join Awake Solutions today and get access to our expanding library of resources, courses, and guides.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-lg font-bold text-orange-600 transition-transform hover:scale-105"
                >
                  Get Started Now
                </button>
                <a 
                  href="https://awakesol.com" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white/30 px-8 text-lg font-bold text-white transition-colors hover:bg-white/10"
                >
                  Visit Awakesol.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
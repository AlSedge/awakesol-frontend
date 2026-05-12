import { useEffect, useState } from 'react';
import { Trees, ArrowLeft, ArrowRight, Sprout, Sun, HeartPulse, Brain, Leaf, Loader2, ExternalLink, Recycle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { fetchGardeningArticles, type SanityArticle } from '../lib/sanity';

export default function Gardening() {
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getArticles = async () => {
      try {
        const fetchedData = await fetchGardeningArticles();
        if (fetchedData && fetchedData.length > 0) {
          setArticles(fetchedData);
        } else {
          setArticles(fallbackArticles);
        }
      } catch (error) {
        console.error("Error fetching gardening articles:", error);
        setArticles(fallbackArticles);
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, []);

  const fallbackArticles: SanityArticle[] = [
    {
      _id: "1",
      order: 1,
      title: "How to Build a Raised Bed",
      category: "DIY & Projects",
      description: "A step-by-step guide to constructing the perfect raised garden bed using affordable, untreated lumber. Save your back and your budget.",
      link: "#"
    },
    {
      _id: "2",
      order: 2,
      title: "Composting 101",
      category: "Soil Health",
      description: "Turn your kitchen scraps into black gold. Learn the perfect ratio of greens to browns for a thriving compost pile.",
      link: "#"
    },
    {
      _id: "3",
      order: 3,
      title: "Companion Planting Guide",
      category: "Planting Strategy",
      description: "Discover which plants thrive together and which are sworn enemies. Naturally deter pests by pairing the right vegetables.",
      link: "#"
    },
    {
      _id: "4",
      order: 4,
      title: "Drought-Resistant Flowers",
      category: "Landscaping",
      description: "Beautiful blooms that don't need constant watering. Create a stunning garden that survives the hottest summer days.",
      link: "#"
    }
  ];

  const getCategoryStyle = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('soil') || cat.includes('compost') || cat.includes('dirt')) {
      return { icon: Leaf, light: 'bg-amber-50', text: 'text-amber-600' };
    }
    if (cat.includes('flower') || cat.includes('landscaping')) {
      return { icon: Sun, light: 'bg-rose-50', text: 'text-rose-600' };
    }
    if (cat.includes('diy') || cat.includes('project')) {
      return { icon: Trees, light: 'bg-blue-50', text: 'text-blue-600' };
    }
    return { icon: Sprout, light: 'bg-emerald-50', text: 'text-emerald-600' };
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <Navigation />
      
      <main className="pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-emerald-600 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center mb-16 md:mb-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 mb-6">
                <Trees size={16} />
                Nature & Life
              </div>
              <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl lg:leading-[1.1]">
                The Healing Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Gardening</span>
              </h1>
              <p className="mb-8 text-lg text-slate-600 md:text-xl leading-relaxed font-medium">
                Gardening is more than just a hobby—it's a profound therapeutic practice. Whether you have a sprawling backyard or a sunny windowsill, cultivating plants offers incredible benefits for both mind and body.
              </p>
            </div>
            
            <div className="relative w-full aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-[3rem] transform rotate-3"></div>
              <div className="absolute inset-0 bg-white rounded-[3rem] shadow-xl overflow-hidden transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                <img
                  src="https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
                  alt="Gardening hands"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">Why You Should Start Digging</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Physical Exercise",
                  desc: "Digging, planting, and weeding are excellent forms of low-impact cardiovascular exercise that build strength and flexibility.",
                  icon: HeartPulse, color: "text-rose-600", bg: "bg-rose-50"
                },
                {
                  title: "Stress Reduction",
                  desc: "Exposure to the outdoors and the physical act of nurturing plants significantly lowers cortisol levels and anxiety.",
                  icon: Brain, color: "text-blue-600", bg: "bg-blue-50"
                },
                {
                  title: "Vitamin D Boost",
                  desc: "Just 30 minutes in the garden provides your body with essential sunshine to synthesize calcium-boosting Vitamin D.",
                  icon: Sun, color: "text-amber-500", bg: "bg-amber-50"
                },
                {
                  title: "Fresh Produce",
                  desc: "Nothing tastes better than food you grew yourself. It guarantees pesticide-free, nutrient-dense additions to your meals.",
                  icon: Sprout, color: "text-emerald-600", bg: "bg-emerald-50"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group">
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon size={28} className={item.color} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Articles Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-10">Latest Gardening Articles</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article, i) => {
                  const style = getCategoryStyle(article.category);
                  return (
                    <div key={article._id || i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group cursor-pointer flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl ${style.light} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <style.icon size={28} className={style.text} />
                        </div>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${style.light} ${style.text}`}>
                          {article.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-slate-600 leading-relaxed font-medium mb-6 flex-grow">
                        {article.description}
                      </p>

                      {article.imageUrl && (
                        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-sm border border-slate-100 relative">
                          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      
                      {article.link && article.link !== "#" ? (
                        <a href={article.link} className={`inline-flex items-center font-bold text-sm ${style.text}`}>
                          Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                      ) : (
                        <Link to={`/nature/gardening/${article._id}`} className={`inline-flex items-center font-bold text-sm ${style.text}`}>
                          Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recommended Composting Products */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Recycle className="text-emerald-600" size={28} />
              <h2 className="text-3xl font-extrabold text-slate-900">Home Composting Essentials</h2>
            </div>
            <p className="text-slate-600 font-medium mb-10 max-w-2xl">
              Turn kitchen scraps into nutrient-rich soil — right from your countertop or backyard. These are our top picks for getting started with composting at home.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  title: "Lomi Electric Composter",
                  category: "Countertop",
                  description: "The ultimate kitchen composter. Lomi turns food waste into nutrient-rich dirt at the push of a button — in just hours. Odorless, quiet, and perfect for apartments or homes without yard space.",
                  link: "https://www.amazon.com/dp/B0B5X4Y4GN?tag=buyrea-21",
                  buttonText: "View on Amazon",
                  imageUrl: "https://images.unsplash.com/photo-1589144204843-54b8f22b1f0d?q=80&w=2070&auto=format&fit=crop",
                  accent: "bg-emerald-100 text-emerald-700"
                },
                {
                  title: "Reencle Indoor Composter",
                  category: "Countertop",
                  description: "Uses natural microorganisms to break down food waste silently. Holds more than Lomi and runs continuously — just keep adding scraps. Great for families who cook often.",
                  link: "https://www.amazon.com/dp/B0C7DZQYLM?tag=buyrea-21",
                  buttonText: "View on Amazon",
                  imageUrl: "https://images.unsplash.com/photo-1592492158937-b2a9e9b0e8c3?q=80&w=2070&auto=format&fit=crop",
                  accent: "bg-teal-100 text-teal-700"
                },
                {
                  title: "HOTBIN Hot Composter",
                  category: "Outdoor",
                  description: "Reaches 40–60°C for fast, efficient composting. Handles cooked food, garden waste, and more. Produces rich compost in 30–90 days — much faster than traditional bins.",
                  link: "https://www.amazon.com/dp/B08L8K8W6R?tag=buyrea-21",
                  buttonText: "View on Amazon",
                  imageUrl: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=2070&auto=format&fit=crop",
                  accent: "bg-amber-100 text-amber-700"
                },
                {
                  title: "FCMP Outdoor Tumbling Composter",
                  category: "Outdoor",
                  description: "Dual-chamber tumbling design makes turning compost effortless. Sturdy, affordable, and perfect for beginners who want a traditional outdoor setup without the heavy lifting.",
                  link: "https://www.amazon.com/dp/B0013G5GAC?tag=buyrea-21",
                  buttonText: "View on Amazon",
                  imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070&auto=format&fit=crop",
                  accent: "bg-orange-100 text-orange-700"
                }
              ].map((product, i) => (
                <article key={i} className="group bg-white rounded-[2.5rem] p-4 pr-6 sm:p-6 sm:pr-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-full sm:w-48 h-48 rounded-[2rem] overflow-hidden flex-shrink-0 bg-slate-100">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.accent}`}>{product.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-emerald-600 font-bold text-sm hover:text-emerald-700">
                      {product.buttonText} <ExternalLink size={16} className="ml-1.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Article / Deep Dive Section */}
          <article className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-slate-100 mb-20 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8 text-emerald-600 font-bold">
              <Leaf size={24} />
              <span>Featured Article</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Getting Started: The First Steps to Your Personal Oasis</h2>
            
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-emerald-600">
              <p className="text-slate-600 leading-relaxed font-medium mb-6">
                Many people feel intimidated by the idea of starting a garden, assuming they lack a "green thumb." The truth is, gardening is simply a series of experiments. The best way to learn is by doing, observing, and adjusting.
              </p>
              
              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Start Small</h3>
              <p className="text-slate-600 leading-relaxed font-medium mb-6">
                Instead of ripping up your entire backyard, start with a few containers or a single raised bed (about 4x4 feet). This keeps the weeding manageable and allows you to focus on the specific soil needs of just a few plants. Herbs like basil, mint, and rosemary are incredibly forgiving for beginners.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Understand Your Light</h3>
              <p className="text-slate-600 leading-relaxed font-medium mb-6">
                Spend a day observing where the sun hits your yard or balcony. Most vegetables and flowering plants require "full sun," which means 6-8 hours of direct sunlight per day. If you only have a shady spot, don't worry—hostas, ferns, and certain leafy greens thrive in low light.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Invest in the Soil</h3>
              <p className="text-slate-600 leading-relaxed font-medium mb-8">
                The secret to a great garden isn't the plants; it's the soil. Healthy soil full of organic matter (compost) holds moisture better and provides a steady stream of nutrients. Before you plant a single seed, mix high-quality compost into your existing dirt.
              </p>
            </div>
            
            <div className="mt-12 p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
              <h4 className="text-xl font-bold text-slate-900 mb-2">Ready to dig in?</h4>
              <p className="text-slate-600 mb-6">Check out our recommended starter kits and essential tool checklist.</p>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full transition-colors">
                View Beginner Resources
              </button>
            </div>
          </article>

        </div>
      </main>

      <Footer />
    </div>
  );
}
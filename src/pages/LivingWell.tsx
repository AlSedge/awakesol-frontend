import { useEffect, useState } from 'react';
import { Activity, ArrowLeft, ArrowRight, Sun, Apple, Heart, Leaf, Loader2, } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { fetchLivingWellArticles, type SanityArticle } from '../lib/sanity';

export default function LivingWell() {
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getArticles = async () => {
      try {
        const fetchedData = await fetchLivingWellArticles();
        if (fetchedData && fetchedData.length > 0) {
          setArticles(fetchedData);
        } else {
          setArticles(fallbackArticles);
        }
      } catch (error) {
        console.error("Error fetching living well articles:", error);
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
      title: "5 Gentle Morning Stretches for Better Mobility",
      category: "Physical Health",
      description: "Start your day right. These low-impact stretches can be done right from your bed or a sturdy chair to improve blood flow and reduce morning stiffness.",
      link: "#",
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      _id: "2",
      order: 2,
      title: "Nutrition Tips for Sustained Energy",
      category: "Diet & Nutrition",
      description: "How to adjust your diet as you age to maintain steady energy levels throughout the day without relying on caffeine or sugar.",
      link: "#",
      imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const getCategoryStyle = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('physical') || cat.includes('exercise') || cat.includes('mobility')) {
      return { icon: Activity, light: 'bg-blue-50', text: 'text-blue-600' };
    }
    if (cat.includes('diet') || cat.includes('nutrition') || cat.includes('food')) {
      return { icon: Apple, light: 'bg-emerald-50', text: 'text-emerald-600' };
    }
    if (cat.includes('mental') || cat.includes('social') || cat.includes('mind')) {
      return { icon: Heart, light: 'bg-rose-50', text: 'text-rose-600' };
    }
    if (cat.includes('habit') || cat.includes('sleep') || cat.includes('routine')) {
      return { icon: Sun, light: 'bg-amber-50', text: 'text-amber-600' };
    }
    return { icon: Leaf, light: 'bg-teal-50', text: 'text-teal-600' };
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-rose-200 selection:text-rose-900">
      <Navigation />
      
      <main className="pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-rose-600 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 mb-6">
                <Activity size={16} />
                Vibrant Living
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Living Well <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">Every Day</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
                Practical advice, daily habits, and science-backed tips for maintaining your physical and mental wellbeing. Small changes can lead to a vibrant and fulfilling life.
              </p>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-rose-200 to-orange-100 rounded-[3rem] transform -rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Active lifestyle"
                className="relative rounded-[3rem] shadow-xl w-full aspect-[4/3] object-cover transform rotate-3 transition-transform hover:rotate-0 duration-500"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-10">Wellness Tips</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-rose-600" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article, i) => {
                  const style = getCategoryStyle(article.category || "");
                  return (
                    <div key={article._id || i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl ${style.light} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <style.icon size={28} className={style.text} />
                        </div>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${style.light} ${style.text}`}>
                          {article.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-rose-600 transition-colors">
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
                      
                      {article.link ? (
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center font-bold text-sm ${style.text} mt-auto`}>
                          Read Full Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                      ) : (
                        <Link to={`/health/living-well/${article._id}`} className={`inline-flex items-center font-bold text-sm ${style.text} mt-auto`}>
                          Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Call to action */}
          <div className="bg-rose-900 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500 rounded-full blur-[100px] opacity-30"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Have a tip to share?</h2>
              <p className="text-rose-100 text-lg mb-8 leading-relaxed">
                We're always looking for community members to share their own wellness journeys and habits that have helped them thrive.
              </p>
              <button className="bg-white text-rose-900 hover:bg-rose-50 font-bold py-4 px-8 rounded-full transition-colors text-lg shadow-xl shadow-rose-900/50">
                Submit Your Story
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import { useEffect, useState } from 'react';
import { ArrowLeft, Activity, Heart, Apple, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchLivingWellArticles, type SanityArticle } from '../lib/sanity';

export default function LivingWell() {
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLivingWellArticles()
      .then(data => {
        if (data && data.length > 0) {
          setArticles(data);
        }
      })
      .catch(err => console.error("Error fetching living well articles:", err))
      .finally(() => setLoading(false));
  }, []);

  // Helper function to map Sanity categories to specific colors and icons
  const getCategoryStyle = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('nutrition') || cat.includes('diet')) {
      return { bg: 'bg-rose-100', text: 'text-rose-700', icon: <Apple size={24} className="text-rose-500" /> };
    }
    if (cat.includes('sleep') || cat.includes('rest')) {
      return { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: <Moon size={24} className="text-indigo-500" /> };
    }
    if (cat.includes('fitness') || cat.includes('exercise')) {
      return { bg: 'bg-orange-100', text: 'text-orange-700', icon: <Activity size={24} className="text-orange-500" /> };
    }
    return { bg: 'bg-teal-100', text: 'text-teal-700', icon: <Heart size={24} className="text-teal-500" /> };
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 py-6 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/#health" className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="text-rose-500" size={24} />
              Living Well Tips
            </h1>
          </div>
          <Link to="/" className="text-sm font-bold text-teal-600 hover:text-teal-700">Home</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 md:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Thrive Every Day</h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Practical advice for maintaining physical vitality, emotional balance, and overall well-being as you age.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
          </div>
        ) : articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((article) => {
              const style = getCategoryStyle(article.category);
              return (
                <Link 
                  to={`/health/living-well/${article._id}`} 
                  key={article._id} 
                  className="block bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${style.bg.replace('100', '50')}`}>
                      {style.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${style.bg} ${style.text}`}>
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-rose-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 font-medium leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 mt-4 md:mt-0 text-slate-400 group-hover:text-rose-500 transition-colors">
                      <ArrowLeft className="rotate-180" size={24} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 border-dashed">
            <Heart size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Publishing soon...</h3>
            <p className="text-slate-500 max-w-md mx-auto">We are currently writing evidence-based wellness tips. Check back shortly!</p>
          </div>
        )}
      </main>
    </div>
  );
}
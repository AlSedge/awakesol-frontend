import { useEffect, useState } from 'react';
import { ArrowLeft, Trees, Sprout, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchGardeningArticles, SanityArticle } from '../lib/sanity';

export default function Gardening() {
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGardeningArticles()
      .then(data => {
        if (data && data.length > 0) {
          setArticles(data);
        }
      })
      .catch(err => console.error("Error fetching gardening articles:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 py-6 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/#nature" className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Trees className="text-emerald-500" size={24} />
              Gardening
            </h1>
          </div>
          <Link to="/" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Home</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 md:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Cultivate Your Sanctuary</h2>
          <p className="text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
            Discover the therapeutic benefits of working with soil and growing your own plants, flowers, and produce.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link 
                to={`/nature/gardening/${article._id}`} 
                key={article._id} 
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {article.imageUrl ? (
                  <div className="h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-emerald-50 flex items-center justify-center">
                    <Sprout size={48} className="text-emerald-200" />
                  </div>
                )}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">{article.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed flex-grow">{article.description}</p>
                  <div className="mt-6 font-bold text-emerald-600 flex items-center">
                    Read Article <ArrowLeft className="ml-2 rotate-180 w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 border-dashed">
            <Sun size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Planting seeds...</h3>
            <p className="text-slate-500 max-w-md mx-auto">We are currently writing our best gardening guides. Check back soon for fresh content!</p>
          </div>
        )}
      </main>
    </div>
  );
}
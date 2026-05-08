import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, ExternalLink, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchBookArticles, type SanityArticle } from '../lib/sanity';

export default function Books() {
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch articles from Sanity
    fetchBookArticles()
      .then(data => {
        if (data && data.length > 0) {
          setArticles(data);
        }
      })
      .catch(err => {
        console.error("Error fetching books:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/#health" className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="text-indigo-500" size={24} />
              Recommended Reading
            </h1>
          </div>
          <Link to="/" className="text-sm font-bold text-teal-600 hover:text-teal-700">Home</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 md:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Expand Your Mind</h2>
          <p className="text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
            Curated book recommendations focusing on longevity, cognitive health, personal growth, and finding joy in everyday moments.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <div key={article._id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  {article.imageUrl ? (
                    <div className="w-24 h-32 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                      <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 flex-shrink-0">
                      <Library size={32} />
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold text-indigo-500 mb-1 uppercase tracking-wider">{article.category}</div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">{article.title}</h3>
                    {article.readTime && <div className="text-sm text-slate-500 mt-2 font-medium">{article.readTime}</div>}
                  </div>
                </div>
                
                <p className="text-slate-600 mb-8 font-medium leading-relaxed flex-grow">{article.description}</p>
                
                <a 
                  href={article.link || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-indigo-50 text-indigo-700 px-6 py-4 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-colors group mt-auto"
                >
                  View Book Details
                  <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 border-dashed">
            <Library size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Building our library</h3>
            <p className="text-slate-500 max-w-md mx-auto">We are currently curating the best books for our readers. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}
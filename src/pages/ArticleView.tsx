import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Activity } from 'lucide-react';
import { sanityClient, type SanityArticle } from '../lib/sanity';
import { PortableText } from '@portabletext/react';

export default function ArticleView() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<SanityArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const query = `*[_type == "livingWellArticle" && _id == $id][0] {
        _id, title, category, description, body
      }`;
      
      sanityClient.fetch<SanityArticle>(query, { id })
        .then(data => setArticle(data))
        .catch(err => console.error("Error fetching living well article:", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Article not found</h2>
        <Link to="/health/living-well" className="text-rose-600 hover:underline">Return to Living Well Tips</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <header className="bg-white border-b border-slate-200 py-6 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/health/living-well" className="flex items-center gap-2 text-slate-600 hover:text-rose-600 font-bold transition-colors">
            <ArrowLeft size={20} />
            Back to Tips
          </Link>
          <Activity className="text-rose-500" size={24} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-12 md:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
            {article.description}
          </p>
        </div>

        <article className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-rose-600 hover:prose-a:text-rose-500">
          {article.body ? (
            <PortableText 
              value={article.body} 
            />
          ) : (
            <p>Content is being updated...</p>
          )}
        </article>
      </main>
    </div>
  );
}
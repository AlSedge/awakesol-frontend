import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { sanityClient, type SanityArticle } from '../lib/sanity';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { PortableText } from '@portabletext/react';

export default function NatureArticleView() {
  const { id } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState<SanityArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Determine back link and theme based on current URL path
  const isWildlife = location.pathname.includes('/nature/wildlife');
  const backLink = isWildlife ? "/nature/wildlife" : "/nature/gardening";
  const backText = isWildlife ? "Back to Wildlife" : "Back to Gardening";
  const themeColor = isWildlife ? "orange" : "emerald";

  useEffect(() => {
    window.scrollTo(0, 0);

    const getArticle = async () => {
      if (!id) return;
      try {
        const query = `*[_type in ["gardeningArticle", "wildlifeArticle"] && _id == $id][0] {
          _id,
          title,
          category,
          body,
          "imageUrl": image.asset->url
        }`;
        
        const clientWithNoCache = sanityClient.withConfig({
          requestTagPrefix: Date.now().toString(),
        });
        const data = await clientWithNoCache.fetch<SanityArticle>(query, { id });
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className={`h-12 w-12 animate-spin text-${themeColor}-600`} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Article Not Found</h1>
        <p className="text-slate-600 mb-8">This article may have been removed or the link is invalid.</p>
        <Link to={backLink} className={`text-${themeColor}-600 font-bold hover:text-${themeColor}-700 flex items-center`}>
          <ArrowLeft size={16} className="mr-2" /> {backText}
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 font-sans selection:bg-${themeColor}-200 selection:text-${themeColor}-900`}>
      <Navigation />
      
      <main className="pt-32 pb-20 md:pt-40">
        <article className="mx-auto max-w-3xl px-4 md:px-8">
          <Link to={backLink} className={`inline-flex items-center text-sm font-bold text-slate-500 hover:text-${themeColor}-600 mb-12 transition-colors`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backText}
          </Link>

          <header className="mb-12">
            <div className={`inline-flex items-center rounded-full bg-${themeColor}-50 px-4 py-2 text-sm font-bold text-${themeColor}-700 mb-6`}>
              {article.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>
          </header>

          {article.imageUrl && (
            <div className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-lg mb-12">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className={`prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-${themeColor}-600 prose-img:rounded-3xl hover:prose-a:text-${themeColor}-700`}>
            {article.body ? (
              <PortableText value={article.body} />
            ) : (
              <p className="italic text-slate-500">No content provided for this article.</p>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
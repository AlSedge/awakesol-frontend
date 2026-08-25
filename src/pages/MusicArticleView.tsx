import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Music } from 'lucide-react';
import { sanityClient, type SanityArticle } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { applyArticleSeo } from '../lib/seo';

export default function MusicArticleView() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<SanityArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const query = `*[_type == "musicArticle" && _id == $id][0] {
        _id, title, category, description, body, _createdAt, _updatedAt, "imageUrl": image.asset->url
      }`;

      sanityClient.fetch<SanityArticle>(query, { id })
        .then(data => {
          setArticle(data);
          if (data) {
            applyArticleSeo(data.title, data.description || '', window.location.pathname, {
              created: data._createdAt,
              updated: data._updatedAt,
            });
          }
        })
        .catch(err => console.error("Error fetching music article:", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Guide not found</h2>
        <Link to="/learning/music" className="text-pink-600 hover:underline">Return to Music</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <header className="bg-white border-b border-slate-200 py-6 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/learning/music" className="flex items-center gap-2 text-slate-600 hover:text-pink-600 font-bold transition-colors">
            <ArrowLeft size={20} />
            Back to Music
          </Link>
          <Music className="text-pink-500" size={24} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-12 md:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
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

        {article.imageUrl && (
          <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-lg">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <article className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-a:text-pink-700 prose-a:font-bold hover:prose-a:text-pink-500 prose-img:rounded-2xl">
          {article.body ? (
            <PortableText
              value={article.body}
              components={{
                types: {
                  image: ({ value }: any) => {
                    if (!value?.asset?._ref) return null;
                    return (
                      <img
                        alt="Article illustration"
                        loading="lazy"
                        src={`https://cdn.sanity.io/images/hb5scemv/production/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                        className="rounded-2xl shadow-md w-full"
                      />
                    )
                  }
                }
              }}
            />
          ) : (
            <p>Content is being updated...</p>
          )}
        </article>
      </main>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, Puzzle, Brain, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchBrainResources, type SanityArticle } from '../lib/sanity';

export default function BrainHealth() {
  const [resources, setResources] = useState<SanityArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrainResources()
      .then(data => {
        if (data && data.length > 0) {
          setResources(data);
        }
      })
      .catch(err => console.error("Error fetching brain resources:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 py-6 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/#health" className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Puzzle className="text-violet-500" size={24} />
              Brain Health
            </h1>
          </div>
          <Link to="/" className="text-sm font-bold text-teal-600 hover:text-teal-700">Home</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 md:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Keep Your Mind Sharp</h2>
          <p className="text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
            Discover engaging games, challenging puzzles, and scientifically-backed programs designed to enhance cognitive function and memory.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
          </div>
        ) : resources.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((resource) => (
              <div key={resource._id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                
                {/* Image Section */}
                {resource.imageUrl ? (
                  <div className="h-56 w-full bg-slate-100 overflow-hidden relative">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-56 w-full bg-violet-50 flex items-center justify-center">
                    {resource.category?.toLowerCase().includes('game') ? <Puzzle size={48} className="text-violet-200" /> : 
                     resource.category?.toLowerCase().includes('learn') ? <Lightbulb size={48} className="text-violet-200" /> : 
                     <Brain size={48} className="text-violet-200" />}
                  </div>
                )}

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-sm font-bold text-violet-500 mb-2 uppercase tracking-wider">{resource.category}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{resource.title}</h3>
                  <p className="text-slate-600 mb-8 font-medium leading-relaxed flex-grow">{resource.description}</p>
                  
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-violet-600 transition-colors group mt-auto"
                  >
                    {resource.buttonText || "Try It Now"}
                    <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 border-dashed">
            <Brain size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Check back soon!</h3>
            <p className="text-slate-500 max-w-md mx-auto">We are currently evaluating the best cognitive training resources. Our top recommendations will appear here shortly.</p>
          </div>
        )}
      </main>
    </div>
  );
}
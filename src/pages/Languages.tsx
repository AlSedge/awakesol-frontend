import { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, Languages as LanguagesIcon, MessageCircle, Ear, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchLanguageResources, SanityArticle } from '../lib/sanity';

export default function Languages() {
  const [resources, setResources] = useState<SanityArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLanguageResources()
      .then(data => {
        if (data && data.length > 0) {
          setResources(data);
        } else {
          setResources(fallbackResources);
        }
      })
      .catch(err => {
        console.error("Error fetching language resources:", err);
        setResources(fallbackResources);
      })
      .finally(() => setLoading(false));
  }, []);

  const fallbackResources: SanityArticle[] = [
    {
      _id: "1",
      title: "Rosetta Stone Unlimited",
      category: "Complete System",
      description: "The gold standard for language learning. Get lifetime access to 25 languages with their award-winning immersive method.",
      link: "#",
      buttonText: "Start Learning",
      imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop",
      order: 1
    },
    {
      _id: "2",
      title: "Pimsleur Audio Lessons",
      category: "Speaking & Listening",
      description: "Learn to speak conversationally in just 30 days. Perfect for learning while driving or walking your dog.",
      link: "#",
      buttonText: "Try for Free",
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
      order: 2
    },
    {
      _id: "3",
      title: "Babbel Subscription",
      category: "Quick Lessons",
      description: "Bite-sized, 10-minute lessons designed by language experts to get you speaking quickly and confidently.",
      link: "#",
      buttonText: "View Offers",
      imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      order: 3
    },
    {
      _id: "4",
      title: "italki Tutoring",
      category: "Live Practice",
      description: "Connect with native speakers for 1-on-1 personalized language lessons at affordable rates.",
      link: "#",
      buttonText: "Find a Tutor",
      imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
      order: 4
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 py-6 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/#learning" className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <LanguagesIcon className="text-sky-500" size={24} />
              Learn a Language
            </h1>
          </div>
          <Link to="/" className="text-sm font-bold text-teal-600 hover:text-teal-700">Home</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 md:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Expand Your World</h2>
          <p className="text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
            Learning a new language improves cognitive function, builds new neural pathways, and opens doors to new cultures and experiences.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((resource) => (
              <div key={resource._id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 mb-6">
                  {resource.category?.toLowerCase().includes('speak') ? <MessageCircle size={32} /> : 
                   resource.category?.toLowerCase().includes('listen') ? <Ear size={32} /> : 
                   <BookOpen size={32} />}
                </div>
                <div className="text-sm font-bold text-sky-500 mb-2 uppercase tracking-wider">{resource.category}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{resource.title}</h3>
                <p className="text-slate-600 mb-8 font-medium leading-relaxed">{resource.description}</p>
                <a 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-sky-500 transition-colors group"
                >
                  {resource.buttonText || "Start Learning"}
                  <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
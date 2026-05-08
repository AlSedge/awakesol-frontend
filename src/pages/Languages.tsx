import { useEffect, useState } from 'react';
import { Languages as LangIcon, Globe, BookA, Headphones, ArrowLeft, MessageCircle, ExternalLink, Loader2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { fetchLanguageResources, type SanityArticle } from '../lib/sanity';

export default function Languages() {
  const [resources, setResources] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getResources = async () => {
      try {
        const fetchedData = await fetchLanguageResources();
        if (fetchedData && fetchedData.length > 0) {
          setResources(fetchedData);
        } else {
          setResources(fallbackResources);
        }
      } catch (error) {
        console.error("Error fetching language resources:", error);
        setResources(fallbackResources);
      } finally {
        setIsLoading(false);
      }
    };

    getResources();
  }, []);

  const fallbackResources: SanityArticle[] = [
    {
      _id: "1",
      title: "Babbel Language App",
      category: "App / Course",
      description: "Focuses on real-life conversations and practical vocabulary. Perfect for beginners who want to start speaking immediately.",
      link: "#",
      buttonText: "Try Babbel",
      imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop"
    },
    {
      _id: "2",
      title: "Rosetta Stone",
      category: "Software",
      description: "The gold standard of immersion learning. It teaches you to intuitively associate words with images, bypassing translation entirely.",
      link: "#",
      buttonText: "View Course",
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop"
    },
    {
      _id: "3",
      title: "italki Tutors",
      category: "Live Tutoring",
      description: "Connect with native speakers for 1-on-1 language lessons online. The absolute fastest way to overcome the fear of speaking.",
      link: "#",
      buttonText: "Find a Tutor",
      imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop"
    },
    {
      _id: "4",
      title: "Pimsleur Audio Courses",
      category: "Audio Course",
      description: "Learn while you drive or walk. Pimsleur's core method relies on active listening and highly calibrated spaced repetition.",
      link: "#",
      buttonText: "Start Listening",
      imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-violet-200 selection:text-violet-900">
      <Navigation />
      
      <main className="pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-violet-600 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700 mb-6">
                <LangIcon size={16} />
                Learn a Language
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Unlock New <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Worlds</span> Through Language
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
                Whether for travel, cognitive health, or personal enrichment, learning a new language opens up entirely new cultures and perspectives. Discover proven methods to go from absolute beginner to conversational fluency.
              </p>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-violet-200 to-fuchsia-100 rounded-[3rem] transform -rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="People laughing and learning"
                className="relative rounded-[3rem] shadow-xl w-full aspect-[4/3] object-cover transform rotate-3 transition-transform hover:rotate-0 duration-500"
              />
            </div>
          </div>

          {/* Recommended Resources Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Recommended Courses & Apps</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-violet-600" />
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {resources.map((resource, i) => (
                  <article key={resource._id || i} className="group bg-white rounded-[2.5rem] p-4 pr-6 sm:p-6 sm:pr-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all flex flex-col sm:flex-row gap-6 items-center">
                    <div className="w-full sm:w-48 h-48 rounded-[2rem] overflow-hidden flex-shrink-0 bg-slate-100">
                      {resource.imageUrl && (
                        <img
                          src={resource.imageUrl}
                          alt={resource.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center py-2">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">{resource.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {resource.description}
                      </p>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-violet-600 font-bold text-sm hover:text-violet-700">
                        {resource.buttonText || "Learn More"} <ExternalLink size={16} className="ml-1.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Content Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="flex gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600">
                  <BookA size={28} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Spaced Repetition</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Harness the power of SRS (Spaced Repetition Systems) like Anki or Memrise. Learn vocabulary exactly when your brain is about to forget it, moving words from short-term to long-term memory with minimal daily effort.
                </p>
              </div>
            </div>

            <div className="flex gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-fuchsia-50 rounded-2xl flex items-center justify-center text-fuchsia-600">
                  <Headphones size={28} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Input-Based Learning</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Immerse yourself through "comprehensible input." Watch shows, listen to podcasts, and read graded materials slightly above your level to let grammar and vocabulary absorb naturally, much like a child learns.
                </p>
              </div>
            </div>

            <div className="flex gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                  <MessageCircle size={28} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Language Exchange</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Find conversation partners online or locally. Speaking from day one helps overcome the fear of making mistakes and grounds your learning in real, practical human connection.
                </p>
              </div>
            </div>

            <div className="flex gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600">
                  <Globe size={28} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Cultural Context</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Language cannot be separated from culture. Dive into the history, idioms, and social norms of your target language's regions to truly understand the nuances of how natives speak.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
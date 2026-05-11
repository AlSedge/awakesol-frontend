import { useEffect, useState } from 'react';
import { Bird, ArrowLeft, ArrowRight, Trees, Sun, Leaf, Binoculars, Loader2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { fetchWildlifeArticles, type SanityArticle } from '../lib/sanity';

export default function Wildlife() {
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getArticles = async () => {
      try {
        const fetchedData = await fetchWildlifeArticles();
        if (fetchedData && fetchedData.length > 0) {
          setArticles(fetchedData);
        } else {
          setArticles(fallbackArticles);
        }
      } catch (error) {
        console.error("Error fetching wildlife articles:", error);
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
      title: "The Ultimate Guide to Bird Feeding",
      category: "Backyard Setup",
      description: "Discover which seeds attract which birds, and how to place your feeders to avoid squirrels and predators while bringing nature right to your window.",
      link: "#"
    },
    {
      _id: "2",
      order: 2,
      title: "Identifying Local Species",
      category: "Education",
      description: "A beginner's guide to recognizing birds by their calls, silhouettes, and flight patterns. Learn to observe without disturbing.",
      link: "#"
    }
  ];

  const getCategoryStyle = (category: string) => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('setup') || cat.includes('diy')) {
      return { icon: Trees, light: 'bg-emerald-50', text: 'text-emerald-600' };
    }
    if (cat.includes('bird') || cat.includes('species')) {
      return { icon: Bird, light: 'bg-sky-50', text: 'text-sky-600' };
    }
    if (cat.includes('education') || cat.includes('learn')) {
      return { icon: Binoculars, light: 'bg-orange-50', text: 'text-orange-600' };
    }
    return { icon: Leaf, light: 'bg-amber-50', text: 'text-amber-600' };
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-200 selection:text-orange-900">
      <Navigation />
      
      <main className="pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-orange-600 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center mb-16 md:mb-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700 mb-6">
                <Bird size={16} />
                Nature & Life
              </div>
              <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl lg:leading-[1.1]">
                Discover Local <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Wildlife</span>
              </h1>
              <p className="mb-8 text-lg text-slate-600 md:text-xl leading-relaxed font-medium">
                You don't need to travel far to experience the wonder of nature. By learning to observe and support local wildlife, you can turn your backyard or local park into a thriving sanctuary.
              </p>
            </div>
            
            <div className="relative w-full aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-amber-100 rounded-[3rem] transform rotate-3"></div>
              <div className="absolute inset-0 bg-white rounded-[3rem] shadow-xl overflow-hidden transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                <img
                  src="https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=2070&auto=format&fit=crop"
                  alt="Bird observation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">Why Observe Wildlife?</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Mental Clarity",
                  desc: "Watching animals forces us to slow down, be quiet, and remain present. It is a natural form of mindfulness that dramatically reduces anxiety.",
                  icon: Sun, color: "text-amber-500", bg: "bg-amber-50"
                },
                {
                  title: "Ecological Connection",
                  desc: "Understanding the local ecosystem fosters a deeper appreciation for the environment and helps protect vulnerable species.",
                  icon: Trees, color: "text-emerald-600", bg: "bg-emerald-50"
                },
                {
                  title: "Lifelong Learning",
                  desc: "There are always new species to identify, behaviors to understand, and migration patterns to track. It's a hobby that never gets old.",
                  icon: Binoculars, color: "text-blue-600", bg: "bg-blue-50"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group">
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon size={28} className={item.color} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Articles Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-10">Latest Wildlife Articles</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article, i) => {
                  const style = getCategoryStyle(article.category);
                  return (
                    <div key={article._id || i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group cursor-pointer flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl ${style.light} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <style.icon size={28} className={style.text} />
                        </div>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${style.light} ${style.text}`}>
                          {article.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">
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
                      
                      {article.link && article.link !== "#" ? (
                        <a href={article.link} className={`inline-flex items-center font-bold text-sm ${style.text}`}>
                          Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                      ) : (
                        <Link to={`/nature/wildlife/${article._id}`} className={`inline-flex items-center font-bold text-sm ${style.text}`}>
                          Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Article / Deep Dive Section */}
          <article className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-slate-100 mb-20 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8 text-orange-600 font-bold">
              <Bird size={24} />
              <span>Featured Guide</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Getting Started: Attracting Birds to Your Backyard</h2>
            
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-orange-600">
              <p className="text-slate-600 leading-relaxed font-medium mb-6">
                Creating a haven for local birds is one of the most rewarding ways to connect with nature without leaving your home. It doesn't take much space—even an apartment balcony can attract beautiful visitors if you provide the right essentials.
              </p>
              
              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Provide the Right Food</h3>
              <p className="text-slate-600 leading-relaxed font-medium mb-6">
                Different birds prefer different seeds. Black-oil sunflower seed is the gold standard, appealing to cardinals, finches, and chickadees. If you want to attract woodpeckers, offer suet blocks. To avoid messy shells under your feeder, look for "no-waste" or hulled seed mixes.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Fresh Water is Crucial</h3>
              <p className="text-slate-600 leading-relaxed font-medium mb-6">
                Birds need clean water for drinking and bathing all year round. A simple, shallow birdbath (no more than 2 inches deep) will bring in species that might completely ignore your seed feeders. Remember to clean the bath regularly and refresh the water every few days to prevent mosquitoes.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Offer Shelter and Cover</h3>
              <p className="text-slate-600 leading-relaxed font-medium mb-8">
                Birds are hesitant to visit feeders that are completely exposed because it makes them vulnerable to predators like hawks. Place your feeders near native bushes, trees, or brush piles so the birds have a safe place to retreat if they feel threatened.
              </p>
            </div>
            
            <div className="mt-12 p-8 bg-orange-50 rounded-3xl border border-orange-100">
              <h4 className="text-xl font-bold text-slate-900 mb-2">Ready to start birding?</h4>
              <p className="text-slate-600 mb-6">Check out our recommended binoculars and field guides for beginners.</p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full transition-colors">
                View Beginner Resources
              </button>
            </div>
          </article>

        </div>
      </main>

      <Footer />
    </div>
  );
}
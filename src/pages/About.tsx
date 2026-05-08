import { useEffect, useState } from 'react';
import { ArrowLeft, Info, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { fetchAboutPage } from '../lib/sanity';
import { PortableText } from '@portabletext/react';

export default function About() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Fetch About Page content from Sanity
    fetchAboutPage()
      .then(data => {
        if (data) setContent(data);
      })
      .catch(err => console.error("Error fetching about page:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-100 text-teal-600 mb-6 shadow-sm">
              <Info size={32} />
            </div>
            <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {content?.title || "About Awakesol"}
            </h1>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              {content?.description || "Empowering individuals to learn, grow, and thrive at any age through curated knowledge and practical wisdom."}
            </p>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-xl border border-slate-100 relative overflow-hidden">
            {/* Decorative background blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10 prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-teal-600 hover:prose-a:text-teal-500 prose-p:text-slate-600 prose-p:leading-relaxed">
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
                </div>
              ) : content?.body ? (
                <>
                  {content.imageUrl && (
                    <div className="mb-10 w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-md">
                      <img 
                        src={content.imageUrl} 
                        alt="Awakesol Team or Office" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <PortableText 
                    value={content.body} 
                    components={{
                      types: {
                        image: ({ value }) => {
                          if (!value?.asset?._ref) return null;
                          return (
                            <img 
                              alt="Content illustration" 
                              loading="lazy" 
                              src={`https://cdn.sanity.io/images/hb5scemv/production/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                              className="rounded-2xl shadow-md w-full my-8"
                            />
                          )
                        }
                      }
                    }}
                  />
                </>
              ) : (
                // Fallback content if Sanity is empty
                <>
                  <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 border-dashed text-center mb-8">
                    <Sparkles size={32} className="mx-auto text-teal-500 mb-4" />
                    <p className="font-bold text-slate-800">Your story belongs here.</p>
                    <p className="text-sm text-slate-500 mt-2">Add content via Sanity CMS to replace this placeholder!</p>
                  </div>
                  
                  <h2>Our Mission</h2>
                  <p>
                    At Awakesol, we believe that the journey of learning and self-improvement never truly ends. 
                    Whether you are picking up a new language, training a beloved pet, or finding ways to stay 
                    cognitively sharp in your golden years, our mission is to provide the resources you need.
                  </p>
                  
                  <h2>Why We Started</h2>
                  <p>
                    The modern web is filled with endless information, but finding curated, high-quality advice 
                    can be overwhelming. We created Awakesol to cut through the noise, offering clear, actionable 
                    guides and trusted recommendations for living a vibrant life.
                  </p>
                </>
              )}

              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 m-0 mb-1">Get in Touch</h3>
                  <p className="text-slate-600 m-0">We'd love to hear from you. Drop us a line at <a href="mailto:hello@awakesol.com" className="font-bold">hello@awakesol.com</a></p>
                </div>
              </div>

            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors">
              <ArrowLeft size={18} className="mr-2" />
              Return Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import { useEffect } from 'react';
import { BookOpen, Brain, HeartPulse, Leaf, Sparkles, ArrowRight, Dog, Music, Languages, Activity, Puzzle, Trees, Bird } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Index() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200 selection:text-teal-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative px-4 pb-20 pt-32 md:px-8 md:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-30 pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-teal-400 to-emerald-200 blur-3xl mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
        </div>
        <div className="absolute top-40 left-0 -translate-x-1/3 opacity-20 pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-400 to-amber-200 blur-3xl mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }}></div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-teal-700 shadow-sm border border-slate-100">
                <Sparkles size={16} className="text-amber-500" />
                Awaken your potential today
              </div>
              <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl lg:leading-[1.1]">
                Learn and <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Thrive</span>.
              </h1>
              <h2 className="mb-6 text-2xl font-bold text-slate-700 md:text-3xl">
                Enjoy Life and Nature.
              </h2>
              <p className="mb-8 text-lg text-slate-600 md:text-xl leading-relaxed font-medium">
                Discover expert guidance, practical tips, and inspiring content. From mastering new skills to vibrant senior living and exploring the great outdoors.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button 
                  onClick={() => document.getElementById('learning')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-teal-600 px-8 text-lg font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-1 hover:bg-teal-700"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-lg font-bold text-slate-700 shadow-sm border border-slate-200 transition-all hover:bg-slate-50 hover:text-teal-600"
                >
                  About Awakesol
                </button>
              </div>
            </div>
            
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-orange-50 rounded-[3rem] transform rotate-3"></div>
              <div className="absolute inset-0 bg-white rounded-[3rem] shadow-xl overflow-hidden transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop" 
                  alt="Person enjoying nature and learning" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute top-12 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                  <Brain size={24} />
                </div>
                <div className="font-bold text-slate-800">Self Learning</div>
              </div>
              <div className="absolute bottom-12 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                  <Leaf size={24} />
                </div>
                <div className="font-bold text-slate-800">Nature & Life</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Self Learning Section */}
      <section id="learning" className="px-4 py-20 md:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:text-center">
            <h2 className="mb-4 text-4xl font-extrabold text-slate-900 md:text-5xl">
              Self Learning
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
              Unlock your potential at any age. Dive into comprehensive guides on AI, language acquisition, musical mastery, and effective dog training.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Artificial Intelligence", desc: "Demystifying AI for everyday life and productivity.", icon: Brain, color: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600" },
              { title: "Language Learning", desc: "Proven methods to speak a new language fluently.", icon: Languages, color: "bg-violet-500", light: "bg-violet-50", text: "text-violet-600" },
              { title: "Music & Instruments", desc: "Start your musical journey, from theory to practice.", icon: Music, color: "bg-pink-500", light: "bg-pink-50", text: "text-pink-600" },
              { title: "Dog Training", desc: "Build a strong bond with positive reinforcement.", icon: Dog, color: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600" }
            ].map((topic, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl ${topic.light} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <topic.icon size={28} className={topic.text} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{topic.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Senior Health Section */}
      <section id="health" className="px-4 py-20 bg-teal-900 md:px-8 lg:py-32 rounded-[3rem] mx-2 md:mx-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-800/50 px-4 py-2 text-sm font-bold text-teal-100 backdrop-blur-sm border border-teal-700">
                <HeartPulse size={16} className="text-rose-400" />
                Vibrant Living
              </div>
              <h2 className="mb-6 text-4xl font-extrabold md:text-5xl lg:leading-[1.1]">
                Senior Health & Wellness
              </h2>
              <p className="mb-8 text-lg text-teal-100/80 md:text-xl leading-relaxed font-medium">
                Aging is a privilege. We provide resources to keep your mind sharp and body active from the comfort of your home.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Home Exercise Routines", desc: "Safe, effective workouts designed for mobility and strength.", icon: Activity },
                  { title: "Cognitive Puzzling", desc: "Challenging puzzles and games to enhance brain health.", icon: Puzzle },
                  { title: "Curated Reading Lists", desc: "Inspiring books that promote lifelong learning and joy.", icon: BookOpen }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-xl bg-teal-800 flex items-center justify-center text-teal-300">
                        <item.icon size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-teal-100/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-teal-800/50">
              <img 
                src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop" 
                alt="Active senior doing yoga" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nature Section */}
      <section id="nature" className="px-4 py-20 md:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl font-extrabold text-slate-900 md:text-5xl">
              Connect With Nature
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
              Discover the profound benefits of connecting with the natural world, from cultivating a vibrant garden to observing local wildlife.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-[2.5rem] shadow-lg cursor-pointer">
              <div className="absolute inset-0 bg-slate-900/40 z-10 group-hover:bg-slate-900/30 transition-colors"></div>
              <img
                src="https://images.unsplash.com/photo-1592424001807-6c846666ba59?q=80&w=2070&auto=format&fit=crop"
                alt="Gardening"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-slate-900/90 to-transparent">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-4">
                  <Trees size={24} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Gardening</h3>
                <p className="text-slate-200 font-medium">Cultivate your own sanctuary and grow organic produce.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[2.5rem] shadow-lg cursor-pointer">
              <div className="absolute inset-0 bg-slate-900/40 z-10 group-hover:bg-slate-900/30 transition-colors"></div>
              <img 
                src="https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=2070&auto=format&fit=crop" 
                alt="Wildlife observation" 
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-slate-900/90 to-transparent">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white mb-4">
                  <Bird size={24} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Wildlife Observation</h3>
                <p className="text-slate-200 font-medium">Learn to identify, attract, and protect local wildlife.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

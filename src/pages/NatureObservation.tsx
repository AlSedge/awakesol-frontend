import { useEffect } from 'react';
import { ArrowLeft, Eye, Heart, Brain, Leaf, Smile, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const reasons = [
  {
    number: "01",
    title: "Boosts Mental Well-Being & Reduces Stress",
    icon: Brain,
    color: "bg-violet-500",
    light: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-200",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop",
    body: (
      <>
        <p className="text-slate-600 leading-relaxed font-medium mb-5">
          There's something almost magical about watching a deer graze at dawn or listening to birdsong fill the morning air. Science backs this up: studies show that spending time observing wildlife significantly lowers cortisol levels — the hormone responsible for stress.
        </p>
        <p className="text-slate-600 leading-relaxed font-medium mb-5">
          When you sit quietly and watch animals in their natural habitat, your mind enters a state of <strong className="text-slate-800">soft fascination</strong>. Unlike the hard focus required by work or screens, soft fascination allows your brain to rest and recover. It's a form of effortless attention that restores mental energy and calms the nervous system.
        </p>
        <p className="text-slate-600 leading-relaxed font-medium">
          In Japan, the practice of <em>shinrin-yoku</em> (forest bathing) has been prescribed by doctors for decades. Observing wildlife is a natural extension of this — combining the healing power of nature with the joy of witnessing other living beings simply existing, unhurried and unbothered.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "Deepens Your Connection to the Natural World",
    icon: Leaf,
    color: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop",
    body: (
      <>
        <p className="text-slate-600 leading-relaxed font-medium mb-5">
          Most of us live disconnected from the rhythms of the natural world. We wake to alarms, work under artificial light, and fall asleep to screens. Observing animals reconnects us to something older and deeper — the pulse of life itself.
        </p>
        <p className="text-slate-600 leading-relaxed font-medium mb-5">
          When you start paying attention to the birds in your neighborhood, you notice the seasons changing through their migrations. You become aware of which plants flower when, which insects emerge, and how everything is <strong className="text-slate-800">beautifully interconnected</strong>. This awareness fosters a profound sense of belonging — not just to your community, but to the planet.
        </p>
        <p className="text-slate-600 leading-relaxed font-medium">
          This connection often transforms into stewardship. People who spend time observing wildlife are far more likely to support conservation efforts, plant native species, and advocate for protecting natural spaces. Caring begins with noticing.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Sharpens Your Observation & Patience Skills",
    icon: Eye,
    color: "bg-amber-500",
    light: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
    body: (
      <>
        <p className="text-slate-600 leading-relaxed font-medium mb-5">
          Animals don't perform on command. To truly observe them, you must learn to be <strong className="text-slate-800">patient, still, and attentive</strong>. These are skills that have become rare in our age of instant gratification and constant notifications.
        </p>
        <p className="text-slate-600 leading-relaxed font-medium mb-5">
          Wildlife observation trains you to notice subtle details: the flick of a tail, a change in birdsong that signals a predator nearby, the way light catches a spider's web at a certain angle. Over time, this heightened awareness spills over into everyday life. You become more present, more observant, and more appreciative of small moments.
        </p>
        <p className="text-slate-600 leading-relaxed font-medium">
          Children especially benefit from this. In a world of fast-paced digital media, learning to sit quietly and watch a squirrel or a butterfly teaches focus, delayed gratification, and the simple joy of discovery — skills that serve them for a lifetime.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Inspires Awe, Wonder & Lifelong Learning",
    icon: Sparkles,
    color: "bg-sky-500",
    light: "bg-sky-50",
    text: "text-sky-600",
    border: "border-sky-200",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=2070&auto=format&fit=crop",
    body: (
      <>
        <p className="text-slate-600 leading-relaxed font-medium mb-5">
          Have you ever watched a hummingbird hover perfectly still in mid-air, or seen a flock of starlings move as one in a mesmerizing murmuration? These moments inspire <strong className="text-slate-800">genuine awe</strong> — and awe is a powerful emotion.
        </p>
        <p className="text-slate-600 leading-relaxed font-medium mb-5">
          Research from UC Berkeley has shown that experiencing awe expands our perception of time, increases generosity, and improves overall life satisfaction. When we witness the incredible adaptations and behaviors of animals — from the navigation skills of monarch butterflies to the tool use of crows — we're reminded that the world is full of wonder.
        </p>
        <p className="text-slate-600 leading-relaxed font-medium">
          This naturally sparks curiosity. One observation leads to questions: Why does that bird sing at dawn? How do geese know when to migrate? Before you know it, you're diving into field guides, documentaries, and citizen science projects. Wildlife observation is a <strong className="text-slate-800">gateway to lifelong learning</strong>.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Encourages Physical Activity & Outdoor Time",
    icon: Heart,
    color: "bg-rose-500",
    light: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-200",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop",
    body: (
      <>
        <p className="text-slate-600 leading-relaxed font-medium mb-5">
          Observing animals naturally gets you outside and moving. Whether you're hiking to a favorite birdwatching spot, walking along a riverbank looking for otters, or simply strolling through a local park, wildlife observation is <strong className="text-slate-800">inherently active</strong>.
        </p>
        <p className="text-slate-600 leading-relaxed font-medium mb-5">
          Unlike going to the gym, this kind of physical activity doesn't feel like a chore. The motivation to see something beautiful or rare pulls you outdoors. You walk further, climb higher, and stay out longer — all while your mind is engaged and your spirit is lifted.
        </p>
        <p className="text-slate-600 leading-relaxed font-medium">
          The health benefits compound: fresh air, vitamin D from sunlight, gentle cardiovascular exercise, and the mental health boost of being in green spaces. It's a holistic form of wellness that nourishes body, mind, and soul — and it's available to almost everyone, regardless of age or fitness level.
        </p>
      </>
    ),
  },
];

export default function NatureObservation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-200 selection:text-amber-900">
      <Navigation />

      <main className="pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          {/* Back Link */}
          <Link
            to="/nature/wildlife"
            className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-amber-600 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Wildlife
          </Link>

          {/* Hero Header */}
          <header className="mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700 mb-6 border border-amber-200">
              <Smile size={16} />
              Featured Article
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              5 Reasons for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Observing Animals
              </span>{' '}
              in Nature
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
              From reducing stress to sparking lifelong curiosity, watching wildlife in its natural habitat is one of the most rewarding activities you can do. Here's why you should make it a regular habit.
            </p>
          </header>

          {/* Hero Image */}
          <div className="w-full aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-xl mb-20 border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop"
              alt="Person observing nature with binoculars in a lush forest"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Introduction */}
          <div className="prose prose-lg prose-slate max-w-none mb-20">
            <p className="text-xl text-slate-700 leading-relaxed font-medium first-letter:text-5xl first-letter:font-extrabold first-letter:text-amber-500 first-letter:mr-2 first-letter:float-left first-letter:leading-tight">
              In our fast-paced, screen-dominated world, it's easy to forget that we share this planet with millions of other species. Taking time to observe animals in their natural environment isn't just a pleasant pastime — it's a deeply enriching practice that benefits your mental health, broadens your perspective, and reconnects you with the living world. Here are five compelling reasons to make wildlife observation part of your life.
            </p>
          </div>

          {/* Reasons */}
          <div className="space-y-20">
            {reasons.map((reason, i) => (
              <section
                key={i}
                className={`scroll-mt-28 bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border ${reason.border} hover:shadow-xl transition-shadow duration-300`}
              >
                {/* Number & Title */}
                <div className="flex items-start gap-5 mb-8">
                  <span className={`flex-shrink-0 text-5xl md:text-7xl font-extrabold ${reason.text} opacity-30 leading-none`}>
                    {reason.number}
                  </span>
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${reason.light} flex items-center justify-center mb-3`}>
                      <reason.icon size={24} className={reason.text} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                      {reason.title}
                    </h2>
                  </div>
                </div>

                {/* Image */}
                <div className="w-full aspect-[16/9] rounded-[2rem] overflow-hidden shadow-md mb-8 border border-slate-100">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Body */}
                <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold">
                  {reason.body}
                </div>
              </section>
            ))}
          </div>

          {/* Closing CTA */}
          <div className="mt-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-[2.5rem] p-8 md:p-12 border border-amber-200 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <Leaf size={32} className="text-amber-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Ready to Start Your Wildlife Journey?
            </h2>
            <p className="text-slate-600 font-medium mb-8 max-w-lg mx-auto leading-relaxed">
              You don't need expensive gear or exotic travel. Just step outside, find a quiet spot, and pay attention. The natural world is waiting to amaze you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/nature/wildlife"
                className="inline-flex h-14 items-center justify-center rounded-full bg-amber-600 px-8 text-lg font-bold text-white shadow-lg shadow-amber-600/20 transition-all hover:-translate-y-1 hover:bg-amber-700"
              >
                Explore Wildlife Articles
              </Link>
              <Link
                to="/"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-lg font-bold text-slate-700 shadow-sm border border-slate-200 transition-all hover:bg-slate-50 hover:text-amber-600"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
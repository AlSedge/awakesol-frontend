import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Mail, MessageSquare, Send } from 'lucide-react';

// Web3Forms access key (free, https://web3forms.com)
const WEB3FORMS_KEY = 'c417ac77-fcf5-42d1-9202-4dd60ea3fa51';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Awakesol contact from ${form.name || 'a reader'}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200 selection:text-teal-900">
      <Navigation />

      <main className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-100 text-teal-600 mb-6 shadow-sm">
              <MessageSquare size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Questions, feedback, or just want to say hello? I read every message -
              and I'd love to hear what you think of the site.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100">
                {status === 'success' ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send size={28} className="text-teal-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Message sent!</h2>
                    <p className="text-slate-600 font-medium">
                      Thank you for getting in touch - I'll reply as soon as I can.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                        Your name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Jane Smith"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                        Your email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">
                        Your message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="What's on your mind?"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-sm font-bold text-rose-600">
                        Something went wrong sending your message. Please try again, or email me
                        directly at hello@awakesol.com.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full rounded-full bg-teal-600 px-8 py-4 text-lg font-bold text-white hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Email me directly</h3>
                    <a href="mailto:hello@awakesol.com" className="text-teal-600 font-bold hover:text-teal-500">
                      hello@awakesol.com
                    </a>
                  </div>
                </div>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">
                  Prefer email? Use the form above or drop me a line any time -
                  I usually reply within a day or two.
                </p>
              </div>

              <div className="bg-teal-900 rounded-[2rem] p-8 text-white">
                <h3 className="text-xl font-bold mb-3">A note from the author</h3>
                <p className="text-teal-100/90 leading-relaxed font-medium text-sm">
                  Awakesol is written by one person - me, Alan. Every article, every
                  recommendation, every word of this site is mine. If something here
                  helped you, taught you, or made you smile, I'd genuinely love to know.
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

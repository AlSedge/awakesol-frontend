import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Disclosure() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navigation />

      <main className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
            Affiliate Disclosure
          </h1>

          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-teal-600">
            <p>
              <strong>Awakesol.com</strong> is reader-supported. When you buy through links on our
              site, we may earn an affiliate commission — at <strong>no additional cost to you</strong>.
            </p>

            <h2>What this means for you</h2>
            <p>
              Some of the products and services we recommend are affiliate links. If you click one of
              these links and make a purchase, the retailer pays us a small commission. This helps keep
              Awakesol free and allows us to continue creating helpful content. The price you pay is
              exactly the same whether or not we earn a commission.
            </p>

            <h2>Our recommendations</h2>
            <p>
              We only recommend products and services we genuinely believe will be useful to our
              readers. Affiliate relationships never influence our editorial opinions or the content of
              our reviews. Our recommendations are based on our own research, testing, and experience.
            </p>

            <h2>Advertising</h2>
            <p>
              Awakesol may display advertising, including through Google AdSense. Ads are clearly
              labeled and are separate from our editorial content.
            </p>

            <h2>Questions?</h2>
            <p>
              If you have any questions about our affiliate relationships, please contact us at{' '}
              <a href="mailto:hello@awakesol.com">hello@awakesol.com</a>.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

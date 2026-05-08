import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Cookie Policy</h1>
          
          <div className="prose prose-slate prose-lg">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>What Are Cookies</h2>
            <p>
              As is common practice with almost all professional websites, this site uses cookies, 
              which are tiny files that are downloaded to your computer, to improve your experience. 
              This page describes what information they gather, how we use it, and why we sometimes 
              need to store these cookies.
            </p>

            <h2>How We Use Cookies</h2>
            <p>
              We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, 
              there are no industry standard options for disabling cookies without completely disabling 
              the functionality and features they add to this site.
            </p>

            <h2>Disabling Cookies</h2>
            <p>
              You can prevent the setting of cookies by adjusting the settings on your browser 
              (see your browser Help for how to do this). Be aware that disabling cookies will affect 
              the functionality of this and many other websites that you visit.
            </p>

            <h2>More Information</h2>
            <p>
              If you are looking for more information, you can contact us at: <br/>
              <strong>Email:</strong> hello@awakesol.com
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
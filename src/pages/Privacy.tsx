import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-orange-200 selection:text-orange-900 flex flex-col">
      <Navigation />

      <main className="flex-grow px-4 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-white p-8 shadow-sm border border-stone-100 md:p-16">
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 md:text-5xl mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-stone-500">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <div className="prose prose-stone max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:text-stone-900 prose-p:text-stone-600 prose-p:leading-relaxed prose-a:text-orange-500 hover:prose-a:text-orange-600 space-y-8">
            <section>
              <h2>1. Introduction</h2>
              <p>
                Welcome to Awake Solutions ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at hello@awakesol.com.
              </p>
            </section>

            <section>
              <h2>2. Information We Collect</h2>
              <p>
                We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2 mt-4">
                <li><strong>Personal Information Provided by You:</strong> Names, email addresses, contact preferences, and other similar information.</li>
                <li><strong>Log and Usage Data:</strong> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our website.</li>
              </ul>
            </section>

            <section>
              <h2>3. How We Use Your Information</h2>
              <p>
                We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2 mt-4">
                <li>To send you administrative information.</li>
                <li>To protect our services and ensure security.</li>
                <li>To communicate with you and respond to your inquiries.</li>
                <li>To improve user experience and our content offerings.</li>
              </ul>
            </section>

            <section>
              <h2>4. Sharing Your Information</h2>
              <p>
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2>5. Security of Your Information</h2>
              <p>
                We aim to protect your personal information through a system of organizational and technical security measures. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
              </p>
            </section>

            <section>
              <h2>6. Contact Us</h2>
              <p>
                If you have questions or comments about this notice, you may email us at <a href="mailto:hello@awakesol.com">hello@awakesol.com</a> or use the contact form on our home page.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
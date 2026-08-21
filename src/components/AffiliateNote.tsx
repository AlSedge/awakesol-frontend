// Small compliance note shown above affiliate product sections.
export default function AffiliateNote() {
  return (
    <p className="text-xs text-slate-500 italic mb-6 leading-relaxed">
      Disclosure: some of the links on this page are affiliate links. If you buy through them, we may
      earn a small commission at no extra cost to you. We only recommend products we genuinely believe in.{' '}
      <a href="/disclosure" className="underline hover:text-slate-700">
        Learn more
      </a>
      .
    </p>
  );
}

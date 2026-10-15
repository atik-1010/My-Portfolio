import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70dvh] items-center justify-center px-5 py-32">
      <div className="text-center">
        <p className="font-mono text-sm tracking-[0.3em] text-accent-blue">404</p>
        <h1 className="mt-5 text-headline font-semibold text-ink">This page does not exist.</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-muted">
          The link may be outdated, or the page may have moved. Everything worth seeing is on the
          home page.
        </p>
        <Link
          href="/"
          className="group mt-9 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/90"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to portfolio
        </Link>
      </div>
    </div>
  );
}

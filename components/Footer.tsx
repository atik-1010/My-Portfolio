import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { navigation, profile } from '@/data/profile';
import { getSocialIcon } from '@/components/ui/Icon';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-base-soft no-print">
      <div className="shell py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface font-mono text-[13px] text-accent-blue">
                AR
              </span>
              <span className="text-sm font-semibold tracking-tight text-ink">{profile.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Software Developer • Problem Solver • CSE Engineer. Currently studying Computer
              Science and Engineering at {profile.education.shortName}.
            </p>
            <p className="mt-4 text-sm text-ink-faint">{profile.location}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-2">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
              Elsewhere
            </p>
            <ul className="flex gap-2.5">
              {profile.socials.map((social) => {
                const Icon = getSocialIcon(social.icon);
                const isExternal = social.href.startsWith('http');
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      {...(isExternal
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.02] text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-ink-faint">
            © {year} {profile.name}. Built with Next.js, TypeScript and Tailwind CSS.
          </p>
          <a
            href="#hero"
            className="group inline-flex items-center gap-2 text-xs text-ink-faint transition-colors hover:text-ink"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
        {/* Marquee of core technologies — quiet, edge-faded, decorative. */}
        <div className="relative mt-20 overflow-hidden py-6 sm:mt-24" aria-hidden="true">
          <div className="hairline absolute inset-x-0 top-0" />
          <div className="mask-fade-x flex w-max animate-marquee gap-10">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 gap-10">
                {[
                  'C++',
                  'C#',
                  '.NET',
                  'ASP.NET Core',
                  'EF Core',
                  'SQL Server',
                  'Java',
                  'Python',
                  'JavaScript',
                  'Git',
                  'Data Structures',
                  'Algorithms',
                ].map((tech) => (
                  <span
                    key={`${copy}-${tech}`}
                    className="whitespace-nowrap font-mono text-sm tracking-tight text-ink-faint"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="hairline absolute inset-x-0 bottom-0" />
        </div>
      </div>

    </footer>
  );
}

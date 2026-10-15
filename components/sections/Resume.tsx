import { Download, FileText } from 'lucide-react';
import { profile } from '@/data/profile';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';

export const RESUME_PATH = '/resume/Atikur_Rahman_Resume.pdf';

/**
 * Resume — one clear ask, two clear actions.
 *
 * Replace public/resume/Atikur_Rahman_Resume.pdf with your latest version and
 * nothing else needs to change. Keep the filename so existing links stay valid.
 */
export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="scroll-mt-24 py-20 sm:py-24">
      <div className="shell">
        <Reveal>
          <div className="card edge-light relative overflow-hidden p-9 sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_50%_-20%,rgba(59,130,246,0.14),transparent_60%)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:48px_48px] opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-2xl text-center">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent-blue">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </span>

              <h2 id="resume-heading" className="mt-6 text-headline font-semibold text-ink">
                Want the full story?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
                The complete record - education, projects, contest results, leadership roles and
                certifications - in a single page.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href={RESUME_PATH} size="lg" external>
                  View Resume
                  <FileText className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href={RESUME_PATH}
                  variant="secondary"
                  size="lg"
                  download={`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
                  external={false}
                >
                  Download PDF
                  <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react';
import { profile } from '@/data/profile';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { getSocialIcon } from '@/components/ui/Icon';

/**
 * Contact.
 *
 * The form deliberately has NO backend. On submit it composes a pre-filled
 * message and hands it to the visitor's own mail client, so:
 *   - there is no server to maintain, no API key and no third-party form host,
 *   - nothing the visitor types is ever sent anywhere without them seeing it,
 *   - the site deploys to Vercel's free tier as a fully static page.
 *
 * If you later want submissions delivered directly, swap the body of
 * `handleSubmit` for a POST to a form service (Formspree, Resend, a Next.js
 * route handler) — the markup does not need to change.
 */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the address
      // is visible on screen and the mailto link still works.
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();

    const subject = encodeURIComponent(`Portfolio enquiry from ${name || 'a visitor'}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const fieldClass =
    'w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-ink placeholder:text-ink-faint ' +
    'transition-colors duration-200 hover:border-line-strong focus:border-accent-blue/60 focus:outline-none ' +
    'focus:ring-2 focus:ring-accent-blue/25';

  return (
    <Section
      id="contact"
      eyebrow="09 - Contact"
      title="Let's build something together."
      description="Open to software engineering and Business Analyst roles , internships and collaboration on interesting problems. The fastest route is email - I read everything."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1fr]">
        {/* ------------------------------------------------------ direct links */}
        <Reveal className="h-full">
          <div className="card flex h-full flex-col p-7">
            <h3 className="text-title font-semibold text-ink">Get in touch</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Based in {profile.location}. Available for remote and on-site opportunities.
            </p>

            <div className="mt-7 rounded-xl border border-line bg-white/[0.02] p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                Email
              </p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="min-w-0 break-all text-sm font-medium text-ink transition-colors hover:text-accent-blue"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copied ? 'Email copied' : 'Copy email address'}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {profile.socials
                .filter((social) => social.icon !== 'mail')
                .map((social) => {
                  const Icon = getSocialIcon(social.icon);
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white/[0.02] px-4 py-3 transition-colors duration-200 hover:border-line-strong hover:bg-white/[0.04]"
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <Icon className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-ink">
                              {social.label}
                            </span>
                            <span className="block truncate font-mono text-xs text-ink-faint">
                              {social.handle}
                            </span>
                          </span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </Reveal>

        {/* -------------------------------------------------------------- form */}
        <Reveal className="h-full" delay={0.08}>
          <div className="card h-full p-7">
            <h3 className="text-title font-semibold text-ink">Send a message</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              This opens your own email app with the message pre-filled - nothing is submitted to a
              server.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-medium text-ink-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-medium text-ink-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-medium text-ink-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="What would you like to build?"
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 active:scale-[0.99] sm:w-auto"
              >
                {sent ? (
                  <>
                    Opening your mail app
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <p aria-live="polite" className="min-h-[1.25rem] text-xs text-ink-faint">
                {sent
                  ? `If nothing opened, email ${profile.email} directly.`
                  : ''}
              </p>
            </form>
          </div>
        </Reveal>
      </div>

    </Section>
  );
}

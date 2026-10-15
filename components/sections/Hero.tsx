'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react';
import { profile } from '@/data/profile';
import { competitive } from '@/data/competitive';
import { ButtonLink } from '@/components/ui/Button';
import { getSocialIcon } from '@/components/ui/Icon';

const headlineWords = profile.headline.split(' ');

/**
 * Hero — the first 5 seconds.
 * Name, role, one paragraph, two CTAs, social links, portrait. Nothing else:
 * the plan is explicit that this section stays spacious.
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const item = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40"
    >
      {/* Ambient background — one soft accent wash and a faint grid. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-[-18rem] h-[36rem] w-[min(72rem,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.16),rgba(139,92,246,0.08),transparent)] blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-[42rem] bg-grid-faint [background-size:64px_64px] [mask-image:radial-gradient(70%_50%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="shell">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16"
        >
          {/* ---------------------------------------------------------- copy */}
          <div>
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-xs text-ink-muted backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {profile.availability}
              </span>
            </motion.div>

            <h1 className="mt-7 text-display font-semibold text-ink">
              {headlineWords.map((word, index) => (
                <motion.span key={`${word}-${index}`} variants={item} className="inline-block">
                  {word}
                  {index < headlineWords.length - 1 ? ' ' : ''}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={item}
              className="mt-5 text-lg font-medium tracking-tight text-ink-muted sm:text-xl"
            >
              <span className="accent-text">Software Developer</span>
              <span className="mx-2 text-ink-faint">•</span>
              Problem Solver
              <span className="mx-2 text-ink-faint">•</span>
              CSE Engineer
            </motion.p>

            <motion.p
              variants={item}
              className="mt-6 max-w-prose text-base leading-relaxed text-ink-muted sm:text-[17px]"
            >
              {profile.intro}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="#projects" size="lg">
                View My Work
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </ButtonLink>
              <ButtonLink href="/resume/Atikur_Rahman_Resume.pdf" variant="secondary" size="lg" external>
                Download Resume
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </ButtonLink>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              {profile.socials
                .filter((social) => social.icon !== 'mail')
                .map((social) => {
                  const Icon = getSocialIcon(social.icon);
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{social.label}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </a>
                  );
                })}
              <span className="inline-flex items-center gap-2 text-sm text-ink-faint">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {profile.location}
              </span>
            </motion.div>
          </div>

          {/* ------------------------------------------------------- portrait */}
          <motion.div variants={item} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative">
              <div
                className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(59,130,246,0.22),transparent)] blur-xl"
                aria-hidden="true"
              />
              <div className="edge-light relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
                {profile.hasPortrait ? (
                  <Image
                    src={profile.portrait}
                    alt={`Portrait of ${profile.name}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 384px, 420px"
                    className="object-cover"
                  />
                ) : (
                  /* No portrait supplied — a monogram, not a stock silhouette.
                     Add public/images/portrait.jpg and set hasPortrait: true. */
                  <div className="relative flex h-full w-full items-center justify-center">
                    <div
                      className="absolute inset-0 bg-grid-faint [background-size:32px_32px] opacity-60"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(59,130,246,0.18),transparent_60%)]"
                      aria-hidden="true"
                    />
                    <span className="relative font-mono text-7xl font-semibold tracking-tighter text-white/15">
                      AR
                    </span>
                  </div>
                )}

                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/85 via-transparent to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-line bg-base/70 p-4 backdrop-blur-md">
                  <p className="text-sm font-medium text-ink">{profile.education.shortName}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                    B.Sc. in {profile.education.field}
                    <br />
                    {profile.education.graduation}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>

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
    </section>
  );
}

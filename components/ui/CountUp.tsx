'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Milliseconds for the full count. */
  duration?: number;
  className?: string;
  /**
   * 'locale' groups thousands (1,204). 'plain' does not (1204).
   * Ratings and ranks read wrong with a separator, so they use 'plain'.
   */
  format?: 'locale' | 'plain';
}

/**
 * Counts from 0 to `value` once, when scrolled into view.
 *
 * Renders the final value immediately when the user prefers reduced motion, and
 * the final value is always what ends up in the DOM — so a screen reader or a
 * crawler never sees a half-counted number.
 */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 1400,
  className,
  format = 'locale',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion ? value : 0);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    // easeOutExpo — quick, then settles. Reads as precise rather than bouncy.
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(ease(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration, shouldReduceMotion]);

  const render = (n: number) => (format === 'locale' ? n.toLocaleString('en-US') : String(n));

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {render(display)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {render(value)}
        {suffix}
      </span>
    </span>
  );
}

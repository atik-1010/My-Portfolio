'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating in. */
  delay?: number;
  direction?: Direction;
  /** Travel distance in pixels. */
  distance?: number;
  as?: 'div' | 'section' | 'li' | 'span' | 'article';
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered entrance. Animates once, then stays put — re-animating on
 * every scroll pass is the kind of motion that reads as decoration.
 *
 * Respects `prefers-reduced-motion`: the content renders immediately, in place.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 16,
  as = 'div',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = offsets[direction];

  const variants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 0,
          x: offset.x * distance,
          y: offset.y * distance,
        },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px 0px -80px 0px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Parent wrapper that staggers `Reveal`-like children.
 * Pair with `StaggerItem` for lists and card grids.
 */
export function Stagger({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px 0px -60px 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: shouldReduceMotion ? 0 : delayChildren,
            staggerChildren: shouldReduceMotion ? 0 : staggerChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  distance = 14,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  /**
   * Element to render. Set to 'li' inside a <ul>/<ol> so the animation wrapper
   * does not break the list semantics screen readers rely on.
   */
  as?: 'div' | 'li' | 'article' | 'span';
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      variants={{
        hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

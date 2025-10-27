import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type Lang = 'en' | 'ja' | 'zh';

interface LanguageSwitchBoundaryProps {
  lang: Lang;
  children: ReactNode;
  className?: string;
  // Optional ARIA live region politeness for text changes
  ariaLive?: 'off' | 'polite' | 'assertive';
  // Optional rendered element for semantic correctness (e.g., span inside h2/button)
  as?: 'div' | 'span';
}

// Lightweight wrapper to smoothly swap localized text without remounting sections.
// It crossfades children when `lang` changes while preserving parent entrance animations.
export default function LanguageSwitchBoundary({
  lang,
  children,
  className,
  ariaLive = 'polite',
  as = 'div',
}: LanguageSwitchBoundaryProps) {
  const prefersReduced = useReducedMotion();

  const initial = { opacity: 0, y: prefersReduced ? 0 : 6 };
  const animate = { opacity: 1, y: 0 };
  const exit = { opacity: 0, y: prefersReduced ? 0 : -6 };

  const MotionTag: any = (motion as any)[as] ?? motion.div;
  // Match navbar label rendering: ensure inline-block when rendered as span
  const inlineStyle = as === 'span' ? { display: 'inline-block' } : undefined;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <MotionTag
        key={lang}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={className}
        style={inlineStyle}
        aria-live={ariaLive}
      >
        {children}
      </MotionTag>
    </AnimatePresence>
  );
}

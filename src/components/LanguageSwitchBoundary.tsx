import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
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
  // On narrow screens when the full-screen mobile menu is open,
  // skip language-switch crossfades for better performance.
  const [isNarrow, setIsNarrow] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 1280px)').matches;
  });
  const [menuOpen, setMenuOpen] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('mobile-menu-open');
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 1280px)');
    const handler = (e: MediaQueryListEvent) => setIsNarrow(e.matches);
    // Some older browsers use addListener; guard just in case.
    try {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } catch {
      // @ts-ignore
      mq.addListener?.(handler);
      return () => {
        // @ts-ignore
        mq.removeListener?.(handler);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onToggle = (e: Event) => {
      if (typeof document === 'undefined') return;
      setMenuOpen(document.documentElement.classList.contains('mobile-menu-open'));
    };
    window.addEventListener('navigation:mobile-menu', onToggle);
    return () => window.removeEventListener('navigation:mobile-menu', onToggle);
  }, []);

  const skipAnimations = useMemo(() => {
    return (isNarrow && menuOpen) || prefersReduced;
  }, [isNarrow, menuOpen, prefersReduced]);

  const initial = skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 };
  const animate = { opacity: 1, y: 0 };
  const exit = skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 };

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
        transition={skipAnimations ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
        className={className}
        style={inlineStyle}
        aria-live={ariaLive}
      >
        {children}
      </MotionTag>
    </AnimatePresence>
  );
}

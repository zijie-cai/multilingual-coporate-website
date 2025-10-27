import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import LanguageSwitchBoundary from './LanguageSwitchBoundary';

// Scroll-only navbar animation variants (no transitions, instant state changes)
const navScrollVariants = {
  top: {
    backgroundColor: 'rgba(245, 237, 227, 0)',
    backdropFilter: 'blur(2px)',
    boxShadow: '0 0px 0px rgba(0,0,0,0)',
    borderBottomColor: 'rgba(224,218,210,0)',
  },
  scrolled: {
    backgroundColor: 'rgba(249, 243, 234, 0.97)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(90, 31, 31, 0.08)',
    borderBottomColor: 'rgba(224,218,210,0.5)',
  },
};
import { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';


interface NavigationProps {
  currentLang: 'en' | 'ja' | 'zh';
  onLangChange: (lang: 'en' | 'ja' | 'zh') => void;
}

const navItems = {
  en: ['Home', 'About', 'News', 'Products', 'Business', 'Facilities', 'Partners', 'History', 'Contact'],
  ja: ['ホーム', '会社概要', 'ニュース', '製品', '経営範囲', '工場設備', 'パートナー', '沿革', 'お問い合わせ'],
  zh: ['首页', '公司简介', '新闻中心', '产品中心', '经营范围', '厂房设备', '合作伙伴', '公司历程', '联系我们']
};

const languages = ['en', 'ja', 'zh'] as const;
type Lang = (typeof languages)[number];

const mobileBrandContainerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.08
    }
  }
} as const;

const mobileBrandItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut'
    }
  }
} as const;

const mobileBrandDividerVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
} as const;

const desktopNavContainerVariants = {
  hidden: {
    opacity: 0,
    y: -12,
    filter: 'blur(6px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: 'easeOut',
      delayChildren: 0.2,
      staggerChildren: 0.08
    }
  }
} as const;

const desktopNavItemVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.94
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: 'easeOut'
    }
  }
} as const;

const desktopLanguageContainerVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    filter: 'blur(6px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  }
} as const;

const desktopLanguageButtonVariants = {
  hidden: {
    opacity: 0,
    y: -8
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut'
    }
  }
} as const;

interface MenuToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

import { useState as useLocalState, useEffect as useLocalEffect } from 'react';
const MenuToggleButton = ({ isOpen, onToggle, className }: MenuToggleButtonProps) => {
  const Icon = isOpen ? X : Menu;
  // Only play the entrance animation once on mount
  const [hasAnimatedIn, setHasAnimatedIn] = useLocalState(false);
  useLocalEffect(() => {
    setHasAnimatedIn(true);
  }, []);

  return (
    <AnimatePresence>
      <motion.button
        type="button"
        onClick={onToggle}
        className={`fixed top-6 right-4 w-[3rem] h-[3rem] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C4A474] ${className ?? ''}`}
        style={{
          color: '#5A1F1F',
        }}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
        animate={
          hasAnimatedIn
            ? { opacity: 1, scale: 1, rotate: 0 }
            : { opacity: 0, scale: 0.6, rotate: -90 }
        }
        exit={{ opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 18,
          delay: 0.8,
        }}
        key="menu-toggle-animate"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex items-center justify-center w-full h-full"
        >
          <Icon size={28} strokeWidth={2.4} />
        </motion.div>
      </motion.button>
    </AnimatePresence>
  );
};

const languageLabels: Record<Lang, string> = {
  en: 'EN',
  ja: '日本語',
  zh: '中文',
};

const languageNames: Record<Lang, string> = {
  en: 'English',
  ja: 'Japanese',
  zh: 'Chinese',
};

type LanguageSelectorVariant = 'desktop' | 'mobile';

interface LanguageSelectorProps {
  currentLang: Lang;
  onLangChange: (lang: Lang) => void;
  variant: LanguageSelectorVariant;
  className?: string;
}

type IndicatorState = { x: number; y: number; width: number; height: number } | null;

const languageSelectorConfig: Record<
  LanguageSelectorVariant,
  {
    containerClasses: string;
    buttonPaddingClasses: string;
    fontSize: string;
    inactiveColor: string;
    activeColor: string;
    highlightColor: string;
  }
> = {
  desktop: {
    containerClasses: 'items-center gap-2 bg-[#EFE9E1] rounded-full p-1 overflow-hidden',
    buttonPaddingClasses: 'px-4 py-2',
    fontSize: '0.95rem',
    inactiveColor: '#59514B',
    activeColor: '#F6F4F2',
    highlightColor: '#5A1F1F',
  },
  mobile: {
    containerClasses: 'items-center gap-3',
    buttonPaddingClasses: 'px-6 py-3',
    fontSize: '1rem',
    inactiveColor: '#59514B',
    activeColor: '#F6F4F2',
    highlightColor: '#5A1F1F',
  },
};

const LanguageSelector = ({ currentLang, onLangChange, variant, className }: LanguageSelectorProps) => {
  const config = languageSelectorConfig[variant];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<Lang, HTMLButtonElement | null>>({
    en: null,
    ja: null,
    zh: null,
  });
  const [indicator, setIndicator] = useState<IndicatorState>(null);

  const updateIndicator = useCallback(() => {
    const container = containerRef.current;
    const activeButton = buttonRefs.current[currentLang];

    if (!container || !activeButton) {
      setIndicator((prev) => (prev === null ? prev : null));
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    if (buttonRect.width === 0 || buttonRect.height === 0) {
      setIndicator((prev) => (prev === null ? prev : null));
      return;
    }

    const nextIndicator = {
      x: buttonRect.left - containerRect.left,
      y: buttonRect.top - containerRect.top,
      width: buttonRect.width,
      height: buttonRect.height,
    };

    setIndicator((prev) => {
      if (
        prev &&
        Math.round(prev.x) === Math.round(nextIndicator.x) &&
        Math.round(prev.y) === Math.round(nextIndicator.y) &&
        Math.round(prev.width) === Math.round(nextIndicator.width) &&
        Math.round(prev.height) === Math.round(nextIndicator.height)
      ) {
        return prev;
      }

      return nextIndicator;
    });
  }, [currentLang]);

  useLayoutEffect(() => {
    updateIndicator();
    const frame = window.requestAnimationFrame(updateIndicator);
    return () => window.cancelAnimationFrame(frame);
  }, [updateIndicator]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => updateIndicator();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [updateIndicator]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const docWithFonts = document as Document & { fonts?: FontFaceSet };
    const fonts = docWithFonts.fonts;

    if (!fonts) {
      return;
    }

    const handleFontsLoaded = () => updateIndicator();
    fonts.addEventListener('loadingdone', handleFontsLoaded);
    fonts.addEventListener('loadingerror', handleFontsLoaded);

    return () => {
      fonts.removeEventListener('loadingdone', handleFontsLoaded);
      fonts.removeEventListener('loadingerror', handleFontsLoaded);
    };
  }, [updateIndicator]);

  const baseButtonClasses =
    'relative rounded-full font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C4A474]';

  return (
    <div ref={containerRef} className={`relative isolate ${config.containerClasses} ${className ?? ''}`}>
      <motion.span
        className="absolute pointer-events-none rounded-full shadow-sm"
        style={{ backgroundColor: config.highlightColor }}
        initial={false}
        animate={{
          x: (indicator?.x ?? 0) + (variant === 'desktop' ? (indicator?.width ?? 0) * 0.1 - 3.5 : 0),
          y: (indicator?.y ?? 0) + (variant === 'desktop' ? (indicator?.height ?? 0) * 0.1 - 6.5 : 0),
          width: variant === 'desktop' ? (indicator?.width ?? 0) * 0.8 : (indicator?.width ?? 0),
          height: variant === 'desktop' ? (indicator?.height ?? 0) * 0.8 : (indicator?.height ?? 0),
          opacity: indicator ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
      {languages.map((lang) => {
        const isActive = currentLang === lang;
        return (
          <motion.button
            key={lang}
            ref={(node) => {
              buttonRefs.current[lang] = node;
            }}
            type="button"
            onClick={() => onLangChange(lang)}
            className={`${baseButtonClasses} ${config.buttonPaddingClasses}`}
            style={{ fontSize: config.fontSize }}
            animate={{ color: isActive ? config.activeColor : config.inactiveColor }}
            transition={{ duration: 0.2 }}
            aria-pressed={isActive}
            aria-label={`Switch to ${languageNames[lang]} language`}
          >
            <span className="relative z-10">{languageLabels[lang]}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default function Navigation({ currentLang, onLangChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopNavReady, setDesktopNavReady] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const brandBaseSize = 'clamp(2.35rem, 8.8vw, 3.75rem)';
  const brandDividerWidth = '3.05em';
  const brandSecondaryScale = 0.39;
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    nav.style.transition = mobileMenuOpen
      ? 'background-color 0.15s ease, backdrop-filter 0.15s ease'
      : 'none';
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDesktopNavReady(true);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setDesktopNavReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [shouldReduceMotion]);

  const scrollToSection = (index: number) => {
    const sections = ['hero', 'about', 'news', 'products', 'business', 'facilities', 'partners', 'history', 'contact'];
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navInitialState = shouldReduceMotion ? 'visible' : 'hidden';
  const navAnimateState = shouldReduceMotion || desktopNavReady ? 'visible' : 'hidden';
  const navVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0, filter: 'blur(0px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      }
    : desktopNavContainerVariants;
  const navItemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0, scale: 1 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }
    : desktopNavItemVariants;

  return (
    <>
      <motion.nav
        variants={navScrollVariants}
        initial="top"
        animate={scrolled ? 'scrolled' : 'top'}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          backgroundColor: mobileMenuOpen
            ? 'rgba(245, 237, 227, 1)' // fully solid when menu open
            : scrolled
              ? 'rgba(249, 243, 234, 0.92)'
      : 'rgba(245, 237, 227, 0)',
    backdropFilter: mobileMenuOpen
      ? 'blur(12px)'
      : scrolled
        ? 'blur(14px)'
        : 'blur(0px)',
          borderBottomColor:
            !mobileMenuOpen && scrolled
              ? 'rgba(224,218,210,0.5)'
              : 'rgba(224,218,210,0)',
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-saturate-150"
        style={{
          height: '5rem',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="font-['Playfair_Display'] cursor-pointer"
              style={{ fontSize: '1.5rem', fontWeight: 600, color: '#5A1F1F' }}
              onClick={() => scrollToSection(0)}
            >
              ICHIBOKU
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              className="hidden nav-flex items-center gap-8"
              variants={navVariants}
              initial={navInitialState}
              animate={navAnimateState}
            >
              {navItems[currentLang].map((item, index) => (
                <motion.button
                  key={`nav-item-${index}`}
                  onClick={() => scrollToSection(index)}
                  className="relative group cursor-pointer bg-transparent border-none"
                  style={{ color: '#59514B' }}
                  whileHover={{ color: '#5A1F1F' }}
                  variants={navItemVariants}
                >
                  <LanguageSwitchBoundary lang={currentLang} className="inline-block">
                    <span>{item}</span>
                  </LanguageSwitchBoundary>
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-[2px] bg-[#5A1F1F]"
                    initial={{ width: 0, x: '-50%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </motion.div>

            {/* Language Selector */}
            <motion.div
              initial={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            >
              <LanguageSelector
                variant="desktop"
                currentLang={currentLang}
                onLangChange={onLangChange}
                className="hidden nav-flex"
              />
            </motion.div>

            {/* Mobile Menu Button */}
            <MenuToggleButton
              isOpen={mobileMenuOpen}
              onToggle={toggleMobileMenu}
              className="nav-hidden"
            />
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 nav-hidden"
            style={{ backgroundColor: '#F5EDE3' }}
          >
            {/* Menu content */}
            <div className="flex flex-col items-center justify-center h-full px-8 pb-[5rem]" style={{ transform: 'translateY(28px)' }}>

              {/* Menu items */}
              <nav className="flex flex-col items-center gap-6 mb-12">
                {navItems[currentLang].map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => scrollToSection(index)}
                    className="relative bg-transparent border-none group"
                    style={{ fontSize: '1.5rem', color: '#59514B' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative">
                      {item}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5A1F1F]"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </motion.button>
                ))}
              </nav>
              
              {/* Language selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="nav-hidden"
              >
                <LanguageSelector
                  variant="mobile"
                  currentLang={currentLang}
                  onLangChange={onLangChange}
                  className="flex"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

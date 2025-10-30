import { motion, useScroll, useTransform } from 'motion/react';
import LanguageSwitchBoundary from './LanguageSwitchBoundary';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';

interface HeroSectionProps {
  lang: 'en' | 'ja' | 'zh';
}

const content = {
  en: {
    tagline1: "Driving Trust and Innovation.",
    tagline2: "信頼と革新を、動きにする。",
    tagline3: "以信赖与创新，驱动未来。",
    learnMore: "Learn More",
    viewProducts: "View Products"
  },
  ja: {
    tagline1: "信頼と革新を、動きにする。",
    tagline2: "Driving Trust and Innovation.",
    tagline3: "以信赖与创新，驱动未来。",
    learnMore: "詳しく見る",
    viewProducts: "製品を見る"
  },
  zh: {
    tagline1: "以信赖与创新，驱动未来。",
    tagline2: "信頼と革新を、動きにする。",
    tagline3: "Driving Trust and Innovation.",
    learnMore: "了解更多",
    viewProducts: "产品中心"
  }
};

export default function HeroSection({ lang }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#F5EDE3' }}
    >
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          y: backgroundY,
          opacity: backgroundOpacity,
          backgroundImage: "url('/topo-1.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "overlay",
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 lg:pt-48"
      >
        <div className="flex flex-col items-center text-center">
          
          {/* Company Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-16 flex flex-col items-center"
          >
            {/* 一木 - Japanese name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-4"
            >
              <h1 className="font-['Playfair_Display'] text-center"
                style={{
                  fontSize: 'clamp(6rem, 15vw, 9rem)',
                  fontWeight: 700,
                  color: '#5A1F1F',
                  lineHeight: 1,
                  letterSpacing: '0.05em',
                  textShadow: '0 4px 25px rgba(90, 31, 31, 0.08)'
                }}
              >
                一木
              </h1>
            </motion.div>

            {/* Gold divider line - responsive width */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-[2px] mb-4 w-full max-w-[min(80vw,400px)]"
              style={{
                background: 'linear-gradient(90deg, transparent, #C4A474 25%, #C4A474 75%, transparent)'
              }}
            />

            {/* ICHIBOKU - English name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="font-['Roboto_Mono'] text-center"
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 600,
                  color: '#59514B',
                  letterSpacing: '0.3em',
                }}
              >
                ICHIBOKU
              </div>
            </motion.div>

          </motion.div>

          {/* Taglines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="space-y-6 mb-16 max-w-4xl"
          >
            <motion.h2
              className="relative font-['Playfair_Display'] tracking-wide"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1.2, ease: 'easeOut' }}
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
                fontWeight: 700,
                background: 'linear-gradient(90deg, #5A1F1F, #C4A474, #5A1F1F)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.3,
                textShadow: '0 3px 10px rgba(196, 164, 116, 0.25)',
              }}
            >
              <LanguageSwitchBoundary as="span" lang={lang}>
                <span
                  className="hero-gradient-animated"
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(90deg, #C4A474, #5A1F1F, #C4A474)',
                    backgroundSize: '400% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    willChange: 'background-position',
                  }}
                >
                  {content[lang].tagline1}
                </span>
              </LanguageSwitchBoundary>
            </motion.h2>

            <div className="space-y-2 pt-4">
              <p
                className="font-['Noto_Sans_JP']"
                style={{
                  fontSize: 'clamp(1rem, 1.75vw, 1.125rem)',
                  color: '#59514B',
                  opacity: 0.9
                }}
              >
                <LanguageSwitchBoundary as="span" lang={lang}>
                  {content[lang].tagline2}
                </LanguageSwitchBoundary>
              </p>

              <p
                className="font-['Noto_Sans_SC']"
                style={{
                  fontSize: 'clamp(1rem, 1.75vw, 1.125rem)',
                  color: '#59514B',
                  opacity: 0.9
                }}
              >
                <LanguageSwitchBoundary as="span" lang={lang}>
                  {content[lang].tagline3}
                </LanguageSwitchBoundary>
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            {/* Learn More Button */}
            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-3 rounded-full border-2 overflow-hidden"
              style={{
                borderColor: '#5A1F1F',
                color: '#5A1F1F',
                backgroundColor: 'transparent',
                minWidth: '180px',
                boxShadow: '0 4px 15px rgba(90, 31, 31, 0.1)'
              }}
            >
              {/* Slide in background */}
              <motion.div
                className="absolute inset-0"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ backgroundColor: '#5A1F1F' }}
              />
              
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 0, opacity: 0.5 }}
                whileHover={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ 
                  backgroundColor: '#C4A474',
                  transformOrigin: 'center'
                }}
              />

              <span className="relative z-10 font-medium tracking-wide" style={{ color: '#5A1F1F' }}>
                <LanguageSwitchBoundary as="span" lang={lang}>
                  {content[lang].learnMore}
                </LanguageSwitchBoundary>
              </span>
            </motion.button>

            {/* View Products Button */}
            <motion.button
              onClick={scrollToProducts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-3 rounded-full overflow-hidden"
              style={{
                backgroundColor: '#5A1F1F',
                color: '#F6F4F2',
                minWidth: '180px',
                boxShadow: '0 8px 25px rgba(90, 31, 31, 0.3)'
              }}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'linear-gradient(135deg, #7B2C2C 0%, #5A1F1F 100%)'
                }}
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0"
                initial={{ x: '-100%', rotate: -45 }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(196, 164, 116, 0.3), transparent)',
                  width: '50%'
                }}
              />

              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(196, 164, 116, 0.3)',
                    '0 0 30px rgba(196, 164, 116, 0.5)',
                    '0 0 20px rgba(196, 164, 116, 0.3)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              <span className="relative z-10 font-medium tracking-wide">
                <LanguageSwitchBoundary as="span" lang={lang}>
                  {content[lang].viewProducts}
                </LanguageSwitchBoundary>
              </span>
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-12 flex flex-col items-center justify-center"
          >
            <motion.div
              className="relative cursor-pointer group flex items-center justify-center"
              onClick={scrollToAbout}
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Pulsing Ring */}
              <motion.div
                className="absolute rounded-full"
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 50,
                  height: 50,
                  border: '1.5px solid rgba(196, 164, 116, 0.45)',
                  boxShadow: '0 0 8px rgba(196, 164, 116, 0.25)',
                }}
              />

              {/* Arrow inside Circle */}
              <motion.div
                className="z-10 flex items-center justify-center rounded-full p-3 transition-all duration-300"
                whileHover={{ boxShadow: '0 0 16px rgba(196, 164, 116, 0.5)' }}
                style={{
                  border: '2px solid rgba(196, 164, 116, 0.8)',
                  background: 'transparent',
                  boxShadow: '0 0 12px rgba(196, 164, 116, 0.3)',
                }}
              >
                <ChevronDown size={28} style={{ color: '#5A1F1F', strokeWidth: 2.5 }} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Inline CSS for always-on gradient text animation */}
      <style>{`
        .hero-gradient-animated {
          animation: heroGradientSlide 6s linear infinite;
        }
        @keyframes heroGradientSlide {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-gradient-animated { animation: none !important; }
        }
      `}</style>

    </section>
  );
}

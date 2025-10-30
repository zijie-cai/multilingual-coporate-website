import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Shield, Award, Users } from 'lucide-react';
import LanguageSwitchBoundary from './LanguageSwitchBoundary';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutSectionProps {
  lang: 'en' | 'ja' | 'zh';
}

const content = {
  en: {
    title: "About Us",
    subtitle: "CRAFTSMANSHIP & PHILOSOPHY",
    intro: "<strong>Ichiboku Co., Ltd.</strong> is a <span style='color:#5A1F1F; font-weight:600;'>Tokyo-based precision manufacturing and trading company</span> established in <strong>1986</strong>. We provide <strong>electronic components</strong>, <strong>machined parts</strong>, <strong>optical glass</strong>, <strong>molds</strong>, and <strong>medical equipment</strong>, along with <em>foreign import and export services</em>. With operations in <strong>Shanghai</strong> and <strong>Tokyo</strong>, Ichiboku integrates <span style='color:#5A1F1F; font-weight:600;'>Japanese precision</span> with <span style='color:#5A1F1F; font-weight:600;'>global innovation</span> to deliver reliable, high-quality solutions across the <strong>optical</strong>, <strong>medical</strong>, <strong>electrical</strong>, and <strong>automotive</strong> industries.",
    mission: "Our Mission",
    values: [
      { icon: Shield, title: "Environmental Protection", text: "环境保护 · Committed to sustainable manufacturing" },
      { icon: Award, title: "Quality First", text: "品质第一 · Excellence in every detail" },
      { icon: Users, title: "Customer First", text: "顾客至上 · Your success is our priority" }
    ]
  },
  ja: {
    title: "会社概要",
    subtitle: "職人技術と企業理念",
    intro: "<strong>一木株式会社</strong>は、<span style='color:#5A1F1F; font-weight:600;'>1986年に設立された東京を拠点とする精密製造および商社</span>です。<strong>電子部品</strong>、<strong>機械加工部品</strong>、<strong>光学ガラス</strong>、<strong>金型</strong>、<strong>医療機器</strong>を提供し、<em>外国からの輸出入サービス</em>も行っています。<strong>上海</strong>と<strong>東京</strong>に拠点を持ち、<span style='color:#5A1F1F; font-weight:600;'>日本の精密技術</span>と<span style='color:#5A1F1F; font-weight:600;'>グローバルな革新</span>を融合させ、<strong>光学</strong>、<strong>医療</strong>、<strong>電気</strong>、<strong>自動車</strong>業界において信頼性の高い高品質なソリューションを提供しています。",
    mission: "企業理念",
    values: [
      { icon: Shield, title: "環境保護", text: "環境保護 · 持続可能な製造への取り組み" },
      { icon: Award, title: "品質重視", text: "品質第一 · あらゆる細部における卓越性" },
      { icon: Users, title: "顧客第一", text: "顧客至上 · お客様の成功が私たちの優先事項" }
    ]
  },
  zh: {
    title: "公司简介",
    subtitle: "工艺与理念",
    intro: "<strong>一木株式会社</strong>是一家<span style='color:#5A1F1F; font-weight:600;'>总部位于东京的精密制造与贸易公司</span>，成立于<strong>1986年</strong>。我们提供<strong>电子元件</strong>、<strong>机械零件</strong>、<strong>光学玻璃</strong>、<strong>模具</strong>及<strong>医疗设备</strong>，并开展<em>进出口贸易业务</em>，为客户提供综合服务。公司在<strong>上海</strong>和<strong>东京</strong>设有分支，融合了<span style='color:#5A1F1F; font-weight:600;'>日本精密技术</span>与<span style='color:#5A1F1F; font-weight:600;'>全球创新</span>，致力于为<strong>光学</strong>、<strong>医疗</strong>、<strong>电气</strong>及<strong>汽车</strong>等行业提供可靠高品质的解决方案。",
    mission: "企业使命",
    values: [
      { icon: Shield, title: "环境保护", text: "Environmental Protection · 致力于可持续制造" },
      { icon: Award, title: "质量第一", text: "Quality First · 精益求精于每个细节" },
      { icon: Users, title: "客户至上", text: "Customer First · 您的成功是我们的优先" }
    ]
  }
};

const CARD_BACKGROUND = 'linear-gradient(160deg, #FFF7ED, #E6D7C3)';
const CARD_BORDER = '1px solid rgba(90, 31, 31, 0.15)';
const CARD_RADIAL_HIGHLIGHT =
  'radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0) 55%)';
const CARD_SHINE_GRADIENT =
  'linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)';

const missionBlockVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren'
    }
  }
};

const CARD_SHINE_VARIANTS = {
  hidden: { opacity: 0, x: '-160%' },
  show: {
    opacity: [0, 1, 0],
    x: ['-160%', '40%', '160%'],
    transition: {
      duration: 1.2,
      ease: 'easeInOut',
      times: [0, 0.5, 1]
    }
  }
};

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function AboutSection({ lang }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const detailsInView = useInView(detailsRef, { once: true, amount: 0.45 });
  const missionRef = useRef<HTMLDivElement | null>(null);
  const missionInView = useInView(missionRef, { once: true, amount: 0.25 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  // Controls when the picture animation begins once detail content is in view
  const [startPictureAnimation, setStartPictureAnimation] = useState(false);

  // Trigger picture animation after a short delay once detail content appears
  useEffect(() => {
    if (detailsInView) {
      const delay = isMobile ? 500 : 150;
      const timer = setTimeout(() => {
        setStartPictureAnimation(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [detailsInView, isMobile]);

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#F5EDE3' }}
      lang={lang}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="text-center mb-16"
        >
          <LanguageSwitchBoundary lang={lang}>
            <div className="font-['Roboto_Mono'] uppercase tracking-widest mb-4" style={{ fontSize: '0.875rem', color: '#5A1F1F' }}>
              {content[lang].subtitle}
            </div>
            <h2 className="font-['Playfair_Display']" style={{ fontSize: '2.5rem', fontWeight: 600, color: '#1E1E1E' }}>
              {content[lang].title}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-[2px] bg-[#5A1F1F] mx-auto mt-6"
              style={{ width: '80px', transformOrigin: 'center' }}
            />
          </LanguageSwitchBoundary>
        </motion.div>

        <div ref={detailsRef} className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          <motion.div
            initial={isMobile ? { opacity: 0, x: -40 } : { opacity: 0, x: -30 }}
            animate={detailsInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: isMobile ? 0.2 : 0.35,
              duration: isMobile ? 0.9 : 0.8,
              type: 'spring',
              stiffness: 120,
              damping: 10
            }}
            className="space-y-6"
          >
            <LanguageSwitchBoundary lang={lang}>
              <div style={{ color: '#1E1E1E', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: content[lang].intro }} />
            </LanguageSwitchBoundary>
          </motion.div>

          <motion.div
            initial={isMobile ? { opacity: 0, x: 40 } : { opacity: 0, x: 30, scale: 0.95 }}
            animate={startPictureAnimation ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{
              delay: isMobile ? 0.5 : 0.2,
              type: 'spring',
              stiffness: 120,
              damping: 10
            }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1.5 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl shadow-xl"
              initial={false}
              animate={false}
            >
              <ImageWithFallback
                src="/about.png"
                alt="Ichiboku workspace"
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Mission Values */}
        <motion.div
          ref={missionRef}
          variants={missionBlockVariants}
          initial="hidden"
          animate={missionInView ? 'show' : 'hidden'}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <LanguageSwitchBoundary lang={lang}>
            <h3 className="font-['Playfair_Display'] text-center mb-12" style={{ fontSize: '2rem', fontWeight: 600, color: '#1E1E1E' }}>
              {content[lang].mission}
            </h3>
          </LanguageSwitchBoundary>
          
          <div className="grid md:grid-cols-3 gap-8">
            {content[lang].values.map((value, index) => {
              const cardRef = useRef(null);
              const cardInView = useInView(cardRef, { once: true, amount: 0.5 });

              return (
                <motion.div key={index} ref={cardRef} className="relative overflow-hidden p-8 rounded-2xl will-change-transform [transition-property:box-shadow,background-color,border-color] duration-300"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                    y: hoveredIndex === index ? -5 : 0,
                    transition: { duration: hoveredIndex === index ? 0.15 : 0.08, ease: 'easeInOut' }
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(160deg, #FFF7ED, #E6D7C3)',
                    color: '#3A2A20',
                    border: '1px solid rgba(90, 31, 31, 0.15)'
                  }}
                >
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none flex"
                    variants={CARD_SHINE_VARIANTS}
                    animate={cardInView ? 'show' : 'hidden'}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: '45%',
                        background: 'linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                        transform: 'skewX(-20deg) scale(1.4)',
                        marginLeft: '28%',
                        height: '160%',
                        marginTop: '-30%',
                        filter: 'blur(0.5px)'
                      }}
                    />
                  </motion.div>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
                    style={{ backgroundColor: 'rgba(90, 31, 31, 0.2)' }}
                  >
                    <value.icon size={32} style={{ color: '#5A1F1F' }} />
                  </div>
                  <LanguageSwitchBoundary lang={lang}>
                    <div>
                      <h4 className="text-center mb-3" style={{ fontWeight: 600, color: '#1E1E1E' }}>
                        {value.title}
                      </h4>
                      <p className="text-center" style={{ fontSize: '0.875rem', color: '#59514B' }}>
                        {value.text}
                      </p>
                    </div>
                  </LanguageSwitchBoundary>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

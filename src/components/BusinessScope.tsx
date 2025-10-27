import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Package, Cog, Glasses, Disc, Truck, Layers, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import LanguageSwitchBoundary from './LanguageSwitchBoundary';

interface BusinessScopeProps {
  lang: 'en' | 'ja' | 'zh';
}

const scopes = {
  en: [
    {
      icon: Package,
      title: "Electronic Components",
      subtitle: "Manufacturing & Global Trade",
      description: "Design, manufacturing, and global trade of advanced electronic devices and modules.",
      features: ["IC Design", "PCB Assembly", "Export Services"]
    },
    {
      icon: Cog,
      title: "Machined Parts",
      subtitle: "CNC Manufacturing & Assembly",
      description: "Precision CNC parts and assemblies for diverse industries.",
      features: ["5-Axis Machining", "Quality Control", "Custom Assembly"]
    },
    {
      icon: Glasses,
      title: "Optical Glass & Filters",
      subtitle: "Lens & Filter Production",
      description: "Manufacturing of flat, diffused, and condenser glass for optical systems.",
      features: ["UV Filters", "AR Coating", "Custom Specs"]
    },
    {
      icon: Disc,
      title: "Materials & Consumables",
      subtitle: "Materials & Abrasives Distribution",
      description: "Distribution of raw materials, abrasives, and precision cutting tools.",
      features: ["Raw Materials", "Grinding Wheels", "Cutting Tools"]
    },
    {
      icon: Layers,
      title: "Molds & Tooling",
      subtitle: "Design & Manufacturing",
      description: "Design and production of precision molds and dies for electronics and optical industries.",
      features: ["Injection Molds", "Stamping Dies", "CAD Design"]
    },
    {
      icon: Truck,
      title: "OEM & Global Trade",
      subtitle: "OEM & Global Logistics",
      description: "Comprehensive OEM manufacturing and import/export services.",
      features: ["OEM Production", "Customs Support", "Global Shipping"]
    }
  ],
  ja: [
    {
      icon: Package,
      title: "電子部品",
      subtitle: "製造販売と輸出入",
      description: "先進電子機器・モジュールの設計、製造、国際取引。",
      features: ["IC設計", "基板実装", "輸出サービス"]
    },
    {
      icon: Cog,
      title: "機械加工部品",
      subtitle: "精密加工と組立",
      description: "各種産業向けの高精度CNC部品および組立品。",
      features: ["5軸加工", "品質管理", "組立加工"]
    },
    {
      icon: Glasses,
      title: "光学ガラス・フィルター",
      subtitle: "光学製品の製造",
      description: "光学システム用フラット、拡散、集光ガラスの製造。",
      features: ["UV", "ARコート", "特注仕様"]
    },
    {
      icon: Disc,
      title: "原材料・研削材",
      subtitle: "原材料・研削材の販売",
      description: "原材料、研削砥石、精密切削工具の販売。",
      features: ["原材料", "砥石", "切削工具"]
    },
    {
      icon: Layers,
      title: "金型・治工具",
      subtitle: "設計・製作",
      description: "電子・光学産業用精密金型・治工具の設計・製造。",
      features: ["射出金型", "プレス金型", "CAD設計"]
    },
    {
      icon: Truck,
      title: "OEM・国際取引",
      subtitle: "OEM・国際物流",
      description: "包括的なOEM製造および輸出入支援サービス。",
      features: ["OEM生産", "通関支援", "国際輸送"]
    }
  ],
  zh: [
    {
      icon: Package,
      title: "电子器件",
      subtitle: "生产与国际贸易",
      description: "先进电子设备及模块的设计、制造与国际贸易。",
      features: ["IC设计", "PCB组装", "出口服务"]
    },
    {
      icon: Cog,
      title: "机械加工零部件",
      subtitle: "精密加工与装配",
      description: "面向多行业的高精度CNC零部件及组件。",
      features: ["五轴加工", "质量控制", "定制组装"]
    },
    {
      icon: Glasses,
      title: "光学玻璃与滤光片",
      subtitle: "光学产品制造",
      description: "用于光学系统的亮光片、散光片、集光片制造。",
      features: ["UV滤镜", "增透膜", "定制规格"]
    },
    {
      icon: Disc,
      title: "原材料及切削耗材",
      subtitle: "原料与耗材销售",
      description: "原材料、砂轮及精密切削工具的销售。",
      features: ["原材料", "砂轮", "切削工具"]
    },
    {
      icon: Layers,
      title: "模具与工装",
      subtitle: "设计与制造",
      description: "面向电子与光学产业的精密模具及工装设计制造。",
      features: ["注塑模具", "冲压模具", "CAD设计"]
    },
    {
      icon: Truck,
      title: "OEM与国际贸易",
      subtitle: "OEM与国际物流",
      description: "提供完整的OEM制造及进出口服务。",
      features: ["OEM生产", "清关支持", "全球运输"]
    }
  ]
};

const titles = {
  en: { main: "Business Scope", subtitle: "WHAT WE DO" },
  ja: { main: "経営範囲", subtitle: "事業内容" },
  zh: { main: "经营范围", subtitle: "业务范围" }
};

const cardThemes = [
  {
    bg: "linear-gradient(135deg, #2B1F29 0%, #4A3640 100%)",
    accent: "#E8C4D4",
    accentDark: "#D4A5B8",
    iconBg: "rgba(232, 196, 212, 0.1)",
    border: "rgba(232, 196, 212, 0.2)",
  },
  {
    bg: "linear-gradient(135deg, #2D1F1A 0%, #4D3528 100%)",
    accent: "#E6D0BC",
    accentDark: "#D4B89A",
    iconBg: "rgba(230, 208, 188, 0.1)",
    border: "rgba(230, 208, 188, 0.2)",
  },
  {
    bg: "linear-gradient(135deg, #261C14 0%, #3F3023 100%)",
    accent: "#E4C9A8",
    accentDark: "#D4B185",
    iconBg: "rgba(228, 201, 168, 0.1)",
    border: "rgba(228, 201, 168, 0.2)",
  },
  {
    bg: "linear-gradient(135deg, #27211C 0%, #3E352C 100%)",
    accent: "#DDD1BC",
    accentDark: "#C9B89A",
    iconBg: "rgba(221, 209, 188, 0.1)",
    border: "rgba(221, 209, 188, 0.2)",
  },
  {
    bg: "linear-gradient(135deg, #2C1D20 0%, #4A313A 100%)",
    accent: "#E8CCBD",
    accentDark: "#D9B89A",
    iconBg: "rgba(232, 204, 189, 0.1)",
    border: "rgba(232, 204, 189, 0.2)",
  },
  {
    bg: "linear-gradient(135deg, #281E18 0%, #423428 100%)",
    accent: "#E6D7BC",
    accentDark: "#D4C19A",
    iconBg: "rgba(230, 215, 188, 0.1)",
    border: "rgba(230, 215, 188, 0.2)",
  },
];

function StickyCard({ scope, index, total, lang, isMobile = false, onPrevious, onNext, isFirst, isLast, direction = 0, fixedHeight, dataMeasure = false }: any) {
  const cardRef = useRef(null);
  // --- Normalize scroll offsets for consistent animation triggering across all cards
  const baseOffset = 0.08;
  const offsetStart = 0.85 - index * baseOffset;
  const offsetEnd = 0.15 - index * baseOffset;
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: [`start ${Math.max(0.15, offsetStart)}`, `start ${Math.max(0, offsetEnd)}`],
  });

  const theme = cardThemes[4];
  const Icon = scope.icon;

  // --- Consistent transform ranges for all cards
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6, 1], [80, 20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.9], [0, 0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);

  // State for icon press
  const [isIconPressed, setIsIconPressed] = useState(false);
  // State for spinning animation (spins only while pressed)
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: typeof window !== "undefined" && window.innerWidth < 768 ? 0.2 : 0.5 }}
      transition={{
        duration: 0.9,
        ease: [0.33, 1, 0.68, 1]
      }}
      style={isMobile ? { minHeight: dataMeasure ? undefined : 520, height: fixedHeight ? `${fixedHeight}px` : undefined } : {
        position: 'sticky',
        top: `calc(80px + ${index * 16}px)`,
        marginBottom: index === total - 1 ? '0' : '1rem',
        transformOrigin: 'center top',
      }}
      className="relative overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
      data-card-measure={dataMeasure ? 'true' : undefined}
    >
      {/* Gradient Background */}
      {isMobile ? (
        <div className="absolute inset-0" style={{ background: theme.bg }} />
      ) : (
        <div className="absolute inset-0" style={{ background: theme.bg }} />
      )}

      {/* Background dots texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '10px 10px',
          opacity: 0.03,
          zIndex: 1,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-stretch gap-8">
        {/* Left Content Section */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          {/* Header Section */}
          <div className="space-y-8">
            {/* Number Badge */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
              whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
              animate={isMobile ? { opacity: 1 } : undefined}
              viewport={isMobile ? undefined : { once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: `${theme.accent}26`, // 15% opacity
                  border: `1px solid ${theme.border}`,
                  boxShadow: `inset 0 0 6px ${theme.accent}40`,
                }}
              >
                <span
                  className="font-['Playfair_Display'] font-extrabold"
                  style={{ fontSize: '1.8rem', color: '#FFFFFF', letterSpacing: '0.02em' }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: theme.border }} />
            </motion.div>

            {/* Content fades and slides on mobile (title, subtitle, description, tags) */}
            {isMobile ? (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: direction > 0 ? 30 : -30, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction > 0 ? -30 : 30, scale: 0.97 }}
                  transition={{
                    type: 'tween',
                    ease: [0.33, 1, 0.68, 1],
                    duration: 0.22,
                  }}
                >
                  {/* Title Group */}
                  <div className="space-y-2">
                    <div>
                      <h3
                        className="font-['Playfair_Display'] font-extrabold leading-tight"
                        style={{
                          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                          color: "#FFFFFF",
                          letterSpacing: "0.02em",
                          marginBottom: '0.75rem'
                        }}
                      >
                        <LanguageSwitchBoundary as="span" lang={lang}>
                          {scope.title}
                        </LanguageSwitchBoundary>
                      </h3>
                      <p
                        className="font-['Playfair_Display'] font-semibold tracking-widest uppercase"
                        style={{
                          fontSize: "clamp(0.625rem, 1.5vw, 0.75rem)",
                          color: theme.accentDark,
                          fontWeight: 600,
                          fontVariant: 'small-caps',
                          letterSpacing: '0.15em',
                          marginTop: '-0.25rem',
                        }}
                      >
                        <LanguageSwitchBoundary as="span" lang={lang}>
                          {scope.subtitle}
                        </LanguageSwitchBoundary>
                      </p>
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "clamp(0.875rem, 2vw, 1rem)",
                        lineHeight: 1.9,
                        color: "rgba(255, 255, 255, 0.85)",
                        marginTop: '1rem',
                      }}
                    >
                      <LanguageSwitchBoundary as="span" lang={lang}>
                        {scope.description}
                      </LanguageSwitchBoundary>
                    </p>
                  </div>

                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    {scope.features.map((feature: string, i: number) => (
                      <div
                        key={i}
                        className="px-4 py-2 rounded-md text-xs sm:text-sm font-medium shadow-inner"
                        style={{
                          backgroundColor: `rgba(${parseInt(theme.accent.slice(1,3),16)},${parseInt(theme.accent.slice(3,5),16)},${parseInt(theme.accent.slice(5,7),16)},0.15)`,
                          border: `1px solid ${theme.border}`,
                          color: theme.accent,
                          boxShadow: `inset 0 1px 3px rgba(0,0,0,0.1)`,
                        }}
                      >
                        <LanguageSwitchBoundary as="span" lang={lang}>
                          {feature}
                        </LanguageSwitchBoundary>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <>
                {/* Title Group */}
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3
                      className="font-['Playfair_Display'] font-extrabold leading-tight"
                      style={{
                        fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                        color: "#FFFFFF",
                        letterSpacing: "0.02em",
                        marginBottom: '0.75rem'
                      }}
                    >
                      <LanguageSwitchBoundary as="span" lang={lang}>
                        {scope.title}
                      </LanguageSwitchBoundary>
                    </h3>
                    <p
                      className="font-['Playfair_Display'] font-semibold tracking-widest uppercase"
                      style={{
                        fontSize: "clamp(0.625rem, 1.5vw, 0.75rem)",
                        color: theme.accentDark,
                        fontWeight: 600,
                        fontVariant: 'small-caps',
                        letterSpacing: '0.15em',
                        marginTop: '-0.25rem',
                      }}
                    >
                      <LanguageSwitchBoundary as="span" lang={lang}>
                        {scope.subtitle}
                      </LanguageSwitchBoundary>
                    </p>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontSize: "clamp(0.875rem, 2vw, 1rem)",
                      lineHeight: 1.9,
                      color: "rgba(255, 255, 255, 0.85)",
                      marginTop: '1rem',
                    }}
                  >
                    <LanguageSwitchBoundary as="span" lang={lang}>
                      {scope.description}
                    </LanguageSwitchBoundary>
                  </motion.p>
                </div>

                {/* Features Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap gap-3 mt-6"
                >
                  {scope.features.map((feature: string, i: number) => (
                    <div
                      key={i}
                      className="px-4 py-2 rounded-md text-xs sm:text-sm font-medium shadow-inner"
                      style={{
                        backgroundColor: `rgba(${parseInt(theme.accent.slice(1,3),16)},${parseInt(theme.accent.slice(3,5),16)},${parseInt(theme.accent.slice(5,7),16)},0.15)`,
                        border: `1px solid ${theme.border}`,
                        
                        color: theme.accent,
                        boxShadow: `inset 0 1px 3px rgba(0,0,0,0.1)`,
                      }}
                    >
                      <LanguageSwitchBoundary as="span" lang={lang}>
                        {feature}
                      </LanguageSwitchBoundary>
                    </div>
                  ))}
                </motion.div>
              </>
            )}
          </div>

          {/* Bottom Section */}
          <div className="mt-8 flex items-center justify-between">
            {/* Pagination Dots */}
            <div className="flex gap-2">
              {Array.from({ length: total }).map((_, i) => (
                <motion.span
                  key={i}
                  className="rounded-full"
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: i === index ? theme.accent : `rgba(255,255,255,0.2)`,
                  }}
                  animate={{
                    backgroundColor: i === index ? theme.accent : `rgba(255,255,255,0.2)`,
                    scale: i === index ? 1.2 : 1,
                    opacity: i === index ? 1 : 0.6,
                  }}
                  transition={{
                    type: 'tween',
                    duration: 0.3,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                />
              ))}
            </div>

            {/* Learn More Link */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              whileHover={{ 
                x: 4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm font-semibold font-['Playfair_Display'] uppercase tracking-wider cursor-pointer select-none group"
              style={{ color: theme.accent, letterSpacing: '0.15em' }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>
                <LanguageSwitchBoundary as="span" lang={lang}>
                  {lang === 'ja' ? 'お問い合わせ' : lang === 'zh' ? '联系我们' : 'CONTACT'}
                </LanguageSwitchBoundary>
              </span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Right Icon Section */}
        <div
          className="relative md:border-l flex items-center justify-center md:w-[320px] min-h-[260px]"
          style={{
            borderLeft: `1.5px solid ${theme.border}`,
            borderTop: 'none',
            borderBottom: 'none'
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${theme.iconBg} 0%, transparent 100%)`,
              opacity: 0.5
            }}
          />
          
          <div className="relative h-full w-full flex flex-col items-center justify-center p-8 lg:p-10">
            <div className="relative flex items-center justify-center gap-6">
              {/* Mobile Navigation Buttons - Only visible on mobile */}
              {isMobile && (
                <>
                  {/* Sleek Glassmorphism Left Arrow Button */}
                  <motion.button
                    onClick={onPrevious}
                    className="relative flex items-center justify-center w-16 h-16 rounded-full backdrop-blur-md"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: `1.5px solid ${theme.border}`,
                      boxShadow: '0 4px 16px 0 rgba(0,0,0,0.13)',
                    }}
                    whileHover={{
                      scale: 1.09,
                      boxShadow: `0 0 28px ${theme.accent}88, 0 4px 16px 0 rgba(0,0,0,0.13)`,
                      filter: 'brightness(1.09)',
                    }}
                    whileTap={{ scale: 0.91 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    aria-label="Previous business scope"
                  >
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        boxShadow: `0 0 0 0 ${theme.accent}22, 0 0 18px 0 ${theme.accent}44 inset`,
                        transition: 'box-shadow 0.2s',
                        zIndex: 0,
                      }}
                    />
                    <ChevronLeft size={30} strokeWidth={2.5} color={theme.accent} style={{ zIndex: 1 }} />
                  </motion.button>

                  {/* Icon + spinning frame (mobile) — match desktop press effect */}
                  <div
                    className="relative flex items-center justify-center"
                    style={{ width: '140px', height: '140px' }}
                  >
                    {/* Rotating background frame (mobile) — slightly smaller than container */}
                    <motion.div
                      style={{
                        borderRadius: '12px',
                        width: '128px',
                        height: '128px',
                        border: `1px solid ${theme.border}`,
                        backdropFilter: 'blur(20px)',
                        position: 'absolute',
                        zIndex: 0,
                      }}
                      animate={{
                        rotate: isSpinning ? 360 : 0,
                        background: isIconPressed
                          ? `radial-gradient(circle at center, ${theme.accent}50 0%, transparent 80%)`
                          : `radial-gradient(circle at center, ${theme.accent}20 0%, transparent 70%)`,
                        boxShadow: isIconPressed
                          ? `0 0 30px ${theme.accent}80, 0 0 60px ${theme.accent}40`
                          : `0 0 20px ${theme.accent}40`,
                        scale: isIconPressed ? 1.05 : 1,
                      }}
                      transition={{
                        rotate: { duration: 0.6, ease: 'easeInOut' },
                        background: { type: 'spring', stiffness: 250, damping: 20 },
                        boxShadow: { type: 'spring', stiffness: 250, damping: 20 },
                        scale: { type: 'spring', stiffness: 250, damping: 20 },
                      }}
                    />
                    {/* Foreground icon — swipe horizontally per direction on slide change */}
                  <motion.div
                    className="relative flex items-center justify-center cursor-pointer select-none"
                    style={{ zIndex: 1, borderRadius: '12px', width: '140px', height: '140px' }}
                    onPointerDown={() => {
                      setIsIconPressed(true);
                      setIsSpinning(true);
                    }}
                    onPointerUp={() => {
                      setIsIconPressed(false);
                      setIsSpinning(false);
                    }}
                    onPointerCancel={() => {
                      setIsIconPressed(false);
                      setIsSpinning(false);
                    }}
                    onPointerLeave={() => {
                      setIsIconPressed(false);
                      setIsSpinning(false);
                    }}
                    animate={{ scale: [0.97, 1] }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <AnimatePresence initial={false} mode="popLayout">
                      <motion.div
                        key={index}
                        custom={direction}
                        initial={{
                          x: direction > 0 ? 40 : -40,
                          opacity: 0,
                          scale: 0.98,
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          x: direction > 0 ? -40 : 40,
                          opacity: 0,
                          scale: 0.98,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 280,
                          damping: 22,
                          mass: 0.8,
                        }}
                        whileTap={{
                          scale: 0.85,
                          rotate: 10,
                          transition: { type: 'spring', stiffness: 400, damping: 10 },
                        }}
                        whileHover={{
                          scale: 1.05,
                          transition: { type: 'spring', stiffness: 300, damping: 15 },
                        }}
                      >
                        <Icon size={56} strokeWidth={1.5} color={theme.accent} style={{ opacity: 0.9 }} />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                  </div>

                  {/* Sleek Glassmorphism Right Arrow Button */}
                  <motion.button
                    onClick={onNext}
                    className="relative flex items-center justify-center w-16 h-16 rounded-full backdrop-blur-md"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: `1.5px solid ${theme.border}`,
                      boxShadow: '0 4px 16px 0 rgba(0,0,0,0.13)',
                    }}
                    whileHover={{
                      scale: 1.09,
                      boxShadow: `0 0 28px ${theme.accent}88, 0 4px 16px 0 rgba(0,0,0,0.13)`,
                      filter: 'brightness(1.09)',
                    }}
                    whileTap={{ scale: 0.91 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    aria-label="Next business scope"
                  >
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        boxShadow: `0 0 0 0 ${theme.accent}22, 0 0 18px 0 ${theme.accent}44 inset`,
                        transition: 'box-shadow 0.2s',
                        zIndex: 0,
                      }}
                    />
                    <ChevronRight size={30} strokeWidth={2.5} color={theme.accent} style={{ zIndex: 1 }} />
                  </motion.button>
                </>
              )}

              {/* Desktop Icon - Only visible on desktop */}
              {!isMobile && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Rotating background frame (desktop) — slightly smaller than container */}
                  <motion.div
                    style={{
                      borderRadius: '12px',
                      width: 'calc(clamp(120px, 20vw, 160px) - 12px)',
                      height: 'calc(clamp(120px, 20vw, 160px) - 12px)',
                      border: `1px solid ${theme.border}`,
                      backdropFilter: 'blur(20px)',
                      position: 'absolute',
                      zIndex: 0,
                    }}
                    animate={{
                      rotate: isSpinning ? 360 : 0,
                      background: isIconPressed
                        ? `radial-gradient(circle at center, ${theme.accent}50 0%, transparent 80%)`
                        : `radial-gradient(circle at center, ${theme.accent}20 0%, transparent 70%)`,
                      boxShadow: isIconPressed
                        ? `0 0 30px ${theme.accent}80, 0 0 60px ${theme.accent}40`
                        : `0 0 20px ${theme.accent}40`,
                      scale: isIconPressed ? 1.05 : 1,
                    }}
                    transition={{
                      rotate: { duration: 0.6, ease: 'easeInOut' },
                      background: { type: 'spring', stiffness: 250, damping: 20 },
                      boxShadow: { type: 'spring', stiffness: 250, damping: 20 },
                      scale: { type: 'spring', stiffness: 250, damping: 20 },
                    }}
                  />
                  {/* Icon sits above the rotating frame, does NOT spin */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-center justify-center"
                    style={{
                      borderRadius: '12px',
                      width: 'clamp(120px, 20vw, 160px)',
                      height: 'clamp(120px, 20vw, 160px)',
                      // No border, background, or boxShadow here, just the icon
                      zIndex: 1,
                    }}
                  >
                    <motion.div
                      whileTap={{
                        scale: 0.85,
                        rotate: 10,
                        transition: { type: 'spring', stiffness: 400, damping: 10 },
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                      }}
                      className="cursor-pointer select-none"
                      onPointerDown={() => {
                        setIsIconPressed(true);
                        setIsSpinning(true);
                      }}
                      onPointerUp={() => {
                        setIsIconPressed(false);
                        setIsSpinning(false);
                      }}
                      onPointerCancel={() => {
                        setIsIconPressed(false);
                        setIsSpinning(false);
                      }}
                      onPointerLeave={() => {
                        setIsIconPressed(false);
                        setIsSpinning(false);
                      }}
                    >
                      <Icon
                        size={typeof window !== 'undefined' && window.innerWidth < 640 ? 48 : 64}
                        strokeWidth={1.5}
                        color={theme.accent}
                        style={{ opacity: 0.9 }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </div>
            
            {/* Decorative Dot - top right */}
            <motion.div
              className="absolute top-6 right-6 w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.accent }}
              animate={{
                opacity: isIconPressed ? 1 : 0.4,
                scale: isIconPressed ? 1.6 : 1,
                boxShadow: isIconPressed ? `0 0 10px ${theme.accent}` : "none"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BusinessScope({ lang = 'en' }: BusinessScopeProps) {
  const containerRef = useRef(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for previous, +1 for next
  const [fixedHeight, setFixedHeight] = useState<number | undefined>(undefined);

  const totalSlides = scopes[lang].length;

  const handlePrevious = () => {
    setPrevSlide(currentSlide);
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setPrevSlide(currentSlide);
    setDirection(1);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Measure tallest mobile card off-screen and lock height to avoid jank
  useEffect(() => {
    const measure = () => {
      if (typeof window === 'undefined') return;
      // Only measure on mobile widths
      if (window.innerWidth >= 768) {
        setFixedHeight(undefined);
        return;
      }
      if (!measureRef.current) return;
      const nodes = measureRef.current.querySelectorAll('[data-card-measure="true"]');
      let maxH = 0;
      nodes.forEach((node) => {
        const el = node as HTMLElement;
        // Use offsetHeight to include borders/padding
        const h = el.offsetHeight;
        if (h > maxH) maxH = h;
      });
      if (maxH > 0) setFixedHeight(maxH);
    };

    // Initial measure (fonts may affect size; re-measure shortly after)
    measure();
    const id = window.setTimeout(measure, 200);

    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    // Re-measure when fonts finish loading (if supported)
    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      window.clearTimeout(id);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [lang]);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });

  return (
    <section
      id="business"
      ref={containerRef}
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#F5EDE3' }}
      lang={lang}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <LanguageSwitchBoundary lang={lang}>
            <div className="font-['Roboto_Mono'] uppercase tracking-widest mb-4" style={{ fontSize: '0.875rem', color: '#5A1F1F' }}>
              {titles[lang].subtitle}
            </div>
            <h2 className="font-['Playfair_Display']" style={{ fontSize: '2.5rem', fontWeight: 600, color: '#1E1E1E' }}>
              {titles[lang].main}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-[2px] bg-[#5A1F1F] mx-auto mt-6 mb-20"
              style={{ width: '80px', transformOrigin: 'center' }}
            />
          </LanguageSwitchBoundary>
        </motion.div>

        {/* Desktop Version - Sticky Scroll */}
        <div className="desktop-version relative">
          {scopes[lang].map((scope, index) => (
            <StickyCard
              key={index}
              scope={scope}
              index={index}
              total={scopes[lang].length}
              lang={lang}
              isMobile={false}
            />
          ))}
        </div>

        {/* Mobile Version - Stationary Card with internal transitions */}
        <div className="mobile-version relative">
          <div className="px-1">
            <StickyCard
              scope={scopes[lang][currentSlide]}
              index={currentSlide}
              total={scopes[lang].length}
              lang={lang}
              isMobile={true}
              onPrevious={handlePrevious}
              onNext={handleNext}
              isFirst={currentSlide === 0}
              isLast={currentSlide === totalSlides - 1}
              direction={direction}
              fixedHeight={fixedHeight}
            />
          </div>
        </div>

        {/* Hidden measurement container to compute max height for mobile */}
        <div
          ref={measureRef}
          aria-hidden="true"
          className="pointer-events-none"
          style={{ position: 'absolute', left: 0, top: 0, opacity: 0, width: '100%' }}
        >
          <div className="mobile-version relative">
            <div className="px-1">
              {scopes[lang].map((scope, index) => (
                <StickyCard
                  key={`measure-${index}`}
                  scope={scope}
                  index={index}
                  total={scopes[lang].length}
                  lang={lang}
                  isMobile={true}
                  dataMeasure={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

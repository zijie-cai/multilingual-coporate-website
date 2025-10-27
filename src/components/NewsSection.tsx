import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import LanguageSwitchBoundary from './LanguageSwitchBoundary';

interface NewsSectionProps {
  lang: 'en' | 'ja' | 'zh';
}

const news = {
  en: [
    { date: "2024-10-12", title: "ISO9001 & ISO14001 Certification Update Announcement", category: "Certification" },
    { date: "2024-09-15", title: "New Optical Glass Product Mass Production Release", category: "Product Launch" },
    { date: "2024-08-20", title: "Shanghai Optics Exhibition 2024 Participation Information", category: "Event" }
  ],
  ja: [
    { date: "2024-10-12", title: "ISO9001 & ISO14001認証更新のお知らせ", category: "認証" },
    { date: "2024-09-15", title: "新型光学ガラス製品量産開始のお知らせ", category: "製品発表" },
    { date: "2024-08-20", title: "2024年上海光電展参展情報", category: "イベント" }
  ],
  zh: [
    { date: "2024-10-12", title: "ISO9001 & ISO14001认证更新公告", category: "认证" },
    { date: "2024-09-15", title: "新型光学玻璃产品量产发布", category: "产品发布" },
    { date: "2024-08-20", title: "2024年上海光电展参展信息", category: "展会" }
  ]
};

const titles = {
  en: { main: "News Center", subtitle: "LATEST UPDATES" },
  ja: { main: "ニュースセンター", subtitle: "最新情報" },
  zh: { main: "新闻中心", subtitle: "最新动态" }
};

function NewsCard({ item, index, lang }: { item: any; index: number; lang: string }) {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, amount: 0.2, margin: "0px 0px -100px 0px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  
  const isActive = isHovered || isTouched;

  return (
    <motion.div
      ref={cardRef}
      initial={{ 
        opacity: 0, 
        y: 40,
        scale: 0.96
      }}
      animate={isCardInView ? { 
        opacity: 1, 
        y: 0,
        scale: 1
      } : {
        opacity: 0, 
        y: 40,
        scale: 0.96
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsClicked(false);
      }}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsTouched(false), 300);
      }}
      className="relative p-8 rounded-2xl cursor-pointer overflow-hidden"
      style={{ 
        backgroundColor: '#F5EDE3',
        transform: isClicked 
          ? 'translateY(-4px) scale(0.98)' 
          : isActive 
            ? 'translateY(-8px)' 
            : 'translateY(0)',
        boxShadow: isActive
          ? '0 24px 48px rgba(90, 31, 31, 0.14), 0 12px 24px rgba(90, 31, 31, 0.1)' 
          : '0 2px 8px rgba(0, 0, 0, 0.04)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased'
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          background: 'radial-gradient(circle at top right, rgba(90, 31, 31, 0.05), transparent 70%)'
        }}
      />

      <div className="relative flex flex-col md:flex-row md:items-center gap-6">
        {/* Date Section with staggered animation */}
        <motion.div 
          className="flex items-center gap-3 md:w-52 flex-shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={isCardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{
            duration: 0.5,
            delay: index * 0.12 + 0.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.div 
            className="flex items-center justify-center rounded-full"
            animate={{
              backgroundColor: isActive ? '#E8DFD4' : '#EFE9E1',
              scale: isActive ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
            style={{ 
              width: '2rem',
              height: '2rem'
            }}
          >
            <Calendar 
              size={18} 
              style={{ color: '#5A1F1F' }} 
            />
          </motion.div>
          <motion.span 
            className="font-['Roboto_Mono']" 
            animate={{
              color: isActive ? '#5A1F1F' : '#59514B'
            }}
            transition={{ duration: 0.3 }}
            style={{ 
              fontSize: '0.875rem', 
              letterSpacing: '0.05em'
            }}
          >
            {item.date}
          </motion.span>
        </motion.div>
        
        {/* Content Section with staggered animation */}
        <motion.div 
          className="flex-1 min-w-0"
          initial={{ opacity: 0, x: 20 }}
          animate={isCardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{
            duration: 0.5,
            delay: index * 0.12 + 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <motion.span 
              className="inline-flex items-center px-3 py-2 rounded-full"
              animate={{
                backgroundColor: isActive 
                  ? 'rgba(90, 31, 31, 0.14)' 
                  : 'rgba(90, 31, 31, 0.08)'
              }}
              transition={{ duration: 0.3 }}
              style={{ 
                fontSize: '0.75rem', 
                color: '#5A1F1F',
                fontWeight: 500,
                letterSpacing: '0.05em'
              }}
            >
              <LanguageSwitchBoundary as="span" lang={lang}>
                {item.category}
              </LanguageSwitchBoundary>
            </motion.span>
            
            {/* Arrow with smooth rotation */}
            <motion.div 
              className="flex items-center justify-center rounded-full flex-shrink-0"
              animate={{
                backgroundColor: isActive ? '#5A1F1F' : 'rgba(90, 31, 31, 0.06)',
                scale: isActive ? 1.1 : 1
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                width: '2rem',
                height: '2rem'
              }}
            >
              <motion.div
                animate={{
                  rotate: isActive ? 45 : 0
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ArrowUpRight 
                  size={20} 
                  style={{ 
                    color: isActive ? '#EFE9E1' : '#59514B'
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
          <motion.h3 
            className="leading-tight"
            animate={{
              color: isActive ? '#5A1F1F' : '#1E1E1E'
            }}
            transition={{ duration: 0.3 }}
            style={{ 
              fontWeight: 600, 
              fontSize: '1.125rem'
            }}
          >
            <LanguageSwitchBoundary as="span" lang={lang}>
              {item.title}
            </LanguageSwitchBoundary>
          </motion.h3>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function NewsSection({ lang = 'en' }: NewsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="news"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#EFE9E1' }}
      lang={lang}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <LanguageSwitchBoundary lang={lang}>
            <motion.div 
              className="font-['Roboto_Mono'] uppercase tracking-widest mb-4" 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontSize: '0.875rem', color: '#5A1F1F' }}
            >
              {titles[lang].subtitle}
            </motion.div>
            <motion.h2 
              className="font-['Playfair_Display']" 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: '2.5rem', fontWeight: 600, color: '#1E1E1E' }}
            >
              {titles[lang].main}
            </motion.h2>
          </LanguageSwitchBoundary>
          <motion.div
            key={`accent-${lang}`}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-[2px] bg-[#5A1F1F] mx-auto mt-6"
            style={{ width: '80px', transformOrigin: 'center' }}
          />
        </motion.div>

        <div className="space-y-6">
          {news[lang].map((item, index) => (
            <NewsCard key={index} item={item} index={index} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

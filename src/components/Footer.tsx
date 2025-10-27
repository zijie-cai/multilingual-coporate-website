import { motion } from 'motion/react';
import LanguageSwitchBoundary from './LanguageSwitchBoundary';

interface FooterProps {
  lang: 'en' | 'ja' | 'zh';
}

type BusinessHoursRange = {
  start: string;
  end: string;
};

type BusinessHoursEntry = {
  dayKey: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  label: string;
  ranges: BusinessHoursRange[];
  remark?: string;
};

type BusinessHoursContent = {
  sectionTitle: string;
  summary: string;
  statusLabels: {
    current: string;
    open: string;
    closed: string;
    weekend: string;
    next: string;
  };
  closedLabel: string;
  schedule: BusinessHoursEntry[];
  timezoneLabel: string;
  timezoneValue: string;
  note: string;
  action: {
    label: string;
    description: string;
    href: string;
  };
  contactTitle: string;
  contacts: { label: string; value: string; href: string }[];
};

type FooterContent = {
  company: string;
  tagline: string;
  description: string;
  businessHours: string;
  quickLinks: string;
  links: { label: string; target: string }[];
  copyright: string;
};

const content: Record<FooterProps['lang'], FooterContent> = {
  en: {
    company: "Ichiboku Co., Ltd.",
    tagline: "Connecting Through Precision and Integrity.",
    description: "Ichiboku Co., Ltd. embodies precision and integrity, advancing manufacturing in electronics, optics, and mechanics—integrating Japanese quality, Chinese efficiency, and global innovation.",
    businessHours: "Business Hours: Mon–Fri, 9:00–18:00 JST",
    quickLinks: "Quick Links",
    links: [
      { label: 'Home', target: 'hero' },
      { label: 'About', target: 'about' },
      { label: 'Products', target: 'products' },
      { label: 'Contact', target: 'contact' },
      { label: 'Facilities', target: 'facilities' },
      { label: 'Partners', target: 'partners' },
      { label: 'Business', target: 'business' },
      { label: 'News', target: 'news' },
      { label: 'History', target: 'history' }
    ],
    copyright: "© 2025 Ichiboku Co., Ltd. All rights reserved."
  },
  ja: {
    company: "株式会社 一木",
    tagline: "誠実と精密で、つながりを創造する。",
    description: "株式会社一木は、精密なものづくりと誠実な姿勢を大切にしています。電子、光学、精密機械分野の先端製造ソリューションを通じて、日本の品質、中国の効率、そして世界の革新をつなぎます。",
    businessHours: "営業時間: 平日 9:00〜18:00",
    quickLinks: "クイックリンク",
    links: [
      { label: 'ホーム', target: 'hero' },
      { label: '会社概要', target: 'about' },
      { label: '製品', target: 'products' },
      { label: 'お問い合わせ', target: 'contact' },
      { label: '工場設備', target: 'facilities' },
      { label: 'パートナー', target: 'partners' },
      { label: '経営範囲', target: 'business' },
      { label: 'ニュース', target: 'news' },
      { label: '沿革', target: 'history' }
    ],
    copyright: "© 2025 株式会社 一木 All rights reserved."
  },
  zh: {
    company: "一木株式会社",
    tagline: "以诚信与精密，创造连接。",
    description: "一木株式会社秉持精密制造与诚信精神，专注于电子、光学和精密机械领域的先进制造解决方案，融合日本品质、中国效率与全球创新。",
    businessHours: "营业时间: 周一至周五 9:00–18:00（日本时间）",
    quickLinks: "快速链接",
    links: [
      { label: '首页', target: 'hero' },
      { label: '公司简介', target: 'about' },
      { label: '产品中心', target: 'products' },
      { label: '联系我们', target: 'contact' },
      { label: '厂房设备', target: 'facilities' },
      { label: '合作伙伴', target: 'partners' },
      { label: '经营范围', target: 'business' },
      { label: '新闻中心', target: 'news' },
      { label: '公司历程', target: 'history' }
    ],
    copyright: "© 2025 一木株式会社 版权所有"
  }
};

const viewportConfig = { once: true, amount: 0.35 } as const;

// Unified animation settings
const STAGGER_CHILDREN = 0.13;
const DURATION = 0.48;
const EASE = 'easeInOut';

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: 0.13,
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98, rotateX: 3 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: DURATION, ease: EASE }
  }
};

const linksContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08
    }
  }
};

const linkItemVariants = {
  hidden: { opacity: 0, x: 12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION, ease: EASE }
  }
};

const statusDetailVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 0.85,
    y: 0,
    transition: { duration: 0.45, ease: EASE }
  }
};

const hoursContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06
    }
  }
};

const hourRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE }
  }
};

const ctaVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.53, ease: EASE }
  }
};

const shimmerVariants = {
  initial: { x: '-35%', opacity: 0 },
  animate: {
    x: ['-35%', '130%'],
    opacity: [0, 0.5, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
  }
};

function getJapanTime(): Date {
  // Get current time in Asia/Tokyo timezone
  const now = new Date();
  const tokyoString = now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });
  return new Date(tokyoString);
}

function formatTimeDiff(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
}

function isOpenAt(date: Date): boolean {
  const day = date.getDay(); // 0=Sun, 1=Mon,...6=Sat
  const hour = date.getHours();
  return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
}

function getNextStatusChange(date: Date): Date {
  const day = date.getDay();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ms = date.getMilliseconds();

  // Clone date without ms for calculations
  const base = new Date(date.getTime() - ms - seconds * 1000);

  if (day >= 1 && day <= 5) {
    // Weekday
    if (hour < 9) {
      // Before open today
      base.setHours(9, 0, 0, 0);
      return base;
    } else if (hour >= 9 && hour < 18) {
      // During open hours, next change is close at 18:00
      base.setHours(18, 0, 0, 0);
      return base;
    } else {
      // After close today, next open is tomorrow 9:00
      let nextDay = new Date(base);
      nextDay.setDate(nextDay.getDate() + 1);
      let nextDayNum = nextDay.getDay();
      // If next day is weekend, skip to Monday
      if (nextDayNum === 6) {
        // Saturday -> Monday
        nextDay.setDate(nextDay.getDate() + 2);
      } else if (nextDayNum === 0) {
        // Sunday -> Monday
        nextDay.setDate(nextDay.getDate() + 1);
      }
      nextDay.setHours(9, 0, 0, 0);
      return nextDay;
    }
  } else {
    // Weekend: closed
    // Next open is Monday 9:00
    let nextOpen = new Date(base);
    const daysToMonday = (8 - day) % 7;
    nextOpen.setDate(nextOpen.getDate() + daysToMonday);
    nextOpen.setHours(9, 0, 0, 0);
    return nextOpen;
  }
}

export default function Footer({ lang }: FooterProps) {
  const locale = content[lang];

  const scrollToSection = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const now = getJapanTime();
  const open = isOpenAt(now);
  const nextChange = getNextStatusChange(now);
  const diffMs = nextChange.getTime() - now.getTime();
  const timeStr = formatTimeDiff(diffMs);

  const statusText = open
    ? lang === 'en'
      ? 'Open Now'
      : lang === 'ja'
      ? '営業中'
      : '营业中'
    : lang === 'en'
    ? `Closed – Opens in ${timeStr}`
    : lang === 'ja'
    ? `閉店中 – ${timeStr}後に開店`
    : `关闭 – ${timeStr}后开门`;

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const dayLabels = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ja: ['日', '月', '火', '水', '木', '金', '土'],
    zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  } as const;

  const dayLabel = dayLabels[lang][nextChange.getDay()];
  const nextChangeTime = nextChange.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Tokyo'
  });

  const nextChangeText =
    lang === 'en'
      ? `Next update: ${dayLabel} ${nextChangeTime} JST`
      : lang === 'ja'
      ? `次の切り替え: ${dayLabel}曜 ${nextChangeTime} JST`
      : `下次状态更新：${dayLabel} ${nextChangeTime} JST`;

  const statusBadgeStyles = open
    ? {
        background: 'rgba(196, 164, 116, 0.18)',
        border: '1px solid rgba(196, 164, 116, 0.45)'
      }
    : {
        background: 'rgba(196, 164, 116, 0.08)',
        border: '1px solid rgba(196, 164, 116, 0.25)'
      };

  const backToTopLabel =
    lang === 'en'
      ? 'Back to top'
      : lang === 'ja'
      ? 'ページ上部へ'
      : '回到顶部';

  return (
    <footer
      className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #3A1F1F 0%, #221111 100%)',
        color: '#F6F1E8'
      }}
      lang={lang}
    >
      {/* Animated Gold Accent Bars */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.7 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.53, ease: EASE }}
        className="absolute inset-x-0 top-0 h-[3px] origin-left"
        style={{
          background: 'linear-gradient(90deg, transparent, #C4A474 20%, #C4A474 80%, transparent)'
        }}
      />
      <motion.div
        initial={{ opacity: 0, scaleX: 0.7 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.53, ease: EASE }}
        className="absolute inset-x-0 bottom-0 h-[3px] origin-right"
        style={{
          background: 'linear-gradient(90deg, transparent, #C4A474 20%, #C4A474 80%, transparent)'
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.15] z-0"
        style={{
          backgroundImage: "url('/src/topo-1.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        <motion.div
          className="footer-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div
            className="footer-section space-y-5"
            variants={sectionVariants}
          >
            {/* Company Name */}
            <h3
              className="font-['Playfair_Display'] tracking-wide"
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                color: '#F6F1E8',
                letterSpacing: '0.02em',
                transform: 'translateY(-8px)',
                display: 'inline-block', // prevents affecting spacing of surrounding elements
              }}
            >
              <LanguageSwitchBoundary as="span" lang={lang}>
                {locale.company}
              </LanguageSwitchBoundary>
            </h3>

            {/* Gold Accent Line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{
                width: '3.5rem',
                maxWidth: '3.5rem',
                minWidth: '3.5rem',
                height: '1px',
                minHeight: '1px',
                maxHeight: '1px',
                background: 'linear-gradient(90deg, #C4A474 0%, #E2C78D 100%)',
                marginTop: '0.5rem',
                marginBottom: '1rem',
                opacity: 0.9,
                borderRadius: '9999px',
                transform: 'translateZ(0)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{
                fontSize: '1rem',
                color: '#C4A474',
                fontStyle: 'italic',
                letterSpacing: '0.03em',
                marginBottom: '0.25rem',
              }}
            >
              <LanguageSwitchBoundary as="span" lang={lang}>
                {locale.tagline}
              </LanguageSwitchBoundary>
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
              style={{
                fontSize: '0.9rem',
                color: '#EADFD5',
                lineHeight: '1.75',
                maxWidth: '28rem',
              }}
            >
              <LanguageSwitchBoundary as="span" lang={lang}>
                {locale.description}
              </LanguageSwitchBoundary>
            </motion.p>
          </motion.div>

          <motion.div
            className="footer-section md:ml-auto md:text-right"
            variants={sectionVariants}
          >
            <motion.h4
              className="mb-4"
              style={{ fontWeight: 600, color: '#F6F1E8' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: EASE }}
            >
              <LanguageSwitchBoundary as="span" lang={lang}>
                {locale.quickLinks}
              </LanguageSwitchBoundary>
            </motion.h4>
            <motion.div
              className="grid grid-cols-2 gap-x-4 gap-y-4"
              variants={linksContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {locale.links.map(({ label, target }, i) => (
                <motion.button
                  key={target}
                  type="button"
                  onClick={() => scrollToSection(target)}
                  className="text-left bg-transparent border-none transition-colors duration-300 mb-3"
                  style={{ fontSize: '0.875rem', color: '#F6F1E8' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#C4A474';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#F6F1E8';
                  }}
                  variants={linkItemVariants}
                >
                  <LanguageSwitchBoundary as="span" lang={lang}>
                    {label}
                  </LanguageSwitchBoundary>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="footer-section md:ml-auto text-left md:text-right"
            variants={sectionVariants}
          >
            <motion.h4
              className="mb-4"
              style={{ fontWeight: 600, color: '#F6F1E8' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: EASE }}
            >
              <LanguageSwitchBoundary as="span" lang={lang}>
                {lang === 'en'
                  ? 'Business Hours'
                  : lang === 'ja'
                  ? '営業時間'
                  : '营业时间'}
              </LanguageSwitchBoundary>
            </motion.h4>
            <motion.div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.44, ease: EASE }}
            >
              <motion.span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  backgroundColor: open ? '#6FCF97' : '#C4A474'
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span style={{ fontSize: '0.9rem', color: '#C4A474', fontWeight: 600 }}>
                <LanguageSwitchBoundary as="span" lang={lang}>
                  {statusText}
                </LanguageSwitchBoundary>
              </span>
            </motion.div>
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: '0.9rem',
                color: '#EDE8E3',
                marginTop: '0.75rem',
                lineHeight: '1.5',
                gap: '0.35rem'
              }}
              variants={hoursContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                style={{ display: 'flex', justifyContent: 'space-between', width: '60%' }}
                variants={hourRowVariants}
              >
                <span style={{ opacity: 0.9 }}>
                  <LanguageSwitchBoundary as="span" lang={lang}>
                    {lang === 'en' ? 'Mon–Fri' : lang === 'ja' ? '月〜金' : '周一至周五'}
                  </LanguageSwitchBoundary>
                </span>
                <span style={{ fontWeight: 500, color: '#FFFFFF' }}>9:00–18:00 JST</span>
              </motion.div>
              <motion.div
                style={{ display: 'flex', justifyContent: 'space-between', width: '60%' }}
                variants={hourRowVariants}
              >
                <span style={{ opacity: 0.9 }}>
                  <LanguageSwitchBoundary as="span" lang={lang}>
                    {lang === 'en' ? 'Sat–Sun' : lang === 'ja' ? '土・日' : '周六至周日'}
                  </LanguageSwitchBoundary>
                </span>
                <span style={{ fontWeight: 500, color: '#FFFFFF' }}>
                  <LanguageSwitchBoundary as="span" lang={lang}>
                    {lang === 'en' ? 'By appointment only' : lang === 'ja' ? '予約制' : '预约制'}
                  </LanguageSwitchBoundary>
                </span>
              </motion.div>
            </motion.div>
            <motion.a
              href="mailto:info@ichiboku.co.jp?subject=Appointment%20Request&body=Hello%20Ichiboku%20Team,%0D%0A%0D%0AI’d%20like%20to%20schedule%20an%20appointment.%20Please%20let%20me%20know%20your%20availability.%0D%0A%0D%0AThank%20you!"
              className="inline-block mt-8 px-6 py-3 rounded-[1.75rem] font-medium tracking-wide transition-all duration-300"
              style={{
                background: '#C4A474',
                boxShadow: '0 3px 14px 0px rgba(140,110,60,0.18)',
                fontSize: '0.97rem',
                letterSpacing: '0.035em',
                borderRadius: '1.75rem',
                color: '#FFFFFF',
                textShadow: '0 1px 8px rgba(80,60,20,0.10), 0 0.5px 0 #8B6B2D',
                fontWeight: 600,
                transition: 'box-shadow 0.22s cubic-bezier(0.4,0.2,0.2,1), transform 0.13s cubic-bezier(0.4,0.2,0.2,1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 5px 18px 0px rgba(140,110,60,0.22)';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 3px 14px 0px rgba(140,110,60,0.18)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
            >
              <LanguageSwitchBoundary as="span" lang={lang}>
                {lang === 'en'
                  ? 'Schedule Appointment'
                  : lang === 'ja'
                  ? '予約をする'
                  : '预约'}
              </LanguageSwitchBoundary>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Copyright - seamlessly connect with above */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: EASE } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="pt-8 border-t text-center"
          style={{ borderColor: '#C4A474' }}
        >
          <p style={{ fontSize: '0.875rem' }}>
            <LanguageSwitchBoundary as="span" lang={lang}>
              {locale.copyright}
            </LanguageSwitchBoundary>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

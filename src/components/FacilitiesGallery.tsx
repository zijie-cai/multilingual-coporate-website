import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import LanguageSwitchBoundary from './LanguageSwitchBoundary';
import cncImage from '../partners/cnc.png';
import opticImage from '../partners/optic.png';
import roomImage from '../partners/room.png';
import qualityImage from '../partners/quality.png';
import manuImage from '../partners/manufacture.png';
import grindImage from '../partners/grind.png';

interface FacilitiesGalleryProps {
  lang: 'en' | 'ja' | 'zh';
}

const facilities = [
  {
    image: cncImage,
    titleEN: "CNC Machining Center",
    titleJA: "CNC加工センター",
    titleZH: "CNC加工中心"
  },
  {
    image: opticImage,
    titleEN: "Optical Polishing Equipment",
    titleJA: "光学研磨装置",
    titleZH: "光学抛光设备"
  },
  {
    image: roomImage,
    titleEN: "Clean Room Environment",
    titleJA: "クリーンルーム環境",
    titleZH: "洁净车间环境"
  },
  {
    image: manuImage,
    titleEN: "Advanced Manufacturing Line",
    titleJA: "先進製造ライン",
    titleZH: "先进生产线"
  },
  {
    image: grindImage,
    titleEN: "Precision Grinding Station",
    titleJA: "精密研削ステーション",
    titleZH: "精密研磨工位"
  },
  {
    image: qualityImage,
    titleEN: "Quality Inspection Center",
    titleJA: "品質検査センター",
    titleZH: "质量检测中心"
  }
];

const titles = {
  en: { main: "Facilities", subtitle: "PRECISION AT SCALE" },
  ja: { main: "工場設備", subtitle: "大規模精密製造" },
  zh: { main: "厂房设备", subtitle: "规模化精密制造" }
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: (order: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
      delay: 0.25 + order * 0.08
    }
  }),
  hovered: {}
};

const ACCENT_LINE_VARIANTS = {
  hidden: { width: 0, opacity: 0 },
  visible: { width: 0, opacity: 0.4 },
  hovered: { width: 72, opacity: 1 }
};

const DOT_VARIANTS = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: { scale: 0.5, opacity: 0 },
  hovered: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 320, damping: 20 }
  }
};

const VIEWPORT_OPTIONS = { once: true, amount: 0.35 } as const;

type Facility = (typeof facilities)[number];

interface FacilityCardProps {
  facility: Facility;
  lang: FacilitiesGalleryProps['lang'];
  order: number;
}

function getColumnsForWidth(width: number): number {
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
}

function useResponsiveColumns(): number {
  const [columns, setColumns] = useState(() => {
    if (typeof window === 'undefined') {
      return 1;
    }
    return getColumnsForWidth(window.innerWidth);
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setColumns(getColumnsForWidth(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return columns;
}

function getTopDownOrder(index: number, columns: number, total: number): number {
  if (columns <= 1) {
    return index;
  }

  const rows = Math.ceil(total / columns);
  const columnIndex = index % columns;
  const rowIndex = Math.floor(index / columns);

  return columnIndex * rows + rowIndex;
}

function FacilityCard({ facility, lang, order }: FacilityCardProps) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, VIEWPORT_OPTIONS);
  const [isHovered, setIsHovered] = useState(false);
  const interactiveState = !cardInView ? 'hidden' : isHovered ? 'hovered' : 'visible';

  const title =
    lang === 'en'
      ? facility.titleEN
      : lang === 'ja'
      ? facility.titleJA
      : facility.titleZH;

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl shadow-lg"
      style={{ aspectRatio: '4/3' }}
      variants={CARD_VARIANTS}
      initial="hidden"
      animate={cardInView ? 'visible' : 'hidden'}
      custom={order}
      whileHover="hovered"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -8, filter: 'brightness(1.1)' }}
        whileTap={{ scale: 1, y: 0, filter: 'brightness(1)' }}
        transition={{ type: 'spring', stiffness: 250, damping: 18 }}
        className="w-full h-full"
      >
        <ImageWithFallback
          src={facility.image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: cardInView ? 1 : 0 }}
        whileHover={{ opacity: 1 }}
        whileTap={{ opacity: 0 }}
        transition={{ type: 'spring', stiffness: 250, damping: 18 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <div>
          <h3 className="font-['Playfair_Display']" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F6F4F2' }}>
            <LanguageSwitchBoundary as="span" lang={lang}>
              {title}
            </LanguageSwitchBoundary>
          </h3>
          <motion.div
            className="mt-2 h-[2px] origin-left bg-[#C4A474]"
            variants={ACCENT_LINE_VARIANTS}
            initial="hidden"
            animate={interactiveState}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#C4A474]"
        variants={DOT_VARIANTS}
        initial="hidden"
        animate={interactiveState}
        style={{ boxShadow: '0 0 10px #C4A474' }}
      />
    </motion.div>
  );
}

export default function FacilitiesGallery({ lang }: FacilitiesGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const columns = useResponsiveColumns();
  const totalFacilities = facilities.length;

  return (
    <section
      id="facilities"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#F5EDE3' }}
      lang={lang}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-[2px] bg-[#5A1F1F] mx-auto mt-6"
              style={{ width: '80px', transformOrigin: 'center' }}
            />
          </LanguageSwitchBoundary>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <FacilityCard
              key={index}
              facility={facility}
              lang={lang}
              order={getTopDownOrder(index, columns, totalFacilities)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

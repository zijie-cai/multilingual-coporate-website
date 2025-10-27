import { motion, useInView, useAnimationFrame } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import LanguageSwitchBoundary from './LanguageSwitchBoundary';
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from 'react';

import alnbLogo from '../partners/alnb.png';
import htkLogo from '../partners/htk.png';
import huaxiaLogo from '../partners/huaxia.png';
import jaeLogo from '../partners/jae.png';
import ntkLogo from '../partners/ntk.png';
import panasonicLogo from '../partners/panasonic.png';
import sonyLogo from '../partners/sony.png';
import tesseraLogo from '../partners/tessera.png';
import towaLogo from '../partners/towa.png';
import yiqiLogo from '../partners/yiqi.png';
import yunshengLogo from '../partners/yunsheng.png';

interface PartnersGridProps {
  lang: 'en' | 'ja' | 'zh';
}

interface Partner {
  name: string;
  short: string;
  logo: string;
}

type PauseReason = 'drag' | 'hover' | 'wheel';
type PointerKind = 'mouse' | 'touch' | 'pen' | 'unknown';

const logoStyles: Record<string, { scale: number; maxHeight: string }> = {
  HeaThinker: { scale: 1.6, maxHeight: '13rem' },
  一汽东机工: { scale: 1.4, maxHeight: '13rem' },
  特殊研砥: { scale: 1.3, maxHeight: '13rem' },
  TESSERA: { scale: 1.5, maxHeight: '9rem' },
  Fujikura: { scale: 1.55, maxHeight: '9rem' },
  TOWA: { scale: 1.5, maxHeight: '9rem' },
  default: { scale: 1.1, maxHeight: '9rem' },
};

const partners: Partner[] = [
  { name: "中国华录松下电子信息有限公司", short: "华录松下", logo: panasonicLogo },
  { name: "深圳粤宝电子工业总公司", short: "粤宝电子", logo: huaxiaLogo },
  { name: "宁波阿尔卑斯电子有限公司", short: "阿尔卑斯", logo: alnbLogo },
  { name: "一汽东机工减振器有限公司", short: "一汽东机工", logo: yiqiLogo },
  { name: "宁波韵升光通信技术有限公司", short: "韵升光通信", logo: yunshengLogo },
  { name: "日本特殊研砥株式会社", short: "特殊研砥", logo: ntkLogo },
  { name: "富士航空電子株式会社", short: "Fujikura", logo: jaeLogo },
  { name: "東和電器株式会社", short: "TOWA", logo: towaLogo },
  { name: "Sony Precision Engineering", short: "Sony", logo: sonyLogo },
  { name: "TESSERA (USA)", short: "TESSERA", logo: tesseraLogo },
  { name: "HeaThinker (H.K.)", short: "HeaThinker", logo: htkLogo }
];

const CARD_BACKGROUND = 'transparent';
const CARD_BORDER = '1px solid transparent';

const content = {
  en: {
    title: "Partners",
    subtitle: "GLOBAL COLLABORATION"
  },
  ja: {
    title: "パートナー",
    subtitle: "グローバルコラボレーション"
  },
  zh: {
    title: "合作伙伴",
    subtitle: "全球合作"
  }
};

export default function PartnersGrid({ lang }: PartnersGridProps) {
  // Title section ref and inView
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.01 });

  // Logos marquee ref and inView
  const logosRef = useRef(null);
  const isLogosInView = useInView(logosRef, { once: true, amount: 0.2 });

  const speed = 40; // pixels per second

  const scrollX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef(0);
  const dragStartRef = useRef(0);
  const resumeTimeoutRef = useRef<number | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchActionValue, setTouchActionValue] = useState<'pan-y pinch-zoom' | 'none'>('pan-y pinch-zoom');
  const [showMarquee, setShowMarquee] = useState(false);
  const autoPlayStateRef = useRef(isAutoPlaying);
  const pauseReasonsRef = useRef<Set<PauseReason>>(new Set());
  const pointerTypeRef = useRef<PointerKind>('mouse');
  const activePointerIdRef = useRef<number | null>(null);
  const globalPointerMoveRef = useRef<(event: PointerEvent) => void>();
  const globalPointerUpRef = useRef<(event: PointerEvent) => void>();
  const globalPointerCancelRef = useRef<(event: PointerEvent) => void>();
  const loopWidthRef = useRef(0);
  const gapSizeRef = useRef(0);
  const initializedRef = useRef(false);
  const hasActivatedLoaderRef = useRef(false);

  const setAutoPlay = useCallback((value: boolean) => {
    autoPlayStateRef.current = value;
    setIsAutoPlaying(value);
  }, []);

  const syncAutoPlay = useCallback(() => {
    setAutoPlay(pauseReasonsRef.current.size === 0);
  }, [setAutoPlay]);

  const addPauseReason = useCallback(
    (reason: PauseReason) => {
      if (!pauseReasonsRef.current.has(reason)) {
        pauseReasonsRef.current.add(reason);
        syncAutoPlay();
      }
    },
    [syncAutoPlay]
  );

  const removePauseReason = useCallback(
    (reason: PauseReason) => {
      if (pauseReasonsRef.current.delete(reason)) {
        syncAutoPlay();
      }
    },
    [syncAutoPlay]
  );

  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current !== undefined) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = undefined;
    }
  }, []);

  const cancelWheelPause = useCallback(() => {
    clearResumeTimeout();
    removePauseReason('wheel');
  }, [clearResumeTimeout, removePauseReason]);

  const measureLoopWidth = useCallback(() => {
    const container = containerRef.current;
    if (!container) return loopWidthRef.current;

    const baseWidth = container.scrollWidth / 2;
    if (baseWidth <= 0) {
      return loopWidthRef.current;
    }

    let gapValue = gapSizeRef.current;
    if (typeof window !== 'undefined') {
      const styles = window.getComputedStyle(container);
      const parsedGap =
        parseFloat(styles.columnGap || styles.gap || '0') || 0;
      gapValue = parsedGap;
      gapSizeRef.current = parsedGap;
    }

    // The scrollWidth includes the gap between the duplicated sets once.
    // Dividing by two leaves us short by half a gap, so we add it back
    // here to get the exact distance of one full cycle.
    const loopWidth = Math.max(0, baseWidth + gapValue / 2);
    if (loopWidth > 0) {
      loopWidthRef.current = loopWidth;

      let normalized = scrollX.current % loopWidth;
      if (normalized < 0) {
        normalized += loopWidth;
      }

      // Ensures continuous seamless transition for infinite loop
      if (!initializedRef.current && !isDraggingRef.current) {
        normalized = loopWidth - gapValue;
        initializedRef.current = true;
      }

      scrollX.current = normalized;
      container.style.transform = `translate3d(${-normalized}px, 0, 0)`;
    }

    return loopWidthRef.current;
  }, []);

  const detachGlobalPointerListeners = useCallback(() => {
    if (globalPointerMoveRef.current) {
      window.removeEventListener('pointermove', globalPointerMoveRef.current);
      globalPointerMoveRef.current = undefined;
    }
    if (globalPointerUpRef.current) {
      window.removeEventListener('pointerup', globalPointerUpRef.current);
      globalPointerUpRef.current = undefined;
    }
    if (globalPointerCancelRef.current) {
      window.removeEventListener('pointercancel', globalPointerCancelRef.current);
      globalPointerCancelRef.current = undefined;
    }
  }, []);

  const updateScroll = useCallback(
    (nextPosition: number) => {
      const container = containerRef.current;
      if (!container) return;

      let loopWidth = loopWidthRef.current;
      if (!loopWidth) {
        loopWidth = measureLoopWidth();
      }
      if (!loopWidth) return;

      let adjusted = nextPosition % loopWidth;
      if (adjusted < 0) {
        adjusted += loopWidth;
      }

      scrollX.current = adjusted;
      container.style.transform = `translate3d(${-adjusted}px, 0, 0)`;
    },
    [measureLoopWidth]
  );
  const applyDragDelta = useCallback(
    (clientX: number) => {
      const delta = clientX - pointerStartRef.current;
      updateScroll(dragStartRef.current - delta);
    },
    [updateScroll]
  );

  useEffect(() => {
    if (!isInView || showMarquee || hasActivatedLoaderRef.current) return;

    hasActivatedLoaderRef.current = true;
    setShowMarquee(true);
  }, [isInView, showMarquee]);

  useEffect(() => {
    if (!showMarquee) return;
    measureLoopWidth();
  }, [measureLoopWidth, showMarquee]);

  useEffect(() => {
    if (!showMarquee) return;
    const handleResize = () => {
      measureLoopWidth();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [measureLoopWidth, showMarquee]);

  useEffect(() => {
    if (!showMarquee) return;
    if (typeof ResizeObserver === 'undefined') return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      measureLoopWidth();
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [measureLoopWidth, showMarquee]);

  useEffect(() => {
    autoPlayStateRef.current = isAutoPlaying;
  }, [isAutoPlaying]);

  useEffect(() => {
    if (!showMarquee) return;
    return () => {
      clearResumeTimeout();
      detachGlobalPointerListeners();
    };
  }, [clearResumeTimeout, detachGlobalPointerListeners, showMarquee]);

  useEffect(() => {
    if (!showMarquee) return;
    updateScroll(scrollX.current);
  }, [updateScroll, showMarquee]);

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;
    if (!showMarquee) return;
    if (!isLogosInView) return;
    if (!isAutoPlaying) return;
    if (isDraggingRef.current) return;

    updateScroll(scrollX.current + (speed * delta) / 1000);
  });

  const stopDragging = (event?: ReactPointerEvent<HTMLDivElement> | PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const pointerId =
      event && 'pointerId' in event ? event.pointerId : activePointerIdRef.current ?? undefined;

    if (pointerId !== undefined && containerRef.current?.releasePointerCapture) {
      try {
        containerRef.current.releasePointerCapture(pointerId);
      } catch {
        // ignore if capture is already released
      }
    }

    detachGlobalPointerListeners();
    activePointerIdRef.current = null;
    pointerTypeRef.current = 'unknown';
    setTouchActionValue('pan-y pinch-zoom');
    removePauseReason('drag');
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    if (isDraggingRef.current) {
      stopDragging();
    }

    event.preventDefault();
    cancelWheelPause();

    const { pointerType } = event;
    if (pointerType === 'mouse' || pointerType === 'touch' || pointerType === 'pen') {
      pointerTypeRef.current = pointerType;
    } else {
      pointerTypeRef.current = 'unknown';
    }

    if (pointerTypeRef.current === 'touch' || pointerTypeRef.current === 'pen') {
      setTouchActionValue('none');
    } else {
      setTouchActionValue('pan-y pinch-zoom');
    }

    pointerStartRef.current = event.clientX;
    dragStartRef.current = scrollX.current;
    isDraggingRef.current = true;
    setIsDragging(true);
    activePointerIdRef.current = event.pointerId;

    addPauseReason('drag');

    try {
      containerRef.current.setPointerCapture(event.pointerId);
    } catch {
      // Safari < 16.4 does not support setPointerCapture; ignore.
    }

    if (typeof window !== 'undefined') {
      const handleGlobalPointerMove = (nativeEvent: PointerEvent) => {
        if (nativeEvent.pointerId !== activePointerIdRef.current) return;
        if (!isDraggingRef.current) return;
        if (pointerTypeRef.current === 'touch' || pointerTypeRef.current === 'pen') {
          nativeEvent.preventDefault();
        }
        applyDragDelta(nativeEvent.clientX);
      };
      const handleGlobalPointerUp = (nativeEvent: PointerEvent) => {
        if (nativeEvent.pointerId !== activePointerIdRef.current) return;
        stopDragging(nativeEvent);
      };
      const handleGlobalPointerCancel = (nativeEvent: PointerEvent) => {
        if (nativeEvent.pointerId !== activePointerIdRef.current) return;
        stopDragging(nativeEvent);
      };

      globalPointerMoveRef.current = handleGlobalPointerMove;
      globalPointerUpRef.current = handleGlobalPointerUp;
      globalPointerCancelRef.current = handleGlobalPointerCancel;

      window.addEventListener('pointermove', handleGlobalPointerMove, { passive: false });
      window.addEventListener('pointerup', handleGlobalPointerUp);
      window.addEventListener('pointercancel', handleGlobalPointerCancel);
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    if (event.pointerId !== activePointerIdRef.current) return;
    if (pointerTypeRef.current === 'touch' || pointerTypeRef.current === 'pen') {
      event.preventDefault();
    }

    applyDragDelta(event.clientX);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== activePointerIdRef.current) return;
    stopDragging(event);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== activePointerIdRef.current) return;
    stopDragging(event);
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    event.preventDefault();

    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

    updateScroll(scrollX.current + dominantDelta);

    addPauseReason('wheel');
    clearResumeTimeout();
    resumeTimeoutRef.current = window.setTimeout(() => {
      removePauseReason('wheel');
      resumeTimeoutRef.current = undefined;
    }, 1200);
  };

  const handleMouseEnter = () => {
    addPauseReason('hover');
  };

  const handleMouseLeave = () => {
    removePauseReason('hover');
  };

  return (
    <section
      id="partners"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor: '#EFE9E1' }}
      lang={lang}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
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

        {/* Partners Marquee */}
        <div className="overflow-hidden relative min-h-[220px]" ref={logosRef}>
          {showMarquee && isLogosInView && (
            <motion.div
              className="relative h-full"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isLogosInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.05 }}
            >
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#EFE9E1] to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#EFE9E1] to-transparent pointer-events-none"></div>
              <div
                ref={containerRef}
                className={`flex gap-8 w-max will-change-transform select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                onWheel={handleWheel}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ touchAction: touchActionValue }}
              >
                {partners.concat(partners).map((partner, index) => {
                  const itemDelay = (index % partners.length) * 0.05 + 0.1;
                  return (
                    <motion.div
                      key={`${partner.short}-${index}`}
                      className="relative cursor-pointer group"
                      initial={{ opacity: 0, filter: 'blur(14px)' }}
                      animate={isLogosInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
                      transition={{
                        duration: 1.3,          // lengthen animation for slower unblur
                        ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier easing
                        delay: itemDelay + 0.2   // adds a subtle delay after the section title
                      }}
                    >
                      <motion.div
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative overflow-hidden p-8 rounded-2xl flex flex-col items-center justify-center text-center flex-shrink-0 [transition-property:box-shadow,background-color,border-color] duration-300"
                        style={{
                          background: CARD_BACKGROUND,
                          border: CARD_BORDER,
                          color: '#3A2A20',
                          width: 220,
                          height: 160
                        }}
                      >
                        <div className="relative z-10 flex h-full w-full items-center justify-center">
                          {(() => {
                            const { scale, maxHeight } = logoStyles[partner.short] || logoStyles.default;
                            return (
                              <img
                                src={partner.logo}
                                alt={`${partner.short} logo`}
                                className="w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                style={{
                                  maxHeight,
                                  transform: `scale(${scale})`,
                                }}
                                loading="lazy"
                              />
                            );
                          })()}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

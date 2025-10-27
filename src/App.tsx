import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import NewsSection from './components/NewsSection';
import ProductShowcase from './components/ProductShowcase';
import BusinessScope from './components/BusinessScope';
import FacilitiesGallery from './components/FacilitiesGallery';
import PartnersGrid from './components/PartnersGrid';
import HistoryTimeline from './components/HistoryTimeline';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'en' | 'ja' | 'zh'>('en');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EDE3' }}>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Navigation currentLang={lang} onLangChange={setLang} />
          <HeroSection lang={lang} />
          <AboutSection lang={lang} />
          <NewsSection lang={lang} />
          <ProductShowcase lang={lang} />
          <BusinessScope lang={lang} />
          <FacilitiesGallery lang={lang} />
          <PartnersGrid lang={lang} />
          <HistoryTimeline lang={lang} />
          <ContactSection lang={lang} />
          <Footer lang={lang} />
        </motion.div>
      )}
    </div>
  );
}

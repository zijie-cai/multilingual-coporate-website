import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentChar, setCurrentChar] = useState(0);
  const text = "ICHIBOKU 一木";
  
  useEffect(() => {
    if (currentChar < text.length) {
      const timer = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, 120);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(completeTimer);
    }
  }, [currentChar, text.length, onComplete]);

  return (
    <motion.div
      initial={{ backgroundColor: '#5A1F1F' }}
      animate={{ backgroundColor: '#F5EDE3' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <h1 className="font-['Playfair_Display'] tracking-wider" style={{ fontSize: '2.5rem', fontWeight: 600 }}>
            {text.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: index < currentChar ? 1 : 0,
                  textShadow: index < currentChar && currentChar === text.length 
                    ? '2px 2px 4px rgba(90, 31, 31, 0.2)' 
                    : 'none'
                }}
                transition={{ duration: 0.1 }}
                className="inline-block"
                style={{ color: '#1E1E1E' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
          
          {currentChar === text.length && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 pointer-events-none"
              >
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ 
                      opacity: [0, 0.4, 0],
                      y: [-20, -60],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      ease: 'easeOut'
                    }}
                    className="absolute w-1 h-1 bg-[#C4A474] rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </motion.div>
              
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '200%', opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              />
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

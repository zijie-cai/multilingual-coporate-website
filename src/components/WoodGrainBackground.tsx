import { motion } from 'motion/react';

export default function WoodGrainBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, #F5EDE3 0%, #EFE9E1 50%, #F5EDE3 100%)`,
        }}
      />

      {/* Main Consistent Topographic Pattern Layer 1 */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ opacity: 0.12 }}
      >
        <defs>
          <pattern
            id="topoPattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Evenly distributed contour lines */}
            <path
              d="M 0 20 Q 25 18 50 20 T 100 20"
              stroke="#5A1F1F"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 0 35 Q 25 33 50 35 T 100 35"
              stroke="#5A1F1F"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 0 50 Q 25 48 50 50 T 100 50"
              stroke="#C4A474"
              strokeWidth="1.3"
              fill="none"
            />
            <path
              d="M 0 65 Q 25 63 50 65 T 100 65"
              stroke="#5A1F1F"
              strokeWidth="1.1"
              fill="none"
            />
            <path
              d="M 0 80 Q 25 78 50 80 T 100 80"
              stroke="#5A1F1F"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topoPattern)" />
      </svg>

      {/* Animated Layer 2 - Diagonal Contours */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ opacity: 0.08 }}
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        {[...Array(40)].map((_, i) => {
          const yPos = (i * 2.5);
          const curve = Math.sin(i * 0.3) * 3;
          return (
            <path
              key={i}
              d={`M 0 ${yPos}% Q 25 ${yPos + curve}% 50 ${yPos}% T 100 ${yPos}%`}
              stroke={i % 5 === 0 ? '#C4A474' : '#5A1F1F'}
              strokeWidth={i % 3 === 0 ? '1.2' : '0.9'}
              fill="none"
            />
          );
        })}
      </motion.svg>

      {/* Animated Layer 3 - Organic Wave Patterns */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ opacity: 0.1 }}
        animate={{ x: [0, -15, 0], y: [0, 5, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      >
        {[...Array(35)].map((_, i) => {
          const yPos = (i * 2.85);
          const wave1 = Math.sin(i * 0.4) * 2;
          const wave2 = Math.cos(i * 0.3) * 2;
          return (
            <path
              key={i}
              d={`M 0 ${yPos}% Q 20 ${yPos + wave1}% 40 ${yPos}% Q 60 ${yPos + wave2}% 80 ${yPos}% Q 90 ${yPos + wave1}% 100 ${yPos}%`}
              stroke={i % 4 === 0 ? '#C4A474' : '#5A1F1F'}
              strokeWidth="1"
              fill="none"
              opacity={0.6}
            />
          );
        })}
      </motion.svg>

      {/* Concentric Elevation Circles - Top Right */}
      <motion.div
        className="absolute opacity-10"
        style={{ top: '15%', right: '15%' }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400">
          <g transform="translate(200, 200)">
            {[...Array(14)].map((_, i) => {
              const radius = 20 + i * 12;
              return (
                <circle
                  key={i}
                  cx="0"
                  cy="0"
                  r={radius}
                  stroke={i % 3 === 0 ? '#C4A474' : '#5A1F1F'}
                  strokeWidth={i % 2 === 0 ? '1.3' : '1'}
                  fill="none"
                  opacity={0.7 - i * 0.04}
                />
              );
            })}
          </g>
        </svg>
      </motion.div>

      {/* Concentric Elevation Circles - Bottom Left */}
      <motion.div
        className="absolute opacity-10"
        style={{ bottom: '20%', left: '12%' }}
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, -12, 0]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      >
        <svg width="350" height="350" viewBox="0 0 350 350">
          <g transform="translate(175, 175)">
            {[...Array(12)].map((_, i) => {
              const radius = 18 + i * 14;
              return (
                <ellipse
                  key={i}
                  cx="0"
                  cy="0"
                  rx={radius}
                  ry={radius * 0.9}
                  stroke={i % 4 === 0 ? '#C4A474' : '#5A1F1F'}
                  strokeWidth={i % 2 === 0 ? '1.2' : '1'}
                  fill="none"
                  opacity={0.7 - i * 0.05}
                  transform={`rotate(${i * 5})`}
                />
              );
            })}
          </g>
        </svg>
      </motion.div>

      {/* Center Organic Contour Cluster */}
      <motion.div
        className="absolute opacity-12"
        style={{ top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}
        animate={{
          scale: [1, 1.06, 1],
          rotate: [0, 360]
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg width="500" height="500" viewBox="0 0 500 500">
          <g transform="translate(250, 250)">
            {[...Array(16)].map((_, i) => {
              const radius = 25 + i * 15;
              const distortX = Math.sin(i * 0.5) * 8;
              const distortY = Math.cos(i * 0.4) * 8;
              return (
                <ellipse
                  key={i}
                  cx={distortX}
                  cy={distortY}
                  rx={radius}
                  ry={radius * 0.88}
                  stroke={i % 3 === 0 ? '#C4A474' : '#5A1F1F'}
                  strokeWidth={i % 2 === 0 ? '1.3' : '1'}
                  fill="none"
                  opacity={0.5 - i * 0.025}
                  transform={`rotate(${i * 6})`}
                />
              );
            })}
          </g>
        </svg>
      </motion.div>

      {/* Flowing Vertical Contours - Right Side */}
      <motion.div
        className="absolute right-0 top-0 h-full w-1/3 opacity-8"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <svg width="100%" height="100%" preserveAspectRatio="none">
          {[...Array(20)].map((_, i) => {
            const xPos = i * 5;
            return (
              <path
                key={i}
                d={`M ${xPos}% 0 Q ${xPos + 2}% 25 ${xPos}% 50 T ${xPos}% 100`}
                stroke={i % 4 === 0 ? '#C4A474' : '#5A1F1F'}
                strokeWidth="1"
                fill="none"
                opacity={0.5}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Flowing Vertical Contours - Left Side */}
      <motion.div
        className="absolute left-0 top-0 h-full w-1/3 opacity-8"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      >
        <svg width="100%" height="100%" preserveAspectRatio="none">
          {[...Array(20)].map((_, i) => {
            const xPos = i * 5;
            return (
              <path
                key={i}
                d={`M ${xPos}% 0 Q ${xPos - 2}% 25 ${xPos}% 50 T ${xPos}% 100`}
                stroke={i % 5 === 0 ? '#C4A474' : '#5A1F1F'}
                strokeWidth="1"
                fill="none"
                opacity={0.5}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Dense Horizontal Flowing Lines for Consistency */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ opacity: 0.06 }}
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        {[...Array(50)].map((_, i) => {
          const yPos = i * 2;
          const amplitude = Math.sin(i * 0.2) * 1.5;
          return (
            <path
              key={i}
              d={`M 0 ${yPos}% Q 12.5 ${yPos + amplitude}% 25 ${yPos}% T 50 ${yPos}% T 75 ${yPos}% T 100 ${yPos}%`}
              stroke={i % 6 === 0 ? '#C4A474' : '#5A1F1F'}
              strokeWidth={i % 4 === 0 ? '1.1' : '0.8'}
              fill="none"
            />
          );
        })}
      </motion.svg>

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Bottom fade gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(245, 237, 227, 0.7) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}

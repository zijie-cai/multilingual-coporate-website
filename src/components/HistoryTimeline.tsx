import { motion, useInView } from 'motion/react';
import LanguageSwitchBoundary from './LanguageSwitchBoundary';
import { useRef } from 'react';

interface HistoryTimelineProps {
  lang: 'en' | 'ja' | 'zh';
}

const milestones = {
  en: [
    { year: "1980–1987", event: "Exported cassette head assembly lines and TV IFT production technology to China." },
    { year: "1988–1992", event: "Started contract manufacturing and export of molds and production equipment for electrical parts." },
    { year: "1993", event: "Established a wholly-owned manufacturing company in Dalian, China." },
    { year: "1994–2000", event: "Began mass production and sales of VTR video head components." },
    { year: "2001–2004", event: "Set up a Shanghai branch for integrated production of VTR and DVC head parts." },
    { year: "2005–2006", event: "Expanded into inverter bobbins, optical filter glass, and mobile motor brushes." },
    { year: "2007–2010", event: "Founded Shanghai subsidiary; launched automotive, SAW, and optical glass filter businesses." },
    { year: "2011–2015", event: "Started production of precision molds, connector terminals, and acoustic components." },
    { year: "2016–2018", event: "Began precision pressing of stainless parts for optical communication." },
    { year: "2019–2022", event: "Started 5G optical communication part production and circular connector contact pins." },
    { year: "2024", event: "Established Ichiboku Co., Ltd. in Tokyo to strengthen Japan headquarters and global cooperation." }
  ],
  ja: [
    { year: "1980年–1987年", event: "カセットヘッド組立ラインおよびTV用IFT製造技術を中国へ輸出。" },
    { year: "1988年–1992年", event: "電機部品の委託加工と各種金型・設備の輸出を開始。" },
    { year: "1993年", event: "中国大連市に独資製造会社を設立。" },
    { year: "1994年–2000年", event: "VTR映像ヘッド部品の量産・販売を開始。" },
    { year: "2001年–2004年", event: "上海に分工場を設立し、VTRおよびDVC部品の一貫生産を確立。" },
    { year: "2005年–2006年", event: "インバータボビン、光学ガラス、モータ用ブラシの製造販売を開始。" },
    { year: "2007年–2010年", event: "上海に独資会社を設立し、自動車・SAW・光学ガラス事業を展開。" },
    { year: "2011年–2015年", event: "精密金型、コネクター端子、音響部品の製造販売を開始。" },
    { year: "2016年–2018年", event: "光通信機器用精密ステンレス部品の生産販売を開始。" },
    { year: "2019年–2022年", event: "5G光通信機器部品およびコネクタピンの生産販売を開始。" },
    { year: "2024年", event: "東京に株式会社一木を設立し、日本本社と国際協力を強化。" }
  ],
  zh: [
    { year: "1980–1987", event: "向中国出口磁头组装线并转让电视IFT制造技术。" },
    { year: "1988–1992", event: "开始电气零件委托加工与模具设备出口。" },
    { year: "1993", event: "在中国大连成立独资制造公司。" },
    { year: "1994–2000", event: "开始量产和销售VTR视频磁头部件。" },
    { year: "2001–2004", event: "在上海设立分厂，建立VTR与DVC部件一体化生产体系。" },
    { year: "2005–2006", event: "扩展至变压器线圈、光学滤光玻璃及马达刷部件业务。" },
    { year: "2007–2010", event: "成立上海子公司，开展汽车、SAW与光学滤光片业务。" },
    { year: "2011–2015", event: "开始精密模具、连接端子及音响部件生产销售。" },
    { year: "2016–2018", event: "开始生产光通信不锈钢精密件。" },
    { year: "2019–2022", event: "启动5G光通信部件及连接器触点销生产。" },
    { year: "2024", event: "在东京成立株式会社一木，强化总部与国际合作。" }
  ]
};

const titles = {
  en: { main: "Company History", subtitle: "OUR JOURNEY" },
  ja: { main: "沿革", subtitle: "企業の歩み" },
  zh: { main: "公司历程", subtitle: "发展历史" }
};

export default function HistoryTimeline({ lang }: HistoryTimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="history"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#F5EDE3' }}
      lang={lang}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
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

        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="absolute left-1/2 top-0 w-[2px] -ml-[1px] hidden md:block"
            style={{ backgroundColor: '#5A1F1F' }}
          />

          <div className="space-y-12">
            {milestones[lang].map((milestone, index) => (
              <motion.div
                key={`${lang}-${milestone.year}-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    className="relative group"
                  >
                    {/* Decorative corner accents */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" style={{ borderColor: '#C4A474' }} />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 rounded-br-lg opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" style={{ borderColor: '#C4A474' }} />
                    
                    {/* Gradient background layer */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(196, 164, 116, 0.15) 0%, rgba(90, 31, 31, 0.05) 100%)'
                      }}
                    />
                    
                    {/* Main card with enhanced styling */}
                    <div
                      className="relative p-8 rounded-2xl overflow-hidden transition-all duration-300"
                      style={{
                        backgroundColor: '#EFE9E1',
                        borderWidth: '0.5px',
                        borderStyle: 'solid',
                        borderColor: '#D6B985',
                        borderRadius: '1rem',
                        boxShadow: '0 10px 30px -10px rgba(90, 31, 31, 0.2), 0 0 0 1px rgba(196, 164, 116, 0.1)'
                      }}
                    >
                      {/* Subtle pattern overlay */}
                      <div 
                        className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, #5A1F1F 1px, transparent 1px)',
                          backgroundSize: '10px 10px',
                          opacity: 0.05
                        }}
                      />
                      
                      {/* Year badge with gradient */}
                      <div className="relative inline-block mb-4">
                        <div
                          className="font-['Roboto_Mono'] px-4 py-2 rounded-xl relative z-10"
                          style={{ 
                            fontSize: '1.75rem', 
                            fontWeight: 700, 
                            color: '#5A1F1F',
                            background: 'linear-gradient(135deg, rgba(196, 164, 116, 0.2) 0%, rgba(196, 164, 116, 0.1) 100%)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 15px rgba(196, 164, 116, 0.2)'
                          }}
                        >
                          {milestone.year}
                        </div>
                        {/* Glow effect */}
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                          style={{ background: 'linear-gradient(135deg, #C4A474 0%, rgba(196,164,116,0.3) 100%)' }}
                        />
                      </div>
                      
                      {/* Event description with enhanced typography */}
                      <p 
                        className="relative z-10 leading-relaxed"
                        style={{ 
                          color: '#1E1E1E',
                          fontSize: '1rem',
                          fontWeight: 400,
                          lineHeight: 1.8
                        }}
                      >
                        <LanguageSwitchBoundary as="span" lang={lang}>
                          {milestone.event}
                        </LanguageSwitchBoundary>
                      </p>
                      
                      {/* Bottom accent line */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '60%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="h-[2px] mt-4 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #C4A474 0%, transparent 100%)'
                        }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Center Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="hidden md:block absolute left-1/2 w-4 h-4 rounded-full -ml-2"
                  style={{ backgroundColor: '#5A1F1F' }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0.4, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: '#C4A474' }}
                  />
                </motion.div>

                {/* Spacer */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

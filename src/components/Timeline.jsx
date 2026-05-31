import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Timeline = () => {
  const { isAkatsuki, playJutsuSound, playLightningSound, playFireSound } = useTheme();

  const timelineData = [
    {
      id: 1,
      title: 'Genin Rank: Basic Elements',
      date: '2021 - 2024',
      description: 'Learned basic chakra control: mastered HTML, CSS, JavaScript, and responsive design layouts. Completed Python Programming Internship at CodeAlpha (2024), building robust applications and solving algorithmic challenges.',
      rank: 'Genin',
      element: '🍃 Wind',
      status: 'Completed',
      chakraLevel: '35%',
      missions: '12+ D-Rank Missions',
      sound: 'wind',
      portraitDay: '/naruto_portrait.png',
      portraitNight: '/deidara_portrait.png',
      techs: ['HTML5', 'CSS3', 'JavaScript', 'Python']
    },
    {
      id: 2,
      title: 'Chūnin Rank: Jutsu Specialization',
      date: '2024 - 2025',
      description: 'Researched advanced spells in the laboratory: learned React, Next.js, Node.js, and API structures. Completed virtual internships with AICTE (Data Analytics Process Automation) & IBM SkillsBuild (Data Analytics & Business Intelligence).',
      rank: 'Chunin',
      element: '⚡ Lightning',
      status: 'Completed',
      chakraLevel: '70%',
      missions: '8+ C/B-Rank Missions',
      sound: 'lightning',
      portraitDay: '/sasuke_portrait.png',
      portraitNight: '/itachi_portrait.png',
      techs: ['React', 'Next.js', 'Node.js', 'REST APIs', 'SQL']
    },
    {
      id: 3,
      title: 'Jōnin / ANBU Rank: Master of Elements',
      date: '2025 - Present',
      description: 'Constructing high-level defenses and systems: full-stack applications, interactive game-like designs, custom animations, and cloud bases. Media & Entertainment Cloud Engineering intern at AWS (2025), and MERN Stack Developer Intern at Codec Technologies (2026).',
      rank: 'Jonin',
      element: '🔥 Fire',
      status: 'Active',
      chakraLevel: '98%',
      missions: '5+ A/S-Rank Missions',
      sound: 'fire',
      portraitDay: '/kakashi_portrait.png',
      portraitNight: '/pain_portrait.png',
      techs: ['MERN Stack', 'AWS Cloud', 'Framer Motion', 'DevOps', 'CI/CD']
    }
  ];

  // Synthesis audio triggers based on the element
  const triggerSound = (soundType) => {
    if (soundType === 'wind') playJutsuSound();
    else if (soundType === 'lightning') playLightningSound();
    else if (soundType === 'fire') playFireSound();
  };

  // Helper SVGs to represent Shinobi Ranks
  const getRankBadgeSVG = (id) => {
    if (id === 1) {
      // Leaf Village Logo
      return (
        <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-500" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 20 C20 40, 50 80, 80 40 C65 25, 60 35, 50 20 Z" />
          <path d="M50 40 C40 45, 45 55, 55 50" fill="none" stroke="currentColor" strokeWidth="6" />
        </svg>
      );
    } else if (id === 2) {
      // Shuriken Symbol
      return (
        <svg className="w-5 h-5 text-sky-600 dark:text-sky-500 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 15 L58 42 L85 50 L58 58 L50 85 L42 58 L15 50 L42 42 Z" />
          <circle cx="50" cy="50" r="10" fill="#000" />
        </svg>
      );
    } else {
      // Flame Crest
      return (
        <svg className="w-5 h-5 text-red-600 dark:text-red-500" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 15 C55 25, 75 45, 75 60 C75 75, 60 85, 50 85 C40 85, 25 75, 25 60 C25 40, 45 25, 50 15 Z" />
          <path d="M50 45 C45 50, 45 65, 55 60 C60 55, 55 50, 50 45 Z" fill="#fff" />
        </svg>
      );
    }
  };

  const getCentralNodeSymbol = (id, isAkatsuki) => {
    if (isAkatsuki) {
      // Scratched Rogue headband medallion inside the timeline nodes
      return (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
            <rect x="15" y="32" width="70" height="36" rx="4" fill="#0c0203" stroke="currentColor" />
            <path d="M50 42 C40 48, 45 54, 55 50" fill="none" stroke="currentColor" strokeWidth="4" />
            <line x1="8" y1="25" x2="92" y2="75" stroke="#ef233c" strokeWidth="8" />
          </svg>
        </div>
      );
    }
    return getRankBadgeSVG(id);
  };

  const getRankBadgeText = (id, color) => {
    if (id === 1) {
      return <span className={`text-[9px] font-coc tracking-wider ${color}`}>🍃 GENIN</span>;
    } else if (id === 2) {
      return <span className={`text-[9px] font-coc tracking-wider ${color}`}>⚡ CHUNIN</span>;
    } else {
      return <span className={`text-[9px] font-coc tracking-wider ${color}`}>🔥 JONIN</span>;
    }
  };

  return (
    <section id="journey" className="relative py-28 overflow-hidden bg-black/50">
      
      {/* Dynamic Background */}
      <div className={`absolute inset-0 bg-cover bg-center opacity-5 transition-opacity duration-1000 ${
        isAkatsuki ? 'bg-[url("/akatsuki-bg.png")]' : 'bg-[url("/konoha-bg.png")]'
      }`} />

      {/* Radial fade for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-coc text-2xl sm:text-3xl md:text-4xl text-center mb-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            ⚔️ SHINOBI RANKINGS (JOURNEY)
          </motion.h2>
          <div className={`w-40 h-1.5 mx-auto rounded-full ${
            isAkatsuki ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]' : 'bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]'
          }`} />
        </div>

        {/* Timeline Path & Cards Container */}
        <div className="relative flex flex-col items-center">
          
          {/* Vertical Chakra Pipeline (Chakra conduit line) */}
          <div className={`absolute top-0 bottom-0 left-[35px] md:left-1/2 w-[3px] -translate-x-1/2 z-0 transition-all duration-1000 ${
            isAkatsuki 
              ? 'bg-gradient-to-b from-red-600 via-purple-700 to-red-600 shadow-[0_0_12px_rgba(239,68,68,0.8)]' 
              : 'bg-gradient-to-b from-orange-500 via-emerald-600 to-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]'
          }`} />

          {/* Timeline Milestones */}
          <div className="w-full flex flex-col gap-16 relative z-10">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={item.id}
                  className={`flex flex-col md:flex-row items-start md:items-center w-full ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Left/Right Card Panel */}
                  <div className="w-full md:w-1/2 px-4 md:px-10 z-10">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.95 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -4,
                        boxShadow: isAkatsuki 
                          ? '0 15px 30px rgba(239, 68, 68, 0.25), 0 0 15px rgba(239, 68, 68, 0.15)' 
                          : '0 15px 30px rgba(139, 90, 43, 0.35), 0 0 15px rgba(249, 115, 22, 0.15)'
                      }}
                      onMouseEnter={() => triggerSound(item.sound)}
                      onClick={() => triggerSound(item.sound)}
                      className={`cursor-pointer relative overflow-visible transition-all duration-300 ${
                        isAkatsuki 
                          ? 'panel-steel-akatsuki p-7 pt-9 pb-7' 
                          : 'panel-scroll-konoha p-7 pt-9 pb-7'
                      }`}
                    >
                      {/* Ribbon Banner for Status */}
                      <div className={`absolute right-4 px-3 py-1 text-[8px] font-coc rounded-b border-l border-r border-b z-20 ${
                        isAkatsuki ? 'top-2' : 'top-[10px]'
                      } ${
                        item.status === 'Active' 
                          ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_2px_5px_rgba(16,185,129,0.3)] animate-pulse' 
                          : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                      }`}>
                        {item.status.toUpperCase()}
                      </div>

                      {/* --- CARD THEMES DECORATION --- */}
                      {/* 1. Konoha Wooden Scroll Rollers */}
                      {!isAkatsuki && (
                        <>
                          {/* Top wooden scroll beam */}
                          <div className="absolute top-0 left-0 right-0 h-[10px] bg-gradient-to-r from-[#5c3a21] via-[#8b5a2b] to-[#5c3a21] rounded-t-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_2px_4px_rgba(0,0,0,0.3)]" />
                          {/* Bottom wooden scroll beam */}
                          <div className="absolute bottom-0 left-0 right-0 h-[10px] bg-gradient-to-r from-[#5c3a21] via-[#8b5a2b] to-[#5c3a21] rounded-b-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_-2px_4px_rgba(0,0,0,0.3)]" />
                          {/* Scroll handle ends (wooden knobs) */}
                          <div className="absolute top-[-3px] left-[-8px] w-2.5 h-[16px] bg-gradient-to-b from-[#8b5a2b] to-[#3d1a04] rounded-l shadow border-r border-[#3d1a04]" />
                          <div className="absolute top-[-3px] right-[-8px] w-2.5 h-[16px] bg-gradient-to-b from-[#8b5a2b] to-[#3d1a04] rounded-r shadow border-l border-[#3d1a04]" />
                          <div className="absolute bottom-[-3px] left-[-8px] w-2.5 h-[16px] bg-gradient-to-b from-[#8b5a2b] to-[#3d1a04] rounded-l shadow border-r border-[#3d1a04]" />
                          <div className="absolute bottom-[-3px] right-[-8px] w-2.5 h-[16px] bg-gradient-to-b from-[#8b5a2b] to-[#3d1a04] rounded-r shadow border-l border-[#3d1a04]" />
                        </>
                      )}

                      {/* 2. Akatsuki Metal Headband plate decoration */}
                      {isAkatsuki && (
                        <>
                          {/* Rivets at four corners */}
                          <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-zinc-900 shadow-md" />
                          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-zinc-900 shadow-md" />
                          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-zinc-900 shadow-md" />
                          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-zinc-900 shadow-md" />
                          
                          {/* Slashed plate top center */}
                          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-gradient-to-b from-zinc-400 via-zinc-500 to-zinc-600 border border-zinc-700/60 shadow-[0_2px_4px_rgba(0,0,0,0.5)] rounded px-3 py-0.5 flex items-center justify-center z-10 w-24">
                            <div className="w-1 h-1 bg-zinc-800 rounded-full absolute left-1" />
                            <div className="w-1 h-1 bg-zinc-800 rounded-full absolute right-1" />
                            <div className="w-16 h-[1.5px] bg-zinc-950 absolute rotate-[-8deg] opacity-90 shadow-sm" />
                            <span className="font-coc text-[6px] text-zinc-900 tracking-widest">AKATSUKI</span>
                          </div>
                        </>
                      )}

                      {/* Card Content Layout */}
                      <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                        
                        {/* Dynamic character portrait frame */}
                        <div className="relative flex-shrink-0">
                          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 shadow-lg bg-black/60 relative ${
                            isAkatsuki 
                              ? 'border-red-500 shadow-red-500/10' 
                              : 'border-amber-700 shadow-orange-500/10'
                          }`}>
                            <img 
                              src={isAkatsuki ? item.portraitNight : item.portraitDay} 
                              alt={item.rank} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 select-none pointer-events-none"
                            />
                          </div>
                        </div>

                        {/* Text and stats */}
                        <div className="flex-1 w-full text-center sm:text-left">
                          
                          {/* Rank Badge & Element Tag */}
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                            {getRankBadgeText(item.id, isAkatsuki ? 'text-red-400' : 'text-orange-700')}
                            <span className={`text-[8px] font-coc px-2 py-0.5 rounded-full border ${
                              isAkatsuki 
                                ? 'bg-red-950/40 border-red-500/20 text-red-300' 
                                : 'bg-orange-950/40 border-orange-700/20 text-orange-850'
                            }`}>
                              {item.element.toUpperCase()}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-coc text-sm sm:text-base tracking-wide leading-tight mb-1 text-white dark:text-inherit">
                            {item.title}
                          </h3>

                          {/* Date Range */}
                          <span className={`font-coc text-[9px] block mb-3 ${isAkatsuki ? 'text-red-400' : 'text-orange-750'}`}>
                            📅 TRAINING MATRIX: {item.date}
                          </span>

                          {/* Description */}
                          <p className="text-xs font-body leading-relaxed mb-4">
                            {item.description}
                          </p>

                          {/* Technologies Learned */}
                          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start mb-4">
                            {item.techs.map((tech, techIdx) => (
                              <span 
                                key={techIdx} 
                                className={`text-[7px] font-coc px-2 py-0.5 rounded border transition-colors ${
                                  isAkatsuki 
                                    ? 'bg-red-950/50 border-red-500/30 text-red-300' 
                                    : 'bg-orange-950/50 border-orange-700/20 text-orange-900'
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Scroll-Triggered Progress Stats */}
                          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-dashed border-slate-700/20 text-[10px] w-full">
                            <div className="flex flex-col text-left">
                              <span className="text-slate-400 font-coc text-[7px] uppercase tracking-wider">CHAKRA CONTROL</span>
                              <div className="w-full bg-black/40 rounded-full h-2 mt-1 overflow-hidden border border-slate-800">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: item.chakraLevel }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                  className={`h-full rounded-full ${
                                    isAkatsuki 
                                      ? 'bg-gradient-to-r from-red-600 to-red-400' 
                                      : 'bg-gradient-to-r from-orange-500 to-amber-500'
                                  }`}
                                />
                              </div>
                              <span className={`font-coc text-[8px] mt-0.5 ${isAkatsuki ? 'text-red-400' : 'text-orange-700 font-bold'}`}>
                                {item.chakraLevel}
                              </span>
                            </div>
                            <div className="flex flex-col text-right sm:text-left">
                              <span className="text-slate-400 font-coc text-[7px] uppercase tracking-wider">BATTLE SCROLLS</span>
                              <span className="font-semibold text-emerald-500 mt-1 font-coc text-[8px] leading-tight">
                                {item.missions.toUpperCase()}
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>

                    </motion.div>
                  </div>

                  {/* Central Node Badge (medallion badge on timeline line) */}
                  <div className="absolute left-[15px] md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    
                    {/* Pulsing chakra rings behind node */}
                    <div className={`absolute w-12 h-12 rounded-full border animate-ping opacity-25 pointer-events-none ${
                      isAkatsuki ? 'border-red-500' : 'border-orange-500'
                    }`} />
                    <div className={`absolute w-16 h-16 rounded-full border animate-pulse opacity-15 pointer-events-none ${
                      isAkatsuki ? 'border-red-400' : 'border-orange-400'
                    }`} />

                    {/* Central Medallion Circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center shadow-lg bg-black z-30 transition-all ${
                        isAkatsuki 
                          ? 'border-red-500 shadow-red-500/40 bg-gradient-to-br from-zinc-900 to-red-950' 
                          : 'border-orange-500 shadow-orange-500/40 bg-gradient-to-br from-amber-50 to-[#f4ebd0]'
                      }`}
                    >
                      {getCentralNodeSymbol(item.id, isAkatsuki)}
                    </motion.div>
                  </div>

                  {/* Empty spacer on desktop to push card to alternating side */}
                  <div className="hidden md:block w-1/2" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Timeline;

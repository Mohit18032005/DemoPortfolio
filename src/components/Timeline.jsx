import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import TiltCard from './TiltCard';
import CinematicReveal from './CinematicReveal';

const Timeline = () => {
  const { isAkatsuki, playJutsuSound, playLightningSound, playFireSound } = useTheme();

  const timelineData = [
    {
      id: 1,
      title: 'Madhyamik & Uccha Madhyamik',
      date: 'Completed before 2022',
      description: 'Completed Class 10 at Saldha High School (81%) and Class 12 at Sabrakone High School (76.6%). Developed strong foundational knowledge in science and mathematics.',
      rank: 'Rookie',
      element: '⚓ Foundation',
      status: 'Completed',
      hakiLevel: '35%',
      missions: '2+ Base Degrees',
      sound: 'wind',
      portraitDay: '/luffy_portrait.jpg',
      portraitNight: '/shanks_portrait.jpg',
      techs: ['Science', 'Mathematics', 'Computer Basics']
    },
    {
      id: 2,
      title: 'B.Tech - Computer Science (AI)',
      date: '2023 - 2027',
      description: 'Pursuing Bachelor of Technology in CSE with Artificial Intelligence specialization at Institute of Engineering & Management, Kolkata (81% GPA).',
      rank: 'Supernova',
      element: '⚔️ AI/ML',
      status: 'Active',
      hakiLevel: '70%',
      missions: '8+ Semesters',
      sound: 'lightning',
      portraitDay: '/zoro_portrait.jpg',
      portraitNight: '/zoro_portrait.jpg',
      techs: ['Python', 'C', 'Java', 'Machine Learning', 'Data Analytics']
    },
    {
      id: 3,
      title: 'Artificial Intelligence Intern',
      date: 'May 2026 - June 2026',
      description: 'AI Intern at Codec Technologies Pvt. Ltd. Assisted in developing AI algorithms, supported data collection/preprocessing, and validated AI applications successfully.',
      rank: 'Captain',
      element: '🏴‍☠️ Deep Learning',
      status: 'Completed',
      hakiLevel: '98%',
      missions: '1+ Industry Role',
      sound: 'fire',
      portraitDay: '/sanji_portrait.jpg',
      portraitNight: '/sanji_portrait.jpg',
      techs: ['AI Algorithms', 'Data Processing', 'Model Testing', 'IoT']
    }
  ];

  const triggerSound = (soundType) => {
    if (soundType === 'wind') playJutsuSound();
    else if (soundType === 'lightning') playLightningSound();
    else if (soundType === 'fire') playFireSound();
  };

  // Helper SVGs to represent Pirate Ranks with high fidelity gradients
  const getRankBadgeSVG = (id) => {
    if (id === 1) {
      // Straw Hat Jolly Roger Logo
      return (
        <svg className="w-5 h-5 text-emerald-600 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" viewBox="0 0 100 100" fill="url(#leafBadgeGrad)">
          <defs>
            <linearGradient id="leafBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          <path d="M50 20 C20 40, 50 80, 80 40 C65 25, 60 35, 50 20 Z" />
          <path d="M50 40 C40 45, 45 55, 55 50" fill="none" stroke="#fff" strokeWidth="6" />
        </svg>
      );
    } else if (id === 2) {
      // Shuriken Symbol
      return (
        <svg className="w-5 h-5 text-sky-500 animate-spin-slow" viewBox="0 0 100 100" fill="url(#shurikenBadgeGrad)">
          <defs>
            <linearGradient id="shurikenBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <path d="M50 15 L58 42 L85 50 L58 58 L50 85 L42 58 L15 50 L42 42 Z" />
          <circle cx="50" cy="50" r="10" fill="#000" />
        </svg>
      );
    } else {
      // Flame Crest
      return (
        <svg className="w-5 h-5 text-red-500" viewBox="0 0 100 100" fill="url(#flameBadgeGrad)">
          <defs>
            <linearGradient id="flameBadgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
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
            <line x1="8" y1="25" x2="92" y2="75" stroke="#ef233c" strokeWidth="10" />
          </svg>
        </div>
      );
    }
    return getRankBadgeSVG(id);
  };

  const getRankBadgeText = (id, color) => {
    if (id === 1) {
      return <span className={`text-[9px] font-coc tracking-wider ${color}`}>⚓ ROOKIE</span>;
    } else if (id === 2) {
      return <span className={`text-[9px] font-coc tracking-wider ${color}`}>⚔️ SUPERNOVA</span>;
    } else {
      return <span className={`text-[9px] font-coc tracking-wider ${color}`}>🏴‍☠️ CAPTAIN</span>;
    }
  };

  return (
    <section 
      id="journey" 
      className={`relative py-28 overflow-hidden transition-colors duration-1000 ${
        isAkatsuki ? 'bg-black/90' : 'bg-[#03120b]/95'
      }`}
    >
      
      {/* Dynamic Background */}
      <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
        isAkatsuki ? 'bg-[url("/yonko-bg.png")] opacity-[0.18]' : 'bg-[url("/grand-line-bg.png")] opacity-[0.14]'
      }`} />

      {/* Radial fade for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-coc text-3xl sm:text-4xl md:text-5xl text-center mb-5 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] ${
              isAkatsuki ? 'text-shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'text-shadow-[0_0_30px_rgba(251,191,36,0.4)]'
            }`}
          >
            ⚔️ PIRATE RANKINGS (JOURNEY)
          </motion.h2>
          <div className={`w-48 h-2 mx-auto rounded-full ${
            isAkatsuki ? 'bg-gradient-to-r from-red-600 via-red-400 to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.9)]' : 'bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.9)]'
          }`} />
        </div>

        {/* Timeline Path & Cards Container */}
        <div className="relative flex flex-col items-center">
          
          {/* Vertical Haki Pipeline (Haki conduit line) */}
          <div className={`absolute top-0 bottom-0 left-[35px] md:left-1/2 w-[5px] -translate-x-1/2 z-0 transition-all duration-1000 ${
            isAkatsuki 
              ? 'bg-gradient-to-b from-red-600 via-purple-700 to-red-600 shadow-[0_0_22px_rgba(239,68,68,1),_0_0_44px_rgba(239,68,68,0.4)]' 
              : 'bg-gradient-to-b from-amber-500 via-emerald-500 to-amber-500 shadow-[0_0_22px_rgba(251,191,36,1),_0_0_44px_rgba(251,191,36,0.4)]'
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
                    <TiltCard intensity={15} glowColor={isAkatsuki ? 'rgba(239,68,68,0.15)' : 'rgba(249,115,22,0.15)'}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        onMouseEnter={() => triggerSound(item.sound)}
                        onClick={() => triggerSound(item.sound)}
                        className={`cursor-pointer relative overflow-visible transition-all duration-300 tilt-card-shadow backdrop-blur-sm preserve-3d ${
                          isAkatsuki 
                            ? 'panel-steel-yonko p-7 pt-9 pb-7' 
                            : 'panel-scroll-strawhat p-7 pt-9 pb-7'
                        }`}
                      >
                        {/* Ribbon Banner for Status */}
                        <div className={`absolute right-4 px-3 py-1 text-[8px] font-coc rounded-b border-l border-r border-b z-20 ${
                          isAkatsuki ? 'top-2' : 'top-[10px]'
                        } ${
                          item.status === 'Active' 
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_2px_8px_rgba(16,185,129,0.4)] animate-pulse' 
                            : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                        }`}>
                          {item.status.toUpperCase()}
                        </div>

                        {/* --- CARD THEMES DECORATION --- */}
                        {/* 1. Grand Line Wooden Parchment Rollers */}
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

                        {/* 2. Yonko Metal Headband plate decoration */}
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
                              <span className="font-coc text-[6px] text-zinc-900 tracking-widest">YONKO</span>
                            </div>
                          </>
                        )}

                        {/* Card Content Layout */}
                        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                          
                          {/* Dynamic 3D badge frame with spinning aura background (No Image) */}
                          <div className="relative flex-shrink-0 hover:scale-105 transition-transform duration-300 preserve-3d">
                            {/* Spinning Glowing Aura */}
                            <div className={`absolute -inset-3 rounded-full blur-xl opacity-80 group-hover:opacity-100 transition-opacity animate-spin-slow ${
                              isAkatsuki 
                                ? 'bg-gradient-to-r from-red-600 via-purple-600 to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.6)]' 
                                : 'bg-gradient-to-r from-orange-500 via-yellow-400 to-sky-400 shadow-[0_0_20px_rgba(249,115,22,0.6)]'
                            }`} />
                            
                            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[3px] bg-black/85 flex items-center justify-center relative z-10 transition-shadow duration-300 preserve-3d shadow-inner overflow-hidden ${
                              isAkatsuki 
                                ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8)]' 
                                : 'border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.6)] hover:shadow-[0_0_25px_rgba(251,191,36,0.8)]'
                            }`}>
                              {/* 3D Sphere Inside */}
                              <div className={`absolute inset-2 rounded-full ${
                                isAkatsuki ? 'sphere-3d-red' : 'sphere-3d-orange'
                              } opacity-70 z-0`} />
                              
                              {/* Floating rank icon/text with 3D Pop */}
                              <span className="font-coc text-xl sm:text-2xl text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)] z-10 relative pop-out-2 select-none">
                                {item.rank[0].toUpperCase()}
                              </span>
                            </div>
                          </div>

                          {/* Text and stats */}
                          <div className="flex-1 w-full text-center sm:text-left z-10">
                            
                            {/* Rank Badge & Element Tag */}
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2.5">
                              {getRankBadgeText(item.id, isAkatsuki ? 'text-red-400 text-shadow-[0_0_4px_rgba(239,68,68,0.4)]' : 'text-orange-800 font-bold')}
                              <span className={`text-[8.5px] font-coc px-2.5 py-0.5 rounded-full border shadow-sm ${
                                isAkatsuki 
                                  ? 'bg-red-950/45 border-red-500/30 text-red-300' 
                                  : 'bg-orange-950/30 border-orange-700/25 text-orange-900 font-semibold'
                              }`}>
                                {item.element.toUpperCase()}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className={`font-coc text-sm sm:text-base md:text-lg mb-2 leading-snug pop-out-2 ${
                              isAkatsuki ? 'text-red-400 group-hover:text-red-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]' : 'text-orange-900 group-hover:text-orange-800 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                            } transition-colors duration-300 drop-shadow-md`}>
                              {item.title}
                            </h3>

                            {/* Date Range */}
                            <span className={`font-coc text-[9.5px] block mb-3 font-semibold ${isAkatsuki ? 'text-red-400' : 'text-orange-800'}`}>
                              📅 TRAINING MATRIX: {item.date}
                            </span>

                            {/* Description */}
                            <p className={`text-xs font-body leading-relaxed mb-4 pop-out-1 ${
                              isAkatsuki ? 'text-slate-300' : 'text-amber-950 font-bold'
                            }`}>
                              {item.description}
                            </p>

                            {/* Technologies Learned */}
                            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start mb-4">
                              {item.techs.map((tech, techIdx) => (
                                <span 
                                  key={techIdx} 
                                  className={`text-[7.5px] font-coc px-2.5 py-[3px] rounded border transition-all duration-200 ${
                                    isAkatsuki 
                                      ? 'bg-red-950/60 border-red-500/40 text-red-300 hover:bg-red-900/50 hover:shadow-[0_0_8px_rgba(239,68,68,0.3)]' 
                                      : 'bg-amber-900/20 border-amber-600/30 text-amber-100 font-semibold hover:bg-amber-800/30 hover:shadow-[0_0_8px_rgba(251,191,36,0.3)]'
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Scroll-Triggered Progress Stats */}
                            <div className={`grid grid-cols-2 gap-4 pt-3.5 border-t border-dashed text-[10px] w-full ${
                              isAkatsuki ? 'border-red-800/30' : 'border-amber-700/30'
                            }`}>
                              <div className="flex flex-col text-left">
                                <span className={`font-coc text-[7.5px] uppercase tracking-wider ${isAkatsuki ? 'text-red-400/70' : 'text-amber-700/70'}`}>HAKI MASTERY</span>
                                <div className={`w-full rounded-full h-3 mt-1.5 overflow-hidden border shadow-inner ${
                                  isAkatsuki ? 'bg-black/70 border-red-900/40' : 'bg-black/50 border-amber-800/30'
                                }`}>
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: item.hakiLevel }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    className={`h-full rounded-full ${
                                      isAkatsuki 
                                        ? 'bg-gradient-to-r from-red-700 via-red-500 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.7)]' 
                                        : 'bg-gradient-to-r from-amber-600 via-orange-500 to-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]'
                                    }`}
                                  />
                                </div>
                                <span className={`font-coc text-[9px] mt-1 font-bold ${isAkatsuki ? 'text-red-400' : 'text-amber-600'}`}>
                                  {item.hakiLevel}
                                </span>
                              </div>
                              <div className="flex flex-col text-right sm:text-left">
                                <span className={`font-coc text-[7.5px] uppercase tracking-wider ${isAkatsuki ? 'text-red-400/70' : 'text-amber-700/70'}`}>COMPLETED BOUNTIES</span>
                                <span className={`font-semibold mt-1.5 font-coc text-[9px] leading-tight animate-pulse ${
                                  isAkatsuki ? 'text-red-300 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]' : 'text-emerald-500 drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]'
                                }`}>
                                  {item.missions.toUpperCase()}
                                </span>
                              </div>
                            </div>

                          </div>
                        </div>

                      </motion.div>
                    </TiltCard>
                  </div>

                  {/* Central Node Badge */}
                  <div className="absolute left-[15px] md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    
                    {/* Pulsing haki rings behind node */}
                    <div className={`absolute w-12 h-12 rounded-full border animate-ping opacity-35 pointer-events-none ${
                      isAkatsuki ? 'border-red-500' : 'border-orange-500'
                    }`} />
                    <div className={`absolute w-16 h-16 rounded-full border animate-pulse opacity-20 pointer-events-none ${
                      isAkatsuki ? 'border-red-400' : 'border-orange-400'
                    }`} />

                    {/* Central Medallion Circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center z-30 transition-shadow duration-300 ${
                        isAkatsuki 
                          ? 'border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.6)] bg-gradient-to-br from-zinc-900 to-red-950 hover:shadow-[0_0_24px_rgba(239,68,68,0.8)]' 
                          : 'border-amber-500 shadow-[0_0_16px_rgba(251,191,36,0.6)] bg-gradient-to-br from-amber-50 to-[#f4ebd0] hover:shadow-[0_0_24px_rgba(251,191,36,0.8)]'
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

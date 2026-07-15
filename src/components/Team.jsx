import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Mail, Github } from 'lucide-react';
import TiltCard from './TiltCard';

const Team = () => {
  const { 
    isAkatsuki, 
    playJutsuSound,
    playSharinganSound,
    playLightningSound,
    playFireSound 
  } = useTheme();

  const leaders = [
    {
      name: 'Algorithm Specialist',
      role: 'Python, C, Java',
      id: 'ninjutsu',
      strawHatName: 'Monkey D. Luffy',
      yonkoName: 'Marshall D. Teach',
      strawHatImage: '/luffy_portrait.jpg',
      yonkoImage: '/shanks_portrait.jpg',
      sound: 'jutsu',
      colorClass: 'border-orange-500/50 shadow-orange-500/10 text-orange-400',
      glow: 'rgba(249, 115, 22, 0.4)',
      stats: { haki: '99', atk: '95', def: '92' },
      socials: {
        github: 'https://github.com/',
        email: 'mailto:mk8212581@gmail.com'
      }
    },
    {
      name: 'AI & Machine Learning',
      role: 'Neural Networks, Deep Learning, OpenCV',
      id: 'taijutsu',
      strawHatName: 'Roronoa Zoro',
      yonkoName: 'Kaido',
      strawHatImage: '/zoro_portrait.jpg',
      yonkoImage: '/zoro_portrait.jpg',
      sound: 'lightning',
      colorClass: 'border-sky-500/50 shadow-sky-500/10 text-sky-400',
      glow: 'rgba(56, 189, 248, 0.4)',
      stats: { haki: '92', atk: '98', def: '88' },
      socials: {
        github: 'https://github.com/',
        email: 'mailto:mk8212581@gmail.com'
      }
    },
    {
      name: 'Data Analytics',
      role: 'Data Collection, Preprocessing, Visualization',
      id: 'genjutsu',
      strawHatName: 'Vinsmoke Sanji',
      yonkoName: 'Big Mom',
      strawHatImage: '/sanji_portrait.jpg',
      yonkoImage: '/sanji_portrait.jpg',
      sound: 'sharingan',
      colorClass: 'border-red-500/50 shadow-red-500/10 text-red-400',
      glow: 'rgba(239, 68, 68, 0.4)',
      stats: { haki: '88', atk: '94', def: '95' },
      socials: {
        github: 'https://github.com/',
        email: 'mailto:mk8212581@gmail.com'
      }
    },
    {
      name: 'IoT & Embedded Systems',
      role: 'Raspberry Pi, Sensors, Voice Recognition',
      id: 'kamui',
      strawHatName: 'Red-Haired Shanks',
      yonkoName: 'Buggy the Clown',
      strawHatImage: '/shanks_portrait.jpg',
      yonkoImage: '/shanks_portrait.jpg',
      sound: 'lightning',
      colorClass: 'border-yellow-500/50 shadow-yellow-500/10 text-yellow-400',
      glow: 'rgba(234, 179, 8, 0.4)',
      stats: { haki: '95', atk: '96', def: '90' },
      socials: {
        github: 'https://github.com/',
        email: 'mailto:mk8212581@gmail.com'
      }
    }
  ];

  const playCardSound = (soundType) => {
    if (soundType === 'lightning') {
      playLightningSound();
    } else if (soundType === 'sharingan') {
      playSharinganSound();
    } else if (soundType === 'fire') {
      playFireSound();
    } else {
      playJutsuSound();
    }
  };

  return (
    <section 
      id="skills" 
      className={`relative py-24 transition-colors duration-1000 ${
        isAkatsuki 
          ? 'bg-gradient-to-b from-[#070102] via-[#0e0305]/95 to-[#070102]' 
          : 'bg-gradient-to-b from-[#05130e] via-[#072219]/85 to-[#05130e]'
      }`}
    >
      {/* Background Graphic */}
      <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
        isAkatsuki ? 'bg-[url("/yonko-bg.jpg")] opacity-[0.14]' : 'bg-[url("/grand-line-bg.jpg")] opacity-[0.1]'
      }`} />

      {/* Atmospheric fog layers */}
      <div className="fog-layer-1 opacity-20" />
      <div className="fog-layer-2 opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-coc text-3xl sm:text-4xl md:text-5xl text-white mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] ${
              isAkatsuki ? 'text-shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'text-shadow-[0_0_30px_rgba(251,191,36,0.4)]'
            }`}
          >
            👑 PIRATE SPECIALIZATIONS
          </motion.h2>
          <div className={`w-40 h-2 mx-auto rounded-full ${
            isAkatsuki ? 'bg-gradient-to-r from-red-600 via-red-400 to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.9)]' : 'bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.9)]'
          }`} />
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {leaders.map((leader, idx) => {
            const charName = isAkatsuki ? leader.yonkoName : leader.strawHatName;
            const charImage = isAkatsuki ? leader.yonkoImage : leader.strawHatImage;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard intensity={15} glowColor={leader.glow}>
                  <div
                    onClick={() => playCardSound(leader.sound)}
                    onMouseEnter={() => playCardSound(leader.sound)}
                    className={`p-5 flex flex-col justify-between text-center transition-all duration-300 relative overflow-hidden border-4 tilt-card-shadow rounded-2xl backdrop-blur-sm preserve-3d ${
                      isAkatsuki 
                        ? 'panel-steel-yonko hover:shadow-[0_0_25px_rgba(200,16,46,0.35)]' 
                        : 'panel-scroll-strawhat hover:shadow-[0_0_25px_rgba(249,115,22,0.35)]'
                    }`}
                    style={{
                      borderColor: isAkatsuki ? '#c8102e' : '#8b5a2b'
                    }}
                  >
                    {/* Trading Card Header Ribbon */}
                    <div className="w-full flex items-center justify-between border-b border-dashed border-slate-700/20 pb-2 mb-3">
                      <span className="font-coc text-[7px] text-slate-500">CARD ID: #00{idx+1}</span>
                      <span className="font-coc text-[8px] text-yellow-500 font-bold">S-RANK</span>
                    </div>

                    {/* Character Portrait with 3D Pop */}
                    <div className="relative mb-5 preserve-3d">
                      {/* Spinning aura behind portrait */}
                      <div className={`absolute -inset-2 rounded-full blur-md opacity-80 animate-spin-slow ${
                        isAkatsuki ? 'bg-red-500/30' : 'bg-orange-500/30'
                      }`} />
                      <div className={`w-28 h-28 mx-auto rounded-full overflow-hidden border-[3px] shadow-lg relative z-10 bg-black/60 preserve-3d ${
                        isAkatsuki ? 'border-red-500/60' : 'border-orange-400/60'
                      }`}>
                        <div className="absolute inset-0 z-10 w-full h-full border-[3px] border-white/10 rounded-full pop-out-2"></div>
                        <img 
                          src={charImage} 
                          alt={charName} 
                          className="w-full h-full object-cover brightness-110 contrast-105 saturate-110 pop-out-image" 
                        />
                      </div>
                    </div>

                    {/* Title & Stats with 3D Pop */}
                    <div className="flex-1 flex flex-col justify-between preserve-3d">
                      <div className="mb-4 pop-out-2">
                        <h4 className={`font-coc text-sm mb-1.5 leading-tight truncate max-w-[200px] mx-auto ${
                          isAkatsuki ? 'text-white drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]' : 'text-amber-950 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                        }`}>
                          {charName}
                        </h4>
                        <span className={`font-body text-xs font-bold block leading-tight ${
                          isAkatsuki ? 'text-red-400' : 'text-amber-600 font-bold'
                        }`}>
                          {leader.name}
                        </span>
                        <span className={`font-body text-[10px] block mt-1.5 leading-normal ${
                          isAkatsuki ? 'text-slate-400 font-medium' : 'text-amber-800/90 font-medium'
                        }`}>
                          {leader.role}
                        </span>
                      </div>

                      {/* Pirate Stats with Animated Bars */}
                      <div className={`p-3 rounded-xl border space-y-2 mb-4 text-[9px] font-coc text-left ${
                        isAkatsuki 
                          ? 'bg-black/70 border-red-900/40 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]' 
                          : 'bg-black/50 border-amber-800/30 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)]'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className={`tracking-wider ${isAkatsuki ? 'text-sky-400/80' : 'text-sky-300/80'}`}>⚡ HAKI</span>
                          <div className="flex items-center gap-2">
                            <div className={`w-20 h-2 rounded-full overflow-hidden ${isAkatsuki ? 'bg-slate-800/80' : 'bg-slate-900/60'}`}>
                              <motion.div 
                                className="h-full bg-gradient-to-r from-sky-600 via-sky-400 to-cyan-300 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                                initial={{ width: '0%' }}
                                whileInView={{ width: `${leader.stats.haki}%` }}
                                viewport={{ once: true, margin: '-30px' }}
                                transition={{
                                  duration: 1.2,
                                  delay: 0.2 + (idx * 0.1),
                                  ease: [0.23, 1, 0.32, 1]
                                }}
                              />
                            </div>
                            <span className="text-sky-400 font-bold w-6 text-right">{leader.stats.haki}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`tracking-wider ${isAkatsuki ? 'text-red-400/80' : 'text-red-300/80'}`}>🔥 ATTACK</span>
                          <div className="flex items-center gap-2">
                            <div className={`w-20 h-2 rounded-full overflow-hidden ${isAkatsuki ? 'bg-slate-800/80' : 'bg-slate-900/60'}`}>
                              <motion.div 
                                className="h-full bg-gradient-to-r from-red-700 via-red-500 to-orange-400 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                                initial={{ width: '0%' }}
                                whileInView={{ width: `${leader.stats.atk}%` }}
                                viewport={{ once: true, margin: '-30px' }}
                                transition={{
                                  duration: 1.2,
                                  delay: 0.35 + (idx * 0.1),
                                  ease: [0.23, 1, 0.32, 1]
                                }}
                              />
                            </div>
                            <span className="text-red-400 font-bold w-6 text-right">{leader.stats.atk}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`tracking-wider ${isAkatsuki ? 'text-emerald-400/80' : 'text-emerald-300/80'}`}>🛡️ DEFENSE</span>
                          <div className="flex items-center gap-2">
                            <div className={`w-20 h-2 rounded-full overflow-hidden ${isAkatsuki ? 'bg-slate-800/80' : 'bg-slate-900/60'}`}>
                              <motion.div 
                                className="h-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-300 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                                initial={{ width: '0%' }}
                                whileInView={{ width: `${leader.stats.def}%` }}
                                viewport={{ once: true, margin: '-30px' }}
                                transition={{
                                  duration: 1.2,
                                  delay: 0.5 + (idx * 0.1),
                                  ease: [0.23, 1, 0.32, 1]
                                }}
                              />
                            </div>
                            <span className="text-emerald-400 font-bold w-6 text-right">{leader.stats.def}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center justify-center gap-3">
                      <div 
                        onClick={(e) => { e.stopPropagation(); playJutsuSound(); }}
                        className={`p-2 rounded-lg border-2 transition-all duration-200 active:scale-95 cursor-pointer ${
                          isAkatsuki 
                            ? 'bg-black/40 text-slate-400 hover:text-white border-slate-700 hover:border-red-500/50 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] shadow-md' 
                            : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border-amber-700/40 hover:shadow-[0_0_10px_rgba(251,191,36,0.3)] shadow-md'
                        }`}
                      >
                        <Github size={14} />
                      </div>
                      <div 
                        onClick={(e) => { e.stopPropagation(); playJutsuSound(); }}
                        className={`p-2 rounded-lg border-2 transition-all duration-200 active:scale-95 cursor-pointer ${
                          isAkatsuki 
                            ? 'bg-black/40 text-slate-400 hover:text-white border-slate-700 hover:border-red-500/50 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] shadow-md' 
                            : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border-amber-700/40 hover:shadow-[0_0_10px_rgba(251,191,36,0.3)] shadow-md'
                        }`}
                      >
                        <Mail size={14} />
                      </div>
                    </div>

                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Team;

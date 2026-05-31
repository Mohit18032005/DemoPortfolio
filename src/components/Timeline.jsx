import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Timeline = () => {
  const { isAkatsuki, playJutsuSound } = useTheme();

  const timelineData = [
    {
      id: 1,
      title: 'Genin Rank: Basic Elements',
      date: '2021 - 2024',
      description: 'Learned basic chakra control: mastered HTML, CSS, JavaScript, and responsive design layouts. Completed Python Programming Internship at CodeAlpha (2024), building robust applications and solving algorithmic challenges.',
      rank: 'Genin',
      element: '🍃 Wind',
      status: 'Completed',
    },
    {
      id: 2,
      title: 'Chūnin Rank: Jutsu Specialization',
      date: '2024 - 2025',
      description: 'Researched advanced spells in the laboratory: learned React, Next.js, Node.js, and API structures. Completed virtual internships with AICTE (Data Analytics Process Automation) & IBM SkillsBuild (Data Analytics & Business Intelligence).',
      rank: 'Chunin',
      element: '⚡ Lightning',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Jōnin / ANBU Rank: Master of Elements',
      date: '2025 - Present',
      description: 'Constructing high-level defenses and systems: full-stack applications, interactive game-like designs, custom animations, and cloud bases. Media & Entertainment Cloud Engineering intern at AWS (2025), and MERN Stack Developer Intern at Codec Technologies (2026).',
      rank: 'Jonin',
      element: '🔥 Fire',
      status: 'Active',
    }
  ];

  // Helper SVGs to represent Shinobi Ranks
  const getRankBuildingIcon = (id, color) => {
    if (id === 1) {
      // Academy Training Log/Dummy
      return (
        <svg className={`w-12 h-12 ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M8 5h8M8 10h8M8 15h8" strokeLinecap="round" />
          <circle cx="12" cy="5" r="1" fill="currentColor" />
          <circle cx="12" cy="10" r="1" fill="currentColor" />
          <circle cx="12" cy="15" r="1" fill="currentColor" />
        </svg>
      );
    } else if (id === 2) {
      // Ninja Scroll
      return (
        <svg className={`w-12 h-12 ${color}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v4c0 .88.58 1.62 1.38 1.87C3.58 11.13 3 11.87 3 12.75V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.25c0-.88-.58-1.62-1.38-1.87.8-.25 1.38-.99 1.38-1.87V5c0-1.1-.9-2-2-2zM5 5h2v4H5V5zm14 14h-2v-6.25h2V19zm0-10h-2V5h2v4zM7 12.75H5V19h2v-6.25z" />
        </svg>
      );
    } else {
      // Hokage Residence / Gates
      return (
        <svg className={`w-12 h-12 ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-4a3 3 0 0 1 6 0v4" />
        </svg>
      );
    }
  };

  const getRankBadge = (id, color) => {
    if (id === 1) {
      return <span className={`text-xs font-coc ${color}`}>🍃 GENIN</span>;
    } else if (id === 2) {
      return <span className={`text-xs font-coc ${color}`}>⚡ CHUNIN</span>;
    } else {
      return <span className={`text-xs font-coc ${color}`}>🔥 JONIN</span>;
    }
  };

  return (
    <section id="journey" className="relative py-24 overflow-hidden bg-black/40">
      
      {/* Background elements */}
      <div className={`absolute inset-0 bg-cover bg-center opacity-5 transition-opacity duration-1000 ${
        isAkatsuki ? 'bg-[url("/akatsuki-bg.png")]' : 'bg-[url("/konoha-bg.png")]'
      }`} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-coc text-2xl sm:text-3xl md:text-4xl text-center mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}
          >
            ⚔️ SHINOBI RANKINGS (JOURNEY)
          </motion.h2>
          <div className={`w-32 h-1.5 mx-auto rounded-full ${
            isAkatsuki ? 'bg-red-500 shadow-[0_0_8px_rgba(200,16,46,0.8)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]'
          }`} />
        </div>

        {/* Timeline Path & Cards Container */}
        <div className="relative flex flex-col items-center">
          
          {/* Vertical Connecting Path Line (Mobile) */}
          <div className={`absolute top-0 bottom-0 left-[35px] md:left-1/2 w-1 border-r-4 border-dashed -translate-x-1/2 z-0 opacity-40 transition-colors duration-500 ${
            isAkatsuki ? 'border-red-500' : 'border-orange-500'
          }`} />

          {/* Timeline Milestones */}
          <div className="w-full flex flex-col gap-12 relative z-10">
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
                  <div className="w-full md:w-1/2 px-4 md:px-8">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      whileHover={{ scale: 1.02 }}
                      onClick={playJutsuSound}
                      className={`cursor-pointer p-6 relative overflow-hidden transition-all duration-500 ${
                        isAkatsuki 
                          ? 'panel-steel-akatsuki hover:shadow-[0_0_20px_rgba(200,16,46,0.4)]' 
                          : 'panel-scroll-konoha hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                      }`}
                    >
                      {/* Ribbon banner indicating status */}
                      <div className={`absolute top-0 right-0 px-3 py-1 text-[8px] font-coc rounded-bl border-l border-b ${
                        item.status === 'Active' 
                          ? 'bg-emerald-600 border-emerald-400 text-white' 
                          : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                      }`}>
                        {item.status.toUpperCase()}
                      </div>

                      {/* Content */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative p-2 rounded-xl bg-black/40 border border-slate-700/50">
                          {getRankBuildingIcon(item.id, isAkatsuki ? 'text-red-400' : 'text-orange-600')}
                        </div>
                        <div>
                          <h3 className="font-coc text-sm sm:text-base tracking-wide">{item.title}</h3>
                          <span className={`font-coc text-[10px] ${isAkatsuki ? 'text-red-400' : 'text-orange-700'}`}>
                            {item.date}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs font-body leading-relaxed">
                        {item.description}
                      </p>

                    </motion.div>
                  </div>

                  {/* Central Node Image (Building character/Avatar badge) */}
                  <div className="absolute left-[15px] md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 flex items-center justify-center shadow-lg bg-slate-950 overflow-hidden ${
                        isAkatsuki 
                          ? 'border-red-500 shadow-red-500/30' 
                          : 'border-orange-500 shadow-orange-500/30'
                      }`}
                    >
                      {getRankBadge(item.id, isAkatsuki ? 'text-red-400' : 'text-orange-500')}
                    </motion.div>
                  </div>

                  {/* Empty Spacer side for spacing desktop */}
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

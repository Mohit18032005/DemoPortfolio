import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Timeline = () => {
  const { isNight, playCoinSound } = useTheme();

  const timelineData = [
    {
      id: 1,
      title: 'Town Hall Level 8: Foundations',
      date: '2021 - 2024',
      description: 'Upgraded basic barracks: mastered HTML, CSS, JavaScript, and responsive design layouts. Completed Python Programming Internship at CodeAlpha (2024), building robust applications and solving algorithmic challenges.',
      dayBuilding: '/Barracks.webp',
      nightBuilding: '/night-theme/OttoHut.webp',
      dayCharacter: '/Builder.webp',
      nightCharacter: '/night-theme/BetaMinion.webp',
      status: 'Completed',
    },
    {
      id: 2,
      title: 'Town Hall Level 9: The Laboratory',
      date: '2024 - 2025',
      description: 'Researched advanced spells in the laboratory: learned React, Next.js, Node.js, and API structures. Completed virtual internships with AICTE (Data Analytics Process Automation) & IBM SkillsBuild (Data Analytics & Business Intelligence).',
      dayBuilding: '/Laboratory.webp',
      nightBuilding: '/night-theme/BuilderHall.webp',
      dayCharacter: '/Wizard.webp',
      nightCharacter: '/night-theme/NightWitch.webp',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Town Hall Level 10: Master Builder',
      date: '2025 - Present',
      description: 'Constructing high-level defenses and systems: full-stack applications, interactive game-like designs, custom animations, and cloud bases. Media & Entertainment Cloud Engineering intern at AWS (2025), and MERN Stack Developer Intern at Codec Technologies (2026).',
      dayBuilding: '/TownHall.webp',
      nightBuilding: '/night-theme/MasterBuilder.webp',
      dayCharacter: '/ArcherQueen.webp',
      nightCharacter: '/night-theme/BattleMachine.webp',
      status: 'Active',
    }
  ];

  return (
    <section id="journey" className="relative py-24 overflow-hidden bg-black/40">
      
      {/* Background elements */}
      <div className={`absolute inset-0 bg-cover opacity-5 transition-opacity duration-1000 ${
        isNight ? 'bg-[url("/night-theme/NightStars.webp")]' : 'bg-[url("/Background.webp")]'
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
            ⚔️ DEVELOPER JOURNEY
          </motion.h2>
          <div className={`w-32 h-1 mx-auto rounded-full ${
            isNight ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'bg-yellow-500 shadow-[0_0_8px_rgba(255,215,0,0.8)]'
          }`} />
        </div>

        {/* Timeline Path & Cards Container */}
        <div className="relative flex flex-col items-center">
          
          {/* Vertical Connecting Path Line (Mobile) */}
          <div className={`absolute top-0 bottom-0 left-[35px] md:left-1/2 w-1 border-r-4 border-dashed -translate-x-1/2 z-0 opacity-40 transition-colors duration-500 ${
            isNight ? 'border-purple-500' : 'border-yellow-600'
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
                      onClick={playCoinSound}
                      className={`cursor-pointer p-6 relative overflow-hidden transition-all duration-500 ${
                        isNight ? 'panel-wood-night hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'panel-wood-day hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]'
                      }`}
                    >
                      {/* Ribbon banner indicating status */}
                      <div className={`absolute top-0 right-0 px-3 py-1 text-[8px] font-coc rounded-bl border-l border-b ${
                        item.status === 'Active' 
                          ? 'bg-emerald-600 border-emerald-400 text-white' 
                          : item.status === 'Ongoing'
                            ? 'bg-blue-600 border-blue-400 text-white animate-pulse'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                      }`}>
                        {item.status.toUpperCase()}
                      </div>

                      {/* Content */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <img 
                            src={isNight ? item.nightBuilding : item.dayBuilding} 
                            alt={item.title} 
                            className="w-16 h-16 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" 
                          />
                        </div>
                        <div>
                          <h3 className="font-coc text-sm sm:text-base text-white tracking-wide">{item.title}</h3>
                          <span className={`font-coc text-[10px] ${isNight ? 'text-purple-400' : 'text-yellow-400'}`}>
                            {item.date}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 font-body leading-relaxed">
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
                        isNight 
                          ? 'border-purple-500 shadow-purple-500/30' 
                          : 'border-yellow-500 shadow-yellow-500/30'
                      }`}
                    >
                      <img 
                        src={isNight ? item.nightCharacter : item.dayCharacter} 
                        alt="Troop Avatar" 
                        className="w-[85%] h-[85%] object-contain mt-1"
                      />
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

import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Mail, Github } from 'lucide-react';

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
      name: 'Ninjutsu Master',
      role: 'Animations, CSS, React, Next.js',
      id: 'ninjutsu',
      konohaName: 'Naruto Uzumaki',
      akatsukiName: 'Pain (Nagato)',
      konohaImage: '/naruto_portrait.png',
      akatsukiImage: '/pain_portrait.png',
      sound: 'jutsu',
      socials: {
        github: 'https://github.com/soumyachk101',
        email: 'mailto:soumya.chk101@gmail.com'
      }
    },
    {
      name: 'Taijutsu Engine',
      role: 'Node.js, Postgres, Express, APIs',
      id: 'taijutsu',
      konohaName: 'Sasuke Uchiha',
      akatsukiName: 'Deidara',
      konohaImage: '/sasuke_portrait.png',
      akatsukiImage: '/deidara_portrait.png',
      sound: 'lightning',
      socials: {
        github: 'https://github.com/soumyachk101',
        email: 'mailto:soumya.chk101@gmail.com'
      }
    },
    {
      name: 'Genjutsu Interface',
      role: 'Figma, Micro-interactions, Polish',
      id: 'genjutsu',
      konohaName: 'Kakashi Hatake',
      akatsukiName: 'Itachi Uchiha',
      konohaImage: '/kakashi_portrait.png',
      akatsukiImage: '/itachi_portrait.png',
      sound: 'sharingan',
      socials: {
        github: 'https://github.com/soumyachk101',
        email: 'mailto:soumya.chk101@gmail.com'
      }
    },
    {
      name: 'Kamui Space-Time',
      role: 'DevOps, CI/CD, AWS, Systems',
      id: 'kamui',
      konohaName: 'Minato Namikaze',
      akatsukiName: 'Tobi (Obito)',
      konohaImage: '/minato_portrait.png',
      akatsukiImage: '/tobi_portrait.png',
      sound: 'lightning',
      socials: {
        github: 'https://github.com/soumyachk101',
        email: 'mailto:soumya.chk101@gmail.com'
      }
    }
  ];

  // Specific sound trigger based on hover/click of cards
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
    <section id="skills" className="relative py-24 bg-gradient-to-b from-[#0b041a] via-[#120a2a]/45 to-[#0b041a]">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-coc text-2xl sm:text-3xl md:text-4xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            👑 SHINOBI SPECIALIZATIONS
          </motion.h2>
          <div className={`w-32 h-1.5 mx-auto rounded-full ${
            isAkatsuki ? 'bg-red-500 shadow-[0_0_8px_rgba(200,16,46,0.8)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]'
          }`} />
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {leaders.map((leader, idx) => {
            const charName = isAkatsuki ? leader.akatsukiName : leader.konohaName;
            const charImage = isAkatsuki ? leader.akatsukiImage : leader.konohaImage;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => playCardSound(leader.sound)}
                onMouseEnter={() => playCardSound(leader.sound)}
                className={`p-6 flex flex-col items-center justify-between text-center transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isAkatsuki 
                    ? 'panel-steel-akatsuki hover:shadow-[0_0_20px_rgba(200,16,46,0.35)]' 
                    : 'panel-scroll-konoha hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]'
                }`}
              >
                
                {/* Character circular portrait image with custom themed border */}
                <div className={`relative w-24 h-24 rounded-full bg-black/40 flex items-center justify-center border-4 overflow-hidden mb-4 group-hover:scale-105 transition-transform ${
                  isAkatsuki ? 'border-red-500/50' : 'border-orange-500/50'
                }`}>
                  <img 
                    src={charImage} 
                    alt={charName} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Character Name & Specialization Role */}
                <div className="mb-4">
                  <h4 className="font-coc text-xs mb-1.5 leading-tight truncate max-w-[200px]">
                    {charName}
                  </h4>
                  <span className={`font-body text-xs font-semibold block leading-tight ${
                    isAkatsuki ? 'text-red-400' : 'text-orange-950 font-bold'
                  }`}>
                    {leader.name}
                  </span>
                  <span className={`font-body text-[10px] block mt-1.5 leading-normal ${
                    isAkatsuki ? 'text-slate-400' : 'text-amber-900/80 font-medium'
                  }`}>
                    {leader.role}
                  </span>
                </div>

                {/* Social links */}
                <div className="flex items-center justify-center gap-3">
                  <a 
                    href={leader.socials.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => { e.stopPropagation(); playJutsuSound(); }}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isAkatsuki 
                        ? 'bg-black/35 text-slate-400 hover:text-white border-slate-800' 
                        : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border-amber-800/30'
                    }`}
                  >
                    <Github size={14} />
                  </a>
                  <a 
                    href={leader.socials.email} 
                    onClick={(e) => { e.stopPropagation(); playJutsuSound(); }}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isAkatsuki 
                        ? 'bg-black/35 text-slate-400 hover:text-white border-slate-800' 
                        : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border-amber-800/30'
                    }`}
                  >
                    <Mail size={14} />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Team;

import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Mail, Github } from 'lucide-react';

const Team = () => {
  const { isNight, playCoinSound } = useTheme();

  const leaders = [
    {
      name: 'Frontend Wizard',
      role: 'Animations, CSS, React, Next.js',
      avatar: '/Wizard.webp',
      socials: {
        github: 'https://github.com',
        email: 'mailto:soumya.chk101@gmail.com'
      }
    },
    {
      name: 'Backend P.E.K.K.A',
      role: 'Node.js, Postgres, Express, REST APIs',
      avatar: '/Giant.webp',
      socials: {
        github: 'https://github.com',
        email: 'mailto:soumya.chk101@gmail.com'
      }
    },
    {
      name: 'UI/UX Archer Queen',
      role: 'Figma, Micro-interactions, Polish',
      avatar: '/ArcherQueen.webp',
      socials: {
        github: 'https://github.com',
        email: 'mailto:soumya.chk101@gmail.com'
      }
    },
    {
      name: 'System Builder',
      role: 'DevOps, CI/CD, AWS, System Architect',
      avatar: '/night-theme/Master_Builder.webp',
      socials: {
        github: 'https://github.com',
        email: 'mailto:soumya.chk101@gmail.com'
      }
    }
  ];

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
            👑 CHIEFTAIN'S SPECIALIZATIONS
          </motion.h2>
          <div className={`w-32 h-1 mx-auto rounded-full ${
            isNight ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'bg-yellow-500 shadow-[0_0_8px_rgba(255,215,0,0.8)]'
          }`} />
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className={`p-6 flex flex-col items-center justify-between text-center transition-all duration-300 relative overflow-hidden group ${
                isNight ? 'panel-wood-night hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'panel-wood-day hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]'
              }`}
            >
              
              {/* Avatar circle */}
              <div className="relative w-24 h-24 rounded-full bg-black/40 flex items-center justify-center border-4 border-slate-800 overflow-hidden mb-4 group-hover:border-yellow-500 transition-colors">
                <img 
                  src={leader.avatar} 
                  alt={leader.name} 
                  className="w-[85%] h-[85%] object-contain mt-1 group-hover:scale-110 transition-transform" 
                />
              </div>

              {/* Title & Info */}
              <div className="mb-4">
                <h4 className="font-coc text-sm text-white mb-1.5 leading-tight truncate max-w-[200px]">
                  {leader.name}
                </h4>
                <span className={`font-body text-xs ${isNight ? 'text-purple-300' : 'text-yellow-500'} font-semibold block leading-tight`}>
                  {leader.role}
                </span>
              </div>

              {/* Social icons */}
              <div className="flex items-center justify-center gap-3">

                <a 
                  href={leader.socials.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={playCoinSound}
                  className="p-1.5 bg-black/35 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-800"
                >
                  <Github size={14} />
                </a>
                <a 
                  href={leader.socials.email} 
                  onClick={playCoinSound}
                  className="p-1.5 bg-black/35 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-800"
                >
                  <Mail size={14} />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Team;

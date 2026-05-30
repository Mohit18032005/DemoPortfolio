import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Prizes = () => {
  const { isNight, playCoinSound } = useTheme();
  const [activeFlippedCard, setActiveFlippedCard] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastTimeoutId, setToastTimeoutId] = useState(null);

  const triggerToast = (projectName) => {
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }
    setToastMessage(`🧪 Spell Factory building! The Live Demo for "${projectName}" is currently training in the laboratory. Check out GitHub for setup and build instructions!`);
    setShowToast(true);
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 4000);
    setToastTimeoutId(timeout);
  };

  const mainPrizes = [
    {
      id: 2,
      place: 'Featured Project',
      title: 'Cortex',
      amount: 'AI Productivity',
      extras: ['Natural Language Tracking', 'Pomodoro Focus Timers', 'Botanical Organic UI'],
      characterImage: '/Second Prize.webp',
      glow: 'shadow-purple-500/20',
      border: 'border-purple-500/40',
      github: 'https://github.com/soumyachk101/Cortex',
      live: '#'
    },
    {
      id: 1,
      place: 'Supreme Blueprint',
      title: 'DRISHTI AI',
      amount: 'Risk Intelligence',
      extras: ['AI Network Risk Scanning', 'Financial Blast Radius', 'Automated Remediation'],
      characterImage: '/FIrst Prize.webp',
      glow: 'shadow-yellow-500/30',
      border: 'border-yellow-500/40',
      github: 'https://github.com/soumyachk101/Drishti-Security',
      live: '#'
    },
    {
      id: 3,
      place: 'Featured Project',
      title: 'Neeti AI',
      amount: 'AI Recruitment',
      extras: ['Real-Time Collab Coding', 'Automated Screen Evaluations', 'Seamless Video Platform'],
      characterImage: '/Third Prize.webp',
      glow: 'shadow-orange-500/20',
      border: 'border-orange-500/40',
      github: 'https://github.com/soumyachk101/Neeti-AI',
      live: '#'
    }
  ];

  const otherProjects = [
    {
      title: "Phygital Trace",
      desc: "A cutting-edge supply chain solution bridging physical assets with digital twins using blockchain and NFC technology.",
      tags: ["Blockchain", "Solidity", "React", "Node.js"],
      github: "https://github.com/soumyachk101/Phygital-trace-done",
      live: "#"
    },
    {
      title: "NexusOps",
      desc: "A comprehensive CI/CD orchestration and infrastructure management platform for DevOps workflows.",
      tags: ["Docker", "Kubernetes", "AWS", "Terraform"],
      github: "https://github.com/soumyachk101/NexusOps-3.0",
      live: "https://nexusops-sigma.vercel.app"
    },
    {
      title: "HealthTrack+",
      desc: "A comprehensive health monitoring platform for medical record management and biometric tracking.",
      tags: ["React", "Express", "Node.js", "MongoDB"],
      github: "https://github.com/soumyachk101/HealthTrack-Client",
      live: "https://www.healthtrack.store/"
    },
    {
      title: "Stream.Tv",
      desc: "A premium video streaming client with a modern UI, real-time category filtering, and high-performance video player.",
      tags: ["React", "Vite", "Tailwind", "RapidAPI"],
      github: "https://github.com/soumyachk101/Stream.Tv-Client",
      live: "#"
    },
    {
      title: "Country Finder",
      desc: "An interactive geographic explorer allowing users to search and discover detailed country information.",
      tags: ["React", "REST Countries API", "Tailwind"],
      github: "https://github.com/soumyachk101/Country_Finder",
      live: "https://wcountryfinder.netlify.app/"
    },
    {
      title: "Stock Volatility",
      desc: "A financial analysis tool for monitoring market volatility and stock trends using data visualizations.",
      tags: ["React", "Finance API", "Charts.js"],
      github: "https://github.com/soumyachk101/Stock-Volatility",
      live: "#"
    }
  ];

  const tracks = [
    { name: 'Web Development', theme: 'Wizard Track', image: '/Wizard.webp', color: 'text-sky-400', tech: 'Next.js & React' },
    { name: 'UI/UX Polish', theme: 'Dragon Track', image: '/Dragon.webp', color: 'text-red-400', tech: 'Framer Motion & CSS' },
    { name: 'Backend Systems', theme: 'Giant Track', image: '/Giant.webp', color: 'text-amber-500', tech: 'Node.js & Postgres' },
    { name: 'Cloud & DevOps', theme: 'Electro Dragon Track', image: '/DragonElectro_Dragon-removebg-preview.webp', color: 'text-indigo-400', tech: 'Docker & AWS' }
  ];

  const sponsorPrizes = [
    {
      id: 1,
      name: 'HACKTROPICA 2K26',
      logo: '/ShieldClan Badge Icon.webp',
      description: 'Developed "Phygital Trace", a blockchain-powered supply chain solution connecting physical items to digital twins using NFC technology, Solidity, and FastAPI at AEC.',
      link: 'https://github.com/soumyachk101/Phygital-trace-done',
    },
    {
      id: 2,
      name: 'CODE FOR CHANGE 2.0',
      logo: '/TrophyIcon.webp',
      description: 'Won honorable mention/award for "Neeti AI", an advanced recruitment platform featuring collaborative coding, automated speech evaluations, and video call streaming at NSHM.',
      link: 'https://github.com/soumyachk101/Neeti-AI',
    },
    {
      id: 3,
      name: 'TEKATHON 2K26',
      logo: '/Spell Factory Building.webp',
      description: 'Built a Multimodal RAG Assistant that processes context-aware responses from text, images, and documents using vector databases and LLM model interfaces.',
      link: 'https://github.com/soumyachk101/RUSK-Multimodal-RAG-Assistant',
    },
    {
      id: 4,
      name: 'CREDENTIAL LOOT',
      logo: '/Elixir Drop Icon.webp',
      description: 'Harvested 10+ professional credentials across AI, Generative AI, cloud infrastructure, and data analytics from IBM, NVIDIA, DeepLearning.AI, and AICTE.',
      link: 'https://github.com/soumyachk101/3D-Portfolio',
    }
  ];

  const handleCardClick = (id) => {
    playCoinSound();
    if (activeFlippedCard === id) {
      setActiveFlippedCard(null);
    } else {
      setActiveFlippedCard(id);
    }
  };

  const toggleShowAllProjects = () => {
    playCoinSound();
    setShowAllProjects(prev => !prev);
  };

  return (
    <section id="projects" className="relative py-24 bg-gradient-to-b from-[#0b041a] via-[#120a2a]/45 to-[#0b041a]">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-coc text-2xl sm:text-3xl md:text-4xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            💰 WAR BLUEPRINTS (PROJECTS)
          </motion.h2>
          <div className={`w-32 h-1 mx-auto rounded-full ${
            isNight ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'bg-yellow-500 shadow-[0_0_8px_rgba(255,215,0,0.8)]'
          }`} />
        </div>

        {/* 1. Main Podium (Top 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-16 max-w-5xl mx-auto">
          {mainPrizes.map((prize) => {
            const isFirst = prize.id === 1;
            return (
              <motion.div
                key={prize.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: prize.id * 0.15 }}
                className={`flex flex-col items-center order-2 ${
                  isFirst ? 'md:order-1 md:-translate-y-4' : prize.id === 2 ? 'md:order-0' : 'md:order-2'
                }`}
              >
                {/* Character image standing above podium */}
                <div className="h-44 flex items-end justify-center mb-2 select-none pointer-events-none">
                  <motion.img 
                    src={prize.characterImage} 
                    alt={prize.place} 
                    className="max-h-full w-auto object-contain character-idle"
                    style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.7))' }}
                  />
                </div>

                {/* Podium Column Card */}
                <div className={`w-full p-6 text-center select-none ${
                  isNight ? 'panel-wood-night' : 'panel-wood-day'
                } border-2 ${prize.border} ${prize.glow} shadow-xl relative`}>
                  
                  {/* Stand design detail */}
                  <img src="/TrophyStand.webp" className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-3 object-contain opacity-50" alt="" />
                  
                  <span className={`font-coc text-[9px] ${isFirst ? 'text-yellow-400' : 'text-slate-300'} block mb-1 uppercase`}>
                    {prize.place}
                  </span>

                  <h3 className="font-coc text-sm sm:text-base text-white mb-2 tracking-wide leading-tight">
                    {prize.title}
                  </h3>

                  <div className={`font-coc text-base sm:text-lg tracking-wide text-green-400 mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]`}>
                    {prize.amount}
                  </div>

                  {/* Extra Rewards List */}
                  <ul className="text-[10px] sm:text-xs text-slate-300 font-body space-y-1 bg-black/30 p-3 rounded-lg border border-slate-800 mb-4">
                    {prize.extras.map((ex, i) => (
                      <li key={i} className="flex items-center justify-center gap-1">
                        <span className="text-yellow-400 font-coc text-[9px]">✔</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 mt-auto">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        playCoinSound();
                        window.open(prize.github, '_blank');
                      }}
                      className={`flex-1 py-1.5 font-coc text-[8px] rounded border transition-all active:scale-95 cursor-pointer focus:outline-none ${
                        isFirst 
                          ? 'bg-yellow-600 text-slate-950 border-yellow-400 hover:bg-yellow-700' 
                          : isNight 
                            ? 'bg-purple-950/60 text-purple-200 border-purple-500/40 hover:bg-purple-900/60' 
                            : 'bg-amber-950/60 text-yellow-200 border-yellow-700/40 hover:bg-amber-900/60'
                      }`}
                    >
                      GITHUB
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        playCoinSound();
                        if (prize.live !== '#') {
                          window.open(prize.live, '_blank');
                        } else {
                          triggerToast(prize.title);
                        }
                      }}
                      className={`flex-1 py-1.5 font-coc text-[8px] rounded border transition-all active:scale-95 cursor-pointer focus:outline-none ${
                        isFirst 
                          ? 'bg-yellow-500 text-slate-950 border-yellow-300 hover:bg-yellow-600' 
                          : isNight 
                            ? 'bg-purple-600 text-white border-purple-400 hover:bg-purple-500' 
                            : 'bg-yellow-500 text-slate-950 border-yellow-300 hover:bg-yellow-600'
                      }`}
                    >
                      LIVE
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects Action Toggle */}
        <div className="flex justify-center mb-24">
          <button
            onClick={toggleShowAllProjects}
            className={`px-6 py-3 font-coc text-[10px] sm:text-xs rounded border-3 transition-all active:scale-95 cursor-pointer focus:outline-none ${
              isNight
                ? 'bg-purple-600 text-white border-purple-400 shadow-[0_4px_0_#180033] hover:bg-purple-500'
                : 'bg-yellow-500 text-slate-950 border-yellow-300 shadow-[0_4px_0_#281000] hover:bg-yellow-600'
            }`}
          >
            {showAllProjects ? 'HIDE OTHER WAR BLUEPRINTS' : 'VIEW ALL WAR BLUEPRINTS'}
          </button>
        </div>

        {/* 2. Secondary Projects Collapsible Grid */}
        <AnimatePresence>
          {showAllProjects && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mb-24 max-w-5xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {otherProjects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-6 flex flex-col justify-between rounded-xl border-2 transition-all duration-300 ${
                      isNight 
                        ? 'panel-wood-night hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                        : 'panel-wood-day hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]'
                    }`}
                  >
                    <div>
                      <h4 className="font-coc text-xs text-white mb-2 tracking-wide leading-snug">
                        {project.title}
                      </h4>
                      <p className="text-[11px] text-slate-300 font-body leading-relaxed mb-4">
                        {project.desc}
                      </p>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag, tIdx) => (
                          <span key={tIdx} className={`text-[8px] px-2 py-0.5 rounded font-coc border ${
                            isNight ? 'bg-purple-950/60 border-purple-500/30 text-purple-300' : 'bg-amber-950/60 border-yellow-700/30 text-yellow-400'
                          }`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-auto border-t border-slate-800/50 pt-4">
                      <button
                        onClick={() => {
                          playCoinSound();
                          window.open(project.github, '_blank');
                        }}
                        className={`flex-1 py-1.5 font-coc text-[8px] rounded border transition-all active:scale-95 cursor-pointer focus:outline-none ${
                          isNight 
                            ? 'bg-purple-950/60 text-purple-200 border-purple-500/40 hover:bg-purple-900/60' 
                            : 'bg-amber-950/60 text-yellow-200 border-yellow-700/40 hover:bg-amber-900/60'
                        }`}
                      >
                        GITHUB
                      </button>
                      <button
                        onClick={() => {
                          playCoinSound();
                          if (project.live !== '#') {
                            window.open(project.live, '_blank');
                          } else {
                            triggerToast(project.title);
                          }
                        }}
                        className={`flex-1 py-1.5 font-coc text-[8px] rounded border transition-all active:scale-95 cursor-pointer focus:outline-none ${
                          isNight 
                            ? 'bg-purple-600 text-white border-purple-400 hover:bg-purple-500' 
                            : 'bg-yellow-500 text-slate-950 border-yellow-300 hover:bg-yellow-600'
                        }`}
                      >
                        LIVE
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Track Specializations Section */}
        <div className="mb-24">
          <h3 className="font-coc text-xs sm:text-sm text-center text-white mb-8 tracking-wider">
            ⚔️ BATTLE SPECIALIZATIONS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={playCoinSound}
                className={`p-4 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 ${
                  isNight ? 'panel-wood-night hover:scale-105' : 'panel-wood-day hover:scale-105'
                }`}
              >
                <div className="h-28 flex items-center justify-center mb-3 select-none pointer-events-none">
                  <img 
                    src={track.image} 
                    alt={track.name} 
                    className="max-h-full w-auto object-contain drop-shadow-[0_5px_8px_rgba(0,0,0,0.5)]" 
                  />
                </div>

                <div className="w-full">
                  <h4 className="font-coc text-xs text-white mb-1">{track.name}</h4>
                  <span className={`font-coc text-[8px] ${track.color} block mb-3`}>{track.theme}</span>
                  <div className="bg-black/30 border border-slate-800 rounded py-1 px-3 inline-block">
                    <span className="font-coc text-[8px] text-green-400">{track.tech}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. Flippable Sponsor Ecosystem Prizes */}
        <div>
          <h3 className="font-coc text-xs sm:text-sm text-center text-white mb-8 tracking-wider">
            🏆 VICTORY STAR CHESTS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {sponsorPrizes.map((sponsor) => (
              <div 
                key={sponsor.id}
                onClick={() => handleCardClick(sponsor.id)}
                className="w-64 h-80 perspective-1000 cursor-pointer select-none"
              >
                <div className={`relative w-full h-full transform-style-3d transition-transform duration-500 shadow-xl ${
                  activeFlippedCard === sponsor.id ? 'rotate-y-180' : ''
                }`}>
                  
                  {/* Card Front Side */}
                  <div className={`absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 border-3 rounded-2xl ${
                    isNight 
                      ? 'bg-purple-950/80 border-purple-500/60 shadow-purple-500/10' 
                      : 'bg-amber-950/80 border-yellow-600/60 shadow-yellow-600/10'
                  }`}>
                    {/* Sponsor Logo */}
                    <div className="w-full h-24 flex items-center justify-center mb-6 bg-black/20 p-4 rounded-xl border border-slate-800">
                      <img 
                        src={sponsor.logo} 
                        alt={sponsor.name} 
                        className="max-h-full max-w-full object-contain rounded" 
                      />
                    </div>
                    <h4 className="font-coc text-xs text-white mb-2">{sponsor.name}</h4>
                    <span className={`font-coc text-[8px] ${isNight ? 'text-purple-400' : 'text-yellow-400'}`}>
                      CLICK TO OPEN CHEST
                    </span>
                  </div>

                  {/* Card Back Side (Flipped) */}
                  <div className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-between p-6 border-3 rounded-2xl ${
                    isNight 
                      ? 'bg-purple-900 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                      : 'bg-amber-900 border-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                  }`}>
                    <div>
                      <h4 className="font-coc text-xs text-white mb-3 text-center border-b border-white/20 pb-2">
                        {sponsor.name} Details
                      </h4>
                      <p className="text-[11px] text-slate-100 font-body leading-relaxed text-center">
                        {sponsor.description}
                      </p>
                    </div>

                    <button 
                      className={`block w-full text-center font-coc text-[8px] py-2 px-3 rounded transition-all active:scale-95 cursor-pointer ${
                        isNight 
                          ? 'bg-purple-500 text-white hover:bg-purple-600 border border-purple-300' 
                          : 'bg-yellow-500 text-slate-950 hover:bg-yellow-600 border border-yellow-300'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        playCoinSound();
                        window.open(sponsor.link, '_blank');
                      }}
                    >
                      VISIT BLUEPRINT
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-xl border-2 shadow-2xl font-coc text-[10px] text-white flex items-center gap-3 backdrop-blur-md"
            style={{
              backgroundImage: isNight 
                ? "radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 0%, rgba(24, 0, 51, 0.95) 100%)"
                : "radial-gradient(circle at center, rgba(234, 179, 8, 0.2) 0%, rgba(40, 16, 0, 0.95) 100%)",
              borderColor: isNight ? '#a855f7' : '#eab308',
              boxShadow: isNight ? '0 10px 30px rgba(168, 85, 247, 0.3)' : '0 10px 30px rgba(234, 179, 8, 0.3)',
            }}
          >
            <div className="text-2xl animate-bounce">⚡</div>
            <div className="flex-1 leading-normal font-body text-xs text-slate-100">
              <span className="font-coc text-yellow-400 block mb-1">LABORATORY UPGRADE!</span>
              {toastMessage}
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-white font-coc text-xs focus:outline-none"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Prizes;

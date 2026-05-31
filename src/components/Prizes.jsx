import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Prizes = () => {
  const { isAkatsuki, playJutsuSound } = useTheme();
  const [activeFlippedCard, setActiveFlippedCard] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastTimeoutId, setToastTimeoutId] = useState(null);

  const triggerToast = (projectName) => {
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }
    setToastMessage(`🧪 Jutsu training! The Live Demo for "${projectName}" is currently training in the laboratory scroll. Check out GitHub for setup and build instructions!`);
    setShowToast(true);
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 4000);
    setToastTimeoutId(timeout);
  };

  const mainPrizes = [
    {
      id: 2,
      place: 'Featured Jutsu',
      title: 'Cortex',
      amount: 'AI Productivity',
      extras: ['Natural Language Tracking', 'Pomodoro Focus Timers', 'Botanical Organic UI'],
      glow: 'shadow-purple-500/20',
      border: 'border-purple-500/40',
      github: 'https://github.com/soumyachk101/Cortex',
      live: '#'
    },
    {
      id: 1,
      place: 'Supreme Seal',
      title: 'DRISHTI AI',
      amount: 'Risk Intelligence',
      extras: ['AI Network Risk Scanning', 'Financial Blast Radius', 'Automated Remediation'],
      glow: 'shadow-red-500/30',
      border: 'border-red-500/40',
      github: 'https://github.com/soumyachk101/Drishti-Security',
      live: '#'
    },
    {
      id: 3,
      place: 'Featured Jutsu',
      title: 'Neeti AI',
      amount: 'AI Recruitment',
      extras: ['Real-Time Collab Coding', 'Automated Screen Evaluations', 'Seamless Video Platform'],
      glow: 'shadow-sky-500/20',
      border: 'border-sky-500/40',
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
    { name: 'Sage Jutsu Track', theme: 'Ninjutsu specialization', color: 'text-orange-400 animate-pulse', tech: 'Next.js & React' },
    { name: 'Geninjutsu Interface', theme: 'UI/UX Polish track', color: 'text-purple-400', tech: 'Framer Motion & CSS' },
    { name: 'Taijutsu Systems', theme: 'Backend speed engine', color: 'text-amber-500', tech: 'Node.js & Postgres' },
    { name: 'Space-Time Kamui', theme: 'Cloud & DevOps track', color: 'text-sky-400', tech: 'Docker & AWS' }
  ];

  const sponsorPrizes = [
    {
      id: 1,
      name: 'HACKTROPICA 2K26',
      description: 'Developed "Phygital Trace", a blockchain-powered supply chain solution connecting physical items to digital twins using NFC technology, Solidity, and FastAPI at AEC.',
      link: 'https://github.com/soumyachk101/Phygital-trace-done',
    },
    {
      id: 2,
      name: 'CODE FOR CHANGE 2.0',
      description: 'Won honorable mention/award for "Neeti AI", an advanced recruitment platform featuring collaborative coding, automated speech evaluations, and video call streaming at NSHM.',
      link: 'https://github.com/soumyachk101/Neeti-AI',
    },
    {
      id: 3,
      name: 'TEKATHON 2K26',
      description: 'Built a Multimodal RAG Assistant that processes context-aware responses from text, images, and documents using vector databases and LLM model interfaces.',
      link: 'https://github.com/soumyachk101/RUSK-Multimodal-RAG-Assistant',
    },
    {
      id: 4,
      name: 'CREDENTIAL LOOT',
      description: 'Harvested 10+ professional credentials across AI, Generative AI, cloud infrastructure, and data analytics from IBM, NVIDIA, DeepLearning.AI, and AICTE.',
      link: 'https://github.com/soumyachk101/3D-Portfolio',
    }
  ];

  const handleCardClick = (id) => {
    playJutsuSound();
    if (activeFlippedCard === id) {
      setActiveFlippedCard(null);
    } else {
      setActiveFlippedCard(id);
    }
  };

  const toggleShowAllProjects = () => {
    playJutsuSound();
    setShowAllProjects(prev => !prev);
  };

  // Vector Illustration Components for Podium
  const renderPodiumIllustration = (id) => {
    if (id === 1) {
      // Drishti AI: Glowing Sharingan Eye Vector Illustration
      return (
        <svg className="w-24 h-24 text-red-500 animate-pulse" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,3" />
          <circle cx="50" cy="50" r="10" />
          {/* Tomoe 1 */}
          <path d="M50 20c2 0 4 2 4 4s-2 4-4 4-4-2-4-4c0-4 4-8 4-8z" />
          {/* Tomoe 2 */}
          <path d="M76 65c-1 2-3 2-5 1s-2-3-1-5 3-2 5-1c3 2 1 5 1 5z" />
          {/* Tomoe 3 */}
          <path d="M24 65c-1-2 1-5 3-5s3 2 2 4-2 3-4 2c-1-1-1-1-1-1z" />
        </svg>
      );
    } else if (id === 2) {
      // Cortex AI: Brain / Zen Lotus Vector Illustration
      return (
        <svg className="w-24 h-24 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
          <path d="M12 6a6 6 0 0 1 6 6M12 18a6 6 0 0 1-6-6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    } else {
      // Neeti AI: Collaborative Ninja Clones/Network Vector Illustration
      return (
        <svg className="w-24 h-24 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          <path d="M17 11a3 3 0 0 1 0-6M19 21v-1a3 3 0 0 0-3-3" />
          <path d="M7 11a3 3 0 0 0 0-6M5 21v-1a3 3 0 0 1 3-3" />
        </svg>
      );
    }
  };

  // Helper track vector icons
  const getTrackIcon = (i) => {
    const colors = ["text-orange-400", "text-purple-400", "text-amber-500", "text-sky-400"];
    if (i === 0) {
      // Shuriken
      return (
        <svg className={`w-16 h-16 ${colors[i]}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
        </svg>
      );
    } else if (i === 1) {
      // Sharingan eye
      return (
        <svg className={`w-16 h-16 ${colors[i]}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    } else if (i === 2) {
      // Flame
      return (
        <svg className={`w-16 h-16 ${colors[i]} animate-pulse`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c0 0-6 3.5-6 8.5S10 19 12 21c2-2 6-5.5 6-10.5S12 2 12 2z" />
        </svg>
      );
    } else {
      // Space-Time Portal/Circle
      return (
        <svg className={`w-16 h-16 ${colors[i]} animate-spin-slow`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M2 12h20M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
        </svg>
      );
    }
  };

  return (
    <section 
      id="projects" 
      className={`relative py-24 overflow-hidden transition-colors duration-1000 ${
        isAkatsuki ? 'bg-gradient-to-b from-[#070102] via-[#0f0406]/90 to-[#070102]' : 'bg-gradient-to-b from-[#05130e] via-[#082218]/85 to-[#05130e]'
      }`}
    >
      {/* Dynamic Background */}
      <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
        isAkatsuki ? 'bg-[url("/akatsuki-bg.png")] opacity-20' : 'bg-[url("/konoha-bg.png")] opacity-12'
      }`} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-coc text-2xl sm:text-3xl md:text-4xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            💰 NINDO BLUEPRINTS (MISSION BOARD)
          </motion.h2>
          <div className={`w-32 h-1.5 mx-auto rounded-full ${
            isAkatsuki ? 'bg-red-500 shadow-[0_0_8px_rgba(200,16,46,0.8)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]'
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
                  {renderPodiumIllustration(prize.id)}
                </div>

                {/* Podium Column Card */}
                <div className={`w-full p-6 text-center select-none ${
                  isAkatsuki ? 'panel-steel-akatsuki border-red-500/40 shadow-red-500/10' : 'panel-scroll-konoha border-orange-500/40 shadow-orange-500/10'
                } border-2 ${prize.glow} shadow-xl relative`}>
                  
                  <span className={`font-coc text-[9px] ${isFirst ? 'text-yellow-500' : 'text-slate-400'} block mb-1 uppercase`}>
                    {prize.place}
                  </span>

                  <h3 className="font-coc text-sm sm:text-base mb-2 tracking-wide leading-tight">
                    {prize.title}
                  </h3>

                  <div className={`font-coc text-base sm:text-lg tracking-wide text-emerald-500 mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]`}>
                    {prize.amount}
                  </div>

                  {/* Extra Rewards List */}
                  <ul className="text-[10px] sm:text-xs font-body space-y-1 bg-black/30 p-3 rounded-lg border border-slate-800 mb-4 text-left">
                    {prize.extras.map((ex, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-emerald-400 font-coc text-[9px]">✔</span>
                        <span className="text-slate-300">{ex}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 mt-auto">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        playJutsuSound();
                        window.open(prize.github, '_blank');
                      }}
                      className={`flex-1 py-1.5 font-coc text-[8px] rounded border transition-all active:scale-95 cursor-pointer focus:outline-none ${
                        isFirst 
                          ? 'bg-orange-600 text-white border-orange-400 hover:bg-orange-700' 
                          : isAkatsuki 
                            ? 'bg-red-950/60 text-red-200 border-red-500/40 hover:bg-red-900/60' 
                            : 'bg-orange-950/60 text-orange-900 border-orange-700/40 hover:bg-orange-900/60'
                      }`}
                    >
                      GITHUB
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        playJutsuSound();
                        if (prize.live !== '#') {
                          window.open(prize.live, '_blank');
                        } else {
                          triggerToast(prize.title);
                        }
                      }}
                      className={`flex-1 py-1.5 font-coc text-[8px] rounded border transition-all active:scale-95 cursor-pointer focus:outline-none ${
                        isFirst 
                          ? 'bg-emerald-600 text-white border-emerald-400 hover:bg-emerald-700' 
                          : isAkatsuki 
                            ? 'bg-red-600 text-white border-red-400 hover:bg-red-500' 
                            : 'bg-emerald-600 text-white border-emerald-400 hover:bg-emerald-700'
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
              isAkatsuki
                ? 'bg-red-600 text-white border-red-400 shadow-[0_4px_0_#150002] hover:bg-red-500'
                : 'bg-orange-600 text-white border-orange-400 shadow-[0_4px_0_#3d1a04] hover:bg-orange-500'
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
                      isAkatsuki 
                        ? 'panel-steel-akatsuki hover:shadow-[0_0_15px_rgba(200,16,46,0.2)]' 
                        : 'panel-scroll-konoha hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                    }`}
                  >
                    <div>
                      <h4 className="font-coc text-xs mb-2 tracking-wide leading-snug">
                        {project.title}
                      </h4>
                      <p className="text-[11px] font-body leading-relaxed mb-4">
                        {project.desc}
                      </p>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag, tIdx) => (
                          <span key={tIdx} className={`text-[8px] px-2 py-0.5 rounded font-coc border ${
                            isAkatsuki ? 'bg-red-950/60 border-red-500/30 text-red-300' : 'bg-orange-950/60 border-orange-700/30 text-orange-700'
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
                          playJutsuSound();
                          window.open(project.github, '_blank');
                        }}
                        className={`flex-1 py-1.5 font-coc text-[8px] rounded border transition-all active:scale-95 cursor-pointer focus:outline-none ${
                          isAkatsuki 
                            ? 'bg-red-950/60 text-red-200 border-red-500/40 hover:bg-red-900/60' 
                            : 'bg-orange-950/60 text-orange-900 border-orange-700/40 hover:bg-orange-900/60'
                        }`}
                      >
                        GITHUB
                      </button>
                      <button
                        onClick={() => {
                          playJutsuSound();
                          if (project.live !== '#') {
                            window.open(project.live, '_blank');
                          } else {
                            triggerToast(project.title);
                          }
                        }}
                        className={`flex-1 py-1.5 font-coc text-[8px] rounded border transition-all active:scale-95 cursor-pointer focus:outline-none ${
                          isAkatsuki 
                            ? 'bg-red-600 text-white border-red-400 hover:bg-red-500' 
                            : 'bg-emerald-600 text-white border-emerald-400 hover:bg-emerald-500'
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
                onClick={playJutsuSound}
                className={`p-4 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 ${
                  isAkatsuki ? 'panel-steel-akatsuki hover:scale-105' : 'panel-scroll-konoha hover:scale-105'
                }`}
              >
                <div className="h-28 flex items-center justify-center mb-3 select-none pointer-events-none">
                  {getTrackIcon(i)}
                </div>

                <div className="w-full">
                  <h4 className="font-coc text-xs mb-1">{track.name}</h4>
                  <span className={`font-coc text-[8px] ${track.color} block mb-3`}>{track.theme}</span>
                  <div className="bg-black/30 border border-slate-800 rounded py-1 px-3 inline-block">
                    <span className="font-coc text-[8px] text-emerald-400">{track.tech}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. Flippable Sponsor Ecosystem Prizes */}
        <div>
          <h3 className="font-coc text-xs sm:text-sm text-center text-white mb-8 tracking-wider">
            🏆 SUMMONING SCROLLS
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
                    isAkatsuki 
                      ? 'bg-red-950/80 border-red-500/60 shadow-red-500/10' 
                      : 'bg-[#f4ebd0] border-orange-500/60 shadow-orange-500/10 text-orange-950'
                  }`}>
                    {/* Scroll Icon Front */}
                    <div className="w-full h-24 flex items-center justify-center mb-6 bg-black/20 p-4 rounded-xl border border-slate-800">
                      <svg className={`w-16 h-16 ${isAkatsuki ? 'text-red-500' : 'text-orange-600'}`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v4c0 .88.58 1.62 1.38 1.87C3.58 11.13 3 11.87 3 12.75V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.25c0-.88-.58-1.62-1.38-1.87.8-.25 1.38-.99 1.38-1.87V5c0-1.1-.9-2-2-2zM5 5h2v4H5V5zm14 14h-2v-6.25h2V19zm0-10h-2V5h2v4zM7 12.75H5V19h2v-6.25z" />
                      </svg>
                    </div>
                    <h4 className="font-coc text-xs mb-2 text-center">{sponsor.name}</h4>
                    <span className={`font-coc text-[8px] ${isAkatsuki ? 'text-red-400' : 'text-orange-700 animate-pulse'}`}>
                      CLICK TO OPEN SCROLL
                    </span>
                  </div>

                  {/* Card Back Side (Flipped) */}
                  <div className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-between p-6 border-3 rounded-2xl ${
                    isAkatsuki 
                      ? 'bg-red-900 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                      : 'bg-[#e3d5ca] border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                  }`}>
                    <div>
                      <h4 className="font-coc text-xs mb-3 text-center border-b border-black/20 pb-2">
                        {sponsor.name}
                      </h4>
                      <p className={`text-[11px] font-body leading-relaxed text-center ${isAkatsuki ? 'text-white' : 'text-orange-950'}`}>
                        {sponsor.description}
                      </p>
                    </div>

                    <button 
                      className={`block w-full text-center font-coc text-[8px] py-2 px-3 rounded transition-all active:scale-95 cursor-pointer ${
                        isAkatsuki 
                          ? 'bg-red-500 text-white hover:bg-red-600 border border-red-300' 
                          : 'bg-orange-600 text-white hover:bg-orange-700 border border-orange-400'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        playJutsuSound();
                        window.open(sponsor.link, '_blank');
                      }}
                    >
                      VISIT JUTSU
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
              backgroundImage: isAkatsuki 
                ? "radial-gradient(circle at center, rgba(200, 16, 46, 0.2) 0%, rgba(10, 2, 4, 0.95) 100%)"
                : "radial-gradient(circle at center, rgba(249, 115, 22, 0.2) 0%, rgba(5, 19, 14, 0.95) 100%)",
              borderColor: isAkatsuki ? '#c8102e' : '#ff6700',
              boxShadow: isAkatsuki ? '0 10px 30px rgba(200, 16, 46, 0.3)' : '0 10px 30px rgba(249, 115, 22, 0.3)',
            }}
          >
            <div className="text-2xl animate-bounce">⚡</div>
            <div className="flex-1 leading-normal font-body text-xs text-slate-100">
              <span className="font-coc text-yellow-400 block mb-1">CHAKRA SUMMON!</span>
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

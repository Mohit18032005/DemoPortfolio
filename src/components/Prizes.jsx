import { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';
import CinematicReveal from './CinematicReveal';

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
      glow: 'shadow-purple-500/25',
      border: 'border-purple-500/40 hover:border-purple-400',
      github: 'https://github.com/soumyachk101/Cortex',
      live: '#'
    },
    {
      id: 1,
      place: 'Supreme Seal',
      title: 'DRISHTI AI',
      amount: 'Risk Intelligence',
      extras: ['AI Network Risk Scanning', 'Financial Blast Radius', 'Automated Remediation'],
      glow: 'shadow-red-500/35',
      border: 'border-red-500/40 hover:border-red-400',
      github: 'https://github.com/soumyachk101/Drishti-Security',
      live: '#'
    },
    {
      id: 3,
      place: 'Featured Jutsu',
      title: 'Neeti AI',
      amount: 'AI Recruitment',
      extras: ['Real-Time Collab Coding', 'Automated Screen Evaluations', 'Seamless Video Platform'],
      glow: 'shadow-sky-500/25',
      border: 'border-sky-500/40 hover:border-sky-400',
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

  // High-Fidelity 3D-feeling vector illustrations for podium cards
  const renderPodiumIllustration = (id) => {
    if (id === 1) {
      // Drishti AI: Hyper-detailed Sharingan with triple orbital rings and glow halo
      return (
        <svg className="w-32 h-32 filter drop-shadow-[0_0_20px_rgba(239,68,68,0.9)] animate-pulse" viewBox="0 0 120 120">
          <defs>
            <radialGradient id="sharinganGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="40%" stopColor="#ff4d4d" />
              <stop offset="70%" stopColor="#b30000" />
              <stop offset="100%" stopColor="#2a0003" />
            </radialGradient>
            <radialGradient id="sharinganHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(239,68,68,0)" />
              <stop offset="60%" stopColor="rgba(239,68,68,0)" />
              <stop offset="80%" stopColor="rgba(239,68,68,0.15)" />
              <stop offset="100%" stopColor="rgba(239,68,68,0)" />
            </radialGradient>
          </defs>
          {/* Outer glow halo */}
          <circle cx="60" cy="60" r="56" fill="url(#sharinganHalo)" />
          {/* Outer orbital ring */}
          <circle cx="60" cy="60" r="52" fill="none" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3,6" opacity="0.4" className="animate-spin-slow" />
          {/* Main eye */}
          <circle cx="60" cy="60" r="42" fill="url(#sharinganGlow)" stroke="#1a0002" strokeWidth="4" />
          {/* Inner orbital ring */}
          <circle cx="60" cy="60" r="32" fill="none" stroke="#1a0002" strokeWidth="2" strokeDasharray="6,4" className="animate-spin-slow" />
          {/* Second inner ring */}
          <circle cx="60" cy="60" r="22" fill="none" stroke="#1a0002" strokeWidth="1.2" strokeDasharray="4,3" opacity="0.6" />
          {/* Pupil */}
          <circle cx="60" cy="60" r="8" fill="#0a0000" />
          <circle cx="60" cy="60" r="4" fill="#1a0002" />
          {/* Tomoe 1 */}
          <path d="M60 30c2.5 0 4.5 2 4.5 4.5S62.5 39 60 39c-3.5 0-5.5-2.5-5.5-5.5 0-4.5 5.5-8.5 5.5-8.5z" fill="#0a0000" />
          {/* Tomoe 2 */}
          <path d="M86 74c-1.2 2.2-3.8 3-6 1.8s-3-3.8-1.8-6c1.6-3 4.2-4.1 7.2-2.8c3.9 1.7 0.6 7 0.6 7z" fill="#0a0000" />
          {/* Tomoe 3 */}
          <path d="M34 74c-1.2-2.2.6-4.8 2.8-6s4.8.6 6 2.8c1.6 3 1 5.9-2 6.8c-3.9 1.3-6.8-3.6-6.8-3.6z" fill="#0a0000" />
          {/* Light reflection */}
          <circle cx="50" cy="50" r="3" fill="rgba(255,255,255,0.35)" />
        </svg>
      );
    } else if (id === 2) {
      // Cortex AI: Lotus Sage Seal with triple rings and radiant glow
      return (
        <svg className="w-32 h-32 filter drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="purpleRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e9d5ff" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
            <radialGradient id="purpleHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.12)" />
              <stop offset="70%" stopColor="rgba(168,85,247,0.06)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0)" />
            </radialGradient>
          </defs>
          {/* Outer halo */}
          <circle cx="60" cy="60" r="56" fill="url(#purpleHalo)" />
          {/* Outermost ring */}
          <circle cx="60" cy="60" r="52" fill="none" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="4,8" opacity="0.35" className="animate-spin-slow" />
          {/* Middle ring */}
          <circle cx="60" cy="60" r="44" fill="none" stroke="url(#purpleRing)" strokeWidth="2" />
          {/* Inner spinning ring */}
          <circle cx="60" cy="60" r="34" fill="none" stroke="url(#purpleRing)" strokeWidth="1.5" strokeDasharray="8,4" className="animate-spin-slow" />
          {/* Lotus Petals - larger and more detailed */}
          <path d="M60 28c0 0-10 12-10 18s4.5 12 10 12 10-6 10-12-10-18-10-18z" fill="url(#purpleRing)" opacity="0.85" />
          <path d="M34 48c0 0 14-5 18 0s1.5 12-4 15c-5 2.5-14-15-14-15z" fill="url(#purpleRing)" opacity="0.65" />
          <path d="M86 48c0 0-14-5-18 0s-1.5 12 4 15c5 2.5 14-15 14-15z" fill="url(#purpleRing)" opacity="0.65" />
          <path d="M42 72c0 0 8-14 14-12s8 8 4 14c-3.5 5-18-2-18-2z" fill="url(#purpleRing)" opacity="0.5" />
          <path d="M78 72c0 0-8-14-14-12s-8 8-4 14c3.5 5 18-2 18-2z" fill="url(#purpleRing)" opacity="0.5" />
          {/* Core */}
          <circle cx="60" cy="58" r="6" fill="#f3e8ff" />
          <circle cx="60" cy="58" r="3" fill="#c084fc" />
        </svg>
      );
    } else {
      // Neeti AI: Shuriken network with orbital rings and sky glow
      return (
        <svg className="w-32 h-32 filter drop-shadow-[0_0_20px_rgba(56,189,248,0.85)]" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="40%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <radialGradient id="skyHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(56,189,248,0.1)" />
              <stop offset="70%" stopColor="rgba(56,189,248,0.05)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0)" />
            </radialGradient>
          </defs>
          {/* Outer halo */}
          <circle cx="60" cy="60" r="56" fill="url(#skyHalo)" />
          {/* Outer orbital */}
          <circle cx="60" cy="60" r="52" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3,7" opacity="0.35" className="animate-spin-slow" />
          {/* Middle orbital */}
          <circle cx="60" cy="60" r="44" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="5,5" opacity="0.25" />
          {/* Shuriken body - larger */}
          <path d="M60 20 L68 46 L92 38 L74 56 L92 74 L68 66 L60 92 L52 66 L28 74 L46 56 L28 38 L52 46 Z" fill="url(#skyGrad)" opacity="0.9" stroke="#0c4a6e" strokeWidth="1.5" />
          {/* Inner detail ring */}
          <circle cx="60" cy="56" r="14" fill="none" stroke="#bae6fd" strokeWidth="1" opacity="0.5" />
          {/* Core */}
          <circle cx="60" cy="56" r="7" fill="#e0f2fe" />
          <circle cx="60" cy="56" r="3.5" fill="#38bdf8" />
        </svg>
      );
    }
  };

  const getTrackIcon = (i) => {
    const colors = ["text-orange-400", "text-purple-400", "text-amber-500", "text-sky-400"];
    const glowColors = ["rgba(251,146,60,0.6)", "rgba(192,132,252,0.6)", "rgba(245,158,11,0.6)", "rgba(56,189,248,0.6)"];
    if (i === 0) {
      return (
        <svg className={`w-20 h-20 ${colors[i]}`} style={{ filter: `drop-shadow(0 0 10px ${glowColors[i]})` }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
        </svg>
      );
    } else if (i === 1) {
      return (
        <svg className={`w-20 h-20 ${colors[i]}`} style={{ filter: `drop-shadow(0 0 10px ${glowColors[i]})` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    } else if (i === 2) {
      return (
        <svg className={`w-20 h-20 ${colors[i]} animate-pulse`} style={{ filter: `drop-shadow(0 0 10px ${glowColors[i]})` }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c0 0-6 3.5-6 8.5S10 19 12 21c2-2 6-5.5 6-10.5S12 2 12 2z" />
        </svg>
      );
    } else {
      return (
        <svg className={`w-20 h-20 ${colors[i]} animate-spin-slow`} style={{ filter: `drop-shadow(0 0 10px ${glowColors[i]})` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,4" opacity="0.4" />
          <path d="M12 2v20M2 12h20M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
        </svg>
      );
    }
  };

  // Floating atmospheric embers
  const embers = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bottom: `${-10 - Math.random() * 20}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${7 + Math.random() * 5}s`,
      size: `${2 + Math.random() * 3}px`,
      color: isAkatsuki
        ? `rgba(${200 + Math.random() * 55}, ${40 + Math.random() * 40}, ${20 + Math.random() * 30}, ${0.3 + Math.random() * 0.4})`
        : `rgba(255, ${150 + Math.random() * 80}, ${100 + Math.random() * 50}, ${0.2 + Math.random() * 0.3})`,
      alt: Math.random() > 0.5,
    }));
  }, [isAkatsuki]);

  return (
    <section 
      id="projects" 
      className={`relative py-24 overflow-hidden transition-all duration-1000 ${
        isAkatsuki ? 'bg-[#070102]' : 'bg-[#05130e]'
      }`}
    >
      {/* Background Graphic */}
      <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
        isAkatsuki ? 'bg-[url("/akatsuki-bg.png")] opacity-[0.15]' : 'bg-[url("/konoha-bg.png")] opacity-[0.1]'
      }`} />

      {/* Atmospheric fog layers */}
      <div className="fog-layer-1 opacity-20" />
      <div className="fog-layer-2 opacity-15" />

      {/* Floating embers */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {embers.map((e) => (
          <div
            key={e.id}
            className={e.alt ? 'ember-alt' : 'ember'}
            style={{
              left: e.left,
              bottom: e.bottom,
              width: e.size,
              height: e.size,
              backgroundColor: e.color,
              animationDelay: e.delay,
              animationDuration: e.duration,
              boxShadow: `0 0 6px ${e.color}`,
            }}
          />
        ))}
      </div>

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

        {/* 1. Main Podium (Top 3) with 3D Pedestal columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-20 max-w-5xl mx-auto">
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
                {/* Floating Vector Illustration above pedestal */}
                <div className="h-44 flex items-end justify-center mb-2 select-none pointer-events-none character-idle">
                  {renderPodiumIllustration(prize.id)}
                </div>

                {/* Pedestal Column Card with Holographic Effect */}
                <div className="w-full">
                  <TiltCard intensity={16} glowColor={isAkatsuki ? 'rgba(239,68,68,0.15)' : 'rgba(249,115,22,0.15)'} holographic>
                    <div 
                      className={`w-full p-6 text-center select-none rounded-2xl border-4 transition-all duration-300 backdrop-blur-md shadow-2xl relative tilt-card-shadow ${
                        isAkatsuki 
                          ? 'bg-gradient-to-b from-[#1a0408]/95 via-[#0d0204]/98 to-[#050001]/100 border-red-500/50 text-white' 
                          : 'bg-gradient-to-b from-[#0d2419]/95 via-[#071810]/98 to-[#030d09]/100 border-amber-600/50 text-white'
                      } ${prize.glow}`}
                      style={{
                        backgroundImage: prize.id === 1 
                          ? 'radial-gradient(ellipse at 50% 20%, rgba(239,68,68,0.08) 0%, transparent 60%)'
                          : prize.id === 2 
                            ? 'radial-gradient(ellipse at 50% 20%, rgba(168,85,247,0.08) 0%, transparent 60%)'
                            : 'radial-gradient(ellipse at 50% 20%, rgba(56,189,248,0.08) 0%, transparent 60%)'
                      }}
                    >
                      
                      <span className={`font-coc text-[9px] ${isFirst ? 'text-amber-300 font-bold drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]' : 'text-slate-400'} block mb-1.5 uppercase tracking-wider`}>
                        {prize.place}
                      </span>

                      <h3 className="font-coc text-sm sm:text-base mb-2 tracking-wide leading-tight text-white">
                        {prize.title}
                      </h3>

                      <div className={`font-coc text-base sm:text-lg tracking-wide mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] ${
                        isAkatsuki ? 'text-red-300' : 'text-emerald-400'
                      }`}>
                        {prize.amount}
                      </div>

                      {/* Extra Rewards List */}
                      <ul className={`text-[10px] sm:text-xs font-body space-y-1.5 p-3.5 rounded-xl border mb-5 text-left shadow-inner ${
                        isAkatsuki ? 'bg-red-950/20 border-red-900/40' : 'bg-emerald-950/20 border-emerald-900/30'
                      }`}>
                        {prize.extras.map((ex, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className={`font-coc text-[9px] ${isAkatsuki ? 'text-red-400' : 'text-emerald-400'}`}>✔</span>
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
                          className={`flex-1 py-2 font-coc text-[8.5px] rounded border-2 transition-all active:scale-95 cursor-pointer focus:outline-none ${
                            isFirst 
                              ? 'bg-orange-600 text-white border-orange-400 hover:bg-orange-700 shadow-[0_2px_0_#3d1a04]' 
                              : isAkatsuki 
                                ? 'bg-red-950/60 text-red-200 border-red-500/40 hover:bg-red-900/60 shadow-[0_2px_0_#200002]' 
                                : 'bg-orange-950/40 text-orange-300 border-orange-500/35 hover:bg-orange-900/60 hover:text-white shadow-[0_2px_0_#1b0800]'
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
                          className={`flex-1 py-2 font-coc text-[8.5px] rounded border-2 transition-all active:scale-95 cursor-pointer focus:outline-none ${
                            isFirst 
                              ? 'bg-emerald-600 text-white border-emerald-400 hover:bg-emerald-700 shadow-[0_2px_0_#064e3b]' 
                              : isAkatsuki 
                                ? 'bg-red-600 text-white border-red-400 hover:bg-red-500 shadow-[0_2px_0_#300005]' 
                                : 'bg-emerald-600 text-white border-emerald-400 hover:bg-emerald-700 shadow-[0_2px_0_#064e3b]'
                          }`}
                        >
                          LIVE
                        </button>
                      </div>

                    </div>
                  </TiltCard>
                  {/* Visual Pedestal Column Base (Carved stone effect) */}
                  <div className={`h-5 mx-3 rounded-b-xl border-x-4 border-b-4 transition-all duration-300 ${
                    isAkatsuki 
                      ? 'bg-gradient-to-b from-zinc-800 to-zinc-900 border-red-500/40 shadow-inner' 
                      : 'bg-gradient-to-b from-amber-800 to-amber-900 border-amber-600/40 shadow-inner'
                  }`} />
                  <div className={`h-2.5 mx-6 rounded-b-lg transition-all duration-300 ${
                    isAkatsuki ? 'bg-zinc-950' : 'bg-amber-950'
                  }`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex-1 h-px max-w-32 ${isAkatsuki ? 'bg-gradient-to-r from-transparent to-red-500/30' : 'bg-gradient-to-r from-transparent to-amber-500/30'}`} />
          <div className={`w-2 h-2 rounded-full ${isAkatsuki ? 'bg-red-500/50' : 'bg-amber-500/50'}`} />
          <div className={`flex-1 h-px max-w-32 ${isAkatsuki ? 'bg-gradient-to-l from-transparent to-red-500/30' : 'bg-gradient-to-l from-transparent to-amber-500/30'}`} />
        </div>

        {/* View All Projects Action Toggle */}
        <div className="flex justify-center mb-24">
          <motion.button
            onClick={toggleShowAllProjects}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`px-8 py-3.5 font-coc text-[10px] sm:text-xs rounded-lg border-3 transition-colors cursor-pointer focus:outline-none ${
              isAkatsuki
                ? 'bg-gradient-to-b from-red-600 to-red-700 text-white border-red-400 shadow-[0_4px_0_#150002,0_0_20px_rgba(239,68,68,0.2)] hover:from-red-500 hover:to-red-600'
                : 'bg-gradient-to-b from-amber-600 to-orange-700 text-white border-amber-400 shadow-[0_4px_0_#3d1a04,0_0_20px_rgba(245,158,11,0.2)] hover:from-amber-500 hover:to-orange-600'
            }`}
          >
            {showAllProjects ? 'HIDE OTHER WAR BLUEPRINTS' : 'VIEW ALL WAR BLUEPRINTS'}
          </motion.button>
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
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <TiltCard intensity={12} glowColor={isAkatsuki ? 'rgba(239,68,68,0.08)' : 'rgba(249,115,22,0.08)'}>
                      <div 
                        className={`p-6 h-full flex flex-col justify-between rounded-2xl border-4 transition-all duration-300 backdrop-blur-md tilt-card-shadow ${
                          isAkatsuki 
                            ? 'bg-gradient-to-b from-[#1a0408]/95 via-[#0d0204]/98 to-[#050001]/100 border-red-500/40 hover:border-red-400/60 text-white' 
                            : 'bg-gradient-to-b from-[#0d2419]/95 via-[#071810]/98 to-[#030d09]/100 border-amber-600/40 hover:border-amber-500/60 text-white'
                        }`}
                        style={{
                          backgroundImage: isAkatsuki 
                            ? 'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.06) 0%, transparent 50%)'
                            : 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 50%)'
                        }}
                      >
                        <div>
                          <h4 className="font-coc text-xs mb-2.5 tracking-wide leading-snug text-white">
                            {project.title}
                          </h4>
                          <p className="text-[11px] font-body leading-relaxed mb-4 text-slate-300">
                            {project.desc}
                          </p>
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.tags.map((tag, tIdx) => (
                              <span key={tIdx} className={`text-[8px] px-2 py-0.5 rounded font-coc border ${
                                isAkatsuki 
                                  ? 'bg-red-950/60 border-red-500/30 text-red-300' 
                                  : 'bg-amber-950/40 border-amber-600/30 text-amber-300'
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
                            className={`flex-1 py-2 font-coc text-[8px] rounded border-2 transition-all active:scale-95 cursor-pointer focus:outline-none ${
                              isAkatsuki 
                                ? 'bg-red-950/60 text-red-200 border-red-500/40 hover:bg-red-900/60 shadow-[0_2px_0_#150002]' 
                                : 'bg-orange-950/40 text-orange-300 border-orange-500/35 hover:bg-orange-900/60 hover:text-white shadow-[0_2px_0_#1b0800]'
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
                            className={`flex-1 py-2 font-coc text-[8px] rounded border-2 transition-all active:scale-95 cursor-pointer focus:outline-none ${
                              isAkatsuki 
                                ? 'bg-red-600 text-white border-red-400 hover:bg-red-500 shadow-[0_2px_0_#300005]' 
                                : 'bg-emerald-600 text-white border-emerald-400 hover:bg-emerald-500 shadow-[0_2px_0_#064e3b]'
                            }`}
                          >
                            LIVE
                          </button>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className={`flex-1 h-px max-w-48 ${isAkatsuki ? 'bg-gradient-to-r from-transparent to-red-500/25' : 'bg-gradient-to-r from-transparent to-amber-500/25'}`} />
          <div className={`w-1.5 h-1.5 rounded-full ${isAkatsuki ? 'bg-red-500/40' : 'bg-amber-500/40'}`} />
          <div className={`w-2.5 h-2.5 rounded-full ${isAkatsuki ? 'bg-red-500/50' : 'bg-amber-500/50'}`} />
          <div className={`w-1.5 h-1.5 rounded-full ${isAkatsuki ? 'bg-red-500/40' : 'bg-amber-500/40'}`} />
          <div className={`flex-1 h-px max-w-48 ${isAkatsuki ? 'bg-gradient-to-l from-transparent to-red-500/25' : 'bg-gradient-to-l from-transparent to-amber-500/25'}`} />
        </div>

        {/* 3. Track Specializations Section */}
        <div className="mb-24">
          <h3 className="font-coc text-xs sm:text-sm text-center text-white mb-10 tracking-wider">
            ⚔️ BATTLE SPECIALIZATIONS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <TiltCard intensity={14} glowColor={[
                  'rgba(251,146,60,0.1)', 'rgba(192,132,252,0.1)', 'rgba(245,158,11,0.1)', 'rgba(56,189,248,0.1)'
                ][i]}>
                  <div
                    onClick={playJutsuSound}
                    className={`p-5 h-full flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 rounded-2xl border-4 backdrop-blur-md tilt-card-shadow ${
                      isAkatsuki 
                        ? 'bg-gradient-to-b from-[#1a0408]/95 via-[#0d0204]/98 to-[#050001]/100 border-red-500/40 hover:border-red-400/60 text-white' 
                        : 'bg-gradient-to-b from-[#0d2419]/95 via-[#071810]/98 to-[#030d09]/100 border-amber-600/40 hover:border-amber-500/60 text-white'
                    }`}
                    style={{
                      backgroundImage: [
                        'radial-gradient(ellipse at 50% 30%, rgba(251,146,60,0.06) 0%, transparent 55%)',
                        'radial-gradient(ellipse at 50% 30%, rgba(192,132,252,0.06) 0%, transparent 55%)',
                        'radial-gradient(ellipse at 50% 30%, rgba(245,158,11,0.06) 0%, transparent 55%)',
                        'radial-gradient(ellipse at 50% 30%, rgba(56,189,248,0.06) 0%, transparent 55%)'
                      ][i]
                    }}
                  >
                    <div className="h-28 flex items-center justify-center mb-3 select-none pointer-events-none character-idle">
                      {getTrackIcon(i)}
                    </div>

                    <div className="w-full">
                      <h4 className="font-coc text-xs mb-1.5 text-white leading-tight">{track.name}</h4>
                      <span className={`font-coc text-[8px] ${track.color} block mb-3.5`}>{track.theme}</span>
                      <div className={`border rounded py-1.5 px-3 inline-block shadow-inner ${
                        isAkatsuki ? 'bg-red-950/30 border-red-900/40' : 'bg-emerald-950/30 border-emerald-900/30'
                      }`}>
                        <span className={`font-coc text-[8.5px] ${isAkatsuki ? 'text-red-300' : 'text-emerald-400'}`}>{track.tech}</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className={`flex-1 h-px max-w-48 ${isAkatsuki ? 'bg-gradient-to-r from-transparent to-red-500/25' : 'bg-gradient-to-r from-transparent to-amber-500/25'}`} />
          <div className={`w-1.5 h-1.5 rounded-full ${isAkatsuki ? 'bg-red-500/40' : 'bg-amber-500/40'}`} />
          <div className={`w-2.5 h-2.5 rounded-full ${isAkatsuki ? 'bg-red-500/50' : 'bg-amber-500/50'}`} />
          <div className={`w-1.5 h-1.5 rounded-full ${isAkatsuki ? 'bg-red-500/40' : 'bg-amber-500/40'}`} />
          <div className={`flex-1 h-px max-w-48 ${isAkatsuki ? 'bg-gradient-to-l from-transparent to-red-500/25' : 'bg-gradient-to-l from-transparent to-amber-500/25'}`} />
        </div>

        {/* 4. Flippable Sponsor Ecosystem Prizes */}
        <div>
          <h3 className="font-coc text-xs sm:text-sm text-center text-white mb-10 tracking-wider">
            🏆 SUMMONING SCROLLS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {sponsorPrizes.map((sponsor) => (
              <div 
                key={sponsor.id}
                onClick={() => handleCardClick(sponsor.id)}
                className="w-64 h-80 perspective-1000 cursor-pointer select-none"
              >
                <div className={`relative w-full h-full transform-style-3d transition-transform duration-500 shadow-2xl ${
                  activeFlippedCard === sponsor.id ? 'rotate-y-180' : ''
                }`}>
                  
                  {/* Card Front Side */}
                  <div className={`absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 border-4 rounded-2xl text-white ${
                    isAkatsuki 
                      ? 'bg-gradient-to-b from-[#1a0408]/95 to-[#050001]/98 border-red-500/50 shadow-red-500/10' 
                      : 'bg-gradient-to-b from-[#0d2419]/95 to-[#030d09]/98 border-amber-600/50 shadow-amber-500/10'
                  }`}>
                    {/* Scroll Icon Front (Double border leather scroll emblem) */}
                    <div className={`w-full h-24 flex items-center justify-center mb-6 p-4 rounded-xl border-2 shadow-inner ${
                      isAkatsuki ? 'bg-red-950/30 border-red-900/50' : 'bg-amber-950/25 border-amber-800/40'
                    }`}>
                      <svg className={`w-16 h-16 ${isAkatsuki ? 'text-red-500' : 'text-amber-500'}`} style={{ filter: `drop-shadow(0 0 8px ${isAkatsuki ? 'rgba(239,68,68,0.5)' : 'rgba(245,158,11,0.5)'})` }} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v4c0 .88.58 1.62 1.38 1.87C3.58 11.13 3 11.87 3 12.75V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.25c0-.88-.58-1.62-1.38-1.87.8-.25 1.38-.99 1.38-1.87V5c0-1.1-.9-2-2-2zM5 5h2v4H5V5zm14 14h-2v-6.25h2V19zm0-10h-2V5h2v4zM7 12.75H5V19h2v-6.25z" />
                      </svg>
                    </div>
                    <h4 className="font-coc text-xs mb-2.5 text-center text-white">{sponsor.name}</h4>
                    <span className={`font-coc text-[8.5px] ${isAkatsuki ? 'text-red-400 animate-pulse' : 'text-amber-400 animate-pulse'}`}>
                      CLICK TO OPEN SCROLL
                    </span>
                  </div>

                  {/* Card Back Side (Flipped) */}
                  <div className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-between p-6 border-4 rounded-2xl text-white ${
                    isAkatsuki 
                      ? 'bg-gradient-to-b from-[#2a0a10]/95 to-[#0a0203]/98 border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.4)]' 
                      : 'bg-gradient-to-b from-[#102e22]/95 to-[#04120e]/98 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.4)]'
                  }`}>
                    <div>
                      <h4 className="font-coc text-xs mb-3 text-center border-b border-white/10 pb-2 text-white">
                        {sponsor.name}
                      </h4>
                      <p className="text-[11px] font-body leading-relaxed text-center text-slate-300">
                        {sponsor.description}
                      </p>
                    </div>

                    <button 
                      className={`block w-full text-center font-coc text-[8.5px] py-2 px-3 rounded-lg border-2 transition-all active:scale-95 cursor-pointer ${
                        isAkatsuki 
                          ? 'bg-red-500 text-white hover:bg-red-600 border-red-300 shadow-[0_2px_0_#200002]' 
                          : 'bg-orange-600 text-white hover:bg-orange-700 border-orange-400 shadow-[0_2px_0_#3d1a04]'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
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
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-xl border-3 shadow-2xl font-coc text-[10px] text-white flex items-center gap-3 backdrop-blur-md"
            style={{
              backgroundImage: isAkatsuki 
                ? "radial-gradient(circle at center, rgba(200, 16, 46, 0.25) 0%, rgba(10, 2, 4, 0.98) 100%)"
                : "radial-gradient(circle at center, rgba(249, 115, 22, 0.25) 0%, rgba(5, 19, 14, 0.98) 100%)",
              borderColor: isAkatsuki ? '#c8102e' : '#ff6700',
              boxShadow: isAkatsuki ? '0 12px 35px rgba(200, 16, 46, 0.45)' : '0 12px 35px rgba(249, 115, 22, 0.45)',
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

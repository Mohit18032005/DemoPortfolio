import { useTheme } from '../context/ThemeContext';
import { Volume2, VolumeX, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { isAkatsuki, isMuted, toggleTheme, toggleMute, playJutsuSound } = useTheme();

  const scrollToSection = (id) => {
    playJutsuSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    playJutsuSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Premium Logo Vector with 3D Gradients
  const LogoSymbol = () => (
    isAkatsuki ? (
      // Premium Yonko Red Cloud with inner shadows and glowing outlines
      <svg className="h-9 w-14 text-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" viewBox="0 0 100 60" fill="url(#akatsukiCloudGrad)">
        <defs>
          <linearGradient id="akatsukiCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef233c" />
            <stop offset="60%" stopColor="#c8102e" />
            <stop offset="100%" stopColor="#60000a" />
          </linearGradient>
          <filter id="inner-shadow">
            <feOffset dx="0" dy="2" />
            <feGaussianBlur stdDeviation="2" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="black" floodOpacity="0.6" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>
        <path d="M30 40c-6 0-10-4-10-10 0-5 3-9 8-10-1-2-1-4 0-6 2-4 7-6 12-4 3-4 8-6 13-4 6-6 15-4 18 3 4-2 9-2 12 1 3 3 5 7 5 10 0 7-6 12-13 12h-25z" filter="url(#inner-shadow)" />
        <path d="M30 40c-6 0-10-4-10-10 0-5 3-9 8-10-1-2-1-4 0-6 2-4 7-6 12-4 3-4 8-6 13-4 6-6 15-4 18 3 4-2 9-2 12 1 3 3 5 7 5 10 0 7-6 12-13 12h-25z" stroke="#ff8595" strokeWidth="1.5" fill="none" opacity="0.4" />
      </svg>
    ) : (
      // Premium Straw Hat Symbol in 3D gold/orange gradient
      <svg className="h-9 w-9 text-orange-500 filter drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" viewBox="0 0 24 24" fill="none" stroke="url(#strawHatGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="strawHatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe875" />
            <stop offset="50%" stopColor="#ff9f1c" />
            <stop offset="100%" stopColor="#d44e00" />
          </linearGradient>
        </defs>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M12 6c-2 2-3 4-2 6s3 2 4 0 0-4-2-6z" />
        <path d="M8 14l-2 2" />
        <path d="M16 10l2-2" />
      </svg>
    )
  );

  // 3D Styled Scroll SVG for Missions
  const ScrollIcon = () => (
    <svg className="h-6 w-6 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e29578" />
          <stop offset="30%" stopColor="#ffddd2" />
          <stop offset="70%" stopColor="#ffddd2" />
          <stop offset="100%" stopColor="#e29578" />
        </linearGradient>
        <linearGradient id="scrollWood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5a2b" />
          <stop offset="50%" stopColor="#5c3a21" />
          <stop offset="100%" stopColor="#8b5a2b" />
        </linearGradient>
      </defs>
      {/* Wooden rollers */}
      <rect x="2" y="4" width="4" height="16" rx="1.5" fill="url(#scrollWood)" stroke="#3d1a04" strokeWidth="1" />
      <rect x="18" y="4" width="4" height="16" rx="1.5" fill="url(#scrollWood)" stroke="#3d1a04" strokeWidth="1" />
      {/* Scroll body */}
      <rect x="6" y="5" width="12" height="14" fill="url(#scrollGrad)" stroke="#8b5a2b" strokeWidth="1" />
      {/* Ribbon connector */}
      <path d="M6 12h12" stroke="#c8102e" strokeWidth="1.5" strokeDasharray="2,2" />
      {/* Central tie */}
      <rect x="11" y="10" width="2" height="4" rx="0.5" fill="#c8102e" />
    </svg>
  );

  // 3D Styled Haki Flame for Conqueror Experience
  const HakiIcon = () => (
    <svg className="h-6 w-6 filter drop-shadow-[0_0_8px_rgba(56,189,248,0.7)] animate-pulse" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="hakiFlame" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
      </defs>
      <path d="M17.66 11.57c-.77-2.6-2.21-4.1-3.88-5.47-1.09-.9-2.28-1.88-2.78-3.1-.18-.45-.44-1-.1-1.45.32-.42.87-.2 1.25.07 2.21 1.61 4.38 4.38 4.38 7.38 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-1.66.67-3.22 1.76-4.34.42-.4.76-.1 1 .2.35.44.15 1.05-.19 1.5-.96 1.25-1.11 2.87-.4 4.1.72 1.25 2.15 1.9 3.57 1.62 1.83-.37 3.09-2.11 2.9-3.95z" fill="url(#hakiFlame)" />
    </svg>
  );

  // 3D Metallic Sword for Skills
  const SwordIcon = () => (
    <svg className="h-6 w-6 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] animate-spin-slow" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="steelSword" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <path d="M12 2L14.5 9L22 12l-7.5 3L12 22l-2.5-7L2 12l7.5-3L12 2z" fill="url(#steelSword)" stroke="#0f172a" strokeWidth="1" />
      {/* Core hole */}
      <circle cx="12" cy="12" r="2.5" fill="#000" stroke="#475569" strokeWidth="0.5" />
    </svg>
  );

  // Premium Jolly Roger Icon
  const HeadbandIcon = () => (
    <svg className="h-6 w-6 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="headbandMetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      {/* Cloth Band */}
      <path d="M2 12h20" stroke={isAkatsuki ? '#c8102e' : '#1e3a8a'} strokeWidth="5" strokeLinecap="round" />
      <path d="M2 12h20" stroke="#000" strokeWidth="5.5" strokeLinecap="round" opacity="0.15" />
      {/* Metal Plate */}
      <rect x="6" y="9.5" width="12" height="5" rx="0.5" fill="url(#headbandMetal)" stroke="#1e293b" strokeWidth="0.8" />
      {/* Rivets */}
      <circle cx="7.5" cy="12" r="0.5" fill="#f1f5f9" />
      <circle cx="16.5" cy="12" r="0.5" fill="#f1f5f9" />
      {/* Leaf symbol engraving */}
      <path d="M11.5 11c-1 .8-1 1.5 0 1.2s1.5-.8 0-1.2z" fill="#0f172a" />
      {isAkatsuki && <line x1="6" y1="12" x2="18" y2="12" stroke="#c8102e" strokeWidth="1" />} {/* Slashed Jolly Roger */}
    </svg>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-colors duration-500 ${
        isAkatsuki 
          ? 'bg-[#0a0406]/94 border-b-2 border-red-500/25 shadow-[0_4px_30px_rgba(200,16,46,0.15)]' 
          : 'bg-[#020b08]/94 border-b-2 border-orange-500/25 shadow-[0_4px_30px_rgba(249,115,22,0.12)]'
      } backdrop-blur-xl px-6 py-2.5`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer select-none group" onClick={handleLogoClick}>
            <LogoSymbol />
            <div className="flex flex-col">
              <span className="font-coc text-xs md:text-sm tracking-wider text-white leading-tight group-hover:text-yellow-300 transition-colors">
                MOHIT
              </span>
              <span className={`font-coc text-[8px] md:text-[9px] tracking-[0.2em] leading-none ${
                isAkatsuki ? 'text-red-500' : 'text-orange-500'
              }`}>
                {isAkatsuki ? 'YONKO' : 'PIRATE'}
              </span>
            </div>
          </div>

          {/* Pirate Styled Resource Counters (Designed like premium gaming status indicators) */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Missions Scroll Counter Container */}
            <div 
              onClick={() => scrollToSection('projects')}
              className={`flex items-center pl-3 pr-1 py-1 rounded-full border-2 text-white font-coc text-[9px] min-w-[135px] transition-all duration-200 hover:scale-105 active:scale-95 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),_0_2px_8px_rgba(0,0,0,0.4)] cursor-pointer select-none ${
                isAkatsuki 
                  ? 'bg-black/60 border-red-500/40 hover:border-red-400 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),_0_0_15px_rgba(239,68,68,0.2)]' 
                  : 'bg-black/60 border-orange-500/40 hover:border-orange-400 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),_0_0_15px_rgba(249,115,22,0.2)]'
              }`}
            >
              <div className="flex flex-col flex-1 text-left leading-none justify-center">
                <span className="text-[7px] text-slate-400 uppercase tracking-wider">Bounties</span>
                <span className="text-yellow-400 font-bold text-[10px] mt-0.5">8+ GRAND LINE</span>
              </div>
              <div className="h-7 w-7 rounded-full bg-black/40 flex items-center justify-center border border-slate-700/60 ml-2 shadow-inner">
                <ScrollIcon />
              </div>
            </div>

            {/* Haki Conqueror EXP progress capsule */}
            <div 
              onClick={() => scrollToSection('journey')}
              className={`flex items-center pl-3 pr-1 py-1 rounded-full border-2 text-white font-coc text-[9px] min-w-[150px] transition-all duration-200 hover:scale-105 active:scale-95 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),_0_2px_8px_rgba(0,0,0,0.4)] cursor-pointer select-none ${
                isAkatsuki 
                  ? 'bg-black/60 border-red-500/40 hover:border-red-400 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),_0_0_15px_rgba(56,189,248,0.2)]' 
                  : 'bg-black/60 border-orange-500/40 hover:border-orange-400 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),_0_0_15px_rgba(56,189,248,0.2)]'
              }`}
            >
              <div className="flex flex-col flex-1 text-left leading-none justify-center">
                <span className="text-[7px] text-slate-400 uppercase tracking-wider">Haki Exp</span>
                <span className="text-sky-400 font-bold text-[10px] mt-0.5">3 YRS+ New World</span>
                {/* Visual Level progress bar */}
                <div className="w-16 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-600 to-sky-400 w-[78%] rounded-full shadow-[0_0_4px_#38bdf8]" />
                </div>
              </div>
              <div className="h-7 w-7 rounded-full bg-black/40 flex items-center justify-center border border-slate-700/60 ml-2 shadow-inner">
                <HakiIcon />
              </div>
            </div>

            {/* Sword Skills capsule */}
            <div 
              onClick={() => scrollToSection('skills')}
              className={`flex items-center pl-3 pr-1 py-1 rounded-full border-2 text-white font-coc text-[9px] min-w-[135px] transition-all duration-200 hover:scale-105 active:scale-95 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),_0_2px_8px_rgba(0,0,0,0.4)] cursor-pointer select-none ${
                isAkatsuki 
                  ? 'bg-black/60 border-red-500/40 hover:border-red-400 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),_0_0_15px_rgba(168,85,247,0.2)]' 
                  : 'bg-black/60 border-orange-500/40 hover:border-orange-400 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),_0_0_15px_rgba(168,85,247,0.2)]'
              }`}
            >
              <div className="flex flex-col flex-1 text-left leading-none justify-center">
                <span className="text-[7px] text-slate-400 uppercase tracking-wider">Active Skills</span>
                <span className="text-purple-400 font-bold text-[10px] mt-0.5">12+ Mastery</span>
              </div>
              <div className="h-7 w-7 rounded-full bg-black/40 flex items-center justify-center border border-slate-700/60 ml-2 shadow-inner">
                <SwordIcon />
              </div>
            </div>

            {/* Recruit / Call Contract sealed scroll button */}
            <button 
              onClick={() => scrollToSection('contact')}
              className={`flex items-center pl-3 pr-1 py-1 rounded-full border-2 text-white font-coc text-[9px] min-w-[125px] transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(16,185,129,0.25),_inset_0_2px_4px_rgba(255,255,255,0.1)] cursor-pointer focus:outline-none ${
                isAkatsuki 
                  ? 'bg-emerald-950/40 border-emerald-500/50 hover:border-emerald-400 animate-pulse' 
                  : 'bg-emerald-950/40 border-emerald-500/50 hover:border-emerald-400 animate-pulse'
              }`}
            >
              <div className="flex flex-col flex-1 text-left leading-none justify-center">
                <span className="text-[7px] text-emerald-400 font-bold uppercase tracking-wider animate-pulse">Den Den Mushi</span>
                <span className="text-white font-bold text-[10px] mt-0.5">RECRUIT PIRATE</span>
              </div>
              <div className="h-7 w-7 rounded-full bg-emerald-900/40 flex items-center justify-center border border-emerald-500/50 ml-2 shadow-inner">
                <HeadbandIcon />
              </div>
            </button>

          </div>

          {/* Theme & Mute Controls */}
          <div className="flex items-center gap-3">
            {/* Audio Mute Button */}
            <button 
              onClick={toggleMute}
              className={`p-2 rounded-full border-2 transition-all hover:scale-110 active:scale-95 focus:outline-none shadow-md ${
                isAkatsuki 
                  ? 'bg-red-950/40 border-red-500/50 text-red-200 hover:bg-red-900/60 hover:shadow-red-500/10' 
                  : 'bg-orange-950/40 border-orange-500/50 text-orange-200 hover:bg-orange-900/60 hover:shadow-orange-500/10'
              }`}
              title={isMuted ? "Unmute Pirate Music" : "Mute Pirate Music"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="animate-bounce" />}
            </button>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 font-coc text-[8px] transition-all hover:scale-105 active:scale-95 focus:outline-none ${
                isAkatsuki 
                  ? 'bg-[#1c0709] border-red-500 text-red-100 shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
                  : 'bg-[#091a13] border-orange-500 text-orange-100 shadow-[0_0_10px_rgba(249,115,22,0.4)]'
              }`}
            >
              {isAkatsuki ? (
                <>
                  <Moon size={10} className="text-red-400 animate-pulse" />
                  <span>YONKO</span>
                </>
              ) : (
                <>
                  <Sun size={10} className="text-orange-400 animate-spin-slow" />
                  <span>STRAW HAT</span>
                </>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Sticky Top Indicators */}
      <div className={`fixed top-0 left-0 right-0 z-50 md:hidden flex justify-between items-center px-4 py-2 border-b transition-colors duration-500 ${
        isAkatsuki 
          ? 'bg-[#0a0406]/95 border-red-500/30' 
          : 'bg-[#020b08]/95 border-orange-500/30'
      } backdrop-blur-md shadow-md`}>
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={handleLogoClick}>
          <LogoSymbol />
          <span className="font-coc text-xs text-white">MOHIT'S LOG POSE</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className={`p-1.5 rounded-full border transition-all ${
              isAkatsuki ? 'bg-red-900/40 border-red-500/50 text-red-200' : 'bg-orange-900/40 border-orange-500/50 text-orange-200'
            }`}
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
          <button 
            onClick={toggleTheme}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full border font-coc text-[8px] ${
              isAkatsuki ? 'bg-red-950 border-red-500 text-red-100' : 'bg-orange-950 border-orange-500 text-orange-100'
            }`}
          >
            {isAkatsuki ? 'YONKO' : 'STRAW HAT'}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Troop Deployment Navigation Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-around items-center px-2 py-1.5 border-t-3 transition-colors duration-500 ${
        isAkatsuki 
          ? 'bg-[#0c0506]/95 border-red-500 shadow-[0_-4px_10px_rgba(239,68,68,0.3)]' 
          : 'bg-[#020b08]/95 border-orange-500 shadow-[0_-4px_10px_rgba(249,115,22,0.3)]'
      } backdrop-blur-md pb-safe`}>
        {[
          { id: 'projects', label: 'BOUNTIES', icon: <ScrollIcon /> },
          { id: 'journey', label: 'JOURNEY', icon: <HakiIcon /> },
          { id: 'skills', label: 'SKILLS', icon: <SwordIcon /> },
          { id: 'card-generator', label: 'POSTER', icon: <HeadbandIcon /> },
          { id: 'contact', label: 'RECRUIT', icon: <HeadbandIcon />, highlight: true }
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(item.id)}
            className={`flex flex-col items-center justify-center p-1 w-14 rounded-lg border transition-all active:scale-90 focus:outline-none ${
              item.highlight
                ? 'border-emerald-500 bg-emerald-950/40 animate-pulse'
                : isAkatsuki
                  ? 'border-red-900/40 bg-red-950/20'
                  : 'border-orange-900/40 bg-orange-950/20'
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center mb-0.5">
              {item.icon}
            </div>
            <span className={`font-coc text-[7px] text-white tracking-wide truncate max-w-full ${
              item.highlight ? 'text-emerald-400 font-semibold' : ''
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Navbar;

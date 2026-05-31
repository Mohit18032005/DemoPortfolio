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

  // Inline Custom SVGs for Naruto Theme
  const LogoSymbol = () => (
    isAkatsuki ? (
      // Akatsuki Red Cloud SVG
      <svg className="h-8 w-12 text-red-500 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]" viewBox="0 0 100 60" fill="currentColor">
        <path d="M30 40c-6 0-10-4-10-10 0-5 3-9 8-10-1-2-1-4 0-6 2-4 7-6 12-4 3-4 8-6 13-4 6-6 15-4 18 3 4-2 9-2 12 1 3 3 5 7 5 10 0 7-6 12-13 12h-25z" />
        <path d="M50 45c-4 0-7-2-7-6 0-3 2-6 5-6H60c3 0 5 3 5 6s-2 6-5 6h-10z" fill="#fff" opacity="0.15" />
      </svg>
    ) : (
      // Konoha Leaf Symbol SVG
      <svg className="h-8 w-8 text-orange-500 filter drop-shadow-[0_0_6px_rgba(249,115,22,0.7)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M12 6c-2 2-3 4-2 6s3 2 4 0 0-4-2-6z" />
        <path d="M8 14l-2 2" />
        <path d="M16 10l2-2" />
      </svg>
    )
  );

  const ScrollIcon = () => (
    <svg className="h-4 w-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19,3H5C3.89,3 3,3.89 3,5V9C3,9.88 3.58,10.62 4.38,10.87C3.58,11.13 3,11.87 3,12.75V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V12.75C21,11.87 20.42,11.13 19.62,10.87C20.42,10.62 21,9.88 21,9V5C21,3.89 20.11,3 19,3M5,5H7V9H5V5M19,19H17V12.75H19V19M19,9H17V5H19V9M7,12.75H5V19H7V12.75M9,5H15V9H9V5M9,12.75H15V19H9V12.75Z" />
    </svg>
  );

  const ChakraIcon = () => (
    <svg className="h-4 w-4 text-sky-400 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.66 11.57c-.77-2.6-2.21-4.1-3.88-5.47-1.09-.9-2.28-1.88-2.78-3.1-.18-.45-.44-1-.1-1.45.32-.42.87-.2 1.25.07 2.21 1.61 4.38 4.38 4.38 7.38 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-1.66.67-3.22 1.76-4.34.42-.4.76-.1 1 .2.35.44.15 1.05-.19 1.5-.96 1.25-1.11 2.87-.4 4.1.72 1.25 2.15 1.9 3.57 1.62 1.83-.37 3.09-2.11 2.9-3.95z" />
    </svg>
  );

  const JutsuIcon = () => (
    <svg className="h-4 w-4 text-purple-400 animate-spin-slow" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L9 9L2 12L9 15L12 22L15 15L22 12L15 9L12 2Z" />
    </svg>
  );

  const HeadbandIcon = () => (
    <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="4" y="9" width="16" height="6" rx="1" />
      <path d="M1 12h3M20 12h3" />
      <circle cx="8" cy="12" r="0.5" fill="currentColor" />
      <circle cx="16" cy="12" r="0.5" fill="currentColor" />
      <path d="M11 11.5c0 0.5 1 0.5 1 1" />
    </svg>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-colors duration-500 ${
        isAkatsuki 
          ? 'bg-[#0f0709]/95 border-b border-red-500/30' 
          : 'bg-[#071711]/95 border-b border-orange-500/30'
      } backdrop-blur-md px-6 py-3 shadow-lg`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={handleLogoClick}>
            <LogoSymbol />
            <div className="flex flex-col">
              <span className="font-coc text-xs md:text-sm tracking-wider text-white leading-tight">
                SOUMYA
              </span>
              <span className={`font-coc text-[8px] md:text-[9px] tracking-[0.2em] leading-none ${
                isAkatsuki ? 'text-red-500' : 'text-orange-500'
              }`}>
                {isAkatsuki ? 'AKATSUKI' : 'SHINOBI'}
              </span>
            </div>
          </div>

          {/* Shinobi style Resource Counters */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Scroll Resource Counter (Missions/Projects Completed) */}
            <button 
              onClick={() => scrollToSection('projects')}
              className={`flex items-center justify-between h-9 pl-3 pr-2.5 rounded-full border-2 text-white font-coc text-[9px] min-w-[130px] transition-all hover:scale-105 active:scale-95 shadow-inner cursor-pointer focus:outline-none ${
                isAkatsuki 
                  ? 'bg-red-950/40 border-red-500/40' 
                  : 'bg-orange-950/40 border-orange-500/40'
              }`}
            >
              <span className="truncate pr-2">MISSIONS</span>
              <div className="flex items-center gap-1.5">
                <span className="text-orange-400 font-semibold">8+</span>
                <ScrollIcon />
              </div>
            </button>

            {/* Chakra Resource Counter (Sage Experience) */}
            <button 
              onClick={() => scrollToSection('journey')}
              className={`flex items-center justify-between h-9 pl-3 pr-2.5 rounded-full border-2 text-white font-coc text-[9px] min-w-[135px] transition-all hover:scale-105 active:scale-95 shadow-inner cursor-pointer focus:outline-none ${
                isAkatsuki 
                  ? 'bg-red-950/40 border-red-500/40' 
                  : 'bg-orange-950/40 border-orange-500/40'
              }`}
            >
              <span className="truncate pr-2">SAGE EXP</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sky-400 font-semibold">3 YRS+</span>
                <ChakraIcon />
              </div>
            </button>

            {/* Jutsu Counter (Skills count) */}
            <button 
              onClick={() => scrollToSection('skills')}
              className={`flex items-center justify-between h-9 pl-3 pr-2.5 rounded-full border-2 text-white font-coc text-[9px] min-w-[130px] transition-all hover:scale-105 active:scale-95 shadow-inner cursor-pointer focus:outline-none ${
                isAkatsuki 
                  ? 'bg-red-950/40 border-red-500/40' 
                  : 'bg-orange-950/40 border-orange-500/40'
              }`}
            >
              <span className="truncate pr-2">JUTSU</span>
              <div className="flex items-center gap-1.5">
                <span className="text-purple-400 font-semibold">12+</span>
                <JutsuIcon />
              </div>
            </button>

            {/* Hire Me / Recruit Headband Button */}
            <button 
              onClick={() => scrollToSection('contact')}
              className={`flex items-center justify-between h-9 pl-3 pr-2.5 rounded-full border-2 text-white font-coc text-[9px] min-w-[120px] transition-all hover:scale-105 active:scale-95 shadow-inner cursor-pointer focus:outline-none ${
                isAkatsuki 
                  ? 'bg-red-950/40 border-emerald-500/40 animate-pulse' 
                  : 'bg-orange-950/40 border-emerald-500/40 animate-pulse'
              }`}
            >
              <span className="pr-1 text-emerald-400 animate-pulse">RECRUIT</span>
              <div className="flex items-center gap-1.5">
                <HeadbandIcon />
              </div>
            </button>

          </div>

          {/* Theme & Mute Controls */}
          <div className="flex items-center gap-3">
            {/* Audio Mute Button */}
            <button 
              onClick={toggleMute}
              className={`p-2 rounded-full border-2 transition-all hover:scale-110 active:scale-95 focus:outline-none ${
                isAkatsuki 
                  ? 'bg-red-950/40 border-red-500/50 text-red-200 hover:bg-red-900/60' 
                  : 'bg-orange-950/40 border-orange-500/50 text-orange-200 hover:bg-orange-900/60'
              }`}
              title={isMuted ? "Unmute Shinobi Music" : "Mute Shinobi Music"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="animate-bounce" />}
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
                  <span>AKATSUKI</span>
                </>
              ) : (
                <>
                  <Sun size={10} className="text-orange-400 animate-spin-slow" />
                  <span>KONOHA</span>
                </>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Sticky Top Indicators */}
      <div className={`fixed top-0 left-0 right-0 z-50 md:hidden flex justify-between items-center px-4 py-2 border-b transition-colors duration-500 ${
        isAkatsuki 
          ? 'bg-[#0f0709]/95 border-red-500/30' 
          : 'bg-[#071711]/95 border-orange-500/30'
      } backdrop-blur-md shadow-md`}>
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={handleLogoClick}>
          <LogoSymbol />
          <span className="font-coc text-xs text-white">SOUMYA'S WAY</span>
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
            {isAkatsuki ? 'AKATSUKI' : 'KONOHA'}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Troop Deployment Navigation Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-around items-center px-2 py-1.5 border-t-3 transition-colors duration-500 ${
        isAkatsuki 
          ? 'bg-[#0c0506]/95 border-red-500 shadow-[0_-4px_10px_rgba(239,68,68,0.3)]' 
          : 'bg-[#05130e]/95 border-orange-500 shadow-[0_-4px_10px_rgba(249,115,22,0.3)]'
      } backdrop-blur-md pb-safe`}>
        {[
          { id: 'projects', label: 'MISSIONS', icon: <ScrollIcon /> },
          { id: 'journey', label: 'JOURNEY', icon: <ChakraIcon /> },
          { id: 'skills', label: 'JUTSU', icon: <JutsuIcon /> },
          { id: 'card-generator', label: 'CARD', icon: <HeadbandIcon /> },
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

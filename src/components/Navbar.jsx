import { useTheme } from '../context/ThemeContext';
import { Volume2, VolumeX, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { isNight, isMuted, toggleTheme, toggleMute, playCoinSound } = useTheme();

    const scrollToSection = (id) => {
    playCoinSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    playCoinSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-colors duration-500 ${
        isNight 
          ? 'bg-dark-elixir-bg/95 border-b border-purple-500/30' 
          : 'bg-amber-950/95 border-b border-yellow-700/30'
      } backdrop-blur-md px-6 py-3 shadow-lg`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={handleLogoClick}>
            <img 
              src={isNight ? '/night-theme/NightShield.webp' : '/ShieldClan Badge Icon.webp'} 
              alt="Chieftain Shield Logo" 
              className={`h-9 w-auto object-contain rounded transition-all duration-300 ${
                isNight ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : 'drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]'
              }`}
            />
            <div className="flex flex-col">
              <span className="font-coc text-xs md:text-sm tracking-wider text-white leading-tight">
                SOUMYA'S
              </span>
              <span className={`font-coc text-[8px] md:text-[9px] tracking-[0.2em] leading-none ${
                isNight ? 'text-purple-400' : 'text-yellow-400'
              }`}>
                BASE
              </span>
            </div>
          </div>

          {/* Clash style Resource Counters */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Gold Resource Counter (Projects Completed) */}
            <button 
              onClick={() => scrollToSection('projects')}
              className={`flex items-center justify-between h-9 pl-3 pr-1 rounded-full border-2 text-white font-coc text-[9px] min-w-[130px] transition-all hover:scale-105 active:scale-95 shadow-inner cursor-pointer focus:outline-none ${
                isNight 
                  ? 'bg-purple-950/50 border-purple-500/50' 
                  : 'bg-amber-900/50 border-yellow-600/50'
              }`}
            >
              <span className="truncate pr-2">PROJECTS</span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">8+</span>
                <img src="/Gold Coin Icon.webp" alt="Gold" className="h-6 w-6 object-contain" />
              </div>
            </button>

            {/* Elixir Resource Counter (Years of Experience) */}
            <button 
              onClick={() => scrollToSection('journey')}
              className={`flex items-center justify-between h-9 pl-3 pr-1 rounded-full border-2 text-white font-coc text-[9px] min-w-[135px] transition-all hover:scale-105 active:scale-95 shadow-inner cursor-pointer focus:outline-none ${
                isNight 
                  ? 'bg-purple-950/50 border-purple-500/50' 
                  : 'bg-amber-900/50 border-yellow-600/50'
              }`}
            >
              <span className="truncate pr-2">EXPERIENCE</span>
              <div className="flex items-center gap-1">
                <span className="text-pink-400">3 YRS+</span>
                <img src="/Elixir Drop Icon.webp" alt="Elixir" className="h-6 w-6 object-contain" />
              </div>
            </button>

            {/* Dark Elixir Counter (Skills count) */}
            <button 
              onClick={() => scrollToSection('skills')}
              className={`flex items-center justify-between h-9 pl-3 pr-1 rounded-full border-2 text-white font-coc text-[9px] min-w-[130px] transition-all hover:scale-105 active:scale-95 shadow-inner cursor-pointer focus:outline-none ${
                isNight 
                  ? 'bg-purple-950/50 border-purple-500/50' 
                  : 'bg-amber-900/50 border-yellow-600/50'
              }`}
            >
              <span className="truncate pr-2">SKILLS</span>
              <div className="flex items-center gap-1">
                <span className="text-purple-400">12+</span>
                <img src="/Dark Elixir Icon.webp" alt="Dark Elixir" className="h-6 w-6 object-contain" />
              </div>
            </button>

            {/* Gem Counter (Contact/Hire button) */}
            <button 
              onClick={() => scrollToSection('contact')}
              className={`flex items-center justify-between h-9 pl-3 pr-1 rounded-full border-2 text-white font-coc text-[9px] min-w-[110px] transition-all hover:scale-105 active:scale-95 shadow-inner cursor-pointer focus:outline-none ${
                isNight 
                  ? 'bg-purple-950/50 border-purple-500/50 animate-pulse' 
                  : 'bg-amber-900/50 border-yellow-600/50 animate-pulse'
              }`}
            >
              <span className="pr-1 text-emerald-400 animate-pulse">HIRE ME</span>
              <div className="flex items-center gap-1">
                <img src="/Gem Icon.webp" alt="Gems" className="h-6 w-6 object-contain animate-pulse-slow" />
              </div>
            </button>

          </div>

          {/* Theme & Mute Controls */}
          <div className="flex items-center gap-3">
            {/* Audio Mute Button */}
            <button 
              onClick={toggleMute}
              className={`p-2 rounded-full border-2 transition-all hover:scale-110 active:scale-95 focus:outline-none ${
                isNight 
                  ? 'bg-purple-900/40 border-purple-500/50 text-purple-200 hover:bg-purple-800/60' 
                  : 'bg-amber-900/40 border-yellow-600/50 text-yellow-200 hover:bg-amber-800/60'
              }`}
              title={isMuted ? "Unmute Theme Music" : "Mute Theme Music"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="animate-bounce" />}
            </button>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 font-coc text-[8px] transition-all hover:scale-105 active:scale-95 focus:outline-none ${
                isNight 
                  ? 'bg-purple-900 border-purple-500 text-purple-100 shadow-[0_0_10px_rgba(168,85,247,0.5)]' 
                  : 'bg-amber-900 border-yellow-500 text-yellow-100'
              }`}
            >
              {isNight ? (
                <>
                  <Moon size={10} className="text-purple-300" />
                  <span>BUILDER BASE</span>
                </>
              ) : (
                <>
                  <Sun size={10} className="text-yellow-300 animate-spin-slow" />
                  <span>HOME BASE</span>
                </>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Sticky Top Indicators */}
      <div className={`fixed top-0 left-0 right-0 z-50 md:hidden flex justify-between items-center px-4 py-2 border-b transition-colors duration-500 ${
        isNight 
          ? 'bg-dark-elixir-bg/95 border-purple-500/30' 
          : 'bg-amber-950/95 border-yellow-700/30'
      } backdrop-blur-md shadow-md`}>
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={handleLogoClick}>
          <img 
            src={isNight ? '/night-theme/NightShield.webp' : '/ShieldClan Badge Icon.webp'} 
            alt="Chieftain Shield Logo" 
            className="h-7 w-auto object-contain rounded" 
          />
          <span className="font-coc text-xs text-white">SOUMYA'S BASE</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className={`p-1.5 rounded-full border transition-all ${
              isNight ? 'bg-purple-900/40 border-purple-500/50 text-purple-200' : 'bg-amber-900/40 border-yellow-600/50 text-yellow-200'
            }`}
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
          <button 
            onClick={toggleTheme}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full border font-coc text-[8px] ${
              isNight ? 'bg-purple-900 border-purple-500 text-purple-100' : 'bg-amber-900 border-yellow-500 text-yellow-100'
            }`}
          >
            {isNight ? 'NIGHT' : 'DAY'}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Troop Deployment Navigation Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-around items-center px-2 py-1.5 border-t-3 transition-colors duration-500 ${
        isNight 
          ? 'bg-purple-950/95 border-purple-500 shadow-[0_-4px_10px_rgba(168,85,247,0.3)]' 
          : 'bg-amber-950/95 border-yellow-700 shadow-[0_-4px_10px_rgba(40,16,0,0.5)]'
      } backdrop-blur-md pb-safe`}>
        {[
          { id: 'projects', label: 'WAR MAP', icon: '/Gold Coin Icon.webp' },
          { id: 'journey', label: 'JOURNEY', icon: '/Elixir Drop Icon.webp' },
          { id: 'skills', label: 'SKILLS', icon: '/Dark Elixir Icon.webp' },
          { id: 'card-generator', label: 'CARD', icon: '/ShieldClan Badge Icon.webp' },
          { id: 'contact', label: 'HIRE ME', icon: '/Gem Icon.webp', highlight: true }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`flex flex-col items-center justify-center p-1 w-14 rounded-lg border transition-all active:scale-90 focus:outline-none ${
              item.highlight
                ? 'border-emerald-500 bg-emerald-950/40 animate-pulse'
                : isNight
                  ? 'border-purple-800/40 bg-purple-900/20'
                  : 'border-yellow-800/40 bg-amber-900/20'
            }`}
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5 object-contain mb-0.5" />
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

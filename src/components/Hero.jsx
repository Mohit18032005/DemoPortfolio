import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const { isNight, startMusic, playCoinSound } = useTheme();
  const [showIntro, setShowIntro] = useState(true);

  const handleEnterBase = () => {
    playCoinSound();
    startMusic();
    setShowIntro(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Intro / Loading Overlay Screen */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black select-none"
          >
            {/* Intro Background */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-[6px] scale-105 brightness-[0.4]"
              style={{ backgroundImage: "url('/Background.webp')" }}
            />

            {/* Intro Content & Button (Enter Base / Attack style) */}
            <div className="relative z-10 mt-52 sm:mt-72 md:mt-80 text-center flex flex-col items-center gap-3">
              <h1 className="font-coc text-base sm:text-xl md:text-2xl text-yellow-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] tracking-wider">
                SOUMYA'S BASE
              </h1>
              <p className="font-coc text-[9px] sm:text-xs text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-widest max-w-xs uppercase">
                Preparing Spell Factory...
              </p>
              
              <motion.button
                onClick={handleEnterBase}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="btn-coc-gold px-12 py-5 text-base sm:text-lg md:text-xl cursor-pointer focus:outline-none mt-4 tracking-widest font-coc"
              >
                ENTER BASE
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Base Background (Transitions Day/Night) */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          key={isNight ? 'night-bg' : 'day-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          src={isNight ? '/night-theme/BuilderBaseBackground.webp' : '/Background.webp'} 
          alt="Clash of Clans Base Background" 
          className="w-full h-full object-cover scale-105"
        />
        {/* Dark overlay for night mode */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          isNight ? 'bg-purple-950/20 backdrop-brightness-[0.75]' : 'bg-transparent'
        }`} />
      </div>

      {/* Floating Characters (Dynamic based on theme) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        
        {/* Left Side Character */}
        <motion.img 
          key={isNight ? 'night-left' : 'day-left'}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50, delay: 0.5 }}
          src={isNight ? '/night-theme/RagedBarbarian.webp' : '/Barbarian.webp'} 
          alt="Left Troop" 
          className="absolute left-[3%] lg:left-[8%] bottom-[12%] md:bottom-[15%] h-[32%] md:h-[45%] lg:h-[55%] w-auto object-contain character-idle drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
        />

        {/* Right Side Character */}
        <motion.img 
          key={isNight ? 'night-right' : 'day-right'}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50, delay: 0.7 }}
          src={isNight ? '/night-theme/NightWitch.webp' : '/ArcherQueen.webp'} 
          alt="Right Troop" 
          className="absolute right-[3%] lg:right-[8%] bottom-[12%] md:bottom-[15%] h-[32%] md:h-[45%] lg:h-[55%] w-auto object-contain character-idle drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
        />

        {/* Center Bottom Character */}
        <motion.img 
          key={isNight ? 'night-center' : 'day-center'}
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 60, delay: 0.9 }}
          src={isNight ? '/night-theme/SuperPekka.webp' : '/Valkyrie_Warrior_Girl_Character.webp'} 
          alt="Center Troop" 
          className="absolute left-1/2 -translate-x-1/2 bottom-[2%] md:bottom-[5%] h-[24%] md:h-[35%] lg:h-[40%] w-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)]"
        />

        {/* Flying Sky Character */}
        <motion.img 
          key={isNight ? 'night-sky' : 'day-sky'}
          initial={{ y: -50, x: -100, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          src={isNight ? '/night-theme/DropShip.webp' : '/DragonElectro_Dragon-removebg-preview.webp'} 
          alt="Sky Troop" 
          className="absolute left-[15%] top-[18%] h-[12%] md:h-[18%] lg:h-[22%] w-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Hero Content Panel (Wood board style) */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center mt-12 sm:mt-16 md:mt-24">
        

        {/* The Clan Wars Logo text */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-6 mt-2"
        >
          <h1 
            className={`coc-logo-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center select-none tracking-widest ${
              isNight ? 'hue-rotate-[240deg] brightness-125' : ''
            }`}
          >
            SOUMYA'S BASE
          </h1>
        </motion.div>

        {/* Central Styled Wood Panel for info */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className={`max-w-xl mx-auto p-5 sm:p-6 mb-8 ${
            isNight ? 'panel-wood-night' : 'panel-wood-day'
          }`}
        >
          <h2 className="font-coc text-xs sm:text-sm md:text-base text-yellow-300 mb-3 tracking-wide leading-relaxed drop-shadow">
            CHIEFTAIN SOUMYA CHAKRABORTY
          </h2>
          
          <p className="font-coc text-[9px] sm:text-xs text-white tracking-widest uppercase mb-4 leading-normal drop-shadow-md">
            LEVEL 11 TOWN HALL DEVELOPER
          </p>

          <p className="text-xs text-slate-200 font-body mb-5 max-w-md mx-auto leading-relaxed">
            Clash with Codes, Conquer with Architectures! Grand Warden of Full-Stack software engineering, building theme-rich web apps and interactive UI systems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-coc text-slate-300">
            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-slate-700">
              <span className="text-yellow-400">🏆</span>
              <span>8+ COMPLETED WAR BLUEPRINTS</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-slate-700">
              <span className="text-purple-400">🧪</span>
              <span>3+ YEARS BATTLE EXP</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Button Group */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-30"
        >
          <button 
            onClick={() => {
              playCoinSound();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-coc-gold px-8 py-3.5 text-xs sm:text-sm min-w-[220px] cursor-pointer focus:outline-none"
          >
            WAR BLUEPRINTS
          </button>

          <button 
            onClick={() => {
              playCoinSound();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-coc-blue px-8 py-3.5 text-xs sm:text-sm min-w-[220px] cursor-pointer focus:outline-none"
          >
            SEND CLAN INVITE
          </button>
        </motion.div>

      </div>
      
    </div>
  );
};

export default Hero;

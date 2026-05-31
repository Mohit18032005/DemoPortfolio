import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic HTML5 Canvas Particle Engine for cinematic background video effects
const ParticleCanvas = ({ isAkatsuki }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Setup particles based on active Shinobi alliance
    const particles = [];
    const particleCount = isAkatsuki ? 65 : 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isAkatsuki ? (Math.random() * 2 + 1) : (Math.random() * 4 + 2), // embers/rain vs sakura petals
        speedX: isAkatsuki ? (Math.random() * 0.3 - 0.15) : (Math.random() * 0.5 + 0.35),
        speedY: isAkatsuki ? (Math.random() * 3.5 + 2.5) : (Math.random() * 1.1 + 0.85),
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.02 - 0.01,
        color: isAkatsuki
          ? (Math.random() > 0.55 ? 'rgba(239, 68, 68, 0.35)' : 'rgba(249, 115, 22, 0.4)') // red rain / orange embers
          : `rgba(255, 183, 197, ${Math.random() * 0.5 + 0.35})`, // pink cherry blossom petals
        type: isAkatsuki ? (Math.random() > 0.55 ? 'rain' : 'ember') : 'petal'
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.save();
        if (p.type === 'petal') {
          // Draw falling Sakura Petal
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 1.8, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'rain') {
          // Draw falling red storm rain
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 1.5, p.y + p.speedY * 1.5);
          ctx.stroke();
        } else if (p.type === 'ember') {
          // Draw rising ember
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Position Updates
        p.x += p.speedX;
        p.y += p.type === 'ember' ? -p.speedY * 0.3 : p.speedY;

        if (p.type === 'petal') {
          p.angle += p.spin;
        }

        // Boundary wrap
        if (p.y > canvas.height || p.x > canvas.width || p.x < 0 || (p.type === 'ember' && p.y < 0)) {
          p.x = Math.random() * canvas.width;
          p.y = p.type === 'ember' ? canvas.height : -20;
          p.size = isAkatsuki ? (Math.random() * 2 + 1) : (Math.random() * 4 + 2);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAkatsuki]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-75" />;
};

const Hero = () => {
  const { 
    isAkatsuki, 
    startMusic, 
    playJutsuSound,
    playSharinganSound,
  } = useTheme();
  const [showIntro, setShowIntro] = useState(true);

  const handleEnterBase = () => {
    playSharinganSound();
    startMusic();
    setShowIntro(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Dynamic particles overlays for video-like background animation */}
      <ParticleCanvas isAkatsuki={isAkatsuki} />

      {/* Intro / Loading Overlay Screen */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05020a] select-none"
          >
            {/* Intro Background */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-[6px] scale-105 brightness-[0.3] transition-all duration-1000"
              style={{ backgroundImage: `url(${isAkatsuki ? '/akatsuki-bg.png' : '/konoha-bg.png'})` }}
            />

            {/* Intro Content & Button */}
            <div className="relative z-10 text-center flex flex-col items-center gap-5 px-4">
              <h1 className={`font-coc text-2xl sm:text-3xl md:text-5xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] tracking-widest leading-none ${
                isAkatsuki ? 'akatsuki-logo-text' : 'coc-logo-text'
              }`}>
                {isAkatsuki ? "AKATSUKI ARCHIVE" : "KONOHA ARCHIVE"}
              </h1>
              <p className="font-coc text-[9px] sm:text-xs text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-widest max-w-sm uppercase animate-pulse">
                Unlocking Chakra Elemental Gates...
              </p>
              
              <motion.button
                onClick={handleEnterBase}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`px-12 py-5 text-base sm:text-lg cursor-pointer focus:outline-none mt-4 tracking-widest font-coc transition-all ${
                  isAkatsuki ? 'btn-rogue-crimson' : 'btn-shinobi-orange'
                }`}
              >
                UNLEASH CHAKRA
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Base Background (Transitions Konoha/Akatsuki) */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          key={isAkatsuki ? 'akatsuki-bg' : 'konoha-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          src={isAkatsuki ? '/akatsuki-bg.png' : '/konoha-bg.png'} 
          alt="Shinobi Base Background" 
          className="w-full h-full object-cover scale-105"
        />
        {/* Dark overlay for night mode */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          isAkatsuki ? 'bg-red-950/25 backdrop-brightness-[0.55]' : 'bg-black/35 backdrop-brightness-[0.8]'
        }`} />
      </div>

      {/* Hero Content Panel (Ninja scroll/steel style) */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 text-center mt-12 sm:mt-16 md:mt-24">
        
        {/* Logo Text */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-6 mt-2"
        >
          <h1 
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center select-none tracking-widest leading-none ${
              isAkatsuki ? 'akatsuki-logo-text' : 'coc-logo-text'
            }`}
          >
            {isAkatsuki ? "SOUMYA'S NINDO" : "SOUMYA'S WAY"}
          </h1>
        </motion.div>

        {/* Central Styled Wood Panel for info */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className={`max-w-xl mx-auto p-6 sm:p-7 mb-8 ${
            isAkatsuki ? 'panel-steel-akatsuki' : 'panel-scroll-konoha'
          }`}
        >
          <h2 className="font-coc text-xs sm:text-sm md:text-base mb-3 tracking-wide leading-relaxed drop-shadow">
            {isAkatsuki ? "ROGUE SHINOBI SOUMYA" : "SAGE SOUMYA CHAKRABORTY"}
          </h2>
          
          <p className={`font-coc text-[9px] sm:text-xs tracking-widest uppercase mb-4 leading-normal drop-shadow-md ${
            isAkatsuki ? 'text-red-400' : 'text-orange-700'
          }`}>
            LEVEL 11 CHAKRA FULL-STACK DEVELOPER
          </p>

          <p className={`text-xs font-body mb-5 max-w-md mx-auto leading-relaxed ${
            isAkatsuki ? 'text-slate-300' : 'text-amber-900'
          }`}>
            Weave Hand Signs with Code, Conquer with Architecture! Chunin of Full-Stack software engineering, crafting theme-rich jutsu and interactive web ecosystems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-coc">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-black/40 ${
              isAkatsuki ? 'border-red-500/30 text-red-300' : 'border-orange-500/30 text-orange-900'
            }`}>
              <span>📜</span>
              <span>8+ S-RANK MISSIONS</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-black/40 ${
              isAkatsuki ? 'border-red-500/30 text-red-300' : 'border-orange-500/30 text-orange-900'
            }`}>
              <span>🔥</span>
              <span>3+ YEARS SAGE TRAINING</span>
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
              playJutsuSound();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-8 py-3.5 text-xs sm:text-sm min-w-[220px] cursor-pointer focus:outline-none transition-all ${
              isAkatsuki ? 'btn-rogue-crimson' : 'btn-shinobi-orange'
            }`}
          >
            NINDO PATHWAYS
          </button>

          <button 
            onClick={() => {
              playJutsuSound();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-shinobi-blue px-8 py-3.5 text-xs sm:text-sm min-w-[220px] cursor-pointer focus:outline-none transition-all"
          >
            SEND SUMMONING SCROLL
          </button>
        </motion.div>

      </div>
      
    </div>
  );
};

export default Hero;

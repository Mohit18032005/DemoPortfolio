import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import TiltCard from './TiltCard';

// Dynamic HTML5 Canvas Particle Engine for cinematic background haki effects
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

    // Setup particles based on active Pirate crew
    const particles = [];
    const particleCount = isAkatsuki ? 80 : 55;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isAkatsuki ? (Math.random() * 2.5 + 1) : (Math.random() * 3.5 + 2),
        speedX: isAkatsuki ? (Math.random() * 0.4 - 0.2) : (Math.random() * 0.6 + 0.3),
        speedY: isAkatsuki ? (Math.random() * 3.5 + 2.0) : (Math.random() * 1.2 + 0.7),
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.4 + 0.4,
        color: isAkatsuki
          ? (Math.random() > 0.6 ? `rgba(239, 68, 68, ${Math.random() * 0.5 + 0.3})` : `rgba(249, 115, 22, ${Math.random() * 0.5 + 0.35})`)
          : `rgba(255, 183, 197, ${Math.random() * 0.4 + 0.4})`,
        type: isAkatsuki ? (Math.random() > 0.6 ? 'rain' : 'ember') : 'petal'
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.save();
        if (p.type === 'petal') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 1.8, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'rain') {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 1.5, p.y + p.speedY * 1.5);
          ctx.stroke();
        } else if (p.type === 'ember') {
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = isAkatsuki ? 'rgba(239, 68, 68, 0.8)' : 'rgba(249, 115, 22, 0.8)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Position Updates
        p.x += p.speedX;
        p.y += p.type === 'ember' ? -p.speedY * 0.35 : p.speedY;

        if (p.type === 'petal') {
          p.angle += p.spin;
        }

        // Boundary wrap
        if (p.y > canvas.height || p.x > canvas.width || p.x < 0 || (p.type === 'ember' && p.y < 0)) {
          p.x = Math.random() * canvas.width;
          p.y = p.type === 'ember' ? canvas.height : -20;
          p.size = isAkatsuki ? (Math.random() * 2.5 + 1) : (Math.random() * 3.5 + 2);
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

  // Mouse tracking variables for premium background 3D parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), { damping: 25, stiffness: 100 });
  const bgY = useSpring(useTransform(mouseY, [-500, 500], [-15, 15]), { damping: 25, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050106] select-none"
          >
            {/* Intro Background */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-[8px] scale-105 brightness-[0.25] transition-all duration-1000"
              style={{ backgroundImage: `url(${isAkatsuki ? '/yonko-bg.jpg' : '/grand-line-bg.jpg'})` }}
            />

            {/* Radial ambient glow behind content */}
            <div className={`absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-25 pointer-events-none ${
              isAkatsuki ? 'bg-red-600' : 'bg-orange-500'
            }`} />

            {/* Intro Content & Button */}
            <div className="relative z-10 text-center flex flex-col items-center gap-5 px-4">
              <h1 className={`font-coc text-2xl sm:text-3xl md:text-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] tracking-widest leading-none ${
                isAkatsuki ? 'yonko-logo-text' : 'strawhat-logo-text'
              }`}>
                {isAkatsuki ? "YONKO ARCHIVE" : "STRAW HAT ARCHIVE"}
              </h1>
              <p className="font-coc text-[9px] sm:text-xs text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-widest max-w-sm uppercase animate-pulse">
                Unlocking Haki Elemental Gates...
              </p>
              
              <motion.button
                onClick={handleEnterBase}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className={`px-12 py-5 text-base sm:text-lg cursor-pointer focus:outline-none mt-4 tracking-widest font-coc transition-all ${
                  isAkatsuki ? 'btn-rogue-crimson' : 'btn-pirate-orange'
                }`}
              >
                UNLEASH HAKI
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Base Background (Transitions Straw Hat/Yonko with 3D Parallax) */}
      <div className="absolute inset-0 z-0 scale-105 pointer-events-none select-none">
        <motion.img 
          key={isAkatsuki ? 'yonko-bg' : 'grand-line-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ x: bgX, y: bgY }}
          transition={{ duration: 1 }}
          src={isAkatsuki ? '/yonko-bg.jpg' : '/grand-line-bg.jpg'} 
          alt="Pirate Base Background" 
          className="w-full h-full object-cover brightness-110 contrast-105 saturate-110"
        />
        {/* Theme-matched gradient overlays for readability and atmosphere */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isAkatsuki 
            ? 'bg-gradient-to-b from-[#0a0406]/50 via-[#070102]/65 to-[#0e0205]/95' 
            : 'bg-gradient-to-b from-[#020b08]/40 via-[#05130e]/55 to-[#03120b]/92'
        }`} />
        {/* Radial spotlight for hero focal point */}
        <div className={`absolute inset-0 ${
          isAkatsuki 
            ? 'bg-[radial-gradient(ellipse_at_center,_rgba(200,16,46,0.08)_0%,_transparent_70%)]' 
            : 'bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.08)_0%,_transparent_70%)]'
        }`} />
      </div>

      {/* Hero Content Panel */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 text-center mt-12 sm:mt-16 md:mt-24">
        
        {/* Logo Title */}
        <motion.div
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8 mt-2"
        >
          <h1 
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center select-none tracking-widest leading-none ${
              isAkatsuki ? 'yonko-logo-text' : 'strawhat-logo-text'
            }`}
          >
            {isAkatsuki ? "MOHIT'S LOG POSE" : "MOHIT'S DREAM"}
          </h1>
        </motion.div>

        {/* Central 3D Tilting Bio Panel */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="max-w-xl mx-auto mb-10"
        >
          <TiltCard 
            intensity={16} 
            glowColor={isAkatsuki ? 'rgba(239, 68, 68, 0.12)' : 'rgba(249, 115, 22, 0.12)'}
          >
            <div className={`p-6 sm:p-8 text-center rounded-2xl border-4 shadow-2xl relative tilt-card-shadow transition-all preserve-3d ${
              isAkatsuki ? 'panel-steel-yonko' : 'panel-scroll-strawhat'
            }`}>
              {/* Classified Stamp */}
              <div className="absolute -top-4 -right-4 md:-right-8 transform rotate-[15deg] z-50 pointer-events-none pop-out-3">
                <div className={`border-4 rounded px-3 py-1 font-coc text-xs md:text-sm tracking-[0.2em] shadow-lg backdrop-blur-sm ${
                  isAkatsuki ? 'border-red-600 text-red-500 bg-red-950/40' : 'border-amber-600 text-amber-600 bg-amber-100/60'
                }`}>
                  CLASSIFIED
                </div>
              </div>
              
              <h2 className="font-coc text-xs sm:text-sm md:text-base mb-2.5 tracking-wide leading-relaxed drop-shadow pop-out-2">
                {isAkatsuki ? "EMPEROR MOHIT" : "PIRATE MOHIT KHAN"}
              </h2>
              
              <p className={`font-coc text-[9px] sm:text-xs tracking-widest uppercase mb-4 leading-normal drop-shadow-md font-bold pop-out-3 ${
                isAkatsuki ? 'text-red-500' : 'text-orange-700'
              }`}>
                CONQUEROR'S HAKI AI & ML ENGINEER
              </p>

              <p className={`text-xs sm:text-sm font-body mb-6 max-w-md mx-auto leading-relaxed pop-out-1 ${
                isAkatsuki ? 'text-slate-300' : 'text-amber-950/90 font-medium'
              }`}>
                Navigate the Grand Line with Data, Conquer with AI! Captain of Artificial Intelligence, crafting intelligent systems, IoT ecosystems, and data-driven insights.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-[9px] font-coc pop-out-2">
                <div className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border shadow-md ${
                  isAkatsuki 
                    ? 'bg-red-950/40 border-red-500/30 text-red-300' 
                    : 'bg-amber-800/15 border-amber-700/30 text-amber-900 font-bold'
                }`}>
                  <span>📜</span>
                  <span>8+ GRAND LINE BOUNTIES</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border shadow-md ${
                  isAkatsuki 
                    ? 'bg-red-950/40 border-red-500/30 text-red-300' 
                    : 'bg-amber-800/15 border-amber-700/30 text-amber-900 font-bold'
                }`}>
                  <span>🔥</span>
                  <span>3+ YEARS NEW WORLD TRAINING</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* CTA Button Group with Glow Effects */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-30"
        >
          <motion.button 
            onClick={() => {
              playJutsuSound();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: isAkatsuki
                ? '0 0 35px rgba(239, 68, 68, 0.5), 0 4px 0 #150002, 0 6px 12px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.3)'
                : '0 0 35px rgba(249, 115, 22, 0.5), 0 4px 0 #1b0c02, 0 6px 12px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.4)'
            }}
            whileTap={{ scale: 0.97, y: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`px-8 py-3.5 text-xs sm:text-sm min-w-[220px] cursor-pointer focus:outline-none ${
              isAkatsuki ? 'btn-rogue-crimson' : 'btn-pirate-orange'
            }`}
          >
            GRAND LINE PATHWAYS
          </motion.button>

          <motion.button 
            onClick={() => {
              playJutsuSound();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 35px rgba(56, 189, 248, 0.5), 0 4px 0 #02022e, 0 6px 12px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.4)'
            }}
            whileTap={{ scale: 0.97, y: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="btn-pirate-blue px-8 py-3.5 text-xs sm:text-sm min-w-[220px] cursor-pointer focus:outline-none"
          >
            SEND DEN DEN MUSHI
          </motion.button>
        </motion.div>

      </div>
      
    </div>
  );
};

export default Hero;

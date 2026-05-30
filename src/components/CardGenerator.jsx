import { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import html2canvas from 'html2canvas';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CardGenerator = () => {
  const { isNight, playCoinSound } = useTheme();
  const cardRef = useRef(null);
  
  const [name, setName] = useState('');
  const [selectedChar, setSelectedChar] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [generatedImgUrl, setGeneratedImgUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const characters = [
    { name: 'Barbarian', role: 'Full-Stack Developer', image: '/ID/Barbarian.png', glowColor: 'rgba(234, 179, 8, 0.4)' },
    { name: 'Pekka', role: 'Backend Heavyweight', image: '/ID/Pekka.png', glowColor: 'rgba(168, 85, 247, 0.4)' },
    { name: 'Witch', role: 'UI/UX Architect', image: '/ID/Witch.png', glowColor: 'rgba(147, 51, 234, 0.4)' },
    { name: 'Wizard', role: 'Frontend Specialist', image: '/ID/Wizard.png', glowColor: 'rgba(59, 130, 246, 0.4)' },
    { name: 'Lava Hound', role: 'DevOps Engineer', image: '/ID/Lava.png', glowColor: 'rgba(239, 68, 68, 0.4)' },
    { name: 'Wall Breaker', role: 'Bug Hunter (QA)', image: '/ID/WallBreaker.png', glowColor: 'rgba(220, 38, 38, 0.4)' }
  ];

  // Helper to generate a random 8-character tag based on name hash
  const getPlayerTag = (inputName) => {
    if (!inputName) return 'HIRESOUMYA';
    let hash = 0;
    for (let i = 0; i < inputName.length; i++) {
      hash = inputName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const chars = '0123456789ABCDEFGHJKLMNPQRSTUVW';
    let tag = '';
    let val = Math.abs(hash);
    for (let i = 0; i < 6; i++) {
      tag += chars[val % chars.length];
      val = Math.floor(val / chars.length);
    }
    return tag;
  };

  const handleDownload = async () => {
    playCoinSound();
    if (!cardRef.current || isGenerating) return;
    
    setIsGenerating(true);
    try {
      // Detect touch/mobile devices (including iPads mimicking macOS desktop)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       ('ontouchstart' in window) || 
                       (navigator.maxTouchPoints > 0);
      
      // Use 1.5x scale on mobile to save memory and avoid Safari canvas size limits, 2x on desktop for high-res
      const captureScale = isMobile ? 1.5 : 2;

      const canvas = await html2canvas(cardRef.current, {
        scale: captureScale,
        useCORS: true,
        allowTaint: false,
        logging: true,
        imageTimeout: 0,
        backgroundColor: null,
      });

      const url = canvas.toDataURL('image/png');
      setGeneratedImgUrl(url);

      if (isMobile) {
        // On mobile, show the tap-and-hold saving modal
        setShowPreviewModal(true);
      } else {
        // On desktop, trigger standard download
        const link = document.createElement('a');
        link.download = `${name ? name.replace(/\s+/g, '_') : 'recruiter'}_soumya_recruitment_card.png`;
        link.href = url;
        link.click();
      }
    } catch (err) {
      console.error('Error generating card download: ', err);
      alert(`⚠️ Laboratory alert: Failed to craft your recruitment card due to device restrictions. Try taking a screenshot instead! Error: ${err.message || err}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="relative py-24 bg-black/40">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-coc text-2xl sm:text-3xl md:text-4xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            🛡️ RECRUITMENT CARD GENERATOR
          </motion.h2>
          <p className="text-xs sm:text-sm text-slate-400 font-body max-w-lg mx-auto leading-relaxed">
            Customize and download your own troop recruitment stats card to initiate a developer hire or contract with Chieftain Soumya!
          </p>
          <div className={`w-32 h-1 mx-auto mt-4 rounded-full ${
            isNight ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'bg-yellow-500 shadow-[0_0_8px_rgba(255,215,0,0.8)]'
          }`} />
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-12 max-w-5xl mx-auto">
          
          {/* Form Control Column */}
          <div className={`w-full lg:w-1/2 p-6 flex flex-col justify-between ${
            isNight ? 'panel-wood-night' : 'panel-wood-day'
          }`}>
            <div>
              <h3 className="font-coc text-xs sm:text-sm text-white mb-6 tracking-wide uppercase">
                CUSTOMIZE RECRUITER CARD
              </h3>

              {/* Name Input */}
              <div className="mb-6">
                <label className="block font-coc text-[8px] text-yellow-400 mb-2">
                  ENTER RECRUITER / COMPANY NAME
                </label>
                <input 
                  type="text" 
                  maxLength={15}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value.toUpperCase());
                  }}
                  placeholder="e.g. VERCEL RECRUITER"
                  className={`w-full px-4 py-3 bg-black/45 border-2 rounded-lg font-coc text-xs text-white placeholder-slate-600 focus:outline-none transition-all ${
                    isNight ? 'border-purple-500/50 focus:border-purple-400' : 'border-yellow-600/50 focus:border-yellow-400'
                  }`}
                />
              </div>

              {/* Avatar Selection */}
              <div className="mb-6">
                <label className="block font-coc text-[8px] text-yellow-400 mb-3 animate-pulse">
                  SELECT SPECIALIZATION ROLE
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {characters.map((char, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playCoinSound();
                        setSelectedChar(idx);
                      }}
                      className={`relative aspect-square p-2 bg-black/30 border-2 rounded-xl flex items-center justify-center overflow-hidden transition-all hover:scale-105 active:scale-95 ${
                        selectedChar === idx 
                          ? isNight 
                            ? 'border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)] bg-purple-950/20' 
                            : 'border-yellow-400 shadow-[0_0_10px_rgba(255,215,0,0.3)] bg-yellow-950/20'
                          : 'border-slate-800'
                      }`}
                    >
                      <img 
                        src={char.image} 
                        alt={char.name} 
                        className="max-h-full max-w-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button to trigger screenshot */}
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className={`w-full mt-4 flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-coc transition-all ${
                isGenerating ? 'opacity-65 cursor-not-allowed' : ''
              } ${
                isNight ? 'btn-coc-purple' : 'btn-coc-gold'
              }`}
            >
              <Download size={14} />
              <span>{isGenerating ? 'GENERATING BLUEPRINT...' : 'DOWNLOAD RECRUIT CARD'}</span>
            </button>
          </div>

          {/* Profile Card Preview Column */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            
            {/* The HTML Card itself that is exported */}
            <div 
              ref={cardRef}
              className="relative w-80 h-[420px] rounded-3xl overflow-hidden shadow-2xl bg-slate-950 select-none"
              style={{
                backgroundImage: `url("${window.location.origin}/ID/card-background.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.7), inset 0 0 40px rgba(0,0,0,0.5)'
              }}
            >
              {/* Inner glowing aura */}
              <div 
                className="absolute inset-0 transition-colors duration-1000"
                style={{
                  background: `radial-gradient(circle at center, ${characters[selectedChar].glowColor} 0%, transparent 70%)`
                }}
              />

              {/* Decorative Corner Rivets */}
              {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, idx) => (
                <div 
                  key={idx}
                  className={`absolute ${pos} w-3 h-3 rounded-full z-20 border border-yellow-700/60 shadow-[0_1px_2px_rgba(0,0,0,0.6)]`}
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #ffd700, #b8860b, #502800)'
                  }}
                />
              ))}

              {/* Header: Title Banner */}
              <div className="relative z-10 p-5 flex flex-col items-center">
                <div className="flex items-center gap-2 bg-black/75 px-4 py-1.5 rounded-full border border-yellow-500/20 shadow-inner">
                  <div className="relative w-7 h-7 rounded-xl flex items-center justify-center shadow-md border border-yellow-400/40" style={{ background: 'linear-gradient(135deg, #ffd700, #ff8c00)' }}>
                    <span className="text-white text-xs">🧪</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-coc text-[9px] text-yellow-400 leading-none">SOUMYA'S</span>
                    <span className="font-coc text-[7px] text-sky-400 tracking-[0.2em] mt-0.5 leading-none">BASE</span>
                  </div>
                </div>

                <div className="w-[80%] h-[1px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent my-4" />

                {/* Recruiter Name */}
                <h3 className="font-coc text-sm text-white text-center tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-[240px] truncate uppercase leading-tight">
                  {name || 'YOUR COMPANY'}
                </h3>
                
                {/* Specialization Role Title */}
                <h4 className="font-coc text-[8px] text-yellow-400 text-center tracking-wider mt-1 drop-shadow uppercase leading-none">
                  {characters[selectedChar].role}
                </h4>
              </div>

              {/* Central Character Graphic */}
              <div className="absolute inset-x-0 bottom-16 top-24 flex items-center justify-center p-4">
                <motion.img 
                  key={selectedChar}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={window.location.origin + characters[selectedChar].image} 
                  alt={characters[selectedChar].name} 
                  className="max-h-full max-w-[80%] object-contain"
                />
              </div>

              {/* Player Tag */}
              <div className="absolute bottom-16 right-5 z-20 bg-black/80 px-2.5 py-1 rounded border border-sky-400/35">
                <span className="font-coc text-[8px] text-sky-400 select-all">
                  #{getPlayerTag(name)}
                </span>
              </div>

              {/* Stats Footer panel */}
              <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-center gap-3">
                
                {/* Trophy Stats Box */}
                <div className="flex items-center gap-2 bg-black/80 rounded-xl px-3 py-1.5 border border-yellow-600/30 w-[45%] shadow-inner">
                  <span className="text-sm">🏆</span>
                  <div className="flex flex-col text-left">
                    <span className="font-coc text-[6px] text-yellow-400 leading-none">DEV SCORE</span>
                    <span className="font-coc text-[9px] text-white mt-0.5 leading-none">100% BUILD</span>
                  </div>
                </div>

                {/* Level Stats Box */}
                <div className="flex items-center gap-2 bg-black/80 rounded-xl px-3 py-1.5 border border-purple-600/30 w-[45%] shadow-inner">
                  <span className="text-sm">🧪</span>
                  <div className="flex flex-col text-left">
                    <span className="font-coc text-[6px] text-purple-400 leading-none">DEV RANK</span>
                    <span className="font-coc text-[9px] text-white mt-0.5 leading-none">LEVEL 11 TH</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Mobile Download/Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`w-full max-w-sm p-6 rounded-2xl border-3 shadow-2xl relative text-center ${
                isNight ? 'panel-wood-night border-purple-500 shadow-purple-500/20' : 'panel-wood-day border-yellow-600 shadow-yellow-600/20'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playCoinSound();
                  setShowPreviewModal(false);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>

              <h3 className="font-coc text-sm text-white mb-2 tracking-wide uppercase">
                🛡️ CARD GENERATED!
              </h3>
              
              <p className="text-[11px] text-slate-300 font-body leading-relaxed mb-6 px-2">
                👇 <strong className="text-yellow-400">TAP AND HOLD (LONG PRESS)</strong> the image below, then select <strong className="text-yellow-400">"Save to Photos"</strong> or <strong className="text-yellow-400">"Download Image"</strong> to save your card.
              </p>

              {/* Image Preview Container */}
              <div className="flex justify-center mb-6 max-h-[350px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-inner">
                <img
                  src={generatedImgUrl}
                  alt="Recruitment Card"
                  className="max-h-[330px] w-auto object-contain rounded-lg pointer-events-auto"
                  style={{
                    WebkitTouchCallout: 'default',
                  }}
                />
              </div>

              <button
                onClick={() => {
                  playCoinSound();
                  setShowPreviewModal(false);
                }}
                className={`w-full py-2.5 font-coc text-[10px] sm:text-xs rounded border transition-all active:scale-95 cursor-pointer focus:outline-none ${
                  isNight 
                    ? 'bg-purple-600 text-white border-purple-400 hover:bg-purple-500' 
                    : 'bg-yellow-500 text-slate-950 border-yellow-300 hover:bg-yellow-600'
                }`}
              >
                RETURN TO VILLAGE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CardGenerator;

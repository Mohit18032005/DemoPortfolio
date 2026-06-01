import { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import html2canvas from 'html2canvas';
import { Download, DownloadCloud, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';
import CinematicReveal from './CinematicReveal';

const CardGenerator = () => {
  const { isAkatsuki, playJutsuSound } = useTheme();
  const cardRef = useRef(null);
  
  const [name, setName] = useState('');
  const [selectedChar, setSelectedChar] = useState(0);
  const [chakraNature, setChakraNature] = useState('Wind (Fūton)');
  const [shinobiRank, setShinobiRank] = useState('Genin');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [generatedImgUrl, setGeneratedImgUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const characters = [
    { name: 'Naruto Uzumaki', role: 'Ninjutsu Master', glowColor: 'rgba(249, 115, 22, 0.45)', element: 'Wind (Fūton)', image: '/naruto_portrait.png' },
    { name: 'Sasuke Uchiha', role: 'Special Ops / Spy', glowColor: 'rgba(56, 189, 248, 0.45)', element: 'Lightning (Raiton)', image: '/sasuke_portrait.png' },
    { name: 'Kakashi Hatake', role: 'Tactical Commander', glowColor: 'rgba(168, 85, 247, 0.45)', element: 'All Elements', image: '/kakashi_portrait.png' },
    { name: 'Itachi Uchiha', role: 'Genjutsu Master', glowColor: 'rgba(239, 68, 68, 0.45)', element: 'Fire (Katon)', image: '/itachi_portrait.png' },
    { name: 'Tobi', role: 'Space-Time Specialist', glowColor: 'rgba(234, 88, 12, 0.45)', element: 'Earth (Doton)', image: '/tobi_portrait.png' },
    { name: 'Minato Namikaze', role: 'DevOps / Speed Engine', glowColor: 'rgba(253, 224, 71, 0.45)', element: 'Space-Time', image: '/minato_portrait.png' }
  ];

  const getPlayerTag = (inputName) => {
    if (!inputName) return 'SHINOBIWAY';
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
    playJutsuSound();
    if (!cardRef.current || isGenerating) return;
    
    setIsGenerating(true);

    try {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       ('ontouchstart' in window) || 
                       (navigator.maxTouchPoints > 0);
      
      if (document.fonts) {
        await document.fonts.ready;
      }

      await new Promise((resolve) => setTimeout(resolve, 250));

      const captureScale = isMobile ? 1.8 : 2.8;

      const canvas = await html2canvas(cardRef.current, {
        scale: captureScale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: null,
      });

      if (!canvas.width || !canvas.height) {
        throw new Error('Generated canvas has zero dimensions. Please try again.');
      }

      const fileName = `${name ? name.replace(/\s+/g, '_') : 'shinobi'}_registration_card.png`;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      const blobUrl = URL.createObjectURL(blob);

      if (isMobile) {
        setGeneratedImgUrl(blobUrl);
        setShowPreviewModal(true);
      } else {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = blobUrl;
        link.click();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      }
    } catch (err) {
      console.error('Error generating card download: ', err);
      alert(`⚠️ Fuinjutsu alert: Failed to summon your Shinobi card due to device restrictions. Try taking a screenshot instead!`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Dynamic symbol for the card depending on alignment
  const CardWatermark = () => (
    isAkatsuki ? (
      // Akatsuki watermarked cloud
      <svg className="absolute inset-0 m-auto w-48 h-48 opacity-[0.04] text-red-500 pointer-events-none select-none" viewBox="0 0 100 60" fill="currentColor">
        <path d="M30 40c-6 0-10-4-10-10 0-5 3-9 8-10-1-2-1-4 0-6 2-4 7-6 12-4 3-4 8-6 13-4 6-6 15-4 18 3 4-2 9-2 12 1 3 3 5 7 5 10 0 7-6 12-13 12h-25z" />
      </svg>
    ) : (
      // Leaf watermark symbol
      <svg className="absolute inset-0 m-auto w-40 h-40 opacity-[0.035] text-orange-800 pointer-events-none select-none" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z M12 6c-2 2-3 4-2 6s3 2 4 0 0-4-2-6z" />
      </svg>
    )
  );

  return (
    <section 
      id="card-generator" 
      className={`relative py-24 overflow-hidden transition-colors duration-1000 ${
        isAkatsuki ? 'bg-[#070102]' : 'bg-[#05130e]'
      }`}
    >
      {/* Background Graphic */}
      <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
        isAkatsuki ? 'bg-[url("/akatsuki-bg.png")] opacity-[0.14]' : 'bg-[url("/konoha-bg.png")] opacity-[0.1]'
      }`} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-coc text-2xl sm:text-3xl md:text-4xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            🎴 SHINOBI REGISTRATION CARD
          </motion.h2>
          <p className="text-xs sm:text-sm text-slate-400 font-body max-w-lg mx-auto leading-relaxed">
            Customize and forge your own Leaf Village ninja registration card to trigger a summoning contract with Sage Soumya!
          </p>
          <div className={`w-32 h-1.5 mx-auto mt-4 rounded-full ${
            isAkatsuki ? 'bg-red-500 shadow-[0_0_8px_rgba(200,16,46,0.8)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]'
          }`} />
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-12 max-w-5xl mx-auto">
          
          {/* Form Control Column */}
          <div className={`w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between border-4 rounded-2xl shadow-2xl relative transition-all ${
            isAkatsuki ? 'panel-steel-akatsuki border-red-500/40' : 'panel-scroll-konoha border-amber-700/50'
          }`}>
            <div>
              <h3 className="font-coc text-xs sm:text-sm text-white mb-6 tracking-wide uppercase border-b border-dashed border-slate-700/20 pb-3">
                CUSTOMIZE NINJA STATS
              </h3>

              {/* Name Input */}
              <div className="mb-5">
                <label className={`block font-coc text-[8.5px] mb-2 font-bold tracking-wider ${isAkatsuki ? 'text-red-400' : 'text-orange-900'}`}>
                  SHINOBI NAME
                </label>
                <input 
                  type="text" 
                  maxLength={24}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value.toUpperCase());
                  }}
                  placeholder="e.g. HOKAGE RECRUITER"
                  className={`w-full px-4 py-3 bg-black/55 border-2 rounded-xl font-coc text-xs text-white placeholder-slate-750 focus:outline-none transition-all shadow-inner ${
                    isAkatsuki ? 'border-red-500/50 focus:border-red-400' : 'border-orange-500/50 focus:border-orange-400'
                  }`}
                />
              </div>

              {/* Chakra Selection */}
              <div className="mb-5">
                <label className={`block font-coc text-[8.5px] mb-2 font-bold tracking-wider ${isAkatsuki ? 'text-red-400' : 'text-orange-900'}`}>
                  CHAKRA NATURE TYPE
                </label>
                <select
                  value={chakraNature}
                  onChange={(e) => setChakraNature(e.target.value)}
                  className={`w-full px-4 py-3 bg-black/55 border-2 rounded-xl font-coc text-xs text-white focus:outline-none transition-all shadow-inner ${
                    isAkatsuki ? 'border-red-500/50' : 'border-orange-500/50'
                  }`}
                >
                  <option value="Wind (Fūton)" className="bg-slate-900 text-white">🍃 WIND (FŪTON)</option>
                  <option value="Lightning (Raiton)" className="bg-slate-900 text-white">⚡ LIGHTNING (RAITON)</option>
                  <option value="Fire (Katon)" className="bg-slate-900 text-white">🔥 FIRE (KATON)</option>
                  <option value="Water (Suiton)" className="bg-slate-900 text-white">💧 WATER (SUITON)</option>
                  <option value="Earth (Doton)" className="bg-slate-900 text-white">🪨 EARTH (DOTON)</option>
                </select>
              </div>

              {/* Shinobi Rank */}
              <div className="mb-5">
                <label className={`block font-coc text-[8.5px] mb-2 font-bold tracking-wider ${isAkatsuki ? 'text-red-400' : 'text-orange-900'}`}>
                  SHINOBI CLASS RANK
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Genin', 'Chunin', 'Jonin', 'Sage', 'Rogue'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setShinobiRank(r)}
                      className={`flex-1 min-w-[70px] py-2 rounded-lg text-[8px] font-coc border-2 transition-all active:scale-95 shadow-md ${
                        shinobiRank === r
                          ? isAkatsuki ? 'bg-red-600 border-red-400 text-white' : 'bg-orange-600 border-orange-400 text-white'
                          : 'bg-black/40 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {r.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar Selection */}
              <div className="mb-6">
                <label className={`block font-coc text-[8.5px] mb-3 font-bold tracking-wider ${isAkatsuki ? 'text-red-400' : 'text-orange-900'}`}>
                  SELECT SHINOBI AVATAR
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {characters.map((char, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playJutsuSound();
                        setSelectedChar(idx);
                        setChakraNature(char.element);
                      }}
                      className={`relative aspect-square bg-black/40 border-2 rounded-xl flex items-center justify-center overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-inner ${
                        selectedChar === idx 
                          ? isAkatsuki 
                            ? 'border-red-400 shadow-[0_0_10px_rgba(200,16,46,0.4)] bg-red-950/20' 
                            : 'border-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)] bg-orange-950/20'
                          : 'border-slate-800/80 hover:border-slate-600'
                      }`}
                    >
                      <img 
                        src={char.image} 
                        alt={char.name} 
                        className="w-full h-full object-cover select-none pointer-events-none" 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className={`w-full mt-4 flex items-center justify-center gap-2.5 py-3.5 px-6 text-xs sm:text-sm font-coc transition-all shadow-[0_4px_0_#1b0c02] ${
                isGenerating ? 'opacity-65 cursor-not-allowed' : ''
              } ${
                isAkatsuki ? 'btn-rogue-crimson' : 'btn-shinobi-orange'
              }`}
            >
              <Download size={14} />
              <span>{isGenerating ? 'SUMMONING SCROLL...' : 'FORGE SHINOBI CARD'}</span>
            </button>
          </div>

          {/* Profile Card Preview Column with 3D Tilt */}
          <CinematicReveal preset="slide-left" delay={0.4} duration={0.9} className="w-full lg:w-1/2 flex items-center justify-center">
            <TiltCard intensity={10} holographic glowColor="rgba(255, 215, 0, 0.12)">
            
            {/* The generated Card itself */}
            <div 
              ref={cardRef}
              className={`relative w-80 h-[430px] rounded-3xl overflow-hidden shadow-2xl select-none flex flex-col justify-between p-6 ${
                isAkatsuki 
                  ? 'bg-gradient-to-br from-[#0c0406] via-[#1a0508] to-[#040102] border-4 border-[#c8102e]' 
                  : 'bg-gradient-to-br from-[#fefcf7] via-[#f9f3e0] to-[#f0e2bb] border-4 border-[#9e7b4f]'
              }`}
              style={{
                boxShadow: isAkatsuki ? '0 20px 45px rgba(0,0,0,0.8), 0 0 25px rgba(200,16,46,0.35)' : '0 20px 40px rgba(0,0,0,0.5), 0 0 15px rgba(139,90,43,0.15)'
              }}
            >
              {/* Internal decorative background watermark */}
              <CardWatermark />

              {/* Decorative Corner Rivets */}
              {['top-3.5 left-3.5', 'top-3.5 right-3.5', 'bottom-3.5 left-3.5', 'bottom-3.5 right-3.5'].map((pos, idx) => (
                <div 
                  key={idx}
                  className={`absolute ${pos} w-2.5 h-2.5 rounded-full z-20 border shadow-[0_1.5px_3px_rgba(0,0,0,0.7)] ${
                    isAkatsuki ? 'border-red-900 bg-red-600' : 'border-amber-800 bg-amber-600'
                  }`}
                />
              ))}

              {/* Header Badge */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`flex items-center gap-2 bg-black/85 px-4.5 py-1.5 rounded-full border shadow-inner ${
                  isAkatsuki ? 'border-red-500/30' : 'border-orange-500/30'
                }`}>
                  <div className="relative w-6 h-6 rounded-lg flex items-center justify-center shadow-md bg-black border border-slate-700">
                    <span className="text-[11px] animate-pulse">🍥</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-coc text-[7px] text-orange-500 leading-none">SHINOBI</span>
                    <span className="font-coc text-[6px] text-slate-400 tracking-[0.2em] mt-0.5 leading-none">REGISTRATION</span>
                  </div>
                </div>

                <div className="w-[85%] h-[1.5px] bg-gradient-to-r from-transparent via-slate-600/35 to-transparent my-3.5" />

                {/* Shinobi Name */}
                <h3 
                  className={`font-coc text-center tracking-wide max-w-[250px] uppercase leading-tight ${
                    name.length > 16 ? 'text-[8.5px]' : name.length > 12 ? 'text-[10px]' : 'text-xs'
                  } ${
                    isAkatsuki ? 'text-white' : 'text-amber-950 font-bold'
                  }`}
                  style={{
                    wordBreak: 'break-word',
                  }}
                >
                  {name || 'SHINOBI RECRUIT'}
                </h3>
                
                {/* Specialization Role */}
                <h4 className={`font-coc text-[8.5px] text-center tracking-wider mt-1 drop-shadow uppercase leading-none font-bold ${
                  isAkatsuki ? 'text-red-400' : 'text-orange-700'
                }`}>
                  {characters[selectedChar].role}
                </h4>
              </div>

              {/* Central Character Graphic inside dynamic glow circle */}
              <div className="flex items-center justify-center py-2.5 relative z-10 select-none pointer-events-none">
                {/* Chakra Glow Aura */}
                <div 
                  className="absolute w-34 h-34 rounded-full blur-md opacity-60 pointer-events-none animate-pulse"
                  style={{
                    background: `radial-gradient(circle at center, ${characters[selectedChar].glowColor} 0%, transparent 70%)`
                  }}
                />

                <div className={`w-32 h-32 rounded-full overflow-hidden border-3 shadow-xl bg-black/50 relative z-10 ${
                  isAkatsuki 
                    ? 'border-red-600 shadow-red-500/20 bg-red-950/20' 
                    : 'border-amber-700 shadow-orange-500/20 bg-amber-950/20'
                }`}>
                  <img 
                    src={characters[selectedChar].image} 
                    alt={characters[selectedChar].name} 
                  className="w-full h-full object-cover brightness-110 contrast-105 saturate-110" 
                  />
                </div>
              </div>

              {/* Stats Panel */}
              <div className="relative z-10 space-y-2 font-coc text-[7px]">
                <div className="flex justify-between items-center bg-black/85 px-3.5 py-2 rounded-xl border border-slate-800/80 shadow-md">
                  <span className="text-slate-450 uppercase">Chakra Element:</span>
                  <span className="text-emerald-400">{chakraNature.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center bg-black/85 px-3.5 py-2 rounded-xl border border-slate-800/80 shadow-md">
                  <span className="text-slate-450 uppercase">Shinobi Rank:</span>
                  <span className="text-sky-400">{shinobiRank.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center bg-black/85 px-3.5 py-2 rounded-xl border border-slate-800/80 shadow-md">
                  <span className="text-slate-450 uppercase">Registry Tag:</span>
                  <span className="text-yellow-500 font-bold select-all">#{getPlayerTag(name)}</span>
                </div>
              </div>

            </div>

            </TiltCard>

          </CinematicReveal>

      </div>

      {/* Mobile Download/Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`w-full max-w-sm p-6 rounded-2xl border-4 shadow-2xl relative text-center ${
                isAkatsuki ? 'panel-steel-akatsuki border-red-500 shadow-red-500/25' : 'panel-scroll-konoha border-orange-500 shadow-orange-500/20'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playJutsuSound();
                  setShowPreviewModal(false);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>

              <h3 className="font-coc text-sm text-white mb-2.5 tracking-wide uppercase">
                🛡️ CARD FORGED!
              </h3>
              
              <p className="text-[11px] text-slate-350 font-body leading-relaxed mb-6 px-2">
                👇 <strong className="text-yellow-400 font-semibold">TAP AND HOLD (LONG PRESS)</strong> the image below, then select <strong className="text-yellow-400 font-semibold">"Save to Photos"</strong> to download.
              </p>

              {/* Image Preview */}
              <div className="flex justify-center mb-6 max-h-[350px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-inner">
                <img
                  src={generatedImgUrl}
                  alt="Shinobi Registration Card"
                  className="max-h-[330px] w-auto object-contain rounded-lg pointer-events-auto"
                />
              </div>

              <button
                onClick={() => {
                  playJutsuSound();
                  setShowPreviewModal(false);
                }}
                className={`w-full py-3 font-coc text-[10px] sm:text-xs rounded-xl border-2 transition-all active:scale-95 cursor-pointer focus:outline-none ${
                  isAkatsuki 
                    ? 'bg-red-600 text-white border-red-400 hover:bg-red-500 shadow-[0_2px_0_#300005]' 
                    : 'bg-orange-500 text-slate-950 border-orange-400 hover:bg-orange-600 shadow-[0_2px_0_#3d1a04]'
                }`}
              >
                RETURN TO VILLAGE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
};

export default CardGenerator;

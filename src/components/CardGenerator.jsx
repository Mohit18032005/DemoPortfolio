import { useState, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import html2canvas from 'html2canvas';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    { name: 'Naruto Uzumaki', role: 'Ninjutsu Master', glowColor: 'rgba(249, 115, 22, 0.4)', element: 'Wind (Fūton)', image: '/naruto_portrait.png' },
    { name: 'Sasuke Uchiha', role: 'Special Ops / Spy', glowColor: 'rgba(168, 85, 247, 0.4)', element: 'Lightning (Raiton)', image: '/sasuke_portrait.png' },
    { name: 'Kakashi Hatake', role: 'Tactical Commander', glowColor: 'rgba(59, 130, 246, 0.4)', element: 'All Elements', image: '/kakashi_portrait.png' },
    { name: 'Itachi Uchiha', role: 'Genjutsu Master', glowColor: 'rgba(239, 68, 68, 0.4)', element: 'Fire (Katon)', image: '/itachi_portrait.png' },
    { name: 'Tobi', role: 'Space-Time Specialist', glowColor: 'rgba(234, 88, 12, 0.4)', element: 'Earth (Doton)', image: '/tobi_portrait.png' },
    { name: 'Minato Namikaze', role: 'DevOps / Speed Engine', glowColor: 'rgba(253, 224, 71, 0.4)', element: 'Space-Time', image: '/minato_portrait.png' }
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
      
      // Wait for fonts to be fully loaded in the browser
      if (document.fonts) {
        await document.fonts.ready;
      }

      // Give browser time to finish layout and paint
      await new Promise((resolve) => setTimeout(resolve, 200));

      const captureScale = isMobile ? 1.5 : 2.5;

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

      const fileName = `${name ? name.replace(/\s+/g, '_') : 'shinobi'}_soumya_registration_card.png`;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

      if (isMobile && navigator.share && navigator.canShare) {
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: 'Shinobi Registration Card',
            });
          } catch (shareErr) {
            if (shareErr.name !== 'AbortError') {
              const blobUrl = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = fileName;
              link.href = blobUrl;
              link.click();
              URL.revokeObjectURL(blobUrl);
            }
          }
        } else {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = fileName;
          link.href = blobUrl;
          link.click();
          URL.revokeObjectURL(blobUrl);
        }
      } else {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = fileName;
        link.href = blobUrl;
        link.click();
        URL.revokeObjectURL(blobUrl);
      }
    } catch (err) {
      console.error('Error generating card download: ', err);
      alert(`⚠️ Fuinjutsu alert: Failed to summon your Shinobi card due to device restrictions. Try taking a screenshot instead!`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section 
      id="card-generator" 
      className={`relative py-24 overflow-hidden transition-colors duration-1000 ${
        isAkatsuki ? 'bg-[#070102]' : 'bg-[#05130e]'
      }`}
    >
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
          <div className={`w-full lg:w-1/2 p-6 flex flex-col justify-between ${
            isAkatsuki ? 'panel-steel-akatsuki' : 'panel-scroll-konoha'
          }`}>
            <div>
              <h3 className="font-coc text-xs sm:text-sm text-white mb-6 tracking-wide uppercase">
                CUSTOMIZE NINJA STATS
              </h3>

              {/* Name Input */}
              <div className="mb-4">
                <label className={`block font-coc text-[8px] mb-2 ${isAkatsuki ? 'text-red-400' : 'text-orange-700'}`}>
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
                  className={`w-full px-4 py-3 bg-black/45 border-2 rounded-lg font-coc text-xs text-white placeholder-slate-700 focus:outline-none transition-all ${
                    isAkatsuki ? 'border-red-500/50 focus:border-red-400' : 'border-orange-500/50 focus:border-orange-400'
                  }`}
                />
              </div>

              {/* Chakra Selection */}
              <div className="mb-4">
                <label className={`block font-coc text-[8px] mb-2 ${isAkatsuki ? 'text-red-400' : 'text-orange-700'}`}>
                  CHAKRA NATURE NATURE
                </label>
                <select
                  value={chakraNature}
                  onChange={(e) => setChakraNature(e.target.value)}
                  className={`w-full px-4 py-3 bg-black/45 border-2 rounded-lg font-coc text-xs text-white focus:outline-none transition-all ${
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
              <div className="mb-4">
                <label className={`block font-coc text-[8px] mb-2 ${isAkatsuki ? 'text-red-400' : 'text-orange-700'}`}>
                  SHINOBI CLASS RANK
                </label>
                <div className="flex gap-2">
                  {['Genin', 'Chunin', 'Jonin', 'Sage', 'Rogue'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setShinobiRank(r)}
                      className={`flex-1 py-1.5 rounded text-[8px] font-coc border transition-all ${
                        shinobiRank === r
                          ? isAkatsuki ? 'bg-red-600 border-red-400 text-white' : 'bg-orange-600 border-orange-400 text-white'
                          : 'bg-black/30 border-slate-800 text-slate-400'
                      }`}
                    >
                      {r.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar Selection */}
              <div className="mb-6">
                <label className={`block font-coc text-[8px] mb-3 ${isAkatsuki ? 'text-red-400' : 'text-orange-700'}`}>
                  SELECT AVATAR
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
                      className={`relative aspect-square bg-black/30 border-2 rounded-xl flex items-center justify-center overflow-hidden transition-all hover:scale-105 active:scale-95 ${
                        selectedChar === idx 
                          ? isAkatsuki 
                            ? 'border-red-400 shadow-[0_0_10px_rgba(200,16,46,0.3)] bg-red-950/20' 
                            : 'border-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.3)] bg-orange-950/20'
                          : 'border-slate-800'
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

            {/* CTA Button to trigger screenshot */}
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className={`w-full mt-4 flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-coc transition-all ${
                isGenerating ? 'opacity-65 cursor-not-allowed' : ''
              } ${
                isAkatsuki ? 'btn-rogue-crimson' : 'btn-shinobi-orange'
              }`}
            >
              <Download size={14} />
              <span>{isGenerating ? 'SUMMONING SCROLL...' : 'FORGE SHINOBI CARD'}</span>
            </button>
          </div>

          {/* Profile Card Preview Column */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            
            {/* The HTML Card itself that is exported */}
            <div 
              ref={cardRef}
              className={`relative w-80 h-[420px] rounded-3xl overflow-hidden shadow-2xl select-none flex flex-col justify-between p-6 ${
                isAkatsuki 
                  ? 'bg-gradient-to-br from-[#120405] via-[#22070a] to-[#0c0203] border-4 border-[#c8102e]' 
                  : 'bg-gradient-to-br from-[#fcf6e8] via-[#f4ebd0] to-[#e8ddbf] border-4 border-[#8b5a2b]'
              }`}
              style={{
                boxShadow: isAkatsuki ? '0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(200,16,46,0.3)' : '0 20px 40px rgba(0,0,0,0.6)'
              }}
            >
              {/* Inner glowing aura */}
              <div 
                data-html2canvas-ignore="true"
                className="absolute inset-0 transition-colors duration-1000 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${characters[selectedChar].glowColor} 0%, transparent 70%)`
                }}
              />

              {/* Decorative Corner Rivets */}
              {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, idx) => (
                <div 
                  key={idx}
                  className={`absolute ${pos} w-2.5 h-2.5 rounded-full z-20 border shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${
                    isAkatsuki ? 'border-red-900 bg-red-600' : 'border-amber-900 bg-amber-700'
                  }`}
                />
              ))}

              {/* Header: Title Banner */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`flex items-center gap-2 bg-black/85 px-4 py-1.5 rounded-full border shadow-inner ${
                  isAkatsuki ? 'border-red-500/20' : 'border-orange-500/20'
                }`}>
                  <div className="relative w-6 h-6 rounded-lg flex items-center justify-center shadow-md bg-black border border-slate-700">
                    <span className="text-[10px]">🍥</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-coc text-[7px] text-orange-500 leading-none">SHINOBI</span>
                    <span className="font-coc text-[6px] text-slate-400 tracking-[0.2em] mt-0.5 leading-none">REGISTRATION</span>
                  </div>
                </div>

                <div className={`w-[80%] h-[1.5px] bg-gradient-to-r from-transparent via-slate-600/40 to-transparent my-3`} />

                {/* Recruiter Name */}
                <h3 
                  className={`font-coc text-center tracking-wide max-w-[250px] uppercase leading-tight ${
                    name.length > 16 ? 'text-[8px]' : name.length > 12 ? 'text-[10px]' : 'text-xs'
                  } ${
                    isAkatsuki ? 'text-white' : 'text-amber-950 font-bold'
                  }`}
                  style={{
                    wordBreak: 'break-word',
                  }}
                >
                  {name || 'NINJA ALLY'}
                </h3>
                
                {/* Specialization Role Title */}
                <h4 className={`font-coc text-[8px] text-center tracking-wider mt-1 drop-shadow uppercase leading-none ${
                  isAkatsuki ? 'text-red-400' : 'text-orange-700 font-semibold'
                }`}>
                  {characters[selectedChar].role}
                </h4>
              </div>

              {/* Central Character Graphic */}
              <div className="flex items-center justify-center py-2 relative z-10 select-none pointer-events-none">
                <div className={`w-32 h-32 rounded-full overflow-hidden border-3 shadow-lg bg-black/40 ${
                  isAkatsuki 
                    ? 'border-red-600 shadow-red-500/20 bg-red-950/20' 
                    : 'border-amber-700 shadow-orange-500/20 bg-amber-950/20'
                }`}>
                  <img 
                    src={characters[selectedChar].image} 
                    alt={characters[selectedChar].name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>

              {/* Stats Footer panel */}
              <div className="relative z-10 space-y-2">
                <div className="flex justify-between items-center bg-black/80 px-3 py-1.5 rounded-xl border border-slate-800/80">
                  <span className="font-coc text-[6px] text-slate-400">CHAKRA NATURE:</span>
                  <span className="font-coc text-[7px] text-emerald-400">{chakraNature.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center bg-black/80 px-3 py-1.5 rounded-xl border border-slate-800/80">
                  <span className="font-coc text-[6px] text-slate-400">SHINOBI RANK:</span>
                  <span className="font-coc text-[7px] text-sky-400">{shinobiRank.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center bg-black/80 px-3 py-1.5 rounded-xl border border-slate-800/80">
                  <span className="font-coc text-[6px] text-slate-400">REGISTRY CODE:</span>
                  <span className="font-coc text-[7px] text-yellow-500 font-bold select-all">#{getPlayerTag(name)}</span>
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
                isAkatsuki ? 'panel-steel-akatsuki border-red-500 shadow-red-500/20' : 'panel-scroll-konoha border-orange-500 shadow-orange-500/20'
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

              <h3 className="font-coc text-sm text-white mb-2 tracking-wide uppercase">
                🛡️ CARD FORGED!
              </h3>
              
              <p className="text-[11px] text-slate-300 font-body leading-relaxed mb-6 px-2">
                👇 <strong className="text-yellow-400">TAP AND HOLD (LONG PRESS)</strong> the image below, then select <strong className="text-yellow-400">"Save to Photos"</strong> to download.
              </p>

              {/* Image Preview Container */}
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
                className={`w-full py-2.5 font-coc text-[10px] sm:text-xs rounded border transition-all active:scale-95 cursor-pointer focus:outline-none ${
                  isAkatsuki 
                    ? 'bg-red-600 text-white border-red-400 hover:bg-red-500' 
                    : 'bg-orange-500 text-slate-950 border-orange-300 hover:bg-orange-600'
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

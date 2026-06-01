import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Mail, Github } from 'lucide-react';
import CinematicReveal from './CinematicReveal';

const Footer = () => {
  const { isAkatsuki, playJutsuSound } = useTheme();
  const [formData, setFormData] = useState({ 
    'fi-sender-fullName': '', 
    'fi-sender-email': '', 
    'fi-text-message': '' 
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playJutsuSound();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (!window.Forminit) {
        throw new Error("Forminit SDK not loaded yet. Please wait a moment and try again.");
      }

      const forminit = new window.Forminit();
      const { data, error } = await forminit.submit('k3wd6gj1om6', new FormData(e.target));

      if (error) {
        throw new Error(error.message || "Failed to submit form.");
      }

      setShowSuccess(true);
      setFormData({ 
        'fi-sender-fullName': '', 
        'fi-sender-email': '', 
        'fi-text-message': '' 
      });
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting form to Forminit: ', err);
      setErrorMessage(err.message || "Failed to send messenger hawk. Please check your network chakra.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const LogoSymbol = () => (
    isAkatsuki ? (
      // Akatsuki Red Cloud SVG
      <svg className="h-10 w-16 text-red-500 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]" viewBox="0 0 100 60" fill="currentColor">
        <path d="M30 40c-6 0-10-4-10-10 0-5 3-9 8-10-1-2-1-4 0-6 2-4 7-6 12-4 3-4 8-6 13-4 6-6 15-4 18 3 4-2 9-2 12 1 3 3 5 7 5 10 0 7-6 12-13 12h-25z" />
        <path d="M50 45c-4 0-7-2-7-6 0-3 2-6 5-6H60c3 0 5 3 5 6s-2 6-5 6h-10z" fill="#fff" opacity="0.15" />
      </svg>
    ) : (
      // Konoha Leaf Symbol SVG
      <svg className="h-10 w-10 text-orange-600 filter drop-shadow-[0_0_4px_rgba(249,115,22,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M12 6c-2 2-3 4-2 6s3 2 4 0 0-4-2-6z" />
        <path d="M8 14l-2 2" />
        <path d="M16 10l2-2" />
      </svg>
    )
  );

  return (
    <footer id="contact" className="relative pt-12 pb-16 px-4">
      
      {/* Atmospheric fog layers */}
      <div className="fog-layer-1 opacity-10" />

      <CinematicReveal preset="cinematic" duration={1} className={`max-w-6xl mx-auto p-8 sm:p-10 md:p-12 transition-all duration-500 ${
        isAkatsuki ? 'panel-steel-akatsuki' : 'panel-scroll-konoha'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start mb-12">
          
          {/* Column 1: Info & Brand */}
          <div className="flex flex-col gap-4 text-left">
            <div className="flex items-center gap-2">
              <LogoSymbol />
              <div className="flex flex-col font-coc">
                <span className={`text-sm tracking-wider ${isAkatsuki ? 'text-white' : 'text-amber-950 font-bold'}`}>
                  SOUMYA'S WAY
                </span>
                <span className={`text-[9px] ${isAkatsuki ? 'text-red-400' : 'text-orange-700 font-bold'}`}>
                  {isAkatsuki ? 'Rogue Full-Stack Developer' : 'Sage Full-Stack Developer'}
                </span>
              </div>
            </div>
            
            <p className={`text-xs font-body leading-relaxed max-w-sm ${isAkatsuki ? 'text-slate-400' : 'text-amber-900/90'}`}>
              {isAkatsuki 
                ? "A rogue shinobi of the web, slicing through latency and building bulletproof backend infrastructures from the shadows."
                : "Harnessing the Will of Fire to weave beautiful user experiences and design robust, scalable full-stack applications."
              }
            </p>

            <div className="flex items-center gap-3 mt-2">
              <a 
                href="https://github.com/soumyachk101" target="_blank" rel="noopener noreferrer" onClick={playJutsuSound}
                className={`p-2 rounded-lg border transition-all active:scale-95 ${
                  isAkatsuki 
                    ? 'bg-black/40 text-red-400 hover:text-white border-red-500/30 hover:border-red-500' 
                    : 'bg-amber-100 text-amber-900 hover:text-amber-950 border-amber-800/30 hover:border-amber-800'
                }`}
              >
                <Github size={14} />
              </a>
              <a 
                href="mailto:soumya.chk101@gmail.com" onClick={playJutsuSound}
                className={`p-2 rounded-lg border transition-all active:scale-95 ${
                  isAkatsuki 
                    ? 'bg-black/40 text-red-400 hover:text-white border-red-500/30 hover:border-red-500' 
                    : 'bg-amber-100 text-amber-900 hover:text-amber-950 border-amber-800/30 hover:border-amber-800'
                }`}
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Nindo Pathways (Quick Navigation) */}
          <div className="flex flex-col gap-4 text-left md:pl-6">
            <h4 className={`font-coc text-xs tracking-wider ${isAkatsuki ? 'text-red-500' : 'text-orange-800 font-bold'}`}>
              NINDO PATHWAYS
            </h4>
            <nav className={`flex flex-col gap-2.5 font-coc text-[9px] ${
              isAkatsuki ? 'text-slate-300' : 'text-amber-950'
            }`}>
              <button 
                onClick={() => { playJutsuSound(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className={`transition-all text-left flex items-center gap-2 group cursor-pointer focus:outline-none ${
                  isAkatsuki ? 'hover:text-red-400' : 'hover:text-orange-700 font-semibold'
                }`}
              >
                <span className="group-hover:translate-x-1 transition-transform">⚔️</span>
                <span>S-RANK MISSIONS</span>
              </button>
              <button 
                onClick={() => { playJutsuSound(); document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' }); }}
                className={`transition-all text-left flex items-center gap-2 group cursor-pointer focus:outline-none ${
                  isAkatsuki ? 'hover:text-red-400' : 'hover:text-orange-700 font-semibold'
                }`}
              >
                <span className="group-hover:translate-x-1 transition-transform">🏯</span>
                <span>NINDO PATHWAYS</span>
              </button>
              <button 
                onClick={() => { playJutsuSound(); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); }}
                className={`transition-all text-left flex items-center gap-2 group cursor-pointer focus:outline-none ${
                  isAkatsuki ? 'hover:text-red-400' : 'hover:text-orange-700 font-semibold'
                }`}
              >
                <span className="group-hover:translate-x-1 transition-transform">📜</span>
                <span>JUTSU SPELLBOOK</span>
              </button>
              <button 
                onClick={() => { playJutsuSound(); document.getElementById('card-generator')?.scrollIntoView({ behavior: 'smooth' }); }}
                className={`transition-all text-left flex items-center gap-2 group cursor-pointer focus:outline-none ${
                  isAkatsuki ? 'hover:text-red-400' : 'hover:text-orange-700 font-semibold'
                }`}
              >
                <span className="group-hover:translate-x-1 transition-transform">🛡️</span>
                <span>NINJA REGISTRATION</span>
              </button>
              <button 
                onClick={() => { playJutsuSound(); document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' }); }}
                className={`transition-all text-left flex items-center gap-2 group cursor-pointer focus:outline-none ${
                  isAkatsuki ? 'hover:text-red-400' : 'hover:text-orange-700 font-semibold'
                }`}
              >
                <span className="group-hover:translate-x-1 transition-transform">🌀</span>
                <span>SAGE CREDENTIALS</span>
              </button>
            </nav>
          </div>

          {/* Column 3: Send Ninja Messenger Hawk (Form) */}
          <div className="flex flex-col gap-4 text-left">
            <h4 className={`font-coc text-xs tracking-wider ${isAkatsuki ? 'text-red-500' : 'text-orange-800 font-bold'}`}>
              SEND NINJA MESSENGER HAWK
            </h4>
            
            {showSuccess ? (
              <div className={`p-4 rounded-lg border text-xs font-coc leading-relaxed ${
                isAkatsuki 
                  ? 'bg-red-950/60 border-red-500 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
                  : 'bg-emerald-100 border-emerald-500 text-emerald-800'
              } animate-pulse`}>
                🦅 MESSENGER HAWK SUMMONED! THE MESSAGE SCROLL HAS BEEN SENT.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {errorMessage && (
                  <div className={`p-3 rounded-lg border text-[10px] font-body leading-relaxed ${
                    isAkatsuki ? 'bg-rose-950/60 border-rose-500/50 text-rose-300' : 'bg-red-100 border-red-400 text-red-800'
                  }`}>
                    ⚠️ {errorMessage}
                  </div>
                )}
                <input 
                  type="text" 
                  name="fi-sender-fullName"
                  value={formData['fi-sender-fullName']}
                  onChange={handleInputChange}
                  required
                  placeholder="Sender Shinobi / Company Name"
                  className={`w-full px-3 py-2 border rounded-lg text-xs transition-colors font-body focus:outline-none ${
                    isAkatsuki 
                      ? 'bg-black/50 border-red-500/30 text-white placeholder-slate-500 focus:border-red-500' 
                      : 'bg-amber-100/60 border-amber-800/40 text-amber-950 placeholder-amber-700/60 focus:border-orange-600'
                  }`}
                />
                <input 
                  type="email" 
                  name="fi-sender-email"
                  value={formData['fi-sender-email']}
                  onChange={handleInputChange}
                  required
                  placeholder="messenger@ninja-village.com"
                  className={`w-full px-3 py-2 border rounded-lg text-xs transition-colors font-body focus:outline-none ${
                    isAkatsuki 
                      ? 'bg-black/50 border-red-500/30 text-white placeholder-slate-500 focus:border-red-500' 
                      : 'bg-amber-100/60 border-amber-800/40 text-amber-950 placeholder-amber-700/60 focus:border-orange-600'
                  }`}
                />
                <textarea 
                  name="fi-text-message"
                  value={formData['fi-text-message']}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your secret scroll details..."
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg text-xs transition-colors font-body resize-none focus:outline-none ${
                    isAkatsuki 
                      ? 'bg-black/50 border-red-500/30 text-white placeholder-slate-500 focus:border-red-500' 
                      : 'bg-amber-100/60 border-amber-800/40 text-amber-950 placeholder-amber-700/60 focus:border-orange-600'
                  }`}
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 text-[9px] sm:text-[10px] cursor-pointer focus:outline-none transition-all ${
                    isAkatsuki ? 'btn-rogue-crimson' : 'btn-shinobi-orange'
                  } ${isSubmitting ? 'opacity-65 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'SUMMONING HAWK...' : 'SUMMON MESSENGER HAWK'}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className={`border-t pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] font-body ${
          isAkatsuki ? 'border-red-500/20 text-slate-500' : 'border-amber-800/20 text-amber-900/70'
        }`}>
          <span>&copy; 2026 Soumya Chakraborty. Built with Shinobi Will of Fire.</span>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="cursor-pointer hover:underline">Scroll Blueprints</span>
            <span className="cursor-pointer hover:underline">Shinobi Pact</span>
          </div>
        </div>

      </CinematicReveal>

    </footer>
  );
};

export default Footer;

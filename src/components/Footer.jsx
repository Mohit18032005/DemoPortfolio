import { useTheme } from '../context/ThemeContext';
import { Mail, MapPin, Globe, Github } from 'lucide-react';

const Footer = () => {
  const { isNight, playCoinSound } = useTheme();

  return (
    <footer id="contact" className={`relative pt-16 pb-8 transition-colors duration-500 border-t ${
      isNight 
        ? 'bg-dark-elixir-bg/95 border-purple-500/30' 
        : 'bg-amber-950 border-yellow-700/30'
    }`}>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12 max-w-4xl mx-auto">
          
          {/* Column 1: Info & Brand */}
          <div className="flex flex-col gap-4 text-left">
            <div className="flex items-center gap-2">
              <img src={isNight ? '/night-theme/NightShield.webp' : '/ShieldClan Badge Icon.webp'} alt="Chieftain Shield Logo" className="h-10 w-auto object-contain rounded" />
              <div className="flex flex-col">
                <span className="font-coc text-sm text-white tracking-wider">SOUMYA'S BASE</span>
                <span className="font-body text-[10px] text-slate-400">Chieftain & Full-Stack Developer</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 font-body leading-relaxed max-w-sm">
              Clash with Codes, Conquer with Architectures! Building high-performance websites, interactive UI designs, and scalable backend pipelines.
            </p>

            <div className="flex items-center gap-3 mt-2">

              <a 
                href="https://github.com" target="_blank" rel="noopener noreferrer" onClick={playCoinSound}
                className="p-2 bg-black/40 rounded-lg text-slate-400 hover:text-white border border-slate-800 transition-colors"
              >
                <Github size={14} />
              </a>
              <a 
                href="mailto:soumya.chk101@gmail.com" onClick={playCoinSound}
                className="p-2 bg-black/40 rounded-lg text-slate-400 hover:text-white border border-slate-800 transition-colors"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Details */}
          <div className="flex flex-col gap-4 text-left">
            <h4 className="font-coc text-xs text-yellow-400 tracking-wider">
              CHIEFTAIN'S WAR ROOM
            </h4>

            <div className="space-y-3 font-body text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-slate-400 shrink-0" />
                <span>Kolkata, West Bengal, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-slate-400 shrink-0" />
                <a href="mailto:soumya.chk101@gmail.com" className="hover:text-yellow-400 transition-colors">soumya.chk101@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-slate-400 shrink-0" />
                <a href="https://www.chksoumya.in/" className="hover:text-yellow-400 transition-colors">www.chksoumya.in</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="border-t border-slate-800/40 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 font-body">
          <span>&copy; 2026 Soumya Chakraborty. Built with Supercell magic.</span>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="cursor-pointer hover:underline">Privacy Policy</span>
            <span className="cursor-pointer hover:underline">Terms of Service</span>
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;

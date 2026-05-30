import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Mail, Github } from 'lucide-react';

const Footer = () => {
  const { isNight, playCoinSound } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playCoinSound();

    const subject = encodeURIComponent(`Clan Invite from ${formData.name}`);
    const body = encodeURIComponent(`Hi Soumya,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
    
    // Trigger mailto redirection
    window.location.href = `mailto:soumya.chk101@gmail.com?subject=${subject}&body=${body}`;

    setShowSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <footer id="contact" className={`relative pt-16 pb-8 transition-colors duration-500 border-t ${
      isNight 
        ? 'bg-gradient-to-b from-[#0b041a] to-[#04010a] border-purple-500/30' 
        : 'bg-gradient-to-b from-[#3d1a04] to-[#200d02] border-yellow-700/30'
    }`}>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start mb-12">
          
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
                href="https://github.com/soumyachk101" target="_blank" rel="noopener noreferrer" onClick={playCoinSound}
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

          {/* Column 2: Base Directory (Quick Navigation) */}
          <div className="flex flex-col gap-4 text-left md:pl-6">
            <h4 className="font-coc text-xs text-yellow-400 tracking-wider">
              BASE DIRECTORY
            </h4>
            <nav className="flex flex-col gap-2.5 font-coc text-[9px] text-slate-300">
              <button 
                onClick={() => { playCoinSound(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="hover:text-yellow-400 transition-all text-left flex items-center gap-2 group cursor-pointer focus:outline-none"
              >
                <span className="group-hover:translate-x-1 transition-transform">⚔️</span>
                <span>WAR BLUEPRINTS</span>
              </button>
              <button 
                onClick={() => { playCoinSound(); document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="hover:text-yellow-400 transition-all text-left flex items-center gap-2 group cursor-pointer focus:outline-none"
              >
                <span className="group-hover:translate-x-1 transition-transform">🏰</span>
                <span>DEVELOPER JOURNEY</span>
              </button>
              <button 
                onClick={() => { playCoinSound(); document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="hover:text-yellow-400 transition-all text-left flex items-center gap-2 group cursor-pointer focus:outline-none"
              >
                <span className="group-hover:translate-x-1 transition-transform">📜</span>
                <span>SPELLS & SCROLLS</span>
              </button>
              <button 
                onClick={() => { playCoinSound(); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="hover:text-yellow-400 transition-all text-left flex items-center gap-2 group cursor-pointer focus:outline-none"
              >
                <span className="group-hover:translate-x-1 transition-transform">👑</span>
                <span>SPECIALIZATIONS</span>
              </button>
              <button 
                onClick={() => { playCoinSound(); document.getElementById('card-generator')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="hover:text-yellow-400 transition-all text-left flex items-center gap-2 group cursor-pointer focus:outline-none"
              >
                <span className="group-hover:translate-x-1 transition-transform">🛡️</span>
                <span>RECRUIT CARD</span>
              </button>
            </nav>
          </div>

          {/* Column 3: Send Clan Invite (Form) */}
          <div className="flex flex-col gap-4 text-left">
            <h4 className="font-coc text-xs text-yellow-400 tracking-wider">
              SEND CLAN INVITE
            </h4>
            
            {showSuccess ? (
              <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-500 text-xs text-emerald-300 font-coc leading-relaxed animate-pulse">
                🏆 CLAN INVITE SENT! OPENING MAIL CLIENT...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Recruiter / Company Name"
                  className="w-full px-3 py-2 bg-black/40 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors font-body"
                />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 bg-black/40 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors font-body"
                />
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your message details..."
                  rows={2}
                  className="w-full px-3 py-2 bg-black/40 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors font-body resize-none"
                />
                <button 
                  type="submit"
                  className="btn-coc-gold w-full py-2.5 text-[9px] sm:text-[10px] cursor-pointer focus:outline-none"
                >
                  SEND INVITE
                </button>
              </form>
            )}
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

import { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Search, X, Bookmark, BookmarkCheck, Sparkles, Cpu, Database, Network, Award, Layers } from 'lucide-react';
import TiltCard from './TiltCard';

const PinterestBoard = () => {
  const { isAkatsuki, playCoinSound, playJutsuSound } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePin, setActivePin] = useState(null);
  const [savedPins, setSavedPins] = useState(() => {
    try {
      const saved = localStorage.getItem('mohit_saved_pins');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync saved pins to localStorage
  useEffect(() => {
    localStorage.setItem('mohit_saved_pins', JSON.stringify(savedPins));
  }, [savedPins]);

  const handleSavePin = (e, pinId) => {
    e.stopPropagation(); // Prevent opening modal
    playCoinSound();
    
    setSavedPins((prev) => {
      if (prev.includes(pinId)) {
        return prev.filter(id => id !== pinId);
      } else {
        return [...prev, pinId];
      }
    });
  };

  const categories = [
    { id: 'all', name: 'All Pins', icon: Layers },
    { id: 'project', name: 'Featured Projects', icon: Sparkles },
    { id: 'skill', name: 'Specializations', icon: Cpu },
    { id: 'certification', name: 'Certifications', icon: Award }
  ];

  const boardItems = [
    // PROJECTS (Featured & Others)
    {
      id: 'proj-robot',
      type: 'project',
      featured: true,
      title: 'Voice-Controlled AI Robot',
      desc: 'An intelligent hardware robot integrating speech recognition models with responsive physical motors.',
      category: 'Hardware & AI',
      tags: ['Raspberry Pi', 'Google Voice API', 'GPIO Motor Control', 'Python'],
      github: 'https://github.com/',
      live: '#',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      bgColor: 'sphere-3d-purple',
      stats: { accuracy: '96%', controlRate: '120ms', parts: '14' }
    },
    {
      id: 'proj-radar',
      type: 'project',
      featured: true,
      title: 'Radar Object Detection',
      desc: 'Real-time object mapping and proximity tracking using ultrasonic signals and hardware servo control.',
      category: 'Embedded Systems',
      tags: ['Ultrasonic Mapping', 'Servo Motor', 'Real-time Python UI', 'IoT'],
      github: 'https://github.com/',
      live: '#',
      glowColor: 'rgba(239, 68, 68, 0.4)',
      bgColor: 'sphere-3d-red',
      stats: { range: '180°', scanFreq: '60Hz', precision: '0.5cm' }
    },
    {
      id: 'proj-assistant',
      type: 'project',
      featured: true,
      title: 'Multimodal AI Assistant',
      desc: 'A complex context-aware software helper leveraging vector databases and custom prompt structures.',
      category: 'AI Data Processing',
      tags: ['Vector DB', 'LLM API', 'RAG Framework', 'Node.js'],
      github: 'https://github.com/',
      live: '#',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      bgColor: 'sphere-3d-sky',
      stats: { latency: '180ms', chunkCount: '450k', testScore: '92%' }
    },
    {
      id: 'proj-phygital',
      type: 'project',
      featured: false,
      title: 'Phygital Trace',
      desc: 'Supply chain asset tracking that binds physical items to immutable digital records with NFC chips.',
      category: 'Blockchain & Web3',
      tags: ['Solidity', 'NFC Integrations', 'React', 'Node.js'],
      github: 'https://github.com/',
      live: '#',
      glowColor: 'rgba(234, 179, 8, 0.35)',
      bgColor: 'sphere-3d-orange'
    },
    {
      id: 'proj-nexusops',
      type: 'project',
      featured: false,
      title: 'NexusOps CI/CD',
      desc: 'Cloud environment orchestration dashboard for automated build pipelines and cluster deployment.',
      category: 'DevOps & Cloud',
      tags: ['Docker', 'Kubernetes', 'AWS Cloud', 'Terraform'],
      github: 'https://github.com/',
      live: 'https://nexusops-sigma.vercel.app',
      glowColor: 'rgba(16, 185, 129, 0.35)',
      bgColor: 'sphere-3d-sky'
    },
    {
      id: 'proj-healthtrack',
      type: 'project',
      featured: false,
      title: 'HealthTrack+',
      desc: 'Full-stack user health analytics vault keeping bio-metrics and records secured under client verification.',
      category: 'Full Stack Web',
      tags: ['Express.js', 'MongoDB', 'React', 'JWT Auth'],
      github: 'https://github.com/',
      live: 'https://www.healthtrack.store/',
      glowColor: 'rgba(239, 68, 68, 0.35)',
      bgColor: 'sphere-3d-red'
    },
    {
      id: 'proj-streamtv',
      type: 'project',
      featured: false,
      title: 'Stream.Tv Client',
      desc: 'High-performance video library dashboard with category search filters and low-latency playback options.',
      category: 'Frontend Web',
      tags: ['React', 'Vite', 'Tailwind CSS', 'RapidAPI'],
      github: 'https://github.com/',
      live: '#',
      glowColor: 'rgba(168, 85, 247, 0.35)',
      bgColor: 'sphere-3d-purple'
    },
    {
      id: 'proj-country',
      type: 'project',
      featured: false,
      title: 'Country Finder Maps',
      desc: 'Interactive visual geography directory fetching border stats and region coordinates dynamically.',
      category: 'Frontend Web',
      tags: ['React', 'REST Countries API', 'Tailwind CSS'],
      github: 'https://github.com/',
      live: 'https://wcountryfinder.netlify.app/',
      glowColor: 'rgba(234, 179, 8, 0.35)',
      bgColor: 'sphere-3d-orange'
    },

    // SKILLS & SPECIALIZATIONS
    {
      id: 'skill-algo',
      type: 'skill',
      featured: true,
      title: 'Algorithm Specialist',
      desc: 'Developing high-efficiency core scripts, algorithmic search strategies, and back-end logic layers.',
      category: 'Software Architecture',
      tags: ['Python', 'C Language', 'Java', 'Data Structures'],
      glowColor: 'rgba(249, 115, 22, 0.4)',
      bgColor: 'sphere-3d-orange',
      stats: { haki: '99', atk: '95', def: '92' }
    },
    {
      id: 'skill-aiml',
      type: 'skill',
      featured: true,
      title: 'AI & Machine Learning',
      desc: 'Building convolutional models, dense neural network training, and visual analysis setups.',
      category: 'Deep Learning',
      tags: ['Neural Networks', 'Computer Vision', 'OpenCV', 'TensorFlow'],
      glowColor: 'rgba(56, 189, 248, 0.4)',
      bgColor: 'sphere-3d-sky',
      stats: { haki: '92', atk: '98', def: '88' }
    },
    {
      id: 'skill-data',
      type: 'skill',
      featured: true,
      title: 'Data Analytics Mastery',
      desc: 'Pipeline structures for cleaning data streams, aggregation tasks, and aesthetic graphs.',
      category: 'Data Science',
      tags: ['Data Collection', 'Preprocessing', 'Matplotlib', 'Pandas'],
      glowColor: 'rgba(239, 68, 68, 0.4)',
      bgColor: 'sphere-3d-red',
      stats: { haki: '88', atk: '94', def: '95' }
    },
    {
      id: 'skill-iot',
      type: 'skill',
      featured: true,
      title: 'IoT & Embedded Systems',
      desc: 'Board integrations, sensory telemetry arrays, and voice control relays for physical computing.',
      category: 'Hardware Engineering',
      tags: ['Raspberry Pi', 'Sensors Telemetry', 'Micro-controllers', 'Voice SDKs'],
      glowColor: 'rgba(234, 179, 8, 0.4)',
      bgColor: 'sphere-3d-orange',
      stats: { haki: '95', atk: '96', def: '90' }
    },

    // CERTIFICATIONS
    {
      id: 'cert-ibm',
      type: 'certification',
      featured: false,
      title: 'IBM Generative AI Specialist',
      desc: 'In-depth specialization program covering large language model configurations, prompting, and application design.',
      category: 'IBM Training',
      tags: ['Generative AI', 'Prompt Eng', 'LLM Tuning', 'March 2025'],
      glowColor: 'rgba(168, 85, 247, 0.35)',
      bgColor: 'sphere-3d-purple'
    },
    {
      id: 'cert-azure',
      type: 'certification',
      featured: false,
      title: 'Microsoft Azure AI Certified',
      desc: 'Validation of cloud architecture deployment, Azure AI services provisioning, and custom telemetry nodes.',
      category: 'Microsoft Azure',
      tags: ['Azure AI Services', 'Cognitive Search', 'Cloud ML', 'July 2025'],
      glowColor: 'rgba(56, 189, 248, 0.35)',
      bgColor: 'sphere-3d-sky'
    },
    {
      id: 'cert-iot',
      type: 'certification',
      featured: false,
      title: 'Jetson & Pi IoT Bootcamp',
      desc: 'UEM Kolkata intensive hardware workshop targeting computer vision models run directly on NVIDIA microchips.',
      category: 'UEM Workshop',
      tags: ['Raspberry Pi', 'NVIDIA Jetson Nano', 'Embedded AI', 'Sept 2025'],
      glowColor: 'rgba(249, 115, 22, 0.35)',
      bgColor: 'sphere-3d-orange'
    },
    {
      id: 'cert-google',
      type: 'certification',
      featured: false,
      title: 'Google Foundations of Data',
      desc: 'Solid credentials in analytics frameworks, data wrangling methodologies, and structured database queries.',
      category: 'Google Analytics',
      tags: ['Data Wrangling', 'SQL Queries', 'Data Cleaning', 'Dec 2025'],
      glowColor: 'rgba(16, 185, 129, 0.35)',
      bgColor: 'sphere-3d-sky'
    }
  ];

  // Filtering logic
  const filteredItems = useMemo(() => {
    return boardItems.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.type === selectedCategory;
      const matchSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section 
      id="projects" 
      className={`relative py-24 transition-colors duration-1000 overflow-hidden ${
        isAkatsuki ? 'bg-[#070102]' : 'bg-[#05130e]'
      }`}
    >
      <div id="skills" className="absolute top-0 left-0" />
      {/* Dynamic Background Graphics */}
      <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
        isAkatsuki ? 'bg-[url("/yonko-bg.png")] opacity-[0.14]' : 'bg-[url("/grand-line-bg.png")] opacity-[0.1]'
      }`} />
      
      {/* 3D Grid particles layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,255,255,0.05),transparent)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Board Header Title */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-coc text-3xl sm:text-4xl md:text-5xl text-white mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] ${
              isAkatsuki ? 'text-shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'text-shadow-[0_0_30px_rgba(251,191,36,0.4)]'
            }`}
          >
            📋 NEW WORLD BOUNTY BOARD
          </motion.h2>
          <p className="font-body text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-6 leading-relaxed">
            Pinterest-style interactive log board containing all active specialized skills, B.Tech projects, and certified milestones. Pin and save blueprints directly.
          </p>
          <div className={`w-36 h-1.5 mx-auto rounded-full ${
            isAkatsuki ? 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_15px_rgba(239,68,68,0.7)]' : 'bg-gradient-to-r from-amber-500 to-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.7)]'
          }`} />
        </div>

        {/* Pinterest Control Panel (Search + Category Pills) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 max-w-5xl mx-auto border border-white/10 p-4 rounded-3xl bg-black/45 backdrop-blur-md shadow-2xl relative z-20">
          
          {/* Pinterest-like search input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search pins, tags, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-orange-500/50 transition-colors focus:bg-white/10"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filtering Tabs with Animated Layout Background */}
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playJutsuSound();
                    setSelectedCategory(cat.id);
                  }}
                  className={`relative px-4 py-2.5 rounded-full text-xs font-coc tracking-wider flex items-center gap-1.5 cursor-pointer focus:outline-none select-none transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name.toUpperCase()}</span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabBackground"
                      className={`absolute inset-0 -z-10 rounded-full ${
                        isAkatsuki 
                          ? 'bg-gradient-to-r from-red-700 to-red-600 shadow-[0_0_12px_rgba(239,68,68,0.4)]' 
                          : 'bg-gradient-to-r from-amber-600 to-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                      }`}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* Pinterest Masonry Grid Container */}
        <div className="max-w-6xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 text-slate-400 font-coc text-sm tracking-wider">
              🚫 No blueprints found matching details...
            </div>
          ) : (
            <motion.div 
              layout 
              className="pinterest-grid"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => {
                  const isSaved = savedPins.includes(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      layoutId={`card-${item.id}`}
                      initial={{ opacity: 0, scale: 0.92, y: 25 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 15 }}
                      transition={{ duration: 0.4, delay: idx * 0.03 }}
                      className="pinterest-item"
                    >
                      <TiltCard 
                        intensity={12} 
                        glowColor={item.glowColor} 
                        className="h-full"
                      >
                        <div
                          onClick={() => {
                            playJutsuSound();
                            setActivePin(item);
                          }}
                          className={`group w-full select-none text-left rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer pinterest-card ${
                            isAkatsuki 
                              ? 'bg-gradient-to-b from-[#16060a]/90 via-[#0a0204]/95 to-[#050001]/98 border-red-900/40 text-white pinterest-card-glow-akatsuki' 
                              : 'bg-gradient-to-b from-[#0c1a13]/90 via-[#05110a]/95 to-[#020704]/98 border-amber-900/30 text-white pinterest-card-glow-leaf'
                          }`}
                        >
                          
                          {/* Visual CSS-drawn 3D asset instead of raw pictures */}
                          <div className={`w-full relative flex items-center justify-center bg-black/40 border-b border-white/5 transition-all duration-500 overflow-hidden ${
                            item.featured ? 'h-52' : 'h-36'
                          }`}>
                            {/* Ambient backdrop reflection */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
                            
                            {/* Dynamic 3D Spheres or Triangles drawing */}
                            <div className="relative preserve-3d scale-[0.8] hover:scale-[0.88] transition-transform duration-500">
                              <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center preserve-3d relative ${item.bgColor}`}>
                                {/* Conic shine effect */}
                                <div className="absolute inset-2 rounded-full border border-white/10 animate-spin-slow opacity-30 z-0" />
                                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-inner z-10">
                                  {item.type === 'project' ? (
                                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                                  ) : item.type === 'skill' ? (
                                    <Cpu className="w-5 h-5 text-white animate-pulse" />
                                  ) : (
                                    <Award className="w-5 h-5 text-white animate-pulse" />
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Pinterest Card Overlay (Visible on Hover) */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-20">
                              
                              {/* Pinterest Save Button */}
                              <div className="w-full flex justify-end">
                                <button
                                  onClick={(e) => handleSavePin(e, item.id)}
                                  className={`px-3 py-1.5 text-[10px] font-coc tracking-wider rounded-full flex items-center gap-1 cursor-pointer focus:outline-none transition-all active:scale-95 ${
                                    isSaved 
                                      ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]' 
                                      : isAkatsuki 
                                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]' 
                                        : 'bg-orange-500 hover:bg-orange-400 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]'
                                  }`}
                                >
                                  {isSaved ? (
                                    <>
                                      <BookmarkCheck className="w-3 h-3" />
                                      <span>SAVED 📌</span>
                                    </>
                                  ) : (
                                    <>
                                      <Bookmark className="w-3 h-3" />
                                      <span>SAVE PIN</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* External Project Links */}
                              <div className="flex items-center gap-3">
                                {item.github && (
                                  <a 
                                    href={item.github} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 rounded-full border border-white/20 bg-black/50 text-slate-300 hover:text-white hover:border-white transition-all active:scale-90"
                                  >
                                    <Github className="w-4 h-4" />
                                  </a>
                                )}
                                {item.live && item.live !== '#' && (
                                  <a 
                                    href={item.live} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 rounded-full border border-white/20 bg-black/50 text-slate-300 hover:text-white hover:border-white transition-all active:scale-90"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                              </div>

                            </div>
                          </div>

                          {/* Pin Metadata Info */}
                          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between z-10 bg-black/10">
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className={`text-[8.5px] font-coc uppercase tracking-wider ${
                                  isAkatsuki ? 'text-red-400' : 'text-amber-500'
                                }`}>
                                  {item.category}
                                </span>
                                {item.featured && (
                                  <span className="text-[7.5px] font-coc px-2 py-0.5 rounded border border-yellow-500/30 text-yellow-400 bg-yellow-950/20 font-bold">
                                    ★ FEATURED
                                  </span>
                                )}
                              </div>
                              <h3 className="font-coc text-xs sm:text-sm leading-tight text-white mb-2 group-hover:text-yellow-300 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-[11px] font-body text-slate-400 line-clamp-3 leading-relaxed mb-4">
                                {item.desc}
                              </p>
                            </div>

                            {/* Tech Chips */}
                            <div className="flex flex-wrap gap-1.5 mt-auto">
                              {item.tags.slice(0, 3).map((tag, i) => (
                                <span 
                                  key={i} 
                                  className="text-[9px] font-body px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-slate-300"
                                >
                                  {tag}
                                </span>
                              ))}
                              {item.tags.length > 3 && (
                                <span className="text-[9px] font-body px-2 py-0.5 rounded-md bg-white/5 text-slate-400 font-bold">
                                  +{item.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </div>

                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

      </div>

      {/* 3D Flip Expansion Modal */}
      <AnimatePresence>
        {activePin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={() => setActivePin(null)}
          >
            {/* Modal Body with 3D Y-Axis Flip Entrance */}
            <motion.div
              initial={{ rotateY: 90, scale: 0.9, opacity: 0 }}
              animate={{ rotateY: 0, scale: 1, opacity: 1 }}
              exit={{ rotateY: -90, scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className={`w-full max-w-2xl rounded-3xl border-4 overflow-hidden shadow-2xl relative preserve-3d flex flex-col md:flex-row ${
                isAkatsuki 
                  ? 'panel-steel-yonko border-red-500' 
                  : 'panel-scroll-strawhat border-amber-600'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button
                onClick={() => setActivePin(null)}
                className={`absolute top-4 right-4 p-2 rounded-full border transition-all z-50 cursor-pointer active:scale-95 ${
                  isAkatsuki 
                    ? 'border-white/10 bg-black/60 text-white hover:bg-white/10' 
                    : 'border-amber-950/20 bg-amber-100/80 text-amber-950 hover:bg-amber-200'
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Visual 3D Object container */}
              <div className={`w-full md:w-1/2 flex items-center justify-center p-8 relative border-b md:border-b-0 md:border-r ${
                isAkatsuki ? 'bg-black/50 border-red-900/40' : 'bg-amber-100/40 border-amber-950/20'
              }`}>
                {/* 3D Floating Crystal Animation */}
                <div className="crystal-container py-10 scale-125">
                  <div className="crystal-3d">
                    <div className="crystal-face crystal-face-top1" />
                    <div className="crystal-face crystal-face-top2" />
                    <div className="crystal-face crystal-face-top3" />
                    <div className="crystal-face crystal-face-top4" />
                  </div>
                </div>

                <div className="absolute bottom-4 text-center">
                  <span className={`text-[8.5px] font-coc uppercase tracking-[0.2em] font-bold ${
                    isAkatsuki ? 'text-red-400' : 'text-amber-800'
                  }`}>
                    Interactive 3D Matrix
                  </span>
                </div>
              </div>

              {/* Right Column: Detailed Metadata */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[9px] font-coc px-3 py-1 rounded-full border shadow-sm ${
                      isAkatsuki 
                        ? 'bg-red-950/40 border-red-500/30 text-red-300' 
                        : 'bg-amber-800/15 border-amber-700/30 text-amber-900 font-bold'
                    }`}>
                      {activePin.type.toUpperCase()}
                    </span>
                    <span className={`text-[9px] font-coc px-3 py-1 rounded-full border shadow-sm ${
                      isAkatsuki 
                        ? 'bg-red-950/40 border-red-500/30 text-red-400' 
                        : 'bg-amber-800/15 border-amber-700/30 text-amber-700 font-bold'
                    }`}>
                      {activePin.category.toUpperCase()}
                    </span>
                  </div>

                  <h3 className={`font-coc text-base sm:text-lg leading-tight ${
                    isAkatsuki ? 'text-white' : 'text-amber-950'
                  }`}>
                    {activePin.title}
                  </h3>

                  <p className={`text-xs font-body leading-relaxed ${
                    isAkatsuki ? 'text-slate-300' : 'text-amber-950/90 font-medium'
                  }`}>
                    {activePin.desc}
                  </p>

                  {/* Render Stats/Metrics if present */}
                  {activePin.stats && (
                    <div className={`p-4 rounded-2xl border space-y-2 text-[10px] font-coc ${
                      isAkatsuki 
                        ? 'bg-black/60 border-red-900/40 text-slate-300' 
                        : 'bg-black/5 border-amber-900/20 text-amber-950 font-bold'
                    }`}>
                      <div className="border-b border-dashed border-slate-700/20 pb-1.5 mb-2 flex items-center justify-between text-[9px] opacity-70">
                        <span>DATA BLUEPRINT METRICS</span>
                        <span>S-RANK UNIT</span>
                      </div>
                      {Object.entries(activePin.stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="opacity-75 uppercase tracking-wider">⚡ {key}</span>
                          <span className={`${isAkatsuki ? 'text-red-400' : 'text-amber-800'} font-bold`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div>
                    <h4 className={`text-[9px] font-coc tracking-wider mb-2 ${
                      isAkatsuki ? 'text-slate-400' : 'text-amber-800 font-bold'
                    }`}>
                      TAGS & STACKS
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activePin.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className={`text-[9px] font-body px-2.5 py-1 rounded-md border ${
                            isAkatsuki 
                              ? 'bg-white/5 border-white/5 text-slate-300' 
                              : 'bg-amber-100/60 border-amber-900/10 text-amber-950 font-semibold'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal CTA Buttons */}
                <div className="flex items-center gap-3 mt-8 pt-4 border-t border-dashed border-slate-700/10">
                  {activePin.github && (
                    <a 
                      href={activePin.github} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={() => playCoinSound()}
                      className={`flex-1 py-3 text-center text-[10px] font-coc tracking-widest rounded-xl border-2 cursor-pointer focus:outline-none flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                        isAkatsuki 
                          ? 'border-red-500/50 bg-red-950/20 text-red-300 hover:border-red-400' 
                          : 'border-amber-700/40 bg-amber-100/40 text-amber-950 hover:bg-amber-200/50'
                      }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GITHUB bluePRINT</span>
                    </a>
                  )}
                  {activePin.live && activePin.live !== '#' && (
                    <a 
                      href={activePin.live} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={() => playCoinSound()}
                      className={`flex-1 py-3 text-center text-[10px] font-coc tracking-widest rounded-xl border-2 cursor-pointer focus:outline-none flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                        isAkatsuki 
                          ? 'bg-gradient-to-r from-red-700 to-red-600 border-red-500 text-white hover:from-red-600 hover:to-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]' 
                          : 'bg-gradient-to-r from-amber-600 to-orange-500 border-amber-700 text-white hover:from-amber-500 hover:to-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LIVE DEMO</span>
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default PinterestBoard;

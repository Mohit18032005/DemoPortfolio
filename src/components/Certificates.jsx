import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';
import CinematicReveal from './CinematicReveal';

const Certificates = () => {
  const { isAkatsuki, playJutsuSound } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'ai',
      label: 'Senjutsu (Sage Art)',
      desc: 'Neural networks, machine learning models, computer vision pipelines, and NVIDIA/IBM workflow specializations.',
      count: 12,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]',
      bgColor: 'bg-purple-950/20'
    },
    {
      id: 'gen-ai',
      label: 'Kage Bunshin (Clone Auto)',
      desc: 'Prompt engineering, Google prompting essentials, task automation, and leveraging AI as a creative partner.',
      count: 5,
      color: 'text-teal-400',
      borderColor: 'border-teal-500/40 hover:border-teal-400 hover:shadow-[0_0_25px_rgba(20,184,166,0.35)]',
      bgColor: 'bg-teal-950/20'
    },
    {
      id: 'cyber',
      label: 'Fūinjutsu (Barrier Seal)',
      desc: 'Defensive fundamentals, cybersecurity tools, digital system attacks, and threat environment analysis.',
      count: 4,
      color: 'text-red-400',
      borderColor: 'border-red-500/40 hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]',
      bgColor: 'bg-red-950/20'
    },
    {
      id: 'cloud',
      label: 'Kamui (Space-Time Cloud)',
      desc: 'Microsoft AZ-204 solution development, AWS cloud environments, IT support, and Git/GitHub workflows.',
      count: 6,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/40 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]',
      bgColor: 'bg-blue-950/20'
    },
    {
      id: 'dev',
      label: 'Taijutsu (Core Coding)',
      desc: 'Python automation, JavaScript engines, mobile application development, and algorithms/data structures.',
      count: 13,
      color: 'text-pink-400',
      borderColor: 'border-pink-500/40 hover:border-pink-400 hover:shadow-[0_0_25px_rgba(236,72,153,0.35)]',
      bgColor: 'bg-pink-950/20'
    },
    {
      id: 'data',
      label: 'Byakugan Intelligence',
      desc: 'Process automation, business intelligence dashboards, real-world data analysis, and scripting solutions.',
      count: 3,
      color: 'text-yellow-400',
      borderColor: 'border-yellow-500/40 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]',
      bgColor: 'bg-yellow-950/20'
    }
  ];

  const certificates = [
    { title: "Machine Learning with Python", issuer: "IBM", category: "ai", date: "2025", link: "/certificates/Machine Learning with Python By IBM.pdf" },
    { title: "AI Infrastructure & Operations", issuer: "NVIDIA", category: "ai", date: "2025", link: "/certificates/AI Infrastructure and Operations Fundamentals By NVIDIA.pdf" },
    { title: "LLM Deployment & Ethical AI", issuer: "NVIDIA", category: "ai", date: "2025", link: "/certificates/NVIDIA LLM Experimentation Deployment and Ethical AI.pdf" },
    { title: "AI Workflow: Model Deployment", issuer: "IBM", category: "ai", date: "2025", link: "/certificates/AI Workflow Enterprise Model Deployment By IBM.pdf" },
    { title: "AI Python for Beginners", issuer: "DeepLearning.AI", category: "ai", date: "2024", link: "/certificates/AI_Python_for_Beginners_By_DeepLearningAI.pdf" },
    { title: "AI Workflow: Business Priorities", issuer: "IBM", category: "ai", date: "2025", link: "/certificates/AI Workflow Business Priorities and Data by IBM.pdf" },
    { title: "AI Workflow: Data Analysis", issuer: "IBM", category: "ai", date: "2025", link: "/certificates/AI Workflow_ Data Analysis and Hypothesis Testing By IBM.pdf" },
    { title: "AI Workflow: Feature Engineering", issuer: "IBM", category: "ai", date: "2025", link: "/certificates/AI Workflow_ Feature Engineering and Bias Detection By IBM.pdf" },
    { title: "AI Workflow: ML & NLP", issuer: "IBM", category: "ai", date: "2025", link: "/certificates/AI Workflow_ Machine Learning, Visual Recognition and NLP By IBM.pdf" },
    { title: "Computer Vision Intro", issuer: "U. of Colorado", category: "ai", date: "2024", link: "/certificates/Introduction to Computer Vision by University of Colorado.pdf" },
    { title: "Deep Learning for CV", issuer: "U. of Colorado", category: "ai", date: "2024", link: "/certificates/Deep Learning for Computer Vision By University Of Colorado Boulder.pdf" },
    { title: "AI & ML Engineering", issuer: "Microsoft", category: "ai", date: "2025", link: "/certificates/Microsoft AI & ML__Engineering.pdf" },
    { title: "Prompt Engineering", issuer: "Google", category: "gen-ai", date: "2025", link: "/certificates/Prompt Engineering By Google.pdf" },
    { title: "Google Prompting Essentials", issuer: "Google", category: "gen-ai", date: "2025", link: "/certificates/GooglePromptingEssentials_Badge.pdf" },
    { title: "Design Prompts for Tasks", issuer: "Google", category: "gen-ai", date: "2025", link: "/certificates/Design Prompts for Everyday Work Tasks.pdf" },
    { title: "Use AI as Creative Partner", issuer: "Google", category: "gen-ai", date: "2025", link: "/certificates/Use AI as a Creative or Expert Partner.pdf" },
    { title: "Speed Up Data Analysis", issuer: "Google", category: "gen-ai", date: "2025", link: "/certificates/Speed Up Data Analysis and Presentation Building.pdf" },
    { title: "Intro to Cybersecurity", issuer: "IBM", category: "cyber", date: "2024", link: "/certificates/Introduction To Cybersecurity By IBM.pdf" },
    { title: "Cyber Security Fundamentals", issuer: "U. of London", category: "cyber", date: "2024", link: "/certificates/Cyber Security Fundamentals By University Of London.pdf" },
    { title: "Cybersecurity Essentials", issuer: "IBM", category: "cyber", date: "2024", link: "/certificates/Introduction to Cybersecurity Essentials by IBM.pdf" },
    { title: "Tools & Cyberattacks", issuer: "IBM", category: "cyber", date: "2024", link: "/certificates/Introduction to Cybersecurity Tools & Cyberattacks.pdf" },
    { title: "Developing Solutions (AZ-204)", issuer: "Microsoft", category: "cloud", date: "2024", link: "/certificates/Prepare for AZ-204 Developing Solutions for by Microsoft.pdf" },
    { title: "IT & AWS Cloud", issuer: "AWS", category: "cloud", date: "2024", link: "/certificates/Introduction to Information Technology and AWS.pdf" },
    { title: "Intro to IT & AWS", issuer: "AWS", category: "cloud", date: "2024", link: "/certificates/Introduction to Information Technology and AWS_Cloud.pdf" },
    { title: "Technical Support Fundamentals", issuer: "Google", category: "cloud", date: "2024", link: "/certificates/Technical Support Fundamentals By Google.pdf" },
    { title: "Technical Support Fundamentals II", issuer: "Google", category: "cloud", date: "2024", link: "/certificates/Technical Support Fundamentals By Google (2).pdf" },
    { title: "Git and GitHub", issuer: "IBM", category: "cloud", date: "2024", link: "/certificates/Getting Started with Git and GitHub by IBM.pdf" },
    { title: "Programming in Python", issuer: "Meta", category: "dev", date: "2024", link: "/certificates/Programming in Python By META.pdf" },
    { title: "Programming with JavaScript", issuer: "Meta", category: "dev", date: "2024", link: "/certificates/Programming with JavaScript By META.pdf" },
    { title: "Android Mobile App Dev", issuer: "Meta", category: "dev", date: "2024", link: "/certificates/Introduction to Android Mobile Application By META.pdf" },
    { title: "JavaScript (Intermediate)", issuer: "HackerRank", category: "dev", date: "2024", link: "/certificates/JavaScript Intermediate certificate By HackerRank..pdf" },
    { title: "JavaScript (Basic)", issuer: "HackerRank", category: "dev", date: "2024", link: "/certificates/JavaScript basic certificate By HackerRank..pdf" },
    { title: "Python (Basic)", issuer: "HackerRank", category: "dev", date: "2024", link: "/certificates/Python basic certificate By HackerRank..pdf" },
    { title: "CSS", issuer: "HackerRank", category: "dev", date: "2024", link: "/certificates/CSS certificate By HackerRank..pdf" },
    { title: "SQL (Basic)", issuer: "HackerRank", category: "dev", date: "2024", link: "/certificates/SQL basic certificate By HackerRank.pdf" },
    { title: "Programming in C", issuer: "Duke Univ", category: "dev", date: "2024", link: "/certificates/Programming Fundamental In C By Duke University.pdf" },
    { title: "Programming for Everybody", issuer: "U. of Michigan", category: "dev", date: "2024", link: "/certificates/Programming for Everybody by University of Michigan.pdf" },
    { title: "Crash Course On Python", issuer: "Google", category: "dev", date: "2024", link: "/certificates/Crash Course On Python By Google.pdf" },
    { title: "Python for Data Science", issuer: "IBM", category: "dev", date: "2024", link: "/certificates/Python for Data Science, AI & Development By IBM.pdf" },
    { title: "Python Development", issuer: "Microsoft", category: "dev", date: "2025", link: "/certificates/Microsoft Python Development.pdf" },
    { title: "Data Analytics Automation", issuer: "AICTE", category: "data", date: "2025", link: "/certificates/Data Analytics Process Automation Virtual Internship By AICTE.pdf" },
    { title: "Data Analytics Lab", issuer: "IBM SkillsBuild", category: "data", date: "2025", link: "/certificates/Data Analytics & Business Intelligence Lab_ Explore, Analyze & Build Real-World Solutions By IBM Skill Build.pdf" },
    { title: "Intro to Data Analytics", issuer: "Meta", category: "data", date: "2024", link: "/certificates/Introduction to Data Analytics By META.pdf" }
  ];

  const categoryGlowMap = {
    'ai': { glow: 'rgba(168,85,247,0.12)', filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.6))' },
    'gen-ai': { glow: 'rgba(20,184,166,0.12)', filter: 'drop-shadow(0 0 10px rgba(20,184,166,0.6))' },
    'cyber': { glow: 'rgba(239,68,68,0.12)', filter: 'drop-shadow(0 0 10px rgba(239,68,68,0.6))' },
    'cloud': { glow: 'rgba(59,130,246,0.12)', filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.6))' },
    'dev': { glow: 'rgba(236,72,153,0.12)', filter: 'drop-shadow(0 0 10px rgba(236,72,153,0.6))' },
    'data': { glow: 'rgba(234,179,8,0.12)', filter: 'drop-shadow(0 0 10px rgba(234,179,8,0.6))' },
  };

  const categoryRadialMap = {
    'ai': 'radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.08) 0%, transparent 55%)',
    'gen-ai': 'radial-gradient(ellipse at 80% 20%, rgba(20,184,166,0.08) 0%, transparent 55%)',
    'cyber': 'radial-gradient(ellipse at 80% 20%, rgba(239,68,68,0.08) 0%, transparent 55%)',
    'cloud': 'radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.08) 0%, transparent 55%)',
    'dev': 'radial-gradient(ellipse at 80% 20%, rgba(236,72,153,0.08) 0%, transparent 55%)',
    'data': 'radial-gradient(ellipse at 80% 20%, rgba(234,179,8,0.08) 0%, transparent 55%)',
  };

  const renderCategoryIcon = (id, colorClass) => {
    const filterStyle = categoryGlowMap[id]?.filter || '';
    if (id === 'ai') {
      return (
        <svg className={`w-16 h-16 ${colorClass} animate-pulse`} style={{ filter: filterStyle }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-.5 2-2 3.5-3.5 4.5A7 7 0 0 0 12 19c3.3 0 6-2.7 6-6 0-3.3-2.7-6-6-11z" />
        </svg>
      );
    } else if (id === 'gen-ai') {
      return (
        <svg className={`w-16 h-16 ${colorClass}`} style={{ filter: filterStyle }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="8" cy="8" r="4" />
          <path d="M2 18v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
          <circle cx="16" cy="7" r="3" />
          <path d="M12 14v-1a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v1" />
        </svg>
      );
    } else if (id === 'cyber') {
      return (
        <svg className={`w-16 h-16 ${colorClass}`} style={{ filter: filterStyle }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="10" width="18" height="11" rx="2" />
          <path d="M7 10V7a5 5 0 0 1 10 0v3" />
        </svg>
      );
    } else if (id === 'cloud') {
      return (
        <svg className={`w-16 h-16 ${colorClass} animate-spin-slow`} style={{ filter: filterStyle }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.4" />
          <path d="M12 2a10 10 0 0 0-10 10" />
          <path d="M12 6a6 6 0 0 0-6 6" />
        </svg>
      );
    } else if (id === 'dev') {
      return (
        <svg className={`w-16 h-16 ${colorClass}`} style={{ filter: filterStyle }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
        </svg>
      );
    } else {
      return (
        <svg className={`w-16 h-16 ${colorClass}`} style={{ filter: filterStyle }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    }
  };

  const filteredCertificates = selectedCategory 
    ? certificates.filter(cert => cert.category === selectedCategory) 
    : [];

  const handleCategorySelect = (categoryId) => {
    playJutsuSound();
    setSelectedCategory(categoryId);
  };

  const handleCardClick = (link) => {
    playJutsuSound();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const activeCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <section 
      id="certificates" 
      className={`relative py-24 overflow-hidden transition-colors duration-1000 ${
        isAkatsuki ? 'bg-[#070102]' : 'bg-[#05130e]'
      }`}
    >
      {/* Background Graphic */}
      <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
        isAkatsuki ? 'bg-[url("/akatsuki-bg.png")] opacity-[0.14]' : 'bg-[url("/konoha-bg.png")] opacity-[0.1]'
      }`} />

      {/* Atmospheric fog layers */}
      <div className="fog-layer-1 opacity-15" />
      <div className="fog-layer-2 opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <CinematicReveal preset="cinematic" duration={1} className="text-center mb-16">
          <h2 className="font-coc text-2xl sm:text-3xl md:text-4xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            📜 SPELLS & SCROLLS (CERTIFICATIONS)
          </h2>
          <div className={`w-40 h-1.5 mx-auto rounded-full mb-8 ${
            isAkatsuki ? 'bg-red-500 shadow-[0_0_8px_rgba(200,16,46,0.8)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]'
          }`} />
        </CinematicReveal>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              <motion.div
                key="categories-grid"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
              >
                {categories.map((cat) => (
                  <motion.div
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="cursor-pointer"
                  >
                    <TiltCard intensity={14} glowColor={categoryGlowMap[cat.id]?.glow}>
                      <div 
                        className={`p-6 h-full flex flex-col justify-between rounded-2xl border-4 transition-all duration-300 relative overflow-hidden group tilt-card-shadow backdrop-blur-sm ${cat.borderColor}`}
                        style={{
                          backgroundImage: categoryRadialMap[cat.id],
                          backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-coc text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors leading-snug tracking-wider">
                              {cat.label}
                            </h3>
                            <div className="group-hover:scale-110 transition-transform duration-300">
                              <div className={`w-18 h-18 rounded-full flex items-center justify-center ${cat.bgColor}`}>
                                {renderCategoryIcon(cat.id, cat.color)}
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-body mt-2">
                            {cat.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80">
                          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-slate-700 font-coc text-[8px] sm:text-[9px] text-slate-300">
                            <span className={cat.color}>⚡</span>
                            <span>{cat.count} ACTIVE JUTSUS</span>
                          </div>
                          
                          <div className={`px-3 py-1.5 font-coc text-[8px] rounded-lg border-2 transition-all active:scale-95 ${
                            isAkatsuki 
                              ? 'bg-red-950/60 text-red-200 border-red-500/40 group-hover:bg-red-900/60 shadow-[0_2px_0_#200002]' 
                              : 'bg-amber-950/60 text-amber-200 border-amber-600/40 group-hover:bg-amber-900/60 shadow-[0_2px_0_#3d1a04]'
                          }`}>
                            REVEAL
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="certificates-view"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.25 }}
                className="max-w-5xl mx-auto"
              >
                <div className="flex flex-col gap-6 mb-12">
                  <motion.button
                    onClick={() => {
                      playJutsuSound();
                      setSelectedCategory(null);
                    }}
                    whileHover={{ scale: 1.04, x: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-shinobi-blue self-start px-6 py-2.5 text-[9px] sm:text-[10px] cursor-pointer focus:outline-none flex items-center gap-2"
                  >
                    <span>←</span>
                    <span>BACK TO SPELLBOOK</span>
                  </motion.button>

                  <div className={`p-6 md:p-8 rounded-2xl border-4 backdrop-blur-sm flex flex-col md:flex-row items-center gap-6 ${activeCategory.borderColor}`}
                    style={{
                      backgroundImage: categoryRadialMap[activeCategory.id],
                      backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full ${activeCategory.bgColor}`}>
                      {renderCategoryIcon(activeCategory.id, activeCategory.color)}
                    </div>
                    <div className="text-center md:text-left flex-1">
                      <h3 className="font-coc text-base sm:text-lg md:text-xl text-white mb-2 tracking-widest">
                        {activeCategory.label} SPELLS
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-body mb-4">
                        {activeCategory.desc}
                      </p>
                      <div className="inline-flex items-center gap-1.5 bg-black/45 px-3 py-1.5 rounded-full border border-slate-700/80 font-coc text-[9px] text-slate-300">
                        <span className={activeCategory.color}>⚡</span>
                        <span>{activeCategory.count} ACTIVE CERTIFICATES</span>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredCertificates.map((cert) => (
                      <motion.div
                        layout
                        key={cert.title}
                        initial={{ opacity: 0, scale: 0.9, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -15 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => handleCardClick(cert.link)}
                        className="cursor-pointer"
                      >
                        <TiltCard intensity={14} glowColor={isAkatsuki ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)'}>
                          <div 
                            className={`p-6 h-full flex flex-col justify-between rounded-2xl border-4 transition-all duration-300 relative overflow-hidden group tilt-card-shadow backdrop-blur-sm ${
                              isAkatsuki 
                                ? 'border-red-500/40 hover:border-red-400 hover:shadow-[0_0_25px_rgba(200,16,46,0.3)] text-white' 
                                : 'border-amber-600/40 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] text-white'
                            }`}
                            style={{
                              backgroundImage: isAkatsuki 
                                ? 'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.06) 0%, transparent 50%)'
                                : 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 50%)',
                              backgroundColor: 'rgba(0,0,0,0.4)',
                            }}
                          >
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <span className={`font-coc text-[9px] px-2.5 py-1 rounded border ${
                                  isAkatsuki ? 'bg-red-950/40 border-red-800/50 text-red-300' : 'bg-amber-950/30 border-amber-700/40 text-amber-400'
                                }`}>
                                  {cert.issuer}
                                </span>
                                <svg className={`w-5 h-5 ${isAkatsuki ? 'text-red-400' : 'text-amber-500'}`} style={{ filter: `drop-shadow(0 0 4px ${isAkatsuki ? 'rgba(239,68,68,0.4)' : 'rgba(245,158,11,0.4)'})` }} viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M19 3H5c-1.1 0-2 .9-2 2v4c0 .88.58 1.62 1.38 1.87C3.58 11.13 3 11.87 3 12.75V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.25c0-.88-.58-1.62-1.38-1.87.8-.25 1.38-.99 1.38-1.87V5c0-1.1-.9-2-2-2z" />
                                </svg>
                              </div>

                              <h4 className="font-coc text-[10px] sm:text-xs text-white mb-2 leading-snug tracking-wider group-hover:text-amber-300 transition-colors">
                                {cert.title}
                              </h4>
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80">
                              <span className="font-body text-[10px] text-slate-400 font-semibold">
                                LEARNED: {cert.date}
                              </span>
                              
                              <div
                                className={`px-3 py-1.5 font-coc text-[8px] rounded-lg border-2 transition-all active:scale-95 focus:outline-none ${
                                  isAkatsuki 
                                    ? 'bg-red-950/60 text-red-200 border-red-500/40 group-hover:bg-red-900/60 shadow-[0_2px_0_#200002]' 
                                    : 'bg-amber-950/60 text-amber-200 border-amber-600/40 group-hover:bg-amber-900/60 shadow-[0_2px_0_#3d1a04]'
                                }`}
                              >
                                VIEW SCROLL
                              </div>
                            </div>
                          </div>
                        </TiltCard>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Certificates;

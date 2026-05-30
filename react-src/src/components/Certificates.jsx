import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Certificates = () => {
  const { isNight, playCoinSound } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'ai',
      label: 'AI & ML',
      desc: 'Neural networks, machine learning models, computer vision pipelines, and NVIDIA/IBM workflow specializations.',
      icon: '/Dark Elixir Icon.webp',
      count: 12,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]',
      bgColor: 'bg-purple-950/20'
    },
    {
      id: 'gen-ai',
      label: 'Generative AI',
      desc: 'Prompt engineering, Google prompting essentials, task automation, and leveraging AI as a creative partner.',
      icon: '/Gem Icon.webp',
      count: 5,
      color: 'text-teal-400',
      borderColor: 'border-teal-500/40 hover:border-teal-400 hover:shadow-[0_0_25px_rgba(20,184,166,0.35)]',
      bgColor: 'bg-teal-950/20'
    },
    {
      id: 'cyber',
      label: 'Cybersecurity',
      desc: 'Defensive fundamentals, cybersecurity tools, digital system attacks, and threat environment analysis.',
      icon: '/ShieldClan Badge Icon.webp',
      count: 4,
      color: 'text-red-400',
      borderColor: 'border-red-500/40 hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]',
      bgColor: 'bg-red-950/20'
    },
    {
      id: 'cloud',
      label: 'Cloud & IT',
      desc: 'Microsoft AZ-204 solution development, AWS cloud environments, IT support, and Git/GitHub workflows.',
      icon: '/TownHall.webp',
      count: 6,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/40 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]',
      bgColor: 'bg-blue-950/20'
    },
    {
      id: 'dev',
      label: 'Programming',
      desc: 'Python automation, JavaScript engines, mobile application development, and algorithms/data structures.',
      icon: '/Elixir Drop Icon.webp',
      count: 13,
      color: 'text-pink-400',
      borderColor: 'border-pink-500/40 hover:border-pink-400 hover:shadow-[0_0_25px_rgba(236,72,153,0.35)]',
      bgColor: 'bg-pink-950/20'
    },
    {
      id: 'data',
      label: 'Data Analytics',
      desc: 'Process automation, business intelligence dashboards, real-world data analysis, and scripting solutions.',
      icon: '/Gold Coin Icon.webp',
      count: 3,
      color: 'text-yellow-400',
      borderColor: 'border-yellow-500/40 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]',
      bgColor: 'bg-yellow-950/20'
    }
  ];

  const certificates = [
    // AI & Machine Learning
    { title: "Machine Learning with Python", issuer: "IBM", category: "ai", date: "2025", icon: "/Elixir Drop Icon.webp", link: "/certificates/Machine Learning with Python By IBM.pdf" },
    { title: "AI Infrastructure & Operations", issuer: "NVIDIA", category: "ai", date: "2025", icon: "/Dark Elixir Icon.webp", link: "/certificates/AI Infrastructure and Operations Fundamentals By NVIDIA.pdf" },
    { title: "LLM Deployment & Ethical AI", issuer: "NVIDIA", category: "ai", date: "2025", icon: "/Dark Elixir Icon.webp", link: "/certificates/NVIDIA LLM Experimentation Deployment and Ethical AI.pdf" },
    { title: "AI Workflow: Model Deployment", issuer: "IBM", category: "ai", date: "2025", icon: "/Elixir Drop Icon.webp", link: "/certificates/AI Workflow Enterprise Model Deployment By IBM.pdf" },
    { title: "AI Python for Beginners", issuer: "DeepLearning.AI", category: "ai", date: "2024", icon: "/Gem Icon.webp", link: "/certificates/AI_Python_for_Beginners_By_DeepLearningAI.pdf" },
    { title: "AI Workflow: Business Priorities", issuer: "IBM", category: "ai", date: "2025", icon: "/Elixir Drop Icon.webp", link: "/certificates/AI Workflow Business Priorities and Data by IBM.pdf" },
    { title: "AI Workflow: Data Analysis", issuer: "IBM", category: "ai", date: "2025", icon: "/Elixir Drop Icon.webp", link: "/certificates/AI Workflow_ Data Analysis and Hypothesis Testing By IBM.pdf" },
    { title: "AI Workflow: Feature Engineering", issuer: "IBM", category: "ai", date: "2025", icon: "/Elixir Drop Icon.webp", link: "/certificates/AI Workflow_ Feature Engineering and Bias Detection By IBM.pdf" },
    { title: "AI Workflow: ML & NLP", issuer: "IBM", category: "ai", date: "2025", icon: "/Elixir Drop Icon.webp", link: "/certificates/AI Workflow_ Machine Learning, Visual Recognition and NLP By IBM.pdf" },
    { title: "Computer Vision Intro", issuer: "U. of Colorado", category: "ai", date: "2024", icon: "/Dark Elixir Icon.webp", link: "/certificates/Introduction to Computer Vision by University of Colorado.pdf" },
    { title: "Deep Learning for CV", issuer: "U. of Colorado", category: "ai", date: "2024", icon: "/Dark Elixir Icon.webp", link: "/certificates/Deep Learning for Computer Vision By University Of Colorado Boulder.pdf" },
    { title: "AI & ML Engineering", issuer: "Microsoft", category: "ai", date: "2025", icon: "/Dark Elixir Icon.webp", link: "/certificates/Microsoft AI & ML__Engineering.pdf" },

    // Gen AI
    { title: "Prompt Engineering", issuer: "Google", category: "gen-ai", date: "2025", icon: "/Gem Icon.webp", link: "/certificates/Prompt Engineering By Google.pdf" },
    { title: "Google Prompting Essentials", issuer: "Google", category: "gen-ai", date: "2025", icon: "/Gem Icon.webp", link: "/certificates/GooglePromptingEssentials_Badge.pdf" },
    { title: "Design Prompts for Tasks", issuer: "Google", category: "gen-ai", date: "2025", icon: "/Gem Icon.webp", link: "/certificates/Design Prompts for Everyday Work Tasks.pdf" },
    { title: "Use AI as Creative Partner", issuer: "Google", category: "gen-ai", date: "2025", icon: "/Gem Icon.webp", link: "/certificates/Use AI as a Creative or Expert Partner.pdf" },
    { title: "Speed Up Data Analysis", issuer: "Google", category: "gen-ai", date: "2025", icon: "/Gem Icon.webp", link: "/certificates/Speed Up Data Analysis and Presentation Building.pdf" },

    // Cybersecurity
    { title: "Intro to Cybersecurity", issuer: "IBM", category: "cyber", date: "2024", icon: "/ShieldClan Badge Icon.webp", link: "/certificates/Introduction To Cybersecurity By IBM.pdf" },
    { title: "Cyber Security Fundamentals", issuer: "U. of London", category: "cyber", date: "2024", icon: "/ShieldClan Badge Icon.webp", link: "/certificates/Cyber Security Fundamentals By University Of London.pdf" },
    { title: "Cybersecurity Essentials", issuer: "IBM", category: "cyber", date: "2024", icon: "/ShieldClan Badge Icon.webp", link: "/certificates/Introduction to Cybersecurity Essentials by IBM.pdf" },
    { title: "Tools & Cyberattacks", issuer: "IBM", category: "cyber", date: "2024", icon: "/ShieldClan Badge Icon.webp", link: "/certificates/Introduction to Cybersecurity Tools & Cyberattacks.pdf" },

    // Cloud & IT
    { title: "Developing Solutions (AZ-204)", issuer: "Microsoft", category: "cloud", date: "2024", icon: "/TownHall.webp", link: "/certificates/Prepare for AZ-204 Developing Solutions for by Microsoft.pdf" },
    { title: "IT & AWS Cloud", issuer: "AWS", category: "cloud", date: "2024", icon: "/TownHall.webp", link: "/certificates/Introduction to Information Technology and AWS.pdf" },
    { title: "Intro to IT & AWS", issuer: "AWS", category: "cloud", date: "2024", icon: "/TownHall.webp", link: "/certificates/Introduction to Information Technology and AWS_Cloud.pdf" },
    { title: "Technical Support Fundamentals", issuer: "Google", category: "cloud", date: "2024", icon: "/TownHall.webp", link: "/certificates/Technical Support Fundamentals By Google.pdf" },
    { title: "Technical Support Fundamentals II", issuer: "Google", category: "cloud", date: "2024", icon: "/TownHall.webp", link: "/certificates/Technical Support Fundamentals By Google (2).pdf" },
    { title: "Git and GitHub", issuer: "IBM", category: "cloud", date: "2024", icon: "/TownHall.webp", link: "/certificates/Getting Started with Git and GitHub by IBM.pdf" },

    // Programming
    { title: "Programming in Python", issuer: "Meta", category: "dev", date: "2024", icon: "/Elixir Drop Icon.webp", link: "/certificates/Programming in Python By META.pdf" },
    { title: "Programming with JavaScript", issuer: "Meta", category: "dev", date: "2024", icon: "/Elixir Drop Icon.webp", link: "/certificates/Programming with JavaScript By META.pdf" },
    { title: "Android Mobile App Dev", issuer: "Meta", category: "dev", date: "2024", icon: "/Elixir Drop Icon.webp", link: "/certificates/Introduction to Android Mobile Application By META.pdf" },
    { title: "JavaScript (Intermediate)", issuer: "HackerRank", category: "dev", date: "2024", icon: "/Elixir Drop Icon.webp", link: "/certificates/JavaScript Intermediate certificate By HackerRank..pdf" },
    { title: "JavaScript (Basic)", issuer: "HackerRank", category: "dev", date: "2024", icon: "/Elixir Drop Icon.webp", link: "/certificates/JavaScript basic certificate By HackerRank..pdf" },
    { title: "Python (Basic)", issuer: "HackerRank", category: "dev", date: "2024", icon: "/Elixir Drop Icon.webp", link: "/certificates/Python basic certificate By HackerRank..pdf" },
    { title: "CSS", issuer: "HackerRank", category: "dev", date: "2024", icon: "/Elixir Drop Icon.webp", link: "/certificates/CSS certificate By HackerRank..pdf" },
    { title: "SQL (Basic)", issuer: "HackerRank", category: "dev", date: "2024", icon: "/Elixir Drop Icon.webp", link: "/certificates/SQL basic certificate By HackerRank.pdf" },
    { title: "Programming in C", issuer: "Duke Univ", category: "dev", date: "2024", icon: "/Elixir Drop Icon.webp", link: "/certificates/Programming Fundamental In C By Duke University.pdf" },
    { title: "Programming for Everybody", issuer: "U. of Michigan", category: "dev", date: "2024", icon: "/Elixir Drop Icon.webp", link: "/certificates/Programming for Everybody by University of Michigan.pdf" },
    { title: "Crash Course On Python", issuer: "Google", category: "dev", date: "2024", icon: "/Elixir Drop Icon.webp", link: "/certificates/Crash Course On Python By Google.pdf" },
    { title: "Python for Data Science", issuer: "IBM", category: "dev", date: "2024", icon: "/Elixir Drop Icon.webp", link: "/certificates/Python for Data Science, AI & Development By IBM.pdf" },
    { title: "Python Development", issuer: "Microsoft", category: "dev", date: "2025", icon: "/Elixir Drop Icon.webp", link: "/certificates/Microsoft Python Development.pdf" },

    // Data Analytics
    { title: "Data Analytics Automation", issuer: "AICTE", category: "data", date: "2025", icon: "/Gold Coin Icon.webp", link: "/certificates/Data Analytics Process Automation Virtual Internship By AICTE.pdf" },
    { title: "Data Analytics Lab", issuer: "IBM SkillsBuild", category: "data", date: "2025", icon: "/Gold Coin Icon.webp", link: "/certificates/Data Analytics & Business Intelligence Lab_ Explore, Analyze & Build Real-World Solutions By IBM Skill Build.pdf" },
    { title: "Intro to Data Analytics", issuer: "Meta", category: "data", date: "2024", icon: "/Gold Coin Icon.webp", link: "/certificates/Introduction to Data Analytics By META.pdf" }
  ];

  const filteredCertificates = selectedCategory 
    ? certificates.filter(cert => cert.category === selectedCategory) 
    : [];

  const handleCategorySelect = (categoryId) => {
    playCoinSound();
    setSelectedCategory(categoryId);
  };

  const handleCardClick = (link) => {
    playCoinSound();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const activeCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <section id="certificates" className="relative py-24 bg-[#0b041a] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-stone-texture opacity-5 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-coc text-2xl sm:text-3xl md:text-4xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-pulse"
          >
            📜 SPELLS & SCROLLS (CERTIFICATIONS)
          </motion.h2>
          <div className={`w-40 h-1.5 mx-auto rounded-full mb-8 ${
            isNight ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'bg-yellow-500 shadow-[0_0_8px_rgba(255,215,0,0.8)]'
          }`} />
        </div>

        {/* Drilldown Container with AnimatePresence */}
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
                    whileHover={{ y: -6 }}
                    className={`p-6 flex flex-col justify-between rounded-2xl border-2 transition-all duration-300 bg-black/45 relative overflow-hidden group cursor-pointer ${cat.borderColor}`}
                  >
                    <div>
                      {/* Top Header: Category Icon & Title */}
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-coc text-xs sm:text-sm text-white group-hover:text-yellow-300 transition-colors leading-snug tracking-wider">
                          {cat.label}
                        </h3>
                        <motion.img 
                          src={cat.icon} 
                          alt={cat.label} 
                          className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        />
                      </div>

                      {/* Description */}
                      <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-body mt-2">
                        {cat.desc}
                      </p>
                    </div>

                    {/* Bottom stats row */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80">
                      <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-slate-700 font-coc text-[8px] sm:text-[9px] text-slate-300">
                        <span className={cat.color}>⚡</span>
                        <span>{cat.count} SPELL SCROLLS</span>
                      </div>
                      
                      <div className={`px-2.5 py-1.5 font-coc text-[8px] rounded border transition-all active:scale-95 ${
                        isNight 
                          ? 'bg-purple-950/60 text-purple-200 border-purple-500/40 group-hover:bg-purple-900/60' 
                          : 'bg-amber-950/60 text-yellow-200 border-yellow-700/40 group-hover:bg-amber-900/60'
                      }`}>
                        REVEAL
                      </div>
                    </div>
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
                {/* Back controls and header details */}
                <div className="flex flex-col gap-6 mb-12">
                  <motion.button
                    onClick={() => {
                      playCoinSound();
                      setSelectedCategory(null);
                    }}
                    whileHover={{ scale: 1.04, x: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-coc-blue self-start px-6 py-2.5 text-[9px] sm:text-[10px] cursor-pointer focus:outline-none flex items-center gap-2"
                  >
                    <span>←</span>
                    <span>BACK TO SPELLBOOK</span>
                  </motion.button>

                  <div className={`p-6 md:p-8 rounded-2xl border-2 bg-black/40 backdrop-blur-sm flex flex-col md:flex-row items-center gap-6 ${activeCategory.borderColor}`}>
                    <motion.img 
                      src={activeCategory.icon} 
                      alt={activeCategory.label} 
                      className="w-20 h-20 md:w-24 md:h-24 object-contain"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    />
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

                {/* Sub-Certificates Grid */}
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
                        className={`p-6 flex flex-col justify-between rounded-2xl border-2 transition-all duration-300 bg-black/35 relative overflow-hidden group cursor-pointer ${
                          isNight 
                            ? 'border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]' 
                            : 'border-yellow-600/40 hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(255,215,0,0.25)]'
                        }`}
                      >
                        <div>
                          {/* Top row: Issuer & Icon */}
                          <div className="flex justify-between items-start mb-4">
                            <span className={`font-coc text-[9px] px-2 py-1 rounded bg-black/40 border border-slate-700 ${
                              isNight ? 'text-purple-300' : 'text-yellow-400'
                            }`}>
                              {cert.issuer}
                            </span>
                            <img src={cert.icon} alt={cert.issuer} className="w-8 h-8 object-contain" />
                          </div>

                          {/* Title */}
                          <h4 className="font-coc text-[10px] sm:text-xs text-white mb-2 leading-snug tracking-wider group-hover:text-yellow-300 transition-colors">
                            {cert.title}
                          </h4>
                        </div>

                        {/* Bottom Row: Date & Action */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80">
                          <span className="font-body text-[10px] text-slate-400 font-semibold">
                            LEARNED: {cert.date}
                          </span>
                          
                          <div
                            className={`px-3 py-1.5 font-coc text-[8px] rounded border transition-all active:scale-95 focus:outline-none ${
                              isNight 
                                ? 'bg-purple-950/60 text-purple-200 border-purple-500/40 group-hover:bg-purple-900/60' 
                                : 'bg-amber-950/60 text-yellow-200 border-yellow-700/40 group-hover:bg-amber-900/60'
                            }`}
                          >
                            VIEW SCROLL
                          </div>
                        </div>
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

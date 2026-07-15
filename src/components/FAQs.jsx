import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import CinematicReveal from './CinematicReveal';

const FAQs = () => {
  const { isAkatsuki, playJutsuSound } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqsData = [
    {
      question: "What is your main technology stack?",
      answer: "I specialize in the MERN/PERN stacks (MongoDB/PostgreSQL, Express, React, Node.js) along with Next.js, TypeScript, Tailwind CSS, Framer Motion, and AWS cloud deployments."
    },
    {
      question: "Are you open to remote full-time roles or freelance contracts?",
      answer: "Yes! I am actively looking for full-time Software Engineer / Frontend Developer roles and am open to freelance collaborations to build custom base layouts (websites)."
    },
    {
      question: "How do you ensure high-performance UI and animations?",
      answer: "I follow strict design engineering guidelines: avoiding heavy layout recalcs, animating only transform and opacity, choosing custom cubic-bezier curves for responsive eases, and using hardware acceleration where necessary."
    },
    {
      question: "What is your experience in managing technical teams?",
      answer: "I was the Lead Technical Organizer (Grand Warden) of major technical hackathons, where I managed registrations, designed APIs, and coordinated a team of developers and operations coordinators."
    },
    {
      question: "How can we start a project together?",
      answer: "You can scroll to the 'News Coo Messenger' (Contact) section to drop me a message or connect with me via GitHub. I respond to all News Coos within 24 hours!"
    }
  ];

  const handleToggle = (index) => {
    playJutsuSound();
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section 
      className={`relative py-24 overflow-hidden transition-colors duration-1000 ${
        isAkatsuki ? 'bg-[#070102]' : 'bg-[#05130e]'
      }`}
    >
      
      {/* Atmospheric fog layers */}
      <div className="fog-layer-1 opacity-15" />
      <div className="fog-layer-2 opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        
        {/* Section Heading */}
        <CinematicReveal preset="cinematic" duration={1} className="text-center mb-16">
          <h2 className="font-coc text-2xl sm:text-3xl md:text-4xl text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            ❓ PIRATE HANDBOOK (FAQS)
          </h2>
          <div className={`w-32 h-1.5 mx-auto rounded-full ${
            isAkatsuki ? 'bg-red-500 shadow-[0_0_8px_rgba(200,16,46,0.8)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]'
          }`} />
        </CinematicReveal>

        {/* FAQs Accordion list */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqsData.map((faq, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`overflow-hidden transition-all duration-300 border-2 rounded-2xl backdrop-blur-sm ${
                  isOpen 
                    ? isAkatsuki 
                      ? 'border-red-500/70 shadow-[0_0_20px_rgba(200,16,46,0.2),_0_8px_30px_rgba(0,0,0,0.4)] bg-black/55' 
                      : 'border-orange-500/70 shadow-[0_0_20px_rgba(249,115,22,0.15),_0_8px_30px_rgba(0,0,0,0.4)] bg-black/55'
                    : 'border-slate-800/60 bg-black/35 hover:border-slate-700/80 hover:bg-black/45'
                }`}
              >
                
                {/* Accordion Trigger header */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={16} className={isAkatsuki ? 'text-red-400' : 'text-orange-400'} />
                    <span className="font-coc text-xs sm:text-sm text-white tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`} 
                  />
                </button>

                {/* Accordion Expandable panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`p-4 sm:p-5 pt-0 border-t text-xs sm:text-sm font-body leading-relaxed bg-black/20 ${
                        isAkatsuki ? 'border-red-500/20 text-slate-300' : 'border-orange-500/20 text-slate-300'
                      }`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQs;

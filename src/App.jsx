import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import PinterestBoard from './components/PinterestBoard';
import CardGenerator from './components/CardGenerator';
import FAQs from './components/FAQs';
import Footer from './components/Footer';
import { useTheme } from './context/ThemeContext';

function App() {
  const { isAkatsuki } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });

  return (
    <div className={`min-h-screen text-white transition-colors duration-500 overflow-x-hidden ${
      isAkatsuki ? 'bg-[#070102]' : 'bg-[#05130e]'
    }`}>
      {/* Cinematic scroll progress indicator */}
      <motion.div
        className="scroll-progress"
        style={{
          scaleX,
          background: isAkatsuki
            ? 'linear-gradient(90deg, #c8102e, #ef233c, #a855f7)'
            : 'linear-gradient(90deg, #ff6700, #ff9f1c, #ffd700)',
          boxShadow: isAkatsuki
            ? '0 0 12px rgba(239, 68, 68, 0.8), 0 0 24px rgba(239, 68, 68, 0.4)'
            : '0 0 12px rgba(249, 115, 22, 0.8), 0 0 24px rgba(249, 115, 22, 0.4)',
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section / Load screen */}
      <Hero />

      {/* Battle Milestones Timeline */}
      <Timeline />

      {/* Pinterest 3D Board (Projects, Skills, Certifications) */}
      <PinterestBoard />

      {/* Clan ID generator */}
      <CardGenerator />

      {/* Frequently Answered Questions */}
      <FAQs />

      {/* Map & Social Footer */}
      <Footer />

      {/* Cinematic film grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />
    </div>
  );
}

export default App;

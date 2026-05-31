import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Prizes from './components/Prizes';
import CardGenerator from './components/CardGenerator';
import Certificates from './components/Certificates';
import Team from './components/Team';
import FAQs from './components/FAQs';
import Footer from './components/Footer';
import { useTheme } from './context/ThemeContext';

function App() {
  const { isAkatsuki } = useTheme();

  return (
    <div className={`min-h-screen text-white transition-colors duration-500 overflow-x-hidden ${
      isAkatsuki ? 'bg-[#070102]' : 'bg-[#05130e]'
    }`}>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section / Load screen */}
      <Hero />

      {/* Battle Milestones Timeline */}
      <Timeline />

      {/* Loot / Rewards */}
      <Prizes />

      {/* Clan ID generator */}
      <CardGenerator />

      {/* Credentials & Certifications */}
      <Certificates />

      {/* War Chiefs / Team */}
      <Team />

      {/* Frequently Answered Questions */}
      <FAQs />

      {/* Map & Social Footer */}
      <Footer />
    </div>
  );
}

export default App;

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isNight, setIsNight] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default muted to comply with browser autoplay policies
  const [audioStarted, setAudioStarted] = useState(false);

  const dayAudioRef = useRef(null);
  const nightAudioRef = useRef(null);
  const coinAudioRef = useRef(null);

  // Initialize Audio
  useEffect(() => {
    dayAudioRef.current = new Audio('/theme_music.ogg');
    dayAudioRef.current.loop = true;
    dayAudioRef.current.volume = 0.3;

    nightAudioRef.current = new Audio('/night-theme/Builder_Base_theme.ogg');
    nightAudioRef.current.loop = true;
    nightAudioRef.current.volume = 0.3;

    coinAudioRef.current = new Audio('/Coins.mp3');
    coinAudioRef.current.volume = 0.5;

    return () => {
      if (dayAudioRef.current) dayAudioRef.current.pause();
      if (nightAudioRef.current) nightAudioRef.current.pause();
    };
  }, []);

  // Audio helper function to crossfade smoothly
  const fadeAudio = (audioElement, targetVolume, duration = 300) => {
    if (!audioElement) return;
    
    // Ensure element is playing
    if (targetVolume > 0 && audioElement.paused) {
      audioElement.play().catch(e => console.log("Audio play blocked: ", e));
    }

    const startVolume = audioElement.volume;
    const diff = targetVolume - startVolume;
    if (diff === 0) return;

    const steps = 15;
    const stepTime = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentVol = startVolume + (diff * (currentStep / steps));
      
      // Safety clamp
      audioElement.volume = Math.max(0, Math.min(0.3, currentVol));

      if (currentStep >= steps) {
        clearInterval(interval);
        audioElement.volume = targetVolume;
        if (targetVolume === 0) {
          audioElement.pause();
        }
      }
    }, stepTime);
  };

  // Sync volume with mute state and current active theme
  useEffect(() => {
    if (!dayAudioRef.current || !nightAudioRef.current) return;

    if (isMuted || !audioStarted) {
      dayAudioRef.current.volume = 0;
      nightAudioRef.current.volume = 0;
    } else {
      if (isNight) {
        // Fade out day, fade in night
        fadeAudio(dayAudioRef.current, 0, 300);
        fadeAudio(nightAudioRef.current, 0.3, 300);
      } else {
        // Fade out night, fade in day
        fadeAudio(nightAudioRef.current, 0, 300);
        fadeAudio(dayAudioRef.current, 0.3, 300);
      }
    }
  }, [isNight, isMuted, audioStarted]);

  const playCoinSound = () => {
    if (coinAudioRef.current && !isMuted) {
      coinAudioRef.current.currentTime = 0;
      coinAudioRef.current.play().catch(e => console.log("Sound play blocked: ", e));
    }
  };

  const startMusic = () => {
    setAudioStarted(true);
    setIsMuted(false);
    
    const activeAudio = isNight ? nightAudioRef.current : dayAudioRef.current;
    if (activeAudio && activeAudio.paused) {
      activeAudio.play().catch(e => console.log("Audio play blocked: ", e));
    }
  };

  const toggleMute = () => {
    if (!audioStarted) {
      startMusic();
    } else {
      setIsMuted(prev => !prev);
    }
  };

  const toggleTheme = () => {
    setIsNight(prev => !prev);
    playCoinSound();
  };

  return (
    <ThemeContext.Provider value={{
      isNight,
      isMuted,
      audioStarted,
      toggleTheme,
      toggleMute,
      playCoinSound,
      startMusic
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

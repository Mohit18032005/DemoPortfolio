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

  // Initialize Audio with Naruto streaming BGM and local fallbacks
  useEffect(() => {
    const dayURL = 'https://archive.org/download/tvtunes_21704/Naruto%20Shippuden%20-%20Sadness%20and%20Sorrow%20-%20Full%20-%20Theme%20Song.mp3';
    const dayFallback = '/theme_music.ogg';

    dayAudioRef.current = new Audio(dayURL);
    dayAudioRef.current.loop = true;
    dayAudioRef.current.volume = 0.25;
    dayAudioRef.current.addEventListener('error', () => {
      console.log("Streaming Day OST failed, switching to local fallback...");
      if (dayAudioRef.current) dayAudioRef.current.src = dayFallback;
    });

    const nightURL = 'https://archive.org/download/tvtunes_21703/Naruto%20Shippuden%20-%20Opening%207%20-%20Full%20-%20Theme%20Song.mp3';
    const nightFallback = '/night-theme/Builder_Base_theme.ogg';

    nightAudioRef.current = new Audio(nightURL);
    nightAudioRef.current.loop = true;
    nightAudioRef.current.volume = 0.25;
    nightAudioRef.current.addEventListener('error', () => {
      console.log("Streaming Night OST failed, switching to local fallback...");
      if (nightAudioRef.current) nightAudioRef.current.src = nightFallback;
    });

    coinAudioRef.current = new Audio('/Coins.mp3');
    coinAudioRef.current.volume = 0.3;

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
      audioElement.volume = Math.max(0, Math.min(0.25, currentVol));

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
        fadeAudio(nightAudioRef.current, 0.25, 300);
      } else {
        // Fade out night, fade in day
        fadeAudio(nightAudioRef.current, 0, 300);
        fadeAudio(dayAudioRef.current, 0.25, 300);
      }
    }
  }, [isNight, isMuted, audioStarted]);

  // Programmatic Web Audio Synthesizer for thematic Naruto sound effects
  const playSynthSound = (type) => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      if (type === 'jutsu') {
        // Chakra wind sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.45);
        
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(250, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + 0.45);
        filter.Q.value = 8;
        
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'sharingan') {
        // High pitch shimmer + deep rumble
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1800, now);
        osc1.frequency.linearRampToValueAtTime(1500, now + 0.25);
        gain1.gain.setValueAtTime(0.06, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(75, now);
        osc2.frequency.linearRampToValueAtTime(45, now + 0.5);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 100;
        
        gain2.gain.setValueAtTime(0.25, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        
        osc2.connect(filter);
        filter.connect(gain2);
        gain2.connect(ctx.destination);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.25);
        osc2.stop(now + 0.5);
      } else if (type === 'lightning') {
        // Chidori crackle (multiple rapid impulses)
        const impulses = 10;
        for (let i = 0; i < impulses; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(300 + Math.random() * 1500, now + (i * 0.045));
          
          filter.type = 'peaking';
          filter.frequency.value = 1200 + Math.random() * 1800;
          
          gain.gain.setValueAtTime(0.05, now + (i * 0.045));
          gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.045) + 0.04);
          
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(now + (i * 0.045));
          osc.stop(now + (i * 0.045) + 0.05);
        }
      } else if (type === 'fire') {
        // Fire jutsu explosion
        const bufferSize = ctx.sampleRate * 0.45;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(150, now);
        filter.frequency.exponentialRampToValueAtTime(600, now + 0.35);
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        noise.start(now);
        noise.stop(now + 0.45);
      } else if (type === 'select') {
        // Standard shinobi chime select
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(990, now + 0.12);
        
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      console.log("Web Audio sound synthesis failed: ", e);
    }
  };

  const playCoinSound = () => {
    // Play fallback physical chime sound or synthesized sound
    playSynthSound('select');
  };

  const playJutsuSound = () => {
    playSynthSound('jutsu');
  };

  const playSharinganSound = () => {
    playSynthSound('sharingan');
  };

  const playLightningSound = () => {
    playSynthSound('lightning');
  };

  const playFireSound = () => {
    playSynthSound('fire');
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
    playSynthSound('sharingan'); // Sharingan activation sound when toggling theme
  };

  return (
    <ThemeContext.Provider value={{
      isNight,
      isAkatsuki: isNight, // Naruto alias
      isMuted,
      audioStarted,
      toggleTheme,
      toggleMute,
      playCoinSound,
      playJutsuSound,
      playSharinganSound,
      playLightningSound,
      playFireSound,
      startMusic
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

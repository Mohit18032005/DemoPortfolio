import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const TiltCard = ({ children, className = '', active = true, intensity = 12, glowColor, holographic = false }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isAkatsuki } = useTheme();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-intensity, intensity]);

  // Convert to percentage strings for gradient positioning
  const sheenX = useTransform(mouseXSpring, [0, 1], ['0%', '100%']);
  const sheenY = useTransform(mouseYSpring, [0, 1], ['0%', '100%']);

  // FIXED: useMotionTemplate creates a reactive MotionValue<string> that updates at 60fps
  const sheenBackground = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, ${glowColor || 'rgba(255,255,255,0.12)'} 0%, transparent 50%)`;
  
  // Holographic conic gradient — darker colors for light mode, brighter for dark mode
  const holoBackground = isAkatsuki
    ? useMotionTemplate`conic-gradient(from 0deg at ${sheenX} ${sheenY}, 
        rgba(255, 0, 128, 0.15), 
        rgba(255, 200, 0, 0.15), 
        rgba(0, 255, 200, 0.15), 
        rgba(0, 150, 255, 0.15), 
        rgba(128, 0, 255, 0.15), 
        rgba(255, 0, 128, 0.15))`
    : useMotionTemplate`conic-gradient(from 0deg at ${sheenX} ${sheenY}, 
        rgba(180, 80, 40, 0.12), 
        rgba(200, 160, 50, 0.12), 
        rgba(60, 140, 100, 0.12), 
        rgba(40, 100, 180, 0.12), 
        rgba(120, 60, 160, 0.12), 
        rgba(180, 80, 40, 0.12))`;

  // Spring-animated opacity (replaces broken group-hover)
  const sheenOpacityRaw = useMotionValue(isHovered ? 1 : 0);
  const sheenOpacity = useSpring(sheenOpacityRaw, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e) => {
    if (!ref.current || !active) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sheenOpacityRaw.set(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    sheenOpacityRaw.set(0);
    x.set(0.5);
    y.set(0.5);
  };

  // Disable 3D tilt on touch devices to prevent interaction issues
  const isTouchDevice = typeof window !== 'undefined' && 
    (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);

  // Touch fallback: static shimmer without tilt
  if (isTouchDevice || !active) {
    return (
      <div className={`relative ${className}`}>
        {children}
        {holographic && (
          <div className="holo-shimmer absolute inset-0 z-[5] pointer-events-none rounded-[inherit]" />
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
        className="w-full h-full relative"
      >
        {children}
        
        {/* Light sheen overlay (renders on top of children) */}
        <motion.div
          className="absolute inset-0 z-[5] pointer-events-none rounded-[inherit]"
          style={{
            background: sheenBackground,
            opacity: sheenOpacity,
            mixBlendMode: isAkatsuki ? 'soft-light' : 'overlay',
          }}
        />

        {/* Holographic prismatic overlay */}
        {holographic && (
          <>
            <motion.div
              className="absolute inset-0 z-[6] pointer-events-none rounded-[inherit]"
              style={{
                background: holoBackground,
                opacity: sheenOpacity,
                mixBlendMode: isAkatsuki ? 'color-dodge' : 'multiply',
              }}
            />
            <div className={`holo-shimmer absolute inset-0 z-[7] pointer-events-none rounded-[inherit] ${
              isAkatsuki ? '' : 'holo-shimmer-strawhat'
            }`} />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default TiltCard;

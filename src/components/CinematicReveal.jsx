import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const presets = {
  'fade-up': {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
  'fade-down': {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 },
  },
  'fade-in': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  'slide-left': {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
  },
  'slide-right': {
    initial: { opacity: 0, x: -80 },
    animate: { opacity: 1, x: 0 },
  },
  'scale-up': {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
  },
  'blur-in': {
    initial: { opacity: 0, filter: 'blur(12px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
  },
  'cinematic': {
    initial: { opacity: 0, y: 80, scale: 0.95, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  },
};

const CinematicReveal = ({
  children,
  preset = 'fade-up',
  delay = 0,
  duration = 0.8,
  stagger = 0,
  once = true,
  margin = '-80px',
  className = '',
}) => {
  const config = presets[preset] || presets['fade-up'];

  return (
    <motion.div
      initial={config.initial}
      whileInView={config.animate}
      viewport={{ once, margin }}
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const CinematicStagger = ({
  children,
  staggerDelay = 0.1,
  delay = 0,
  preset = 'fade-up',
  once = true,
  margin = '-80px',
  className = '',
}) => {
  const config = presets[preset] || presets['fade-up'];

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once, margin }}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  preset = 'fade-up',
  duration = 0.8,
  className = '',
}) => {
  const config = presets[preset] || presets['fade-up'];

  return (
    <motion.div
      variants={{
        initial: config.initial,
        animate: {
          ...config.animate,
          transition: { duration, ease: [0.23, 1, 0.32, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

export default CinematicReveal;

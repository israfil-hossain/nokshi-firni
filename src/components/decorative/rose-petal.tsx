'use client';

import { motion } from 'framer-motion';

interface RosePetalProps {
  className?: string;
  color?: string;
  size?: number;
  rotation?: number;
}

export default function RosePetal({ 
  className = '', 
  color = '#C41E3A', 
  size = 60,
  rotation = 0
}: RosePetalProps) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0, rotate: rotation - 30 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={`pointer-events-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 5 C30 15, 40 20, 45 30 C40 40, 30 45, 25 45 C20 45, 10 40, 5 30 C10 20, 20 15, 25 5Z"
        fill={color}
        fillOpacity={0.7}
      />
      <path
        d="M25 10 C28 18, 35 22, 40 30 C35 38, 28 42, 25 42 C22 42, 15 38, 10 30 C15 22, 22 18, 25 10Z"
        fill={color}
        fillOpacity={0.5}
      />
    </motion.svg>
  );
}

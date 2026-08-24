'use client';

import { motion } from 'framer-motion';

interface PalmLeafProps {
  className?: string;
  color?: string;
  size?: number;
  flip?: boolean;
}

export default function PalmLeaf({ 
  className = '', 
  color = '#2D5016', 
  size = 200,
  flip = false 
}: PalmLeafProps) {
  return (
    <motion.svg
      initial={{ opacity: 0, rotate: flip ? 45 : -45 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className={`pointer-events-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      <path
        d="M50 5 C55 25, 70 40, 95 50 C70 55, 55 70, 50 95 C45 70, 30 55, 5 50 C30 40, 45 25, 50 5Z"
        fill={color}
        fillOpacity={0.6}
      />
      <path
        d="M50 15 C53 30, 65 42, 85 50 C65 55, 53 65, 50 85 C47 65, 35 55, 15 50 C35 42, 47 30, 50 15Z"
        fill={color}
        fillOpacity={0.4}
      />
      <path
        d="M50 25 C52 35, 60 45, 75 50 C60 53, 52 60, 50 75 C48 60, 40 53, 25 50 C40 45, 48 35, 50 25Z"
        fill={color}
        fillOpacity={0.3}
      />
    </motion.svg>
  );
}

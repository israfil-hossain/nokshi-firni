'use client';

import { motion } from 'framer-motion';

interface BananaLeafProps {
  className?: string;
  color?: string;
  size?: number;
  flip?: boolean;
}

export default function BananaLeaf({ 
  className = '', 
  color = '#3D6B1E', 
  size = 250,
  flip = false 
}: BananaLeafProps) {
  return (
    <motion.svg
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`pointer-events-none ${className}`}
      width={size}
      height={size * 1.5}
      viewBox="0 0 100 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      <path
        d="M50 10 C60 30, 80 50, 90 80 C85 110, 60 140, 50 145 C40 140, 15 110, 10 80 C20 50, 40 30, 50 10Z"
        fill={color}
        fillOpacity={0.5}
      />
      <path
        d="M50 20 C55 35, 70 55, 80 80 C75 105, 55 130, 50 135 C45 130, 25 105, 20 80 C30 55, 45 35, 50 20Z"
        fill={color}
        fillOpacity={0.35}
      />
      {/* Leaf veins */}
      <path
        d="M50 15 L50 140"
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.4}
      />
      <path
        d="M50 40 C60 45, 70 55, 75 70"
        stroke={color}
        strokeWidth={0.5}
        strokeOpacity={0.3}
      />
      <path
        d="M50 40 C40 45, 30 55, 25 70"
        stroke={color}
        strokeWidth={0.5}
        strokeOpacity={0.3}
      />
      <path
        d="M50 70 C60 75, 68 85, 72 95"
        stroke={color}
        strokeWidth={0.5}
        strokeOpacity={0.3}
      />
      <path
        d="M50 70 C40 75, 32 85, 28 95"
        stroke={color}
        strokeWidth={0.5}
        strokeOpacity={0.3}
      />
    </motion.svg>
  );
}

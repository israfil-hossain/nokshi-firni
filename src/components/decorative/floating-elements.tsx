'use client';

import { useEffect, useRef, useState } from 'react';
import PalmLeaf from './palm-leaf';
import BananaLeaf from './banana-leaf';
import RosePetal from './rose-petal';

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let animations: any[] = [];

    const animate = async () => {
      const { initGsap } = await import('@/lib/gsap');
      const result = await initGsap();
      if (!result) return;
      const { gsap } = result;

      const leaves = containerRef.current!.querySelectorAll('.floating-leaf');
      const petals = containerRef.current!.querySelectorAll('.floating-petal');

      leaves.forEach((leaf, index) => {
        animations.push(
          gsap.to(leaf, {
            y: -15 + Math.random() * 10,
            rotation: 3 + Math.random() * 6,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2,
          })
        );
      });

      petals.forEach((petal, index) => {
        animations.push(
          gsap.to(petal, {
            y: -10 + Math.random() * 8,
            x: 5 + Math.random() * 10,
            rotation: 10 + Math.random() * 20,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3,
          })
        );
      });
    };

    animate();

    return () => {
      animations.forEach(a => a?.kill?.());
    };
  }, [mounted]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="floating-leaf absolute -top-10 -left-10 opacity-40">
        <PalmLeaf size={180} color="#2D5016" />
      </div>

      <div className="floating-leaf absolute -top-5 -right-20 opacity-30">
        <BananaLeaf size={150} color="#3D6B1E" flip />
      </div>

      <div className="floating-leaf absolute bottom-20 -left-16 opacity-25">
        <BananaLeaf size={120} color="#2D5016" />
      </div>

      <div className="floating-leaf absolute bottom-10 -right-10 opacity-35">
        <PalmLeaf size={140} color="#3D6B1E" flip />
      </div>

      <div className="floating-petal absolute top-1/4 left-1/4 opacity-50">
        <RosePetal size={40} color="#C41E3A" rotation={-20} />
      </div>

      <div className="floating-petal absolute top-1/3 right-1/4 opacity-40">
        <RosePetal size={35} color="#D4AF37" rotation={45} />
      </div>

      <div className="floating-petal absolute bottom-1/3 left-1/3 opacity-45">
        <RosePetal size={45} color="#C41E3A" rotation={-60} />
      </div>

      <div className="floating-petal absolute top-2/3 right-1/3 opacity-35">
        <RosePetal size={30} color="#D4AF37" rotation={30} />
      </div>

      <div className="floating-petal absolute top-1/2 left-1/6 opacity-30">
        <RosePetal size={25} color="#8B0000" rotation={15} />
      </div>

      <div className="floating-petal absolute bottom-1/4 right-1/6 opacity-25">
        <RosePetal size={28} color="#D4AF37" rotation={-45} />
      </div>
    </div>
  );
}

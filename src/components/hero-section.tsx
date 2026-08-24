'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import FloatingElements from './decorative/floating-elements';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current || !productRef.current || !textRef.current) return;

    let tl: any;
    let floatAnim: any;
    let scrollTrigger: any;

    const animate = async () => {
      const { initGsap } = await import('@/lib/gsap');
      const result = await initGsap();
      if (!result) return;
      const { gsap, ScrollTrigger } = result;

      // Initial entrance - product drops from top with bounce
      tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(productRef.current, {
        y: -300,
        opacity: 0,
        scale: 0.6,
        rotation: -10,
        duration: 1.6,
        ease: 'bounce.out',
      });

      // Text content - stagger fade in
      tl.from(
        textRef.current!.children,
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
        },
        '-=1'
      );

      // Scroll-based parallax - image moves down as user scrolls
      scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self: any) => {
          if (productRef.current) {
            const progress = self.progress;
            // Image slides from top to bottom as you scroll
            gsap.set(productRef.current, {
              y: progress * 400,
              rotation: progress * 15,
              scale: 1 - progress * 0.3,
              opacity: 1 - progress * 0.8,
            });
          }
        },
      });

      // Floating animation after entrance
      floatAnim = gsap.to(productRef.current, {
        y: '+=-15',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });
    };

    animate();

    return () => {
      if (tl) tl.kill();
      if (floatAnim) floatAnim.kill();
      if (scrollTrigger) scrollTrigger.kill();
    };
  }, [mounted]);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-24 pb-12">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-maroon/5 via-transparent to-gold/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-maroon/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      </div>

      {/* Floating decorative elements */}
      <FloatingElements />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div ref={textRef} className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-4 sm:mb-6">
              ঐতিহ্যবাহী{' '}
              <span className="text-maroon">ফিরনি</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">আপনার দোরগোড়ায়</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-dark-light max-w-xl mb-8 sm:mb-10 mx-auto lg:mx-0 px-4 lg:px-0">
              বাংলাদেশের ঐতিহ্যবাহী স্বাদের ফিরনি। তৈরি করা হয় সেরা উপকরণ দিয়ে,
              আপনার পছন্দের সময়ে ডেলিভারি দেওয়া হয়।
            </p>

            <button
              onClick={scrollToProducts}
              className="bg-maroon hover:bg-maroon-dark px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold text-base sm:text-lg inline-flex items-center gap-2 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              এখনই অর্ডার করুন
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="mt-8 sm:mt-12 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-dark-light justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-maroon rounded-full" />
                ১০০% ন্যাচারাল
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-maroon rounded-full" />
                ফ্রেশ তৈরি
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-maroon rounded-full" />
                দ্রুত ডেলিভারি
              </div>
            </div>
          </div>

          {/* Right - 3D Product Image (scroll parallax) */}
          <div ref={productRef} className="relative flex justify-center order-1 lg:order-2 will-change-transform">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-maroon/30 to-gold/30 rounded-full blur-3xl scale-75 group-hover:scale-90 transition-transform duration-500" />
              <div className="relative product-3d">
                <Image
                  src="/nokshi-firni.png"
                  alt="নকশি ফিরনি"
                  width={500}
                  height={500}
                  className="relative z-10 drop-shadow-2xl w-full h-auto mix-blend-multiply"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-dark/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="animate-bounce text-dark-light">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

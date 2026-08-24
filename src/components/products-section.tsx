'use client';

import { useEffect, useRef, useState } from 'react';
import ProductCard from './product-card';
import { PRODUCTS, Order } from '@/lib/calculations';

interface ProductsSectionProps {
    order: Order;
    onQuantityChange: (id: string, value: number) => void;
}

export default function ProductsSection({ order, onQuantityChange }: ProductsSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !sectionRef.current || !headerRef.current || !cardsRef.current) return;

        let triggers: any[] = [];

        const animate = async () => {
            const { initGsap } = await import('@/lib/gsap');
            const result = await initGsap();
            if (!result) return;
            const { gsap, ScrollTrigger } = result;

            gsap.from(headerRef.current!.children, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            });

            const cards = cardsRef.current!.children;
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                y: 80,
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                stagger: 0.15,
                ease: 'back.out(1.2)',
            });

            triggers = ScrollTrigger.getAll();
        };

        animate();

        return () => {
            triggers.forEach((t: any) => t.kill?.());
        };
    }, [mounted]);

    return (
        <section id="products" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-cream relative">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full gradient-mesh opacity-50" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div ref={headerRef} className="text-center mb-10 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 sm:mb-4">
                        আমাদের <span className="text-maroon">ফিরনি</span>
                    </h2>
                    <p className="text-sm sm:text-base text-dark-light max-w-2xl mx-auto px-4">
                        ঐতিহ্যবাহী বাংলাদেশি রেসিপি অনুযায়ী তৈরি। সেরা চাল ও দুধ ব্যবহার করা হয়েছে।
                    </p>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {PRODUCTS.map((product) => (
                        <div key={product.id}>
                            <ProductCard
                                product={product}
                                quantity={order[product.id]}
                                onQuantityChange={onQuantityChange}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import { useState, useCallback } from 'react';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import ProductsSection from '@/components/products-section';
import OrderSummary from '@/components/order-summary';
import PreOrderForm from '@/components/preorder-form';
import WhatsAppWidget from '@/components/whatsapp-widget';
import Footer from '@/components/footer';
import { Order, INITIAL_ORDER } from '@/lib/calculations';

export default function Home() {
    const [order, setOrder] = useState<Order>(INITIAL_ORDER);

    const handleQuantityChange = useCallback((id: string, value: number) => {
        setOrder(prev => ({
            ...prev,
            [id]: value,
        }));
    }, []);

    return (
        <main className="min-h-screen">
            <Navbar />
            <HeroSection />
            <ProductsSection order={order} onQuantityChange={handleQuantityChange} />
            <OrderSummary order={order} />
            <PreOrderForm />
            <Footer />
            <WhatsAppWidget />
        </main>
    );
}

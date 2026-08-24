'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md border-b border-maroon/10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/nokshi-logo.png"
                            alt="নকশি"
                            width={60}
                            height={60}
                            className="rounded-full"
                        />
                    </Link>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => scrollToSection('products')}
                            className="text-dark hover:text-maroon transition-colors font-medium"
                        >
                            আমাদের পণ্য
                        </button>
                        <button
                            onClick={() => scrollToSection('order')}
                            className="text-dark hover:text-maroon transition-colors font-medium"
                        >
                            অর্ডার করুন
                        </button>
                        <button
                            onClick={() => scrollToSection('preorder')}
                            className="text-dark hover:text-maroon transition-colors font-medium"
                        >
                            প্রি-অর্ডার
                        </button>
                    </div>

                    {/* WhatsApp CTA - Desktop */}
                    <a
                        href="https://wa.me/8801723560254"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 bg-maroon hover:bg-maroon-dark px-5 py-2.5 rounded-full text-white font-medium transition-all hover:scale-105"
                    >
                        <MessageCircle size={18} />
                        WhatsApp
                    </a>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-dark hover:text-maroon transition-colors"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-cream border-t border-maroon/10">
                    <div className="px-4 py-4 space-y-3">
                        <button
                            onClick={() => scrollToSection('products')}
                            className="block w-full text-left py-3 px-4 text-dark hover:bg-maroon/10 rounded-lg transition-colors font-medium"
                        >
                            আমাদের পণ্য
                        </button>
                        <button
                            onClick={() => scrollToSection('order')}
                            className="block w-full text-left py-3 px-4 text-dark hover:bg-maroon/10 rounded-lg transition-colors font-medium"
                        >
                            অর্ডার করুন
                        </button>
                        <button
                            onClick={() => scrollToSection('preorder')}
                            className="block w-full text-left py-3 px-4 text-dark hover:bg-maroon/10 rounded-lg transition-colors font-medium"
                        >
                            প্রি-অর্ডার
                        </button>
                        <a
                            href="https://wa.me/8801723560254"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-dark py-3 px-4 rounded-lg text-white font-medium transition-all"
                        >
                            <MessageCircle size={18} />
                            WhatsApp এ যোগাযোগ
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}

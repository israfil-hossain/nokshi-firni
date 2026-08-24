'use client';

import { MessageCircle, Phone, Mail } from 'lucide-react';
import { WHATSAPP_NUMBER, EMAIL } from '@/lib/whatsapp';

export default function Footer() {
    return (
        <footer className="bg-maroon text-white py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {/* Brand */}
                    <div>
                        <img
                            src="/biyebari.png"
                            alt="নকশি ফিরনি"
                            className="h-12 w-auto object-contain mb-3"
                        />
                        <p className="text-white/70 text-xs sm:text-sm">
                            ঐতিহ্যবাহী বাংলাদেশি ফিরনি। আমরা সেরা উপকরণ দিয়ে তৈরি করি আপনার প্রিয় ফিরনি।
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">যোগাযোগ</h4>
                        <div className="space-y-2 sm:space-y-3">
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-white/70 hover:text-whatsapp transition-colors text-xs sm:text-sm"
                            >
                                <MessageCircle size={16} />
                                WhatsApp
                            </a>
                            <a
                                href={`tel:+${WHATSAPP_NUMBER}`}
                                className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-xs sm:text-sm"
                            >
                                <Phone size={16} />
                                +880 1723-560254
                            </a>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-xs sm:text-sm"
                            >
                                <Mail size={16} />
                                {EMAIL}
                            </a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">দ্রুত লিঙ্ক</h4>
                        <div className="space-y-2">
                            <button
                                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                                className="block text-white/70 hover:text-gold transition-colors text-xs sm:text-sm"
                            >
                                আমাদের পণ্য
                            </button>
                            <button
                                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                                className="block text-white/70 hover:text-gold transition-colors text-xs sm:text-sm"
                            >
                                অর্ডার করুন
                            </button>
                            <button
                                onClick={() => document.getElementById('preorder')?.scrollIntoView({ behavior: 'smooth' })}
                                className="block text-white/70 hover:text-gold transition-colors text-xs sm:text-sm"
                            >
                                প্রি-অর্ডার
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-white/50 text-xs sm:text-sm">
                            <p>&copy; {new Date().getFullYear()} বিয়েবাড়ি। সর্বস্বত্ব সংরক্ষিত।</p>
                </div>
            </div>
        </footer>
    );
}

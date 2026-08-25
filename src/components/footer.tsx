'use client';

import Image from 'next/image';
import { MessageCircle, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { WHATSAPP_NUMBER, EMAIL } from '@/lib/whatsapp';

const FACEBOOK_URL = 'https://www.facebook.com/biyebarimistanno/';
const INSTAGRAM_URL = 'https://www.instagram.com/biyabarimistanno/?hl=en';

export default function Footer() {
    return (
        <footer className="bg-maroon text-white py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {/* Brand */}
                    <div>
                        <Image
                            src="/biyebari.png"
                            alt="বিয়েবাড়ি ফিরনি - ঐতিহ্যবাহী বাংলাদেশি ফিরনি"
                            width={56}
                            height={56}
                            className="mb-3"
                        />
                        <p className="text-white/70 text-xs sm:text-sm mb-4">
                            ঐতিহ্যবাহী বাংলাদেশি ফিরনি। আমরা সেরা উপকরণ দিয়ে তৈরি করি আপনার প্রিয় ফিরনি।
                        </p>
                        {/* Social links */}
                        <div className="flex gap-3">
                            <a
                                href={FACEBOOK_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
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
                                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs sm:text-sm"
                            >
                                <Phone size={16} />
                                +880 1723-560254
                            </a>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs sm:text-sm"
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
                                className="block text-white/70 hover:text-white transition-colors text-xs sm:text-sm"
                            >
                                আমাদের পণ্য
                            </button>
                            <button
                                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                                className="block text-white/70 hover:text-white transition-colors text-xs sm:text-sm"
                            >
                                অর্ডার করুন
                            </button>
                            <button
                                onClick={() => document.getElementById('preorder')?.scrollIntoView({ behavior: 'smooth' })}
                                className="block text-white/70 hover:text-white transition-colors text-xs sm:text-sm"
                            >
                                প্রি-অর্ডার
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/20 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/50 text-xs sm:text-sm">
                    <p>&copy; {new Date().getFullYear()} বিয়েবাড়ি। সর্বস্বত্ব সংরক্ষিত।</p>
                    <div className="flex gap-4">
                        <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
                        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

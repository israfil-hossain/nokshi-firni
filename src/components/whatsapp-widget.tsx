'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/whatsapp';

export default function WhatsAppWidget() {
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalamu Alaikum! 🙏\nনকশি ফিরনি সম্পর্কে জানতে চাই')}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        >
            {/* Ping animation */}
            <div className="absolute inset-0 bg-whatsapp rounded-full whatsapp-ping" />

            {/* Button */}
            <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-whatsapp rounded-full shadow-lg hover:bg-whatsapp-dark transition-colors group"
            >
                <MessageCircle size={24} className="text-white sm:w-7 sm:h-7" />

                {/* Tooltip - hidden on mobile */}
                <div className="hidden sm:block absolute right-full mr-3 px-3 py-2 bg-dark text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    WhatsApp এ যোগাযোগ করুন
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-dark rotate-45" />
                </div>
            </motion.a>
        </motion.div>
    );
}

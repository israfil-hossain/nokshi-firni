'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MessageSquare, Send, MessageCircle } from 'lucide-react';
import { getMailtoLink, getPreOrderWhatsAppLink } from '@/lib/whatsapp';

export default function PreOrderForm() {
    const [formData, setFormData] = useState({
        eventName: '',
        date: '',
        quantity: '',
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const isFormValid = formData.eventName && formData.date && formData.quantity;

    const handleEmailSubmit = () => {
        if (!isFormValid) return;
        const mailtoLink = getMailtoLink(formData);
        window.location.href = mailtoLink;
    };

    const handleWhatsAppSubmit = () => {
        if (!isFormValid) return;
        const whatsappLink = getPreOrderWhatsAppLink(formData);
        window.open(whatsappLink, '_blank');
    };

    return (
        <section id="preorder" className="py-12 sm:py-16 lg:py-20 bg-cream">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 sm:mb-4">
                        ইভেন্ট <span className="text-maroon">প্রি-অর্ডার</span>
                    </h2>
                    <p className="text-sm sm:text-base text-dark-light max-w-2xl mx-auto px-4">
                        বিয়ে, জন্মদিন, অন্যান্য অনুষ্ঠানের জন্য আগাম অর্ডার করুন
                    </p>
                </motion.div>

                {/* Form card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-maroon/20"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Event Name */}
                        <div>
                            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-dark mb-2">
                                <Calendar size={14} className="text-maroon" />
                                ইভেন্টের নাম *
                            </label>
                            <input
                                type="text"
                                name="eventName"
                                value={formData.eventName}
                                onChange={handleChange}
                                placeholder="যেমন: বিয়ের অনুষ্ঠান"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition-all text-sm sm:text-base"
                                required
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-dark mb-2">
                                <Calendar size={14} className="text-maroon" />
                                তারিখ *
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition-all text-sm sm:text-base"
                                required
                            />
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-dark mb-2">
                                <Users size={14} className="text-maroon" />
                                পরিমাণ (মোট কার্ড/বক্স) *
                            </label>
                            <select
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition-all text-sm sm:text-base"
                                required
                            >
                                <option value="">নির্বাচন করুন</option>
                                <option value="20-50">২০-৫০ কার্ড</option>
                                <option value="50-100">৫০-১০০ কার্ড</option>
                                <option value="100-200">১০০-২০০ কার্ড</option>
                                <option value="200-500">২০০-৫০০ কার্ড</option>
                                <option value="500+">৫০০+ কার্ড</option>
                            </select>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-dark mb-2">
                                <MessageSquare size={14} className="text-maroon" />
                                বিশেষ অনুরোধ
                            </label>
                            <input
                                type="text"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="যেমন: ফ্লেভার, প্যাকেজিং"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition-all text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    {/* Submit buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleEmailSubmit}
                            disabled={!isFormValid}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all ${
                                isFormValid
                                    ? 'bg-maroon hover:bg-maroon-dark text-white'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <Send size={18} />
                            ইমেইল পাঠান
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleWhatsAppSubmit}
                            disabled={!isFormValid}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all ${
                                isFormValid
                                    ? 'bg-whatsapp text-white hover:bg-whatsapp-dark'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <MessageCircle size={18} />
                            WhatsApp এ পাঠান
                        </motion.button>
                    </div>

                    {/* Helper text */}
                    <p className="text-center text-xs sm:text-sm text-dark-light mt-4 sm:mt-6">
                        আমরা ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করব
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

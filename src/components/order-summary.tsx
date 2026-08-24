'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Truck, Gift, MessageCircle, AlertCircle, User, Phone, MapPin, CheckCircle, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order, PRODUCTS, calculateTotal, calculateTotalSavings, getMinOrderWarning, formatPriceEn, getUnitPrice, getDiscountPercentage } from '@/lib/calculations';
import { getOrderWhatsAppLink, BKASH_NUMBER, CustomerInfo } from '@/lib/whatsapp';

interface OrderSummaryProps {
    order: Order;
}

export default function OrderSummary({ order }: OrderSummaryProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const { subtotal, delivery, total, isFreeDelivery } = calculateTotal(order);
    const totalSavings = calculateTotalSavings(order);
    const warning = getMinOrderWarning(order);
    const hasItems = Object.values(order).some(qty => qty > 0);
    const advanceAmount = Math.round(total * 0.15);

    const [customer, setCustomer] = useState<CustomerInfo>({
        name: '',
        phone: '',
        address: '',
    });
    const [advancePaid, setAdvancePaid] = useState(false);
    const [mounted, setMounted] = useState(false);
    const prevFreeDelivery = useRef(isFreeDelivery);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Confetti when entire order qualifies for free delivery
    useEffect(() => {
        if (isFreeDelivery && !prevFreeDelivery.current && hasItems) {
            const end = Date.now() + 1000;
            const colors = ['#4d191c', '#C9A227', '#25D366', '#E0B830'];

            const frame = () => {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.7 },
                    colors,
                    disableForReducedMotion: true,
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.7 },
                    colors,
                    disableForReducedMotion: true,
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
        prevFreeDelivery.current = isFreeDelivery;
    }, [isFreeDelivery, hasItems]);

    useEffect(() => {
        if (!mounted || !sectionRef.current || !cardRef.current) return;

        let triggers: any[] = [];

        const animate = async () => {
            const { initGsap } = await import('@/lib/gsap');
            const result = await initGsap();
            if (!result) return;
            const { gsap, ScrollTrigger } = result;

            gsap.from(cardRef.current!, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                x: 100,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });

            triggers = ScrollTrigger.getAll();
        };

        animate();

        return () => {
            triggers.forEach((t: any) => t.kill?.());
        };
    }, [mounted]);

    const orderItems = PRODUCTS.filter(product => order[product.id] > 0);

    const isFormValid = customer.name.trim() !== '' && customer.phone.trim() !== '' && customer.address.trim() !== '' && advancePaid;
    const whatsAppLink = hasItems && isFormValid ? getOrderWhatsAppLink(order, customer) : '#';

    const handleCustomerChange = (field: keyof CustomerInfo, value: string) => {
        setCustomer(prev => ({ ...prev, [field]: value }));
    };

    return (
        <section id="order" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-cream-dark relative">
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-64 h-64 bg-maroon/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-4">
                        আপনার <span className="text-maroon">অর্ডার</span>
                    </h2>
                </motion.div>

                {/* Order card */}
                <div ref={cardRef} className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-maroon/20">
                    {/* Product image */}
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="relative">
                            <Image
                                src="/biyebari.png"
                                alt="বিয়েবাড়ি"
                                width={100}
                                height={100}
                                className="rounded-xl object-cover mix-blend-multiply"
                            />
                        </div>
                    </div>

                    {!hasItems ? (
                        <div className="text-center py-8 sm:py-12">
                            <ShoppingCart size={40} className="mx-auto text-dark-light/30 mb-4" />
                            <p className="text-dark-light text-sm sm:text-base">আপনার অর্ডারে এখনো কিছু নেই</p>
                            <p className="text-xs sm:text-sm text-dark-light/70 mt-2">
                                উপরের পণ্য থেকে ফিরনি নির্বাচন করুন
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Order items */}
                            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                                <AnimatePresence>
                                    {orderItems.map(product => {
                                        const qty = order[product.id];
                                        const unitPrice = getUnitPrice(product, qty);
                                        const discount = getDiscountPercentage(product, qty);
                                        const itemTotal = qty * unitPrice;
                                        return (
                                            <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100"
                                            >
                                                <div>
                                                    <p className="font-medium text-dark text-sm sm:text-base">{product.name}</p>
                                                    <p className="text-xs sm:text-sm text-dark-light">
                                                        {qty} {product.unit} × {formatPriceEn(unitPrice)}
                                                        {discount && (
                                                            <span className="ml-1 text-maroon font-medium">
                                                                ({discount}% ছাড়)
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                <p className="font-semibold text-dark text-sm sm:text-base">
                                                    {formatPriceEn(itemTotal)}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>

                            {/* Delivery */}
                            <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Truck size={16} className="text-dark-light" />
                                    <span className="text-dark-light text-sm sm:text-base">ডেলিভারি চার্জ</span>
                                </div>
                                {isFreeDelivery ? (
                                    <motion.span
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        className="flex items-center gap-1 text-green-600 font-semibold text-sm sm:text-base"
                                    >
                                        <Gift size={14} />
                                        ফ্রি!
                                    </motion.span>
                                ) : (
                                    <span className="text-dark text-sm sm:text-base">{formatPriceEn(delivery)}</span>
                                )}
                            </div>

                            {/* Free delivery notice */}
                            {!isFreeDelivery && hasItems && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-green-50 text-green-700 text-xs sm:text-sm p-2 sm:p-3 rounded-lg mt-3 sm:mt-4 mb-4 sm:mb-6"
                                >
                                    <p className="font-medium">ফ্রি ডেলিভারি পান!</p>
                                    <p className="text-xs mt-1">
                                        ১০০গ্রা: ৫০+ কাপ | ৫০০গ্রা: ১০+ বক্স | ১কেজি: ৫+ বক্স
                                    </p>
                                </motion.div>
                            )}

                            {/* Savings summary */}
                            <AnimatePresence>
                                {totalSavings > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center justify-between py-2 sm:py-3 bg-green-50 px-3 rounded-lg mb-3"
                                    >
                                        <div className="flex items-center gap-2 text-green-700">
                                            <Tag size={14} />
                                            <span className="text-xs sm:text-sm font-medium">আপনি বাঁচাচ্ছেন</span>
                                        </div>
                                        <span className="text-green-700 font-bold text-sm sm:text-base">
                                            {formatPriceEn(totalSavings)}
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Total */}
                            <div className="flex justify-between items-center py-3 sm:py-4 border-t-2 border-maroon/30 mt-3 sm:mt-4">
                                <span className="text-lg sm:text-xl font-bold text-dark">মোট</span>
                                <motion.span
                                    key={total}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    className="text-xl sm:text-2xl font-bold text-maroon"
                                >
                                    {formatPriceEn(total)}
                                </motion.span>
                            </div>

                            {/* Warning */}
                            {warning && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-red-500 text-xs sm:text-sm mt-3 sm:mt-4 p-2 sm:p-3 bg-red-50 rounded-lg"
                                >
                                    <AlertCircle size={14} />
                                    <span>{warning}</span>
                                </motion.div>
                            )}

                            {/* Customer info form */}
                            <div className="mt-6 sm:mt-8 space-y-4">
                                <h3 className="text-base sm:text-lg font-bold text-dark flex items-center gap-2">
                                    <User size={18} />
                                    ডেলিভারি তথ্য
                                </h3>

                                {/* Name */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-dark-light mb-1">
                                        আপনার নাম *
                                    </label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-light/50" />
                                        <input
                                            type="text"
                                            value={customer.name}
                                            onChange={(e) => handleCustomerChange('name', e.target.value)}
                                            placeholder="নাম লিখুন"
                                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-dark focus:outline-none focus:border-maroon transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-dark-light mb-1">
                                        ফোন নম্বর *
                                    </label>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-light/50" />
                                        <input
                                            type="tel"
                                            value={customer.phone}
                                            onChange={(e) => handleCustomerChange('phone', e.target.value)}
                                            placeholder="01XXXXXXXXX"
                                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-dark focus:outline-none focus:border-maroon transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-dark-light mb-1">
                                        ডেলিভারি ঠিকানা *
                                    </label>
                                    <div className="relative">
                                        <MapPin size={16} className="absolute left-3 top-3 text-dark-light/50" />
                                        <textarea
                                            value={customer.address}
                                            onChange={(e) => handleCustomerChange('address', e.target.value)}
                                            placeholder="বাসা নং, রোড, এলাকা, শহর"
                                            rows={3}
                                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-dark focus:outline-none focus:border-maroon transition-colors resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* bKash advance payment */}
                            <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-pink-50 rounded-xl border-2 border-pink-200">
                                <h3 className="text-base sm:text-lg font-bold text-dark mb-3 flex items-center gap-2">
                                    💳 অগ্রিম পেমেন্ট (bKash)
                                </h3>

                                <div className="space-y-2 text-sm sm:text-base mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-dark-light">মোট পরিমাণ:</span>
                                        <span className="font-semibold text-dark">{formatPriceEn(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-pink-700">
                                        <span className="font-medium">১৫% অগ্রিম:</span>
                                        <span className="font-bold">{formatPriceEn(advanceAmount)}</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-3 sm:p-4 mb-4">
                                    <p className="text-xs sm:text-sm text-dark-light mb-1">bKash পেমেন্ট নম্বর:</p>
                                    <p className="text-xl sm:text-2xl font-bold text-pink-600 tracking-wider">{BKASH_NUMBER}</p>
                                </div>

                                <p className="text-xs sm:text-sm text-dark-light mb-3">
                                    উপরের নম্বরে {formatPriceEn(advanceAmount)} টাকা পেমেন্ট করুন এবং নিচে চেক করুন।
                                </p>

                                {/* Confirmation checkbox */}
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative mt-0.5">
                                        <input
                                            type="checkbox"
                                            checked={advancePaid}
                                            onChange={(e) => setAdvancePaid(e.target.checked)}
                                            className="peer sr-only"
                                        />
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-pink-600 peer-checked:border-pink-600 transition-colors flex items-center justify-center">
                                            {advancePaid && <CheckCircle size={14} className="text-white" />}
                                        </div>
                                    </div>
                                    <span className="text-xs sm:text-sm text-dark peer-checked:text-pink-700">
                                        আমি {formatPriceEn(advanceAmount)} টাকা bKash এ পেমেন্ট করেছি ✅
                                    </span>
                                </label>
                            </div>

                            {/* WhatsApp order button */}
                            <motion.a
                                href={whatsAppLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                                whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                                onClick={(e) => {
                                    if (!isFormValid) e.preventDefault();
                                }}
                                className={`mt-6 sm:mt-8 w-full flex items-center justify-center gap-2 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all ${
                                    isFormValid
                                        ? 'bg-whatsapp text-white hover:bg-whatsapp-dark'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                <MessageCircle size={18} />
                                WhatsApp এ অর্ডার করুন
                            </motion.a>

                            {!isFormValid && hasItems && (
                                <p className="text-center text-xs sm:text-sm text-dark-light mt-2">
                                    অর্ডার করতে সব তথ্য পূরণ করুন এবং অগ্রিম পেমেন্ট কনফার্ম করুন
                                </p>
                            )}
                        </>
                            )}
                        </div>
            </div>
        </section>
    );
}

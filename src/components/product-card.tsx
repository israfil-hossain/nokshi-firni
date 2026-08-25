'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, AlertCircle, Percent, Truck, Tag, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, formatPriceEn, getUnitPrice, getActiveTier, getNextTier, getDiscountPercentage } from '@/lib/calculations';
import { pushToDataLayer } from '@/lib/gtm';

interface ProductCardProps {
    product: Product;
    quantity: number;
    onQuantityChange: (id: string, value: number) => void;
}

export default function ProductCard({ product, quantity, onQuantityChange }: ProductCardProps) {
    const isBelowMin = quantity > 0 && quantity < product.minOrder;
    const isAtFreeDelivery = quantity >= product.freeDeliveryThreshold;
    const activeTier = getActiveTier(product, quantity);
    const nextTier = getNextTier(product, quantity);
    const [inputValue, setInputValue] = useState(quantity.toString());
    const cardRef = useRef<HTMLDivElement>(null);
    const prevFreeDelivery = useRef(isAtFreeDelivery);

    const unitPrice = getUnitPrice(product, quantity);
    const discountPct = getDiscountPercentage(product, quantity);
    const hasBulkDiscount = activeTier !== null;
    const savingsPerUnit = activeTier ? product.price - activeTier.price : 0;
    const totalSavings = hasBulkDiscount ? quantity * savingsPerUnit : 0;

    // Progress toward next tier
    const nextTierProgress = nextTier
        ? Math.min((quantity / nextTier.minQty) * 100, 100)
        : 100;
    const nextTierRemaining = nextTier
        ? Math.max(nextTier.minQty - quantity, 0)
        : 0;

    // Progress toward free delivery
    const deliveryProgress = Math.min((quantity / product.freeDeliveryThreshold) * 100, 100);
    const deliveryRemaining = Math.max(product.freeDeliveryThreshold - quantity, 0);

    // Confetti when free delivery is achieved
    useEffect(() => {
        if (isAtFreeDelivery && !prevFreeDelivery.current && cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 80,
                spread: 60,
                origin: { x, y },
                colors: ['#4d191c', '#C9A227', '#25D366', '#E0B830'],
                disableForReducedMotion: true,
            });
        }
        prevFreeDelivery.current = isAtFreeDelivery;
    }, [isAtFreeDelivery]);

    // Pulsing border when close to threshold (>=80%)
    const isCloseToFreeDelivery = deliveryProgress >= 80 && deliveryProgress < 100;
    const isCloseToNextTier = nextTierProgress >= 80 && nextTierProgress < 100 && nextTier !== null;
    const shouldPulse = isCloseToFreeDelivery || isCloseToNextTier;

    useEffect(() => {
        setInputValue(quantity.toString());
    }, [quantity]);

    const handleDecrease = () => {
        if (quantity > 0) {
            onQuantityChange(product.id, quantity - 1);
            pushToDataLayer({
                event: 'remove_from_cart',
                item_id: product.id,
                item_name: product.nameEn,
                price: getUnitPrice(product, quantity - 1),
                quantity: 1,
                currency: 'BDT',
            });
        }
    };

    const handleIncrease = () => {
        onQuantityChange(product.id, quantity + 1);
        pushToDataLayer({
            event: 'add_to_cart',
            item_id: product.id,
            item_name: product.nameEn,
            price: getUnitPrice(product, quantity + 1),
            quantity: 1,
            currency: 'BDT',
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === '') {
            setInputValue('');
            return;
        }
        const num = parseInt(val, 10);
        if (!isNaN(num) && num >= 0) {
            setInputValue(val);
            onQuantityChange(product.id, num);
        }
    };

    const handleInputBlur = () => {
        if (inputValue === '' || parseInt(inputValue, 10) === 0) {
            setInputValue('0');
            onQuantityChange(product.id, 0);
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg card-hover border-2 transition-all overflow-hidden relative ${
                isBelowMin ? 'border-red-300' : isAtFreeDelivery ? 'border-green-400' : shouldPulse ? 'border-gold animate-pulse-border' : 'border-maroon/20'
            }`}
        >
            {/* Savings callout - top right corner */}
            <AnimatePresence>
                {hasBulkDiscount && totalSavings > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -12 }}
                        animate={{ opacity: 1, scale: 1, rotate: -3 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -top-1 -right-1 z-10"
                    >
                        <div className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl shadow-lg">
                            <div className="flex items-center gap-1">
                                <Tag size={10} />
                                <span>বাঁচাচ্ছেন {formatPriceEn(totalSavings)}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Best Value badge for deepest discount */}
            {activeTier && activeTier === product.bulkTiers[0] && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-3 left-3 z-10"
                >
                    <div className="bg-gold text-dark text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Star size={8} fill="currentColor" />
                        BEST VALUE
                    </div>
                </motion.div>
            )}

            {/* Badges row */}
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {isAtFreeDelivery && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                    >
                        <Truck size={10} />
                        ফ্রি ডেলিভারি!
                    </motion.div>
                )}
                {discountPct && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-maroon text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                    >
                        <Percent size={10} />
                        {discountPct}% ছাড়
                    </motion.div>
                )}
            </div>

            {/* Product image */}
            <div className="flex justify-center mb-4">
                <div className="relative">
                    <Image
                        src={product.image}
                        alt={`${product.name} - ${product.nameEn} - বিয়েবাড়ি ফিরনি অর্ডার করুন`}
                        width={160}
                        height={160}
                        className="rounded-xl object-cover mix-blend-multiply drop-shadow-md"
                    />
                </div>
            </div>

            {/* Product name */}
            <h3 className="text-lg sm:text-xl font-bold text-dark mb-1 sm:mb-2">{product.name}</h3>
            <p className="text-xs sm:text-sm text-dark-light mb-3 sm:mb-4">{product.nameEn}</p>

            {/* Price */}
            <div className="mb-4 sm:mb-6">
                {hasBulkDiscount ? (
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-2xl sm:text-3xl font-bold text-maroon">{formatPriceEn(unitPrice)}</span>
                        <span className="text-base sm:text-lg text-dark-light line-through">{formatPriceEn(product.price)}</span>
                        <span className="text-sm sm:text-base text-dark-light">/{product.unit}</span>
                    </div>
                ) : (
                    <div>
                        <span className="text-2xl sm:text-3xl font-bold text-maroon">{formatPriceEn(product.price)}</span>
                        <span className="text-sm sm:text-base text-dark-light">/{product.unit}</span>
                    </div>
                )}
                {/* Show all tier prices */}
                {product.bulkTiers.length > 0 && (
                    <div className="mt-2 space-y-0.5">
                        {product.bulkTiers.map((tier, idx) => {
                            const isActive = quantity >= tier.minQty;
                            const tierDiscount = Math.round(((product.price - tier.price) / product.price) * 100);
                            return (
                                <p key={idx} className={`text-xs font-medium ${isActive ? 'text-green-600' : 'text-maroon'}`}>
                                    {isActive ? '✅' : '→'} {tier.minQty}+ {product.unit} = {formatPriceEn(tier.price)}/{product.unit} ({tierDiscount}% ছাড়)
                                </p>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Min order info */}
            <p className="text-xs text-dark-light mb-3 sm:mb-4">
                সর্বনিম্ন অর্ডার: {product.minOrder} {product.unit}
            </p>

            {/* Free delivery progress */}
            <div className="mb-3 sm:mb-4">
                <div className="flex justify-between text-xs text-dark-light mb-1">
                    <span className="flex items-center gap-1">
                        <Truck size={10} />
                        ফ্রি ডেলিভারি
                    </span>
                    <span className="font-medium">
                        {isAtFreeDelivery ? (
                            <span className="text-green-600">✅ অর্জিত!</span>
                        ) : (
                            <span>{quantity}/{product.freeDeliveryThreshold} {product.unit}</span>
                        )}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                        className={`h-2 rounded-full ${
                            isAtFreeDelivery ? 'bg-green-500' : 'bg-maroon'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${deliveryProgress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                {!isAtFreeDelivery && deliveryRemaining > 0 && (
                    <p className="text-xs text-maroon font-medium mt-1">
                        আরো {deliveryRemaining} {product.unit} → ফ্রি ডেলিভারি! 🎉
                    </p>
                )}
            </div>

            {/* Next tier progress */}
            {nextTier && (
                <div className="mb-4 sm:mb-6">
                    <div className="flex justify-between text-xs text-dark-light mb-1">
                        <span className="flex items-center gap-1">
                            <Percent size={10} />
                            পরবর্তী ছাড় ({formatPriceEn(nextTier.price)}/{product.unit})
                        </span>
                        <span className="font-medium">
                            {quantity}/{nextTier.minQty} {product.unit}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                            className="h-2 rounded-full bg-gold"
                            initial={{ width: 0 }}
                            animate={{ width: `${nextTierProgress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    {nextTierRemaining > 0 && (
                        <p className="text-xs text-gold-dark font-medium mt-1">
                            আরো {nextTierRemaining} {product.unit} → {formatPriceEn(nextTier.price)}/{product.unit} পাবেন! 💰
                        </p>
                    )}
                </div>
            )}

            {/* Quantity selector with input */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDecrease}
                    disabled={quantity === 0}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-cream flex items-center justify-center text-dark hover:bg-maroon hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed qty-btn shrink-0"
                >
                    <Minus size={16} />
                </motion.button>

                <input
                    type="number"
                    min="0"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-16 sm:w-20 text-center text-lg sm:text-xl font-bold text-dark bg-cream border-2 border-maroon/20 rounded-lg py-2 focus:outline-none focus:border-maroon transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleIncrease}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-maroon flex items-center justify-center text-white hover:bg-maroon-dark transition-colors qty-btn shrink-0"
                >
                    <Plus size={16} />
                </motion.button>
            </div>

            {/* Warning message */}
            {isBelowMin && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 sm:mt-4 flex items-center gap-2 text-red-500 text-xs sm:text-sm"
                >
                    <AlertCircle size={14} />
                    <span>সর্বনিম্ন {product.minOrder} {product.unit} অর্ডার করুন</span>
                </motion.div>
            )}
        </motion.div>
    );
}

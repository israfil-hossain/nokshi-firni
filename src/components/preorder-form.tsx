'use client';

import { useState } from 'react';
import { Send, MessageCircle, Package, Check, Truck } from 'lucide-react';
import { PRODUCTS, getUnitPrice, DELIVERY_CHARGE, formatPriceEn } from '@/lib/calculations';
import { getMailtoLink, getPreOrderWhatsAppLink } from '@/lib/whatsapp';

const QUICK_AMOUNTS = [5, 10, 20, 50, 100];

export default function PreOrderForm() {
    const [formData, setFormData] = useState({
        eventName: '',
        date: '',
        notes: '',
    });
    const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
    const [quantities, setQuantities] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleVariant = (variantId: string) => {
        setSelectedVariants(prev => {
            if (prev.includes(variantId)) {
                const newVariants = prev.filter(id => id !== variantId);
                const newQuantities = { ...quantities };
                delete newQuantities[variantId];
                setQuantities(newQuantities);
                return newVariants;
            }
            return [...prev, variantId];
        });
    };

    const handleQuantityChange = (variantId: string, value: string) => {
        setQuantities(prev => ({ ...prev, [variantId]: value }));
    };

    const handleQuickAmount = (variantId: string, amount: number) => {
        setQuantities(prev => ({ ...prev, [variantId]: amount.toString() }));
    };

    const getVariantQuantity = (variantId: string): number => {
        return parseInt(quantities[variantId]) || 0;
    };

    const getSubtotal = (): number => {
        return selectedVariants.reduce((total, variantId) => {
            const product = PRODUCTS.find(p => p.id === variantId);
            const qty = getVariantQuantity(variantId);
            if (!product || qty === 0) return total;
            const unitPrice = getUnitPrice(product, qty);
            return total + (unitPrice * qty);
        }, 0);
    };

    const getDeliveryCharge = (): number => {
        const hasItems = selectedVariants.some(id => getVariantQuantity(id) > 0);
        if (!hasItems) return 0;

        const allFreeDelivery = PRODUCTS.every(product => {
            const qty = getVariantQuantity(product.id);
            return qty === 0 || qty >= product.freeDeliveryThreshold;
        });

        return allFreeDelivery ? 0 : DELIVERY_CHARGE;
    };

    const getTotal = (): number => {
        return getSubtotal() + getDeliveryCharge();
    };

    const isFormValid = formData.eventName && formData.date && selectedVariants.length > 0 &&
        selectedVariants.every(id => getVariantQuantity(id) > 0);

    const buildQuantityString = (): string => {
        return selectedVariants.map(variantId => {
            const product = PRODUCTS.find(p => p.id === variantId);
            const qty = getVariantQuantity(variantId);
            const unitPrice = getUnitPrice(product!, qty);
            const itemTotal = unitPrice * qty;
            return `${product?.nameEn}: ${qty} ${product?.unit} × ${formatPriceEn(unitPrice)} = ${formatPriceEn(itemTotal)}`;
        }).join('\n');
    };

    const handleEmailSubmit = () => {
        if (!isFormValid) return;
        const mailtoLink = getMailtoLink({
            ...formData,
            quantity: buildQuantityString(),
            subtotal: getSubtotal(),
            delivery: getDeliveryCharge(),
            total: getTotal(),
        });
        window.location.href = mailtoLink;
    };

    const handleWhatsAppSubmit = () => {
        if (!isFormValid) return;
        const whatsappLink = getPreOrderWhatsAppLink({
            eventName: formData.eventName,
            date: formData.date,
            quantity: buildQuantityString(),
            notes: formData.notes,
            subtotal: getSubtotal(),
            delivery: getDeliveryCharge(),
            total: getTotal(),
        });
        window.open(whatsappLink, '_blank');
    };

    return (
        <section id="preorder" className="py-12 sm:py-16 lg:py-20 bg-cream">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 sm:mb-4">
                        ইভেন্ট <span className="text-maroon">প্রি-অর্ডার</span>
                    </h2>
                    <p className="text-sm sm:text-base text-dark-light max-w-2xl mx-auto px-4">
                        বিয়ে, জন্মদিন, অন্যান্য অনুষ্ঠানের জন্য আগাম অর্ডার করুন
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-maroon/20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Event Name */}
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-dark mb-2">
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
                            <label className="block text-xs sm:text-sm font-medium text-dark mb-2">
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

                        {/* Multi-select Variants */}
                        <div className="sm:col-span-2">
                            <label className="block text-xs sm:text-sm font-medium text-dark mb-2">
                                <Package size={14} className="inline mr-1 text-maroon" />
                                ফিরনির সাইজ নির্বাচন করুন * (একাধিক বাছাই করতে পারেন)
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {PRODUCTS.map((product) => {
                                    const isSelected = selectedVariants.includes(product.id);
                                    return (
                                        <button
                                            key={product.id}
                                            type="button"
                                            onClick={() => toggleVariant(product.id)}
                                            className={`relative p-3 rounded-xl border-2 text-center transition-all ${
                                                isSelected
                                                    ? 'border-maroon bg-maroon/5'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 w-5 h-5 bg-maroon rounded-full flex items-center justify-center">
                                                    <Check size={12} className="text-white" />
                                                </div>
                                            )}
                                            <p className="font-bold text-dark text-sm sm:text-base">{product.name}</p>
                                            <p className="text-xs text-dark-light">{product.nameEn}</p>
                                            <p className="text-maroon font-semibold text-sm mt-1">{formatPriceEn(product.price)}/{product.unit}</p>
                                            {product.bulkTiers.length > 0 && (
                                                <p className="text-[10px] text-gold-dark font-medium mt-0.5">
                                                    {product.bulkTiers[0].minQty}+ → {formatPriceEn(product.bulkTiers[0].price)}
                                                </p>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quantity inputs for selected variants */}
                        {selectedVariants.length > 0 && (
                            <div className="sm:col-span-2 space-y-4">
                                <p className="text-xs text-dark-light">প্রতিটি সাইজের জন্য পরিমাণ দিন:</p>
                                {selectedVariants.map(variantId => {
                                    const product = PRODUCTS.find(p => p.id === variantId);
                                    if (!product) return null;
                                    const qty = getVariantQuantity(variantId);
                                    const unitPrice = getUnitPrice(product, qty);
                                    const hasDiscount = unitPrice < product.price;
                                    return (
                                        <div key={variantId} className="p-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-dark">
                                                    {product.name} ({product.nameEn})
                                                </span>
                                                <span className={`text-xs font-semibold ${hasDiscount ? 'text-green-600' : 'text-dark-light'}`}>
                                                    {formatPriceEn(unitPrice)}/{product.unit}
                                                    {hasDiscount && (
                                                        <span className="ml-1 line-through text-dark-light">{formatPriceEn(product.price)}</span>
                                                    )}
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                value={quantities[variantId] || ''}
                                                onChange={(e) => handleQuantityChange(variantId, e.target.value)}
                                                min="1"
                                                placeholder={`পরিমাণ (${product.unit})`}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition-all text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            />
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {QUICK_AMOUNTS.map(amount => (
                                                    <button
                                                        key={amount}
                                                        type="button"
                                                        onClick={() => handleQuickAmount(variantId, amount)}
                                                        className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                                                            quantities[variantId] === amount.toString()
                                                                ? 'bg-maroon text-white'
                                                                : 'bg-white border border-gray-200 text-dark-light hover:bg-gray-100'
                                                        }`}
                                                    >
                                                        {amount}
                                                    </button>
                                                ))}
                                            </div>
                                            {qty > 0 && (
                                                <p className="text-xs text-maroon font-medium mt-2">
                                                    মোট: {formatPriceEn(unitPrice * qty)}
                                                    {hasDiscount && (
                                                        <span className="ml-1 text-green-600">
                                                            (বাঁচাচ্ছেন {formatPriceEn((product.price - unitPrice) * qty)})
                                                        </span>
                                                    )}
                                                </p>
                                            )}
                                            {/* Free delivery progress */}
                                            {qty > 0 && qty < product.freeDeliveryThreshold && (
                                                <p className="text-[10px] text-maroon mt-1">
                                                    আরো {product.freeDeliveryThreshold - qty} {product.unit} → ফ্রি ডেলিভারি 🎉
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Notes */}
                        <div className="sm:col-span-2">
                            <label className="block text-xs sm:text-sm font-medium text-dark mb-2">
                                বিশেষ অনুরোধ
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={2}
                                placeholder="যেমন: ফ্লেভার, প্যাকেজিং, ডেলিভারি সময়"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition-all text-sm sm:text-base resize-none"
                            />
                        </div>
                    </div>

                    {/* Price Summary */}
                    {getSubtotal() > 0 && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-xl space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-dark-light">সাবটোটাল:</span>
                                <span className="font-medium text-dark">{formatPriceEn(getSubtotal())}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-1 text-dark-light">
                                    <Truck size={12} />
                                    <span>ডেলিভারি:</span>
                                </div>
                                {getDeliveryCharge() === 0 ? (
                                    <span className="font-medium text-green-600">ফ্রি! 🎉</span>
                                ) : (
                                    <span className="font-medium text-dark">{formatPriceEn(getDeliveryCharge())}</span>
                                )}
                            </div>
                            <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                                <span className="text-sm font-bold text-dark">মোট:</span>
                                <span className="text-lg font-bold text-maroon">{formatPriceEn(getTotal())}</span>
                            </div>
                            {getDeliveryCharge() === 0 && (
                                <p className="text-[10px] text-green-600 font-medium">
                                    ✅ সব পণ্যের ফ্রি ডেলিভারি শর্ত পূরণ হয়েছে!
                                </p>
                            )}
                        </div>
                    )}

                    {/* Submit buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <button
                            onClick={handleEmailSubmit}
                            disabled={!isFormValid}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 rounded-xl font-semibold text-base transition-colors ${
                                isFormValid
                                    ? 'bg-maroon hover:bg-maroon-dark text-white'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <Send size={18} />
                            ইমেইল পাঠান
                        </button>

                        <button
                            onClick={handleWhatsAppSubmit}
                            disabled={!isFormValid}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 rounded-xl font-semibold text-base transition-colors ${
                                isFormValid
                                    ? 'bg-whatsapp text-white hover:bg-whatsapp-dark'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <MessageCircle size={18} />
                            WhatsApp এ পাঠান
                        </button>
                    </div>

                    <p className="text-center text-xs text-dark-light mt-4">
                        আমরা ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করব
                    </p>
                </div>
            </div>
        </section>
    );
}

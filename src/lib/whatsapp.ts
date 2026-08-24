import { Order, PRODUCTS, calculateTotal, formatPriceEn, getUnitPrice } from './calculations';

export const WHATSAPP_NUMBER = '8801723560254';
export const BKASH_NUMBER = '01843566251';
export const EMAIL = 'biyebarimistanno@gmail.com';

export interface CustomerInfo {
    name: string;
    phone: string;
    address: string;
}

export function generateOrderMessage(order: Order, customer: CustomerInfo): string {
    const { subtotal, delivery, total, isFreeDelivery } = calculateTotal(order);
    const advanceAmount = Math.round(total * 0.15);

    let message = 'Assalamu Alaikum! 🙏\n';
    message += 'বিয়েবাড়ি অর্ডার করতে চাই\n\n';

    message += '👤 *গ্রাহকের তথ্য:*\n';
    message += '━━━━━━━━━━━━━━━━━━━\n';
    message += `নাম: ${customer.name}\n`;
    message += `ফোন: ${customer.phone}\n`;
    message += `ঠিকানা: ${customer.address}\n\n`;

    message += '📦 *অর্ডারের বিবরণ:*\n';
    message += '━━━━━━━━━━━━━━━━━━━\n';

    PRODUCTS.forEach(product => {
        const qty = order[product.id];
        if (qty > 0) {
            const unitPrice = getUnitPrice(product, qty);
            const itemTotal = qty * unitPrice;
            message += `${product.nameEn}: ${qty} ${product.unit} × ${formatPriceEn(unitPrice)} = ${formatPriceEn(itemTotal)}\n`;
        }
    });

    message += '━━━━━━━━━━━━━━━━━━━\n';
    message += `সাবটোটাল: ${formatPriceEn(subtotal)}\n`;

    if (isFreeDelivery) {
        message += `ডেলিভারি: *ফ্রি* 🎉\n`;
    } else {
        message += `ডেলিভারি: ${formatPriceEn(delivery)}\n`;
    }

    message += `━━━━━━━━━━━━━━━━━━━\n`;
    message += `*মোট: ${formatPriceEn(total)}*\n\n`;

    message += '💳 *পেমেন্ট তথ্য:*\n';
    message += '━━━━━━━━━━━━━━━━━━━\n';
    message += `bKash নম্বর: ${BKASH_NUMBER}\n`;
    message += `১৫% অগ্রিম: ${formatPriceEn(advanceAmount)}\n`;
    message += '✅ অগ্রিম পেমেন্ট করা হয়েছে\n';

    return message;
}

export function generatePreOrderMessage(eventData: {
    eventName: string;
    date: string;
    quantity: string;
    notes: string;
}): string {
    let message = 'Assalamu Alaikum! 🙏\n';
    message += 'বিয়েবাড়ি প্রি-অর্ডার\n\n';
    message += '🎉 *ইভেন্টের তথ্য:*\n';
    message += '━━━━━━━━━━━━━━━━━━━\n';
    message += `ইভেন্ট: ${eventData.eventName}\n`;
    message += `তারিখ: ${eventData.date}\n`;
    message += `পরিমাণ: ${eventData.quantity}\n`;

    if (eventData.notes) {
        message += `বিশেষ অনুরোধ: ${eventData.notes}\n`;
    }

    message += '━━━━━━━━━━━━━━━━━━━\n\n';
    message += 'অনুগ্রহ করে এড্রেস ও কনফার্মেশন দিন।';

    return message;
}

export function getWhatsAppLink(message: string): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getOrderWhatsAppLink(order: Order, customer: CustomerInfo): string {
    const message = generateOrderMessage(order, customer);
    return getWhatsAppLink(message);
}

export function getPreOrderWhatsAppLink(eventData: {
    eventName: string;
    date: string;
    quantity: string;
    notes: string;
}): string {
    const message = generatePreOrderMessage(eventData);
    return getWhatsAppLink(message);
}

export function getMailtoLink(eventData: {
    eventName: string;
    date: string;
    quantity: string;
    notes: string;
}): string {
    const subject = encodeURIComponent('বিয়েবাড়ি - ইভেন্ট প্রি-অর্ডার');
    const body = encodeURIComponent(`
ইভেন্টের নাম: ${eventData.eventName}
তারিখ: ${eventData.date}
পরিমাণ: ${eventData.quantity}
বিশেষ অনুরোধ: ${eventData.notes}

--
বিয়েবাড়ি
WhatsApp: +${WHATSAPP_NUMBER}
    `);
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

export interface BulkPricing {
    minQty: number;
    price: number;
}

export interface Product {
    id: '100gm' | '500gm' | '1kg';
    name: string;
    nameEn: string;
    price: number;
    bulkPricing?: BulkPricing;
    minOrder: number;
    freeDeliveryThreshold: number;
    unit: string;
    image: string;
}

export const PRODUCTS: Product[] = [
    {
        id: '100gm',
        name: '১০০ গ্রাম ফিরনি',
        nameEn: '100gm Firni',
        price: 40,
        bulkPricing: { minQty: 100, price: 35 },
        minOrder: 15,
        freeDeliveryThreshold: 50,
        unit: 'কাপ',
        image: '/100g_cup.jpeg',
    },
    {
        id: '500gm',
        name: '৫০০ গ্রাম ফিরনি',
        nameEn: '500gm Firni',
        price: 200,
        bulkPricing: { minQty: 10, price: 180 },
        minOrder: 5,
        freeDeliveryThreshold: 10,
        unit: 'বক্স',
        image: '/500g_cup.jpeg',
    },
    {
        id: '1kg',
        name: '১ কেজি ফিরনি',
        nameEn: '1kg Firni',
        price: 400,
        bulkPricing: { minQty: 2, price: 380 },
        minOrder: 2,
        freeDeliveryThreshold: 5,
        unit: 'বক্স',
        image: '/1kg_cup.jpeg',
    },
];

export const DELIVERY_CHARGE = 80;

export interface Order {
    '100gm': number;
    '500gm': number;
    '1kg': number;
}

export const INITIAL_ORDER: Order = {
    '100gm': 0,
    '500gm': 0,
    '1kg': 0,
};

export function getUnitPrice(product: Product, quantity: number): number {
    if (product.bulkPricing && quantity >= product.bulkPricing.minQty) {
        return product.bulkPricing.price;
    }
    return product.price;
}

export function getDiscountPercentage(product: Product, quantity: number): number | null {
    if (product.bulkPricing && quantity >= product.bulkPricing.minQty) {
        const savings = product.price - product.bulkPricing.price;
        return Math.round((savings / product.price) * 100);
    }
    return null;
}

export function calculateSubtotal(order: Order): number {
    return PRODUCTS.reduce((total, product) => {
        const qty = order[product.id];
        const unitPrice = getUnitPrice(product, qty);
        return total + (qty * unitPrice);
    }, 0);
}

export function isFreeDelivery(order: Order): boolean {
    return PRODUCTS.every(product => {
        const quantity = order[product.id];
        return quantity === 0 || quantity >= product.freeDeliveryThreshold;
    });
}

export function calculateDelivery(order: Order): number {
    const hasItems = Object.values(order).some(qty => qty > 0);
    if (!hasItems) return 0;
    return isFreeDelivery(order) ? 0 : DELIVERY_CHARGE;
}

export function calculateTotal(order: Order): {
    subtotal: number;
    delivery: number;
    total: number;
    isFreeDelivery: boolean;
} {
    const subtotal = calculateSubtotal(order);
    const delivery = calculateDelivery(order);
    const total = subtotal + delivery;

    return {
        subtotal,
        delivery,
        total,
        isFreeDelivery: delivery === 0 && Object.values(order).some(qty => qty > 0),
    };
}

export function getMinOrderWarning(order: Order): string | null {
    for (const product of PRODUCTS) {
        const quantity = order[product.id];
        if (quantity > 0 && quantity < product.minOrder) {
            return `${product.name} সর্বনিম্ন ${product.minOrder} ${product.unit} অর্ডার করতে হবে`;
        }
    }
    return null;
}

export function getFreeDeliveryProgress(order: Order): {
    product: Product;
    current: number;
    target: number;
    percentage: number;
}[] {
    return PRODUCTS.map(product => {
        const current = order[product.id];
        const target = product.freeDeliveryThreshold;
        const percentage = Math.min((current / target) * 100, 100);
        return { product, current, target, percentage };
    }).filter(item => item.current > 0 && item.current < item.target);
}

export function calculateTotalSavings(order: Order): number {
    return PRODUCTS.reduce((total, product) => {
        const qty = order[product.id];
        if (qty > 0 && product.bulkPricing && qty >= product.bulkPricing.minQty) {
            const savingsPerUnit = product.price - product.bulkPricing.price;
            return total + (qty * savingsPerUnit);
        }
        return total;
    }, 0);
}

export function formatPrice(price: number): string {
    return `৳${price.toLocaleString('bn-BD')}`;
}

export function formatPriceEn(price: number): string {
    return `৳${price}`;
}

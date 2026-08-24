export interface BulkTier {
    minQty: number;
    price: number;
}

export interface Product {
    id: '100gm' | '500gm' | '1kg';
    name: string;
    nameEn: string;
    price: number;
    bulkTiers: BulkTier[];
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
        bulkTiers: [
            { minQty: 100, price: 30 },
            { minQty: 50, price: 35 },
        ],
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
        bulkTiers: [
            { minQty: 20, price: 150 },
            { minQty: 10, price: 175 },
        ],
        minOrder: 5,
        freeDeliveryThreshold: 5,
        unit: 'বক্স',
        image: '/500g_cup.jpeg',
    },
    {
        id: '1kg',
        name: '১ কেজি ফিরনি',
        nameEn: '1kg Firni',
        price: 400,
        bulkTiers: [
            { minQty: 5, price: 320 },
            { minQty: 3, price: 350 },
        ],
        minOrder: 2,
        freeDeliveryThreshold: 3,
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
    for (const tier of product.bulkTiers) {
        if (quantity >= tier.minQty) {
            return tier.price;
        }
    }
    return product.price;
}

export function getActiveTier(product: Product, quantity: number): BulkTier | null {
    for (const tier of product.bulkTiers) {
        if (quantity >= tier.minQty) {
            return tier;
        }
    }
    return null;
}

export function getNextTier(product: Product, quantity: number): BulkTier | null {
    // bulkTiers is sorted high to low, find first tier we haven't reached
    for (let i = product.bulkTiers.length - 1; i >= 0; i--) {
        if (quantity < product.bulkTiers[i].minQty) {
            return product.bulkTiers[i];
        }
    }
    return null;
}

export function getDiscountPercentage(product: Product, quantity: number): number | null {
    const tier = getActiveTier(product, quantity);
    if (tier) {
        const savings = product.price - tier.price;
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
        const activeTier = getActiveTier(product, qty);
        if (qty > 0 && activeTier) {
            const savingsPerUnit = product.price - activeTier.price;
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

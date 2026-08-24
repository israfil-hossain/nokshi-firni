export interface Product {
    id: '150gm' | '500gm' | '1kg';
    name: string;
    nameEn: string;
    price: number;
    minOrder: number;
    freeDeliveryThreshold: number;
    unit: string;
}

export const PRODUCTS: Product[] = [
    {
        id: '150gm',
        name: '১৫০ গ্রাম ফিরনি',
        nameEn: '150gm Firni',
        price: 30,
        minOrder: 20,
        freeDeliveryThreshold: 60,
        unit: 'কাপ',
    },
    {
        id: '500gm',
        name: '৫০০ গ্রাম ফিরনি',
        nameEn: '500gm Firni',
        price: 100,
        minOrder: 5,
        freeDeliveryThreshold: 20,
        unit: 'বক্স',
    },
    {
        id: '1kg',
        name: '১ কেজি ফিরনি',
        nameEn: '1kg Firni',
        price: 200,
        minOrder: 3,
        freeDeliveryThreshold: 10,
        unit: 'বক্স',
    },
];

export const DELIVERY_CHARGE = 80;

export interface Order {
    '150gm': number;
    '500gm': number;
    '1kg': number;
}

export const INITIAL_ORDER: Order = {
    '150gm': 0,
    '500gm': 0,
    '1kg': 0,
};

export function calculateSubtotal(order: Order): number {
    return PRODUCTS.reduce((total, product) => {
        return total + (order[product.id] * product.price);
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

export function formatPrice(price: number): string {
    return `৳${price.toLocaleString('bn-BD')}`;
}

export function formatPriceEn(price: number): string {
    return `৳${price}`;
}

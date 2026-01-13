export interface Product {
    id: string | number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    brand?: string;
    rating?: {
        rate: number;
        count: number;
    };
}

export interface CartItem extends Product {
    quantity: number;
}

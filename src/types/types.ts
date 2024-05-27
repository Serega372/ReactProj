export interface Dish {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

export interface CartItemType extends Dish {
    quantity: number;
}

export interface CartItemProps {
    item: CartItemType;
    removeFromCart: (id: number) => void;
    decrementItemQuantity: (id: number) => void;
    addToCart: (item: CartItemType) => void;
}
import React, {createContext, useState, ReactNode, useEffect, Dispatch} from 'react';
import { Dish } from '../types/types.ts';

interface CartItem extends Dish {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    decrementItemQuantity: (id: number) => void;
    setCartItems: Dispatch<React.SetStateAction<CartItem[]>>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(i => i.id !== id));
    };

    const decrementItemQuantity = (id: number) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === id);
            if (existingItem && existingItem.quantity > 1) {
                return prevItems.map(i =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                );
            }
            return prevItems.filter(i => i.id !== id);
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decrementItemQuantity, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};
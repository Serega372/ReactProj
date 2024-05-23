import { FC, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CartContext } from '../context/CartContext.tsx';
import styles from './CartModal.module.css';

const CartModal: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const cartContext = useContext(CartContext);
    const navigate = useNavigate();

    if (!cartContext) {
        throw new Error("CartContext");
    }

    const { cartItems, removeFromCart, addToCart, decrementItemQuantity, setCartItems } = cartContext;

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            const parsedCartItems = JSON.parse(storedCartItems);
            setCartItems(parsedCartItems);
        }
    }, [setCartItems]);

    const handleCheckout = () => {
        navigate("/checkout");
    }

    return (
        <div>
            <p onClick={openModal} className={styles["modal-link"]}>Корзина</p>
            {isOpen && (
                <div className={styles["modal"]}>
                    <div className={styles["modal-content"]}>
                        <div className={styles["modal-header"]}>
                            <h2>Корзина</h2>
                            <span className={styles["close"]} onClick={closeModal}>&times;</span>
                        </div>
                        <div className={styles["modal-body"]}>
                            {cartItems.length === 0 ? (
                                <p className={styles["cart-state"]}>Корзина пуста</p>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className={styles["cart-item"]}>
                                        <img src={item.image} alt={item.title} className={styles["cart-item-image"]} />
                                        <div className={styles["cart-item-details"]}>
                                            <h3>{item.title}</h3>
                                            <p>Цена: ${(item.price * item.quantity).toFixed(2)}</p>
                                            <button className={styles["delete-button"]}
                                                    onClick={() => removeFromCart(item.id)}>удалить</button>
                                        </div>
                                        <div className={styles["cart-quantity"]}>
                                            <button onClick={() => decrementItemQuantity(item.id)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => addToCart(item)}>+</button>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div className={styles["cart-total"]}>
                                <h3>Общая сумма: ${getTotalPrice()}</h3>
                                <button className={styles["checkout-button"]}
                                        onClick={handleCheckout}
                                >Перейти к оформлению</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartModal;
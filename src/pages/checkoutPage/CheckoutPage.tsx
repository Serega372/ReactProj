import React, { FC, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../components/context/CartContext.tsx';
import styles from './CheckoutPage.module.css';

const CheckoutPage: FC = () => {
    const cartContext = useContext(CartContext);
    const navigate = useNavigate();

    if (!cartContext) {
        throw new Error("CartContext");
    }

    const { cartItems } = cartContext;

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Заказ оформлен!');
    };

    const handleCheckout = () => {
        navigate("/");
    }

    return (
        <div className={styles["checkout-container"]}>
            <p className={styles["to-main"]} onClick={handleCheckout}>На главную</p>
            <h1>Оформление заказа</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles["order-info"]}>
                    <h2>Информация о заказе</h2>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id} className={styles["order-item"]}>
                                <img src={item.image} alt={item.title} className={styles["order-item-image"]} />
                                <div className={styles["order-item-details"]}>
                                    <h3>{item.title}</h3>
                                    <p>Цена: ${item.price}</p>
                                    <p>Количество: {item.quantity}</p>
                                    <p>Итого: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles["total-price"]}>
                        <h3>Общая сумма заказа: ${calculateTotalPrice()}</h3>
                    </div>
                </div>
                <div className={styles["contact-info"]}>
                    <h2>Контактная информация</h2>
                    <div className={styles["form-group"]}>
                        <label htmlFor="phone">Номер телефона:</label>
                        <input
                            placeholder="88005553535"
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">Электронная почта:</label>
                        <input
                            placeholder="example@email.com"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="address">Адрес доставки:</label>
                        <input
                            placeholder="Улица, дом, квартира"
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="paymentMethod">Способ оплаты:</label>
                        <select
                            id="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                        >
                            <option value="">Выберите способ оплаты</option>
                            <option value="card">Оплата картой</option>
                            <option value="paypal">PayPal</option>
                            <option value="cash">Наличные</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className={styles["submit-button"]}>Оформить заказ</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
import React, {FC, useContext, useMemo, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../contexts/CartContext.tsx';
import styles from './CheckoutPage.module.css';
import OrderItem from "../../components/OrderItem/OrderItem.tsx";
import InputField from "../../components/CheckoutInputForms/InputField.tsx";
import SelectField from "../../components/CheckoutInputForms/SelectField.tsx";

const paymentOptions = [
    { value: '', label: 'Выберите способ оплаты' },
    { value: 'cash', label: 'Наличными при получении' },
    { value: 'card', label: 'Оплата картой' },
    { value: 'transfer', label: 'Перевод на карту' },
    { value: 'paypal', label: 'PayPal' }
];

const CheckoutPage: FC = () => {
    const cartContext = useContext(CartContext);
    const navigate = useNavigate();

    if (!cartContext) {
        throw new Error("CartContext");
    }

    const { cartItems } = cartContext;

    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        address: '',
        paymentMethod: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const calculateTotalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }, [cartItems]);

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
                            <OrderItem key={item.id} item={item}/>
                        ))}
                    </ul>
                    <div className={styles["total-price"]}>
                        <h3>Общая сумма заказа: ${calculateTotalPrice}</h3>
                    </div>
                </div>
                <div className={styles["contact-info"]}>
                    <h2>Контактная информация</h2>
                    <InputField
                        label="Номер телефона:"
                        placeholder="88005553535"
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Электронная почта:"
                        placeholder="example@email.com"
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Адрес доставки:"
                        placeholder="Улица, дом, квартира"
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    <SelectField
                        label="Способ оплаты:"
                        id="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        options={paymentOptions}
                    />
                </div>
                <button type="submit" className={styles["submit-button"]}>Оформить заказ</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
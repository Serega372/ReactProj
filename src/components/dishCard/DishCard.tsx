import { FC, useContext } from 'react';
import { Dish } from '../../types/types.ts';
import { CartContext } from '../context/CartContext.tsx';
import styles from './DishCard.module.css';

interface DishCardProps {
    dish: Dish;
}

const DishCard: FC<DishCardProps> = ({ dish }) => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext");
    }

    const { addToCart } = cartContext;

    return (
        <div className={styles["dish-card"]}>
            <img src={dish.image} alt={dish.title} />
            <h2>{dish.title}</h2>
            <p>{dish.description}</p>
            <p>Цена: ${dish.price}</p>
            <button className={styles["add-button"]} onClick={() => addToCart({ ...dish, quantity: 1 })}>
                Добавить в корзину
            </button>
        </div>
    );
};

export default DishCard;
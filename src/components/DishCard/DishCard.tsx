import { FC, useContext } from 'react';
import { Dish } from '../../types/types.ts';
import { CartContext } from '../../contexts/CartContext.tsx';
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
            <div className={styles["details-container"]}>
                <h2 className={styles["title"]}>{dish.title}</h2>
                <p className={styles["description"]}>{dish.description}</p>
                <p className={styles["price"]}>Цена: ${dish.price}</p>
            </div>
            <button className={styles["add-button"]} onClick={() => addToCart({...dish, quantity: 1})}>
                Добавить в корзину
            </button>
        </div>
    );
};

export default DishCard;
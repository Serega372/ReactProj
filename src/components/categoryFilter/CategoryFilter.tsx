import React, { FC } from 'react';
import styles from './CategoryFilter.module.css'

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategoryFilter: FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className={styles["filter-container"]}>
            <label htmlFor="category">Сортировать по категории:</label>
            <select id="category" value={selectedCategory} onChange={onSelectCategory}>
                <option value="">Все</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
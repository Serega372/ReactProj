import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Dish } from '../../types/types';
import DishCard from '../../components/dishCard/DishCard';
import CartModal from '../../components/modal/CartModal';
import SearchBar from "../../components/searchBar/SearchBar.tsx";
import CategoryFilter from "../../components/categoryFilter/CategoryFilter.tsx";

const CatalogPage: FC = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
    const [searchError, setSearchError] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        const fetchDishes = () => {
            axios.get('http://localhost:3001/dishes')
                .then(response => {
                    setDishes(response.data);
                })
                .catch(error => {
                    console.error('Error fetching dishes:', error);
                });
        };

        fetchDishes();
    }, []);

    const handleSearch = (query: string) => {
        const filteredBySearch = dishes.filter(dish =>
            dish.title.toLowerCase().includes(query.toLowerCase())
        );
        const filteredByCategory = selectedCategory ? filteredBySearch
            .filter(dish => dish.category === selectedCategory) : filteredBySearch;
        if (filteredByCategory.length === 0 && query !== "") {
            setSearchError(true);
        } else {
            setSearchError(false);
            setFilteredDishes(filteredByCategory);
        }
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value;
        setSelectedCategory(category);
        const filteredByCategory = category ? dishes.filter(dish =>
            dish.category === category) : dishes;
        setFilteredDishes(filteredByCategory);
    };

    const categories = Array.from(new Set(dishes.map(dish => dish.category)));

    return (
        <div>
            <nav className="navigation">
                <div className="logo">
                    <img src="/public/vite.svg"/>
                </div>
                <h1>Каталог</h1>
                <div>
                    <CartModal/>
                </div>
            </nav>
            <div className="search-filter-container">
            <SearchBar onSearch={handleSearch}/>
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategoryChange}/>
            </div>
            {searchError ? (
                <p>Ничего не найдено!</p>
            ) : (
            <div className="dishes-container">
                {filteredDishes.length > 0 ? filteredDishes.map((dish) => (
                    <DishCard key={dish.id} dish={dish}/>
                )) : dishes.map((dish) => (
                    <DishCard key={dish.id} dish={dish}/>
                ))}
            </div>
            )}
        </div>
    );
};

export default CatalogPage;
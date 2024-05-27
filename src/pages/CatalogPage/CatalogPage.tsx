import React, {FC, useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import { Dish } from '../../types/types';
import DishCard from '../../components/DishCard/DishCard';
import CartModal from '../../components/Modal/CartModal';
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter.tsx";

const CatalogPage: FC = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
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
        setSearchQuery(query);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const filteredDishes = useMemo(() => {
        const filteredBySearch = dishes.filter(dish =>
            dish.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const filteredByCategory = selectedCategory ? filteredBySearch.filter(dish =>
            dish.category === selectedCategory) : filteredBySearch;

        if (filteredByCategory.length === 0 && searchQuery !== "") {
            setSearchError(true);
        } else {
            setSearchError(false);
        }

        return filteredByCategory;
    }, [dishes, searchQuery, selectedCategory]);

    const categories = useMemo(() =>
            Array.from(new Set(dishes.map(dish =>
            dish.category))),
            [dishes]);

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
            {searchError && <p>Ничего не найдено!</p>}
            <div className="dishes-container">
                {filteredDishes.map(dish => (
                    <DishCard key={dish.id} dish={dish} />
                ))}
            </div>
        </div>
    );
};

export default CatalogPage;
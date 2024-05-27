import React, {FC, useState} from 'react';
import styles from './SearchBar.module.css'

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setQuery(inputValue);
        onSearch(inputValue);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form className={styles["search-form"]} onSubmit={handleSubmit}>
            <input
                className={styles["search-input"]}
                type="text"
                placeholder="Поиск..."
                value={query}
                onChange={handleInputChange}
            />
        </form>
    );
};

export default SearchBar;
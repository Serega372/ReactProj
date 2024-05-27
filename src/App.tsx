import {FC} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import CatalogPage from './pages/CatalogPage/CatalogPage.tsx';
import "./index.css"
import CheckoutPage from './pages/CheckoutPage/CheckoutPage.tsx';

const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<CatalogPage/>} />
            <Route path="*" element={<Navigate to="/"/>}/>
            <Route path="/checkout" element={<CheckoutPage/>}/>
        </Routes>
    );
};

export default App;
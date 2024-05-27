import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './contexts/CartContext.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('No root element found');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <BrowserRouter>
        <CartProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </CartProvider>
    </BrowserRouter>
);
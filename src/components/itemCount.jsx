import { useState } from 'react';

export const ItemCount = ({ stock, onAdd }) => { 
    const [count, setCount] = useState(1);

    const handleIncrease = () => {
        if (count < stock) {
            setCount((prev) => prev + 1);
        }
    };

    const handleDecrease = () => {
        if (count > 1) {
            setCount((prev) => prev - 1);
        }
    };

    const handleAdd = () => {
        onAdd(count);
        setCount(1);
    };

    return (
        <div className="item-count-container">
            <button onClick={handleDecrease} className="item-count-button">-</button>
            <span className="quantity-display">{count}</span>
            <button onClick={handleIncrease} className="item-count-button">+</button>
            <hr/>
            <button onClick={handleAdd} className="btn-primary">Agregar al carrito</button>
        </div>
    );
};

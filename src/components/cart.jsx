import Container from 'react-bootstrap/Container';
import { useContext, useState } from 'react';
import { ItemsContext } from '../contexts/ItemsContext';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const initialValues = {
    phone: "",
    email: "",
    name: "",
};

export const Cart = () => {
    const [buyer, setBuyer] = useState(initialValues);
    const { reset, removeProducto, productos, totalPrice } = useContext(ItemsContext);

    const handleRemoveProduct = (id) => {
        removeProducto(id);
    };

    return (
        <Container className="mt-4">
            {productos.length === 0 ? (
                <h2>El carrito está vacío</h2>
            ) : (
                <>
                    {productos.map((i) => (
                        <div key={i.id} className="product-card mb-3">
                            <h1 className="card-title">{i.titulo}</h1>
                            <h2 className="product-price">${i.precio}</h2>
                            <h3 className="quantity-display">Cantidad: {i.quantity}</h3>
                            <img src={i.imagen} height={200} alt={i.titulo} className="card-img" />
                            <Button variant="danger" onClick={() => handleRemoveProduct(i.id)}>
                                Eliminar
                            </Button>
                        </div>
                    ))}
                    <hr />
                    <h2 className="cart-total">Total: ${totalPrice.toFixed(2)}</h2>
                    <Button variant="danger" onClick={reset}>
                        Vaciar carrito
                    </Button>
                    <Link to="/checkout">
                        <Button variant="primary">
                            Finalizar compra
                        </Button>
                    </Link>
                </>
            )}
        </Container>
    );
};

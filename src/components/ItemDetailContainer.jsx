import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, getDoc, doc } from "firebase/firestore";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import { ItemsContext } from "../contexts/ItemsContext";
import { ItemCount } from "./itemCount";

export const ItemDetailContainer = () => {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const { addProducto } = useContext(ItemsContext); 

    const onAdd = (count) => {
        addProducto({ ...producto, quantity: count });
    };

    useEffect(() => {
        const db = getFirestore();

        const refDoc = doc(db, "productos", id);

        getDoc(refDoc)
            .then((snapshot) => {
                setProducto({ id: snapshot.id, ...snapshot.data() });
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Container className='mt-4 text-center'>Cargando...</Container>;
    if (!producto) return <Container className='mt-4 text-center'>Producto no encontrado</Container>;

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Producto</h1>
            <Card className="product-card">
                <Card.Body>
                    <div className="d-flex flex-column align-items-center">
                        <Card.Img 
                            variant="top" 
                            src={producto.imagen} 
                            alt={producto.titulo} 
                            className="card-img img-fluid mb-3" 
                        />
                        <Card.Title className="card-title text-center">
                            {producto.titulo}
                        </Card.Title>
                        <Card.Subtitle className="card-subtitle text-muted text-center mb-3">
                            {producto.categoria}
                        </Card.Subtitle>
                        <Card.Text className="card-text text-center">
                            {producto.detalle}
                        </Card.Text>
                        <Card.Text className="product-price text-center">
                            Precio: ${producto.precio}
                        </Card.Text>
                        <ItemCount stock={producto.stock} onAdd={onAdd}/>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

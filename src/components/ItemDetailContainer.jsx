import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import data from "../data/productos.json";

export const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(() => resolve(data), 2000);
        })
        .then((response) => {
            const finded = response.find((i) => i.id === Number(id));
            setItem(finded);
        })
        .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Container className='mt-4 text-center'>Cargando...</Container>;
    if (!item) return <Container className='mt-4 text-center'>Producto no encontrado</Container>;

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Producto</h1>
            <Card className="mb-4">
                <Card.Body>
                    <div className="d-flex flex-column align-items-center">
                        <Card.Img 
                            variant="top" 
                            src={item.imagen} 
                            alt={item.titulo} 
                            className="img-fluid mb-3" 
                            style={{ 
                                maxWidth: '300px', 
                                maxHeight: '300px', 
                                objectFit: 'contain', 
                                border: '1px solid #ddd', 
                                borderRadius: '5px' 
                            }} 
                        />
                        <Card.Title className="text-center">{item.titulo}</Card.Title>
                        <Card.Subtitle className="text-muted text-center mb-3">{item.categoria}</Card.Subtitle>
                        <Card.Text className="text-center">{item.detalle}</Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};
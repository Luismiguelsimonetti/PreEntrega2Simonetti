import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import data from "../data/productos.json";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(() => resolve(data), 2000);
        })
        .then((response) => {
            if (!id) {
                setItems(response);
            } else {
                const filtered = response.filter((i) => i.categoria === id);
                setItems(filtered);
            }
        })
        .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Container className='mt-4 text-center'>Cargando...</Container>;
    if (items.length === 0) return <Container className='mt-4 text-center'>No hay productos</Container>;

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Productos</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {items.map((i) => (
                    <Card key={i.id} style={{ width: '18rem', margin: '10px' }}>
                        <Card.Img 
                            variant="top" 
                            src={i.imagen} 
                            height={200} 
                            style={{ 
                                maxWidth: '300px', 
                                maxHeight: '300px', 
                                objectFit: 'contain' 
                            }} 
                        />
                        <Card.Body>
                            <Card.Title>{i.titulo}</Card.Title>
                            <Card.Text>{i.detalle}</Card.Text>
                            <Card.Text>{i.categoria}</Card.Text>
                            <Link to={`/item/${i.id}`}>
                                <Button variant="primary">Ver</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getDocs, where, query, collection } from "firebase/firestore";
import { db } from "../services/firebase/firebaseConfig";

export const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const refCollection = !id
            ? collection(db, "productos")
            : query(collection(db, "productos"), where("categoria", "==", id));

        getDocs(refCollection)
            .then((snapshot) => {
                const productosData = snapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                setProductos(productosData);
                setError(null); // Limpia cualquier error previo
            })
            .catch((error) => {
                console.error("Error al obtener los documentos:", error);
                setError("No se pudieron cargar los productos.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    // Define el nombre de la categoría
    const categoryNames = {
        alfajores: 'Alfajores',
        conitos: 'Conitos',
        cookies: 'Cookies',
    };

    // Determina el título basado en la categoría
    const title = id ? categoryNames[id] || id : 'Nuestros Productos';

    if (loading) return <Container className='mt-4 text-center'>Cargando...</Container>;
    if (error) return <Container className='mt-4 text-center'>{error}</Container>;
    if (productos.length === 0) return <Container className='mt-4 text-center'>No hay productos en esta categoría.</Container>;

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">{title}</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {productos.map((producto) => (
                    <Card key={producto.id} style={{ width: '18rem', margin: '10px' }}>
                        <Card.Img 
                            variant="top" 
                            src={producto.imagen} 
                            height={200} 
                            style={{ 
                                maxWidth: '300px', 
                                maxHeight: '300px', 
                                objectFit: 'contain' 
                            }} 
                        />
                        <Card.Body>
                            <Card.Title>{producto.titulo}</Card.Title>
                            <Card.Text>{producto.detalle}</Card.Text>
                            {/* Elimina el texto de la categoría si solo deseas mostrar el nombre de la categoría */}
                            {/* <Card.Text>{producto.categoria}</Card.Text> */}
                            <Link to={`/item/${producto.id}`}>
                                <Button variant="primary">Ver más</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

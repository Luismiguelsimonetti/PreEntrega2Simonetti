import Container from 'react-bootstrap/Container';
import { useContext, useState } from 'react';
import { ItemsContext } from '../contexts/ItemsContext';

const initialValues= {
    phone: "",
    email: "",
    name: "",
}

export const Cart = () => {
    const [buyer, setBuyer] = useState(initialValues);
    const {reset, removeProducto, productos } = useContext (ItemsContext);

    return <Container>
        {productos?.map((i) => {
            return (
                <div key= {i.id} >
                <h1>{i.titulo}</h1>
                <h2>{i.precio}</h2>
                <h3>{i.quantity}</h3>
                <img src= {i.imagen} height={150}/>
                </div>
            )
        }
    )}
    </Container>;
};
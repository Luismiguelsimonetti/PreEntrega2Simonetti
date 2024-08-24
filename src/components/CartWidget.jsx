import { Link } from "react-router-dom";
import carrito from "../assets/carrito.png";


export const CartWidget = () => {
return (
<Link to="/cart" >
<img src={carrito} height={30} /> 
<span>5</span>
</Link>
);
};
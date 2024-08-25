import { Link } from "react-router-dom";
import carrito from "../assets/carrito.png";
import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";

export const CartWidget = () => {
  const { totalQuantity } = useContext(ItemsContext);

  return (
    <Link to="/cart">
      <img src={carrito} height={30} alt="Carrito" />
      <span>{totalQuantity}</span>
    </Link>
  );
};

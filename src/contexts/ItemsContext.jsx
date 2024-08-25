import { createContext, useState } from "react";

export const ItemsContext = createContext();

export const Provider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const addProducto = (producto) => {
    const alreadyExists = productos.some((i) => i.id === producto.id);

    if (alreadyExists) {
      const transform = productos.map((i) => {
        if (i.id === producto.id) {
          return { ...i, quantity: i.quantity + producto.quantity };
        } else {
          return i;
        }
      });
      setProductos(transform);
    } else {
      setProductos((prev) => [...prev, producto]);
    }
  };

  const removeProducto = (id) => {
    const remove = productos.filter((i) => i.id !== id);
    setProductos(remove);
  };

  const reset = () => setProductos([]);

  // Calcula el número total de productos en el carrito
  const totalQuantity = productos.reduce((total, producto) => total + producto.quantity, 0);

  // Calcula el total acumulado de los productos en el carrito
  const totalPrice = productos.reduce((total, producto) => total + producto.precio * producto.quantity, 0);

  return (
    <ItemsContext.Provider value={{ addProducto, productos, reset, removeProducto, totalQuantity, totalPrice }}>
      {children}
    </ItemsContext.Provider>
  );
};

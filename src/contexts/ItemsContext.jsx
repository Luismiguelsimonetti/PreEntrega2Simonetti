import { createContext, useState } from "react";

export const ItemsContext = createContext();

export const Provider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const addProducto = (producto) => {
    const alreadyExists = productos.some((i) => i.id === producto.id);

    if (alreadyExists) {
      // Si el producto ya existe, actualizar la cantidad
      const updatedProducts = productos.map((i) => {
        if (i.id === producto.id) {
          return { ...i, quantity: i.quantity + producto.quantity };
        } else {
          return i;
        }
      });
      setProductos(updatedProducts);
    } else {
      // Si el producto no existe, agregarlo al carrito
      setProductos((prev) => [...prev, producto]);
    }
  };

  const removeProducto = (id) => {
    // Filtrar los productos para eliminar el que coincide con el ID
    const updatedProducts = productos.filter((i) => i.id !== id);
    setProductos(updatedProducts);
  };

  const reset = () => setProductos([]);

  return (
    <ItemsContext.Provider value={{ addProducto, productos, reset, removeProducto }}>
      {children}
    </ItemsContext.Provider>
  );
};

import React, { useContext, useState } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase/firebaseConfig";

const Checkout = () => {
  const { productos, totalPrice, reset } = useContext(ItemsContext);
  const { register, handleSubmit } = useForm();
  const [pedidoId, setPedidoId] = useState(""); // Corregido el nombre del estado

  const comprar = async (data) => {
    const pedido = {
      cliente: data,
      productos: productos,
      total: totalPrice, // Asegúrate de que totalPrice es un número
    };

    console.log("Datos del pedido:", pedido); // Depuración

    try {
      const pedidosRef = collection(db, "pedidos"); // Usa 'pedidos' como colección
      const docRef = await addDoc(pedidosRef, pedido);
      setPedidoId(docRef.id); // Corrección aquí: usar docRef.id
      console.log("Compra realizada con éxito");
      reset(); // Limpiar el carrito después de la compra
    } catch (error) {
      console.error("Error al realizar la compra:", error);
    }
  };

  // Verificar si el pedidoId ha sido asignado
  console.log("pedidoId:", pedidoId);

  if (pedidoId) {
    return (
      <div className="container">
        <h1 className="main-title">Muchas gracias por tu compra</h1>
        <p>Tu número de pedido es: {pedidoId}</p> {/* Corrección en la variable */}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="main-title">Finalizar compra</h1>
      <form className="formulario" onSubmit={handleSubmit(comprar)}>
        <input
          type="text"
          placeholder="Ingresá tu nombre"
          {...register("nombre", { required: true })}
        />
        <input
          type="email"
          placeholder="Ingresá tu e-mail"
          {...register("email", { required: true })}
        />
        <input
          type="tel"
          placeholder="Ingresá tu teléfono"
          {...register("telefono")}
        />
        <button className="enviar" type="submit">Comprar</button>
      </form>
    </div>
  );
};

export default Checkout;

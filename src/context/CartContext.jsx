import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

const API_URL = 'http://localhost:3000/api';

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarCarrito = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/carrito`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener el carrito');
      }

      const data = await response.json();

      setCart(data);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  const addToCart = async (product) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/carrito`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          producto_id: product.id,
          cantidad: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al agregar producto al carrito');
      }

      await cargarCarrito();
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  // Cambiar cantidad
  const updateQuantity = async (productId, cantidad) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    if (cantidad < 1) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/carrito/${productId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cantidad,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al actualizar cantidad');
      }

      await cargarCarrito();
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/carrito/${productId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al eliminar producto');
      }

      await cargarCarrito();
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setCart([]);
      return;
    }

    try {
      for (const item of cart) {
        await fetch(`${API_URL}/carrito/${item.producto_id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setCart([]);
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
    }
  };

  const limpiarCarritoLocal = () => {
    setCart([]);
  };

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        limpiarCarritoLocal,
        total,
        loading,
        cargarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CartItem from '../../components/cart/CartItem/CartItem';
import Button from '../../components/common/Button/Button';

function Cart() {
  const { cart, removeFromCart, total } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container py-4 text-center">
        <h2>Tu carrito está vacío</h2>
        <Button variant="success" onClick={() => navigate('/products')}>
          Ver productos
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Carrito de compras</h1>

      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={removeFromCart} />
      ))}

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>Total: ${total}</h4>
        <Button variant="dark" onClick={() => navigate('/login')}>
          Ir a pagar
        </Button>
      </div>
    </div>
  );
}

export default Cart;
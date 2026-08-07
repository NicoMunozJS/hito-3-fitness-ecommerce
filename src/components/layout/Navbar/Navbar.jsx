import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';

function Navbar() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        FitStore
      </Link>
      <div className="d-flex gap-3">
        <Link className="nav-link text-white" to="/products">
          Productos
        </Link>
        <Link className="nav-link text-white" to="/cart">
          Carrito ({totalItems})
        </Link>
        <Link className="nav-link text-white" to="/login">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
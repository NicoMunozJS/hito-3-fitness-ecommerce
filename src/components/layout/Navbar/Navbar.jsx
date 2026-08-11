import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';

function Navbar() {
  const { cart, limpiarCarritoLocal } = useContext(CartContext);

  const totalItems = cart.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (!usuarioGuardado) {
      return null;
    }

    try {
      return JSON.parse(usuarioGuardado);
    } catch {
      localStorage.removeItem('usuario');
      return null;
    }
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    // Cerramos la sesión
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    // Limpiamos solamente el carrito visual
    // El carrito permanece guardado en PostgreSQL
    limpiarCarritoLocal();

    setUsuario(null);

    navigate('/login');
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        FitStore
      </Link>

      <div className="d-flex gap-3 align-items-center">
        <Link className="nav-link text-white" to="/products">
          Productos
        </Link>

        <Link className="nav-link text-white" to="/cart">
          Carrito ({totalItems})
        </Link>

        {usuario ? (
          <>
            <span className="nav-link text-white">
              {usuario.email}
            </span>

            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link className="nav-link text-white" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
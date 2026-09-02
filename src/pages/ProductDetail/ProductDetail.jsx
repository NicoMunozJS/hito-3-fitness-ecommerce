import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import Button from '../../components/common/Button/Button';
import Loader from '../../components/common/Loader/Loader';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  if (loading) return <Loader />;

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container py-4 text-center">
        <h2>Producto no encontrado</h2>
        <Button variant="dark" onClick={() => navigate('/products')}>
          Volver a productos
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-5">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="img-fluid rounded product-detail-image"
          />
        </div>

        <div className="col-md-7">
          <h1>{product.nombre}</h1>

          <p className="text-muted">{product.categoria}</p>

          <p>{product.descripcion}</p>

          <p className="fs-4 fw-bold">
            ${Number(product.precio).toLocaleString('es-CL')}
          </p>

          <Button variant="success" onClick={handleAddToCart}>
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
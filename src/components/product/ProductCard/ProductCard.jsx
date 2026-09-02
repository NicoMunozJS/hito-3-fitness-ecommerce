import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card h-100">
      <img
        src={product.imagen}
        className="card-img-top product-image"
        alt={product.nombre}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.nombre}</h5>
        <p className="card-text text-muted">{product.categoria}</p>
        <p className="card-text fw-bold">${product.precio}</p>

        <div className="mt-auto d-flex justify-content-between">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline-dark btn-sm"
          >
            Ver detalle
          </Link>

          <Button
            variant="success"
            onClick={() => onAddToCart(product)}
          >
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
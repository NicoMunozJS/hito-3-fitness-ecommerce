function CartItem({ item, onRemove, onUpdateQuantity }) {
  const handleDecrease = () => {
    if (item.cantidad > 1) {
      onUpdateQuantity(item.producto_id, item.cantidad - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.producto_id, item.cantidad + 1);
  };

  const subtotal = item.precio * item.cantidad;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row align-items-center">

          <div className="col-md-2">
            <img
              src={item.imagen}
              alt={item.nombre}
              className="img-fluid rounded"
            />
          </div>

          <div className="col-md-4">
            <h5>{item.nombre}</h5>

            <p className="mb-1">
              {item.categoria}
            </p>

            <p className="mb-1">
              ${item.precio} c/u
            </p>
          </div>

          <div className="col-md-3">
            <p className="mb-2">
              Cantidad: {item.cantidad}
            </p>

            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleDecrease}
                disabled={item.cantidad <= 1}
              >
                -
              </button>

              <span className="fw-bold">
                {item.cantidad}
              </span>

              <button
                type="button"
                className="btn btn-outline-success"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
          </div>

          <div className="col-md-2">
            <strong>
              ${subtotal}
            </strong>
          </div>

          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => onRemove(item.producto_id)}
            >
              Eliminar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CartItem;
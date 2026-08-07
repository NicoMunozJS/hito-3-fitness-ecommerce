function CartItem({ item, onRemove }) {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-2">
      <div>
        <h6 className="mb-0">{item.nombre}</h6>
        <small className="text-muted">
          Cantidad: {item.cantidad} — ${item.precio} c/u
        </small>
      </div>
      <div className="d-flex align-items-center gap-3">
        <span className="fw-bold">${item.precio * item.cantidad}</span>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => onRemove(item.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default CartItem;
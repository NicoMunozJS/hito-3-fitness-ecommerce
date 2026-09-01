import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

function Home() {
  const { products, loading } = useContext(ProductContext);

  return (
    <div>
      {/* Portada */}
      <section
        className="text-white d-flex align-items-center"
        style={{
          minHeight: "400px",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Todo para tu entrenamiento</h1>

          <p className="lead mb-4">
            Encuentra productos para acompañar tus objetivos fitness.
          </p>

          <Link to="/products" className="btn btn-primary btn-lg">
            Ver productos
          </Link>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="container py-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Productos destacados</h2>

          <p className="text-muted">
            Descubre algunos de nuestros productos
          </p>
        </div>

        {loading ? (
          <p className="text-center">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-center">No hay productos disponibles.</p>
        ) : (
          <div className="row g-4">
            {products.slice(0, 4).map((product) => (
              <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.imagen}
                    className="card-img-top"
                    alt={product.nombre}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.nombre}</h5>

                    <p className="card-text text-muted">
                      {product.categoria}
                    </p>

                    <p className="fw-bold fs-5">
                      ${Number(product.precio).toLocaleString("es-CL")}
                    </p>

                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-outline-primary mt-auto"
                    >
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-5">
          <Link to="/products" className="btn btn-primary">
            Ver todos los productos
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
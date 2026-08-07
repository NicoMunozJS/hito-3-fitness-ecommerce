import ProductCard from '../ProductCard/ProductCard';

function ProductGrid({ products, onAddToCart }) {
  return (
    <div className="row g-3">
      {products.map((product) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
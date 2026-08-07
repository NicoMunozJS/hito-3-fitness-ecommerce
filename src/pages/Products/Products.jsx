import { useContext, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Loader from '../../components/common/Loader/Loader';

function Products() {
  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h1 className="mb-4">Productos</h1>

      <div className="mb-4" style={{ maxWidth: '400px' }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
      )}
    </div>
  );
}

export default Products;
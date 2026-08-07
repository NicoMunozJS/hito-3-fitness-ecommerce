import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';

function Home() {
  const { products, loading } = useContext(ProductContext);
  console.log(products, loading);
  return (
    <div className="container py-4">
      <h1>Home</h1>
    </div>
  );
}

export default Home;
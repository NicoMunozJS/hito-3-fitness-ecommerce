import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="app">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
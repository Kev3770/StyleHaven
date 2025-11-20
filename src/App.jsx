import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import CartPage from './pages/Cart/Cart';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* ScrollToTop se encarga de resetear el scroll en cada cambio de ruta */}
        <ScrollToTop />
        
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<Contact />} />
            {/* Ruta para página no encontrada */}
            <Route path="*" element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-gray-600 mb-8">Página no encontrada</p>
                  <a 
                    href="/" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                  >
                    Volver al Inicio
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
        <Cart />
      </div>
    </Router>
  );
}

export default App;
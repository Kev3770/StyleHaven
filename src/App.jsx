import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 🔥 CONTEXTS (Providers)
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';

// 🎨 LAYOUT COMPONENTS
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';

// 📄 PAGES
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Contact from './pages/Contact/Contact';

// 🎯 SCROLL TO TOP al cambiar de ruta
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    // 🔥 Envolver TODO en los Providers (orden importante)
    <ToastProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          
          {/* 📱 Layout Principal */}
          <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Header fijo */}
            <Header />
            
            {/* Contenido principal */}
            <main className="flex-grow">
              <Routes>
                {/* 🏠 Home */}
                <Route path="/" element={<Home />} />
                
                {/* 🛍️ Productos */}
                <Route path="/products" element={<Products />} />
                
                {/* 📦 Detalle de Producto */}
                <Route path="/product/:id" element={<ProductDetail />} />
                
                {/* 📞 Contacto */}
                <Route path="/contact" element={<Contact />} />
                
                {/* 🚫 404 - Página no encontrada */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {/* Footer */}
            <Footer />
            
            {/* 🛒 Carrito (Modal Global) */}
            <Cart />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ToastProvider>
  );
}

// 🚫 Componente 404
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-black text-white mb-4" style={{
            fontFamily: '"Bebas Neue", sans-serif',
            textShadow: '4px 4px 0 rgba(0,0,0,0.5)'
          }}>
            404
          </h1>
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">
            PÁGINA NO ENCONTRADA
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Lo sentimos, la página que buscas no existe
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/"
            className="bg-white hover:bg-yellow-400 text-slate-900 font-black py-4 px-8 rounded-xl transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
          >
            🏠 Volver al Inicio
          </a>
          <a 
            href="/products"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4 px-8 rounded-xl transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
          >
            🛍️ Ver Productos
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
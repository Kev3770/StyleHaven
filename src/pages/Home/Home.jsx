import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getFeaturedProducts, getProductsByCategory, categories } from '../../data/products';
import { useCart } from '../../hooks/useCart';

import { 
  FaTshirt, 
  FaShoePrints, 
  FaFemale, 
  FaUserTie,
  FaTruck,
  FaExchangeAlt,
  FaShieldAlt,
  FaHeadset,
  FaStar,
  FaArrowRight,
  FaFire,
  FaTag
} from 'react-icons/fa';

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getProductsByCategory('camisas').slice(0, 4);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 'M', 1);
  };

  const categoryIcons = {
    camisas: <FaTshirt className="text-4xl mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
    pantalones: <FaTshirt className="text-4xl mb-4 text-green-600 group-hover:scale-110 transition-transform duration-300" />,
    zapatos: <FaShoePrints className="text-4xl mb-4 text-amber-600 group-hover:scale-110 transition-transform duration-300" />,
    sueters: <FaTshirt className="text-4xl mb-4 text-purple-600 group-hover:scale-110 transition-transform duration-300" />,
    vestidos: <FaFemale className="text-4xl mb-4 text-pink-600 group-hover:scale-110 transition-transform duration-300" />,
    chaquetas: <FaUserTie className="text-4xl mb-4 text-gray-700 group-hover:scale-110 transition-transform duration-300" />,
    faldas: <FaFemale className="text-4xl mb-4 text-red-600 group-hover:scale-110 transition-transform duration-300" />,
    blazers: <FaUserTie className="text-4xl mb-4 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section Mejorado */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="text-center text-white">
            <div className="inline-block mb-6">
              <span className="bg-white bg-opacity-20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white border-opacity-30">
                ✨ Nueva Colección 2024
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Bienvenido a<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200">
                STYLE HAVEN
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100 font-light">
              Descubre las últimas tendencias en moda con estilo y calidad. 
              <br className="hidden md:block" />
              Tu destino perfecto para looks únicos que reflejan tu personalidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="group bg-white text-indigo-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-2xl hover:shadow-pink-500/50 hover:scale-105"
              >
                Ver Colección
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/products?filter=discount" 
                className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 inline-flex items-center justify-center gap-3 backdrop-blur-sm"
              >
                <FaFire className="text-yellow-300 group-hover:text-orange-500" />
                Ofertas Hot
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías Modernas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Categorías</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 mt-2">
              Explora Tu Estilo
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Encuentra tu look perfecto en nuestras colecciones exclusivas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link 
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 cursor-pointer block hover:scale-105 border border-gray-200 hover:border-indigo-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  {categoryIcons[category.id] || <FaTshirt className="text-4xl mb-4 text-gray-600 mx-auto" />}
                  <h3 className="font-bold text-gray-900 mb-1 text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} productos</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-4">
              <FaStar className="text-yellow-500" />
              <span className="font-semibold text-sm">Top Picks</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Lo más popular de nuestra colección, seleccionado especialmente para ti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/products"
              className="group inline-flex items-center gap-3 bg-gray-900 hover:bg-indigo-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              Ver Toda la Colección
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner de Ofertas Vibrante */}
      <section className="relative py-24 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-6">
            <FaFire className="text-yellow-300 animate-pulse" />
            <span className="font-bold">Oferta por Tiempo Limitado</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl">
            Hasta 50% OFF
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-white font-light">
            No te pierdas nuestras ofertas especiales en productos seleccionados
          </p>
          <Link 
            to="/products?filter=discount"
            className="group inline-flex items-center gap-3 bg-white text-red-600 hover:bg-yellow-300 hover:text-red-700 font-black py-5 px-12 rounded-full text-lg transition-all duration-300 shadow-2xl hover:scale-110 hover:shadow-yellow-300/50"
          >
            <FaTag className="group-hover:rotate-12 transition-transform" />
            Comprar Ahora
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Beneficios Premium */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="group text-center p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/50">
                <FaTruck className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Envío Gratis</h3>
              <p className="text-gray-400">En compras superiores a $50.000</p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/50">
                <FaExchangeAlt className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Devoluciones Fáciles</h3>
              <p className="text-gray-400">30 días para cambiar de opinión</p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-500/50">
                <FaShieldAlt className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Pago Seguro</h3>
              <p className="text-gray-400">Transacciones 100% protegidas</p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/50">
                <FaHeadset className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Soporte 24/7</h3>
              <p className="text-gray-400">Estamos aquí para ayudarte</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
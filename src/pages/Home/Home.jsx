import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getFeaturedProducts, getProductsByCategory, categories } from '../../data/products';
import { useCart } from '../../hooks/useCart';

// Importar SOLO iconos que existen en react-icons/fa
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
  FaFire
} from 'react-icons/fa';

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getProductsByCategory('camisas').slice(0, 4);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 'M', 1);
  };

  // Mapeo de categorías a iconos existentes
  const categoryIcons = {
    camisas: <FaTshirt className="text-3xl mb-3 text-blue-600 mx-auto" />,
    pantalones: <FaTshirt className="text-3xl mb-3 text-green-600 mx-auto" />,
    zapatos: <FaShoePrints className="text-3xl mb-3 text-amber-600 mx-auto" />,
    sueters: <FaTshirt className="text-3xl mb-3 text-purple-600 mx-auto" />,
    vestidos: <FaFemale className="text-3xl mb-3 text-pink-600 mx-auto" />,
    chaquetas: <FaUserTie className="text-3xl mb-3 text-gray-600 mx-auto" />,
    faldas: <FaFemale className="text-3xl mb-3 text-red-600 mx-auto" />,
    blazers: <FaUserTie className="text-3xl mb-3 text-indigo-600 mx-auto" />
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Bienvenido a <span className="text-blue-600">STYLE HAVEN</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre las últimas tendencias en moda con estilo y calidad. 
            Tu destino perfecto para looks únicos que reflejan tu personalidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-200 text-center flex items-center justify-center gap-2"
            >
              Ver Colección
              <FaArrowRight className="text-sm" />
            </Link>
            <Link 
              to="/products?filter=discount" 
              className="border-2 border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 font-semibold py-3 px-8 rounded-lg text-lg transition duration-200 text-center flex items-center justify-center gap-2"
            >
              <FaFire className="text-orange-500" />
              Ofertas Especiales
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Explora Categorías
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Encuentra tu estilo perfecto en nuestras diversas categorías
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link 
                key={category.id}
                to={`/products?category=${category.id}`}
                className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer block hover:transform hover:-translate-y-1 border border-transparent hover:border-blue-200"
              >
                {categoryIcons[category.id] || <FaTshirt className="text-3xl mb-3 text-gray-600 mx-auto" />}
                <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} productos</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <FaStar className="text-yellow-500" />
              Productos Destacados
              <FaStar className="text-yellow-500" />
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Descubre nuestros productos más populares y las últimas novedades
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
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 inline-block flex items-center gap-2 mx-auto"
            >
              Ver Todos los Productos
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* Nueva Colección */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nueva Colección
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Lo último en tendencias de moda, recién llegado a STYLE HAVEN
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Banner de Ofertas */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4">
            <FaFire className="text-yellow-300" />
            Hasta 50% de Descuento
            <FaFire className="text-yellow-300" />
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Aprovecha nuestras ofertas especiales por tiempo limitado
          </p>
          <Link 
            to="/products?filter=discount"
            className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition duration-200 inline-block flex items-center gap-2 mx-auto"
          >
            <FaFire className="text-orange-500" />
            Ver Ofertas
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <FaTruck className="text-4xl mb-4 text-green-400 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Envío Gratis</h3>
              <p className="text-gray-300">En compras superiores a $50.000</p>
            </div>
            <div className="text-center">
              <FaExchangeAlt className="text-4xl mb-4 text-blue-400 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Devoluciones Fáciles</h3>
              <p className="text-gray-300">30 días para cambiar de opinión</p>
            </div>
            <div className="text-center">
              <FaShieldAlt className="text-4xl mb-4 text-yellow-400 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Pago Seguro</h3>
              <p className="text-gray-300">Transacciones 100% protegidas</p>
            </div>
            <div className="text-center">
              <FaHeadset className="text-4xl mb-4 text-purple-400 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Soporte 24/7</h3>
              <p className="text-gray-300">Estamos aquí para ayudarte</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
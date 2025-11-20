import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getFeaturedProducts, getProductsByCategory, categories } from '../../data/products';
import { useCart } from '../../hooks/useCart';

import { 
  FaTshirt, 
  FaShoePrints, 
  FaUserTie,
  FaTruck,
  FaExchangeAlt,
  FaShieldAlt,
  FaHeadset,
  FaArrowRight,
  FaFire,
  FaBolt,
  FaMedal,
  FaAward,
  FaGem
} from 'react-icons/fa';
import { GiRunningShoe, GiClothes, GiLargeDress } from 'react-icons/gi';

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getProductsByCategory('camisas').slice(0, 4);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 'M', 1);
  };

  const categoryIcons = {
    camisas: <FaTshirt className="text-5xl mb-4 text-slate-700 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300" />,
    pantalones: <GiClothes className="text-5xl mb-4 text-slate-700 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300" />,
    zapatos: <GiRunningShoe className="text-5xl mb-4 text-slate-700 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300" />,
    sueters: <GiLargeDress className="text-5xl mb-4 text-slate-700 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300" />,
    chaquetas: <FaUserTie className="text-5xl mb-4 text-slate-700 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300" />,
    blazers: <FaUserTie className="text-5xl mb-4 text-slate-700 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300" />,
    accesorios: <FaGem className="text-5xl mb-4 text-slate-700 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300" />
  };

  return (
    <div className="bg-slate-50">
      {/* Hero Section - Estilo Masculino 2025 */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }}></div>
        </div>
        
        {/* Efectos de luz */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-md text-indigo-300 text-sm font-bold px-5 py-2.5 rounded-full border border-indigo-400/30 mb-8">
              <FaBolt className="text-yellow-400" />
              COLECCIÓN PRIMAVERA 2025
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none text-white">
              ESTILO<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                AMERICANO
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-slate-300 font-light max-w-2xl">
              Ropa masculina de calidad premium. Desde el campus hasta la oficina, 
              define tu estilo con piezas atemporales y modernas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-black py-5 px-10 rounded-xl text-lg transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/30 hover:scale-105"
              >
                EXPLORAR COLECCIÓN
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link 
                to="/products?filter=discount" 
                className="group bg-slate-800/50 backdrop-blur-md border-2 border-slate-600 hover:border-indigo-500 text-white font-black py-5 px-10 rounded-xl text-lg transition-all duration-300 inline-flex items-center justify-center gap-3 hover:scale-105"
              >
                <FaFire className="text-orange-500" />
                OFERTAS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destacados con estilo minimalista */}
      <section className="py-12 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FaTruck />, text: "Envío Gratis +$50K" },
              { icon: <FaShieldAlt />, text: "Compra Segura 100%" },
              { icon: <FaExchangeAlt />, text: "Devolución 30 Días" },
              { icon: <FaHeadset />, text: "Soporte Premium" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                <div className="text-2xl text-indigo-400">{item.icon}</div>
                <span className="font-semibold text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías - Grid Moderno */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">CATEGORÍAS</span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 mt-3">
              Encuentra Tu Estilo
            </h2>
            <p className="text-slate-600 text-xl">
              Explora nuestra selección curada de piezas esenciales para el hombre moderno
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 7).map((category) => (
              <Link 
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative bg-slate-100 hover:bg-slate-900 rounded-2xl p-8 text-center transition-all duration-500 cursor-pointer block border-2 border-slate-200 hover:border-indigo-500 overflow-hidden"
              >
                <div className="relative z-10 transition-all duration-500">
                  {categoryIcons[category.id] || <FaTshirt className="text-5xl mb-4 text-slate-700 mx-auto" />}
                  <h3 className="font-black text-slate-900 group-hover:text-white mb-1 text-xl transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 group-hover:text-slate-300 font-semibold transition-colors">
                    {category.count} productos
                  </p>
                </div>
                
                {/* Efecto hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados - Layout Premium */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <FaMedal className="text-3xl text-yellow-500" />
                <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">LO MEJOR</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900">
                Productos Premium
              </h2>
            </div>
            <Link 
              to="/products"
              className="hidden md:flex items-center gap-2 text-slate-700 hover:text-indigo-600 font-bold transition-colors group"
            >
              Ver Todo
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link 
              to="/products"
              className="inline-flex items-center gap-3 bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Ver Toda la Colección
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner de Ofertas - Diseño Bold */}
      <section className="relative py-24 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(79, 70, 229, 0.1) 50px, rgba(79, 70, 229, 0.1) 100px)'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-orange-500/20 backdrop-blur-md text-orange-300 px-6 py-3 rounded-full mb-8 border border-orange-400/30">
              <FaFire className="text-2xl animate-pulse" />
              <span className="font-black text-lg">REBAJAS DE TEMPORADA</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-white mb-6 leading-none">
              HASTA
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                -50%
              </span>
            </h2>
            
            <p className="text-xl text-slate-300 mb-10 font-light">
              Descuentos exclusivos en piezas seleccionadas. Stock limitado.
            </p>
            
            <Link 
              to="/products?filter=discount"
              className="group inline-flex items-center gap-4 bg-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-slate-900 hover:text-white font-black py-6 px-12 rounded-xl text-xl transition-all duration-300 shadow-2xl hover:scale-110"
            >
              <FaBolt className="text-2xl" />
              VER OFERTAS
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos - Diseño Industrial */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaAward className="text-4xl text-indigo-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Garantía Premium
            </h2>
            <p className="text-slate-400 text-lg">
              Compromiso con la calidad y tu satisfacción
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaTruck />,
                title: "Envío Express",
                desc: "Gratis en pedidos +$50.000",
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: <FaExchangeAlt />,
                title: "Cambios Fáciles",
                desc: "30 días sin preguntas",
                gradient: "from-blue-500 to-cyan-600"
              },
              {
                icon: <FaShieldAlt />,
                title: "Pago Seguro",
                desc: "Encriptación SSL/TLS",
                gradient: "from-yellow-500 to-orange-600"
              },
              {
                icon: <FaHeadset />,
                title: "Soporte 24/7",
                desc: "Asistencia en línea",
                gradient: "from-purple-500 to-pink-600"
              }
            ].map((item, index) => (
              <div key={index} className="group bg-slate-800 hover:bg-slate-700 rounded-2xl p-8 text-center transition-all duration-300 border border-slate-700 hover:border-indigo-500">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                  <div className="text-3xl text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-black mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-slate-400 font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
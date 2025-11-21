import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero'; // 🔥 NUEVO HERO
import ProductCard from '../../components/ProductCard/ProductCard';
import { getFeaturedProducts, getProductsByCategory, categories } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext'; // 🔥 NUEVO

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
  FaGem,
  FaStar,
  FaCrown
} from 'react-icons/fa';
import { GiRunningShoe, GiClothes, GiLargeDress } from 'react-icons/gi';

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getProductsByCategory('camisas').slice(0, 4);
  const { addToCart } = useCart();
  const toast = useToast(); // 🔥 NUEVO

  // 🔥 MEJORADO: Con notificaciones
  const handleAddToCart = (product) => {
    const result = addToCart(product, 'M', 1);
    if (result.success) {
      toast.addedToCart(product.name);
    } else {
      toast.outOfStock();
    }
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
      {/* 🔥 NUEVO HERO SECTION */}
      <Hero />

      {/* Destacados - Estilo Minimalista Premium */}
      <section className="py-12 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { 
                icon: <FaTruck />, 
                text: "Envío Gratis +$50K",
                color: "text-green-400"
              },
              { 
                icon: <FaShieldAlt />, 
                text: "Compra Segura 100%",
                color: "text-blue-400"
              },
              { 
                icon: <FaExchangeAlt />, 
                text: "Devolución 30 Días",
                color: "text-yellow-400"
              },
              { 
                icon: <FaHeadset />, 
                text: "Soporte Premium",
                color: "text-purple-400"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row items-center gap-3 text-slate-300 hover:text-white transition-all group cursor-pointer"
              >
                <div className={`text-3xl ${item.color} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className="font-semibold text-sm text-center md:text-left">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías - Grid Moderno Estilo Americano */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold text-sm mb-4">
              <FaStar className="text-yellow-500" />
              CATEGORÍAS
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4" style={{
              fontFamily: '"Bebas Neue", "Impact", sans-serif'
            }}>
              ENCUENTRA TU ESTILO
            </h2>
            <p className="text-slate-600 text-xl font-light">
              Explora nuestra selección curada de piezas esenciales para el hombre moderno
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category) => (
              <Link 
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-900 hover:to-slate-800 rounded-2xl p-8 text-center transition-all duration-500 cursor-pointer block border-2 border-slate-200 hover:border-yellow-400 overflow-hidden hover:scale-105"
              >
                {/* Icono */}
                <div className="relative z-10 transition-all duration-500">
                  <div className="mx-auto w-20 h-20 mb-4 flex items-center justify-center">
                    {categoryIcons[category.id] || <FaTshirt className="text-5xl text-slate-700 group-hover:text-yellow-400 transition-colors" />}
                  </div>
                  <h3 className="font-black text-slate-900 group-hover:text-white mb-1 text-xl transition-colors" style={{
                    fontFamily: '"Bebas Neue", sans-serif'
                  }}>
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 group-hover:text-slate-300 font-semibold transition-colors">
                    {category.count} productos
                  </p>
                </div>
                
                {/* Número decorativo estilo varsity */}
                <div className="absolute top-4 right-4 text-6xl font-black text-slate-200 group-hover:text-slate-700 opacity-20 transition-all" style={{
                  fontFamily: '"Bebas Neue", sans-serif'
                }}>
                  {String(categories.indexOf(category) + 1).padStart(2, '0')}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados - Layout Premium */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-3">
                <FaCrown className="text-4xl text-yellow-500" />
                <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">
                  LO MEJOR
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900" style={{
                fontFamily: '"Bebas Neue", sans-serif'
              }}>
                PRODUCTOS PREMIUM
              </h2>
              <p className="text-slate-600 text-lg mt-2">
                Nuestra selección exclusiva de piezas destacadas
              </p>
            </div>
            <Link 
              to="/products"
              className="group flex items-center gap-2 text-slate-700 hover:text-indigo-600 font-black transition-colors bg-white px-6 py-3 rounded-xl border-2 border-slate-200 hover:border-indigo-500 hover:scale-105 transition-all"
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

      {/* Banner de Ofertas - Diseño Bold Americano */}
      <section className="relative py-24 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 overflow-hidden">
        {/* Patrón decorativo */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255, 255, 255, 0.1) 50px, rgba(255, 255, 255, 0.1) 100px)'
          }}></div>
        </div>
        
        {/* Formas decorativas estilo retro */}
        <div className="absolute top-10 left-10 w-32 h-32 border-8 border-white/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-40 h-40 border-8 border-white/20 transform rotate-45" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full mb-8 border-2 border-white/30">
              <FaFire className="text-3xl animate-pulse" />
              <span className="font-black text-lg tracking-wider">REBAJAS DE TEMPORADA</span>
            </div>
            
            <h2 className="text-7xl md:text-9xl font-black text-white mb-6 leading-none" style={{
              fontFamily: '"Bebas Neue", sans-serif',
              textShadow: '6px 6px 0 rgba(0,0,0,0.3)'
            }}>
              HASTA
              <span className="block text-yellow-300">
                -50%
              </span>
            </h2>
            
            <p className="text-2xl text-white mb-10 font-bold">
              Descuentos exclusivos en piezas seleccionadas. Stock limitado.
            </p>
            
            <Link 
              to="/products?filter=discount"
              className="group inline-flex items-center gap-4 bg-slate-900 hover:bg-white text-white hover:text-slate-900 font-black py-6 px-12 rounded-xl text-xl transition-all duration-300 shadow-2xl hover:scale-110 border-4 border-white"
            >
              <FaBolt className="text-3xl group-hover:rotate-12 transition-transform" />
              VER OFERTAS AHORA
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos - Diseño Industrial Premium */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaAward className="text-5xl text-yellow-400" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4" style={{
              fontFamily: '"Bebas Neue", sans-serif'
            }}>
              GARANTÍA PREMIUM
            </h2>
            <p className="text-slate-400 text-xl font-light max-w-2xl mx-auto">
              Compromiso con la calidad y tu satisfacción total
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaTruck />,
                title: "Envío Express",
                desc: "Gratis en pedidos +$50.000",
                gradient: "from-green-500 to-emerald-600",
                number: "01"
              },
              {
                icon: <FaExchangeAlt />,
                title: "Cambios Fáciles",
                desc: "30 días sin preguntas",
                gradient: "from-blue-500 to-cyan-600",
                number: "02"
              },
              {
                icon: <FaShieldAlt />,
                title: "Pago Seguro",
                desc: "Encriptación SSL/TLS",
                gradient: "from-yellow-500 to-orange-600",
                number: "03"
              },
              {
                icon: <FaHeadset />,
                title: "Soporte 24/7",
                desc: "Asistencia en línea",
                gradient: "from-purple-500 to-pink-600",
                number: "04"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group relative bg-slate-800 hover:bg-slate-700 rounded-2xl p-8 text-center transition-all duration-300 border-2 border-slate-700 hover:border-yellow-400 overflow-hidden"
              >
                {/* Número decorativo */}
                <div className="absolute top-4 right-4 text-6xl font-black text-slate-700 opacity-30" style={{
                  fontFamily: '"Bebas Neue", sans-serif'
                }}>
                  {item.number}
                </div>
                
                <div className={`relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                  <div className="text-4xl text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-black mb-2 text-white" style={{
                  fontFamily: '"Bebas Neue", sans-serif'
                }}>
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
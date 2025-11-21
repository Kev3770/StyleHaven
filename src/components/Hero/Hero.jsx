import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBolt, 
  FaArrowRight, 
  FaFire, 
  FaStar,
  FaTrophy,
  FaShieldAlt,
  FaTruck,
  FaCrown
} from 'react-icons/fa';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🔥 Slides del Hero con imágenes de Unsplash (ropa masculina americana)
  const slides = [
    {
      id: 1,
      title: "AMERICAN",
      subtitle: "HERITAGE",
      description: "Estilo clásico que nunca pasa de moda",
      image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1200&fit=crop",
      cta: "Explorar Colección",
      ctaLink: "/products",
      badge: "COLECCIÓN 2025",
      accent: "from-navy-600 to-burgundy-700"
    },
    {
      id: 2,
      title: "IVY LEAGUE",
      subtitle: "STYLE",
      description: "Elegancia preppy para el hombre moderno",
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1200&fit=crop",
      cta: "Ver Nuevos Arrivals",
      ctaLink: "/products?filter=new-collection",
      badge: "PREPPY ESSENTIALS",
      accent: "from-blue-700 to-green-800"
    },
    {
      id: 3,
      title: "CLASSIC",
      subtitle: "AMERICAN",
      description: "Calidad premium en cada detalle",
      image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=1200&fit=crop",
      cta: "Ofertas Especiales",
      ctaLink: "/products?filter=discount",
      badge: "HASTA -50% OFF",
      accent: "from-red-700 to-orange-600"
    }
  ];

  // Auto-scroll del carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden min-h-screen">
      {/* 🎯 IMAGEN DE FONDO CON PARALLAX */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              style={{ objectPosition: '50% 40%' }}
            />
            {/* Overlay oscuro para contraste */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
          </div>
        ))}
      </div>

      {/* 🎨 PATRÓN DECORATIVO ESTILO VARSITY */}
      <div className="absolute inset-0 z-10 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            rgba(255,255,255,0.03) 50px,
            rgba(255,255,255,0.03) 100px
          )`
        }} />
      </div>

      {/* ⭐ DECORACIÓN: Líneas diagonales estilo collegiate */}
      <div className="absolute top-0 right-0 w-1/3 h-full z-10">
        <div className="absolute top-0 right-0 w-2 h-64 bg-gradient-to-b from-yellow-500/40 to-transparent transform rotate-12" />
        <div className="absolute top-32 right-12 w-2 h-48 bg-gradient-to-b from-red-500/30 to-transparent transform rotate-12" />
        <div className="absolute top-64 right-24 w-2 h-32 bg-gradient-to-b from-blue-500/30 to-transparent transform rotate-12" />
      </div>

      {/* 📱 CONTENIDO PRINCIPAL */}
      <div className="container mx-auto px-4 py-32 md:py-40 relative z-20 min-h-screen flex items-center">
        <div className="max-w-4xl">
          {/* 🏷️ Badge superior animado */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl text-white text-sm font-black px-6 py-3 rounded-full border-2 border-white/20 mb-8 animate-fadeInDown shadow-2xl">
            <FaBolt className="text-yellow-400 text-lg animate-pulse" />
            <span className="tracking-wider">{currentSlideData.badge}</span>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          </div>
          
          {/* 🎓 TÍTULO PRINCIPAL - Estilo Varsity/Collegiate */}
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-black mb-4 leading-none text-white tracking-tight animate-fadeInUp" style={{
              fontFamily: '"Bebas Neue", "Impact", sans-serif',
              textShadow: '4px 4px 0 rgba(0,0,0,0.5), 8px 8px 20px rgba(0,0,0,0.3)'
            }}>
              {currentSlideData.title}
            </h1>
            
            <h2 className="text-6xl md:text-8xl font-black leading-none animate-fadeInUp" style={{
              fontFamily: '"Bebas Neue", "Impact", sans-serif',
              background: `linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #DC2626 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 80px rgba(252, 211, 77, 0.5)'
            }}>
              {currentSlideData.subtitle}
            </h2>
          </div>
          
          {/* 📝 Descripción */}
          <p className="text-2xl md:text-3xl mb-12 text-slate-200 font-light max-w-2xl animate-fadeInUp" style={{
            animationDelay: '0.2s',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            {currentSlideData.description}
          </p>
          
          {/* 🎯 CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <Link 
              to={currentSlideData.ctaLink}
              className="group bg-white hover:bg-yellow-400 text-slate-900 font-black py-5 px-10 rounded-xl text-lg transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-2xl hover:scale-110 transform hover:rotate-1"
            >
              <FaTrophy className="text-2xl group-hover:scale-125 transition-transform" />
              {currentSlideData.cta}
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <Link 
              to="/products?filter=discount"
              className="group bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black py-5 px-10 rounded-xl text-lg transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-2xl hover:scale-110 border-4 border-white/20"
            >
              <FaFire className="text-2xl animate-pulse" />
              OFERTAS HOT
            </Link>
          </div>

          {/* 📊 Stats - Estilo universitario */}
          <div className="grid grid-cols-3 gap-6 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            {[
              { icon: <FaStar />, value: "500+", label: "Productos Premium" },
              { icon: <FaTrophy />, value: "50K+", label: "Clientes Felices" },
              { icon: <FaShieldAlt />, value: "100%", label: "Calidad Garantizada" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-yellow-400 text-3xl mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-1" style={{
                  fontFamily: '"Bebas Neue", sans-serif'
                }}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-300 font-bold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🎯 INDICADORES DE SLIDES - Estilo minimalista */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-12 h-3 bg-yellow-400 shadow-lg shadow-yellow-400/50' 
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      
    </section>
  );
};

export default Hero;
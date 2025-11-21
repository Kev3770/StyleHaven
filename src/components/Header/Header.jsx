import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { 
  FaSearch, 
  FaUser, 
  FaShoppingCart, 
  FaBars, 
  FaTimes, 
  FaFire, 
  FaTruck,
  FaBolt,
  FaStar,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const Header = () => {
  const { itemCount, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { 
      name: 'Inicio', 
      href: '/',
      icon: null
    },
    { 
      name: 'Productos', 
      href: '/products',
      icon: null
    },
    { 
      name: 'Nueva Colección', 
      href: '/products?filter=new-collection', 
      badge: 'NEW', 
      icon: <FaBolt className="text-yellow-400" />,
      special: true
    },
    { 
      name: 'Ofertas', 
      href: '/products?filter=discount', 
      badge: 'HOT', 
      icon: <FaFire className="text-orange-400" />,
      special: true
    },
    { 
      name: 'Contacto', 
      href: '/contact',
      icon: null
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* 🏆 Top Bar - Estilo Campus/Universidad */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-2.5 text-xs font-bold border-b-4 border-yellow-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            {/* Info izquierda */}
            <div className="flex items-center gap-4 text-slate-300">
              <div className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                <FaPhone className="text-green-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="hidden md:flex items-center gap-2 hover:text-yellow-400 transition-colors">
                <FaEnvelope className="text-blue-400" />
                <span>info@stylehaven.com</span>
              </div>
            </div>

            {/* Banner central */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
              <FaTruck className="text-green-400 animate-bounce" />
              <span className="text-yellow-400 font-black tracking-wider">
                ENVÍO GRATIS EN COMPRAS +$50.000
              </span>
              <FaStar className="text-yellow-400" />
            </div>

            {/* Info derecha */}
            <div className="hidden md:flex items-center gap-2 text-slate-300">
              <FaStar className="text-yellow-400" />
              <span className="font-black">PRIMAVERA 2025 DISPONIBLE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🎓 Header Principal - Estilo Collegiate */}
      <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-2xl border-b-4 border-yellow-400' : 'shadow-lg border-b-4 border-slate-200'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* 🏛️ Logo - Estilo Universidad */}
            <Link 
              to="/" 
              className="group flex items-center gap-3"
            >
              <div className="relative">
                {/* Escudo decorativo */}
                <div className="absolute -left-2 -top-2 w-16 h-16 border-4 border-yellow-400 rounded-full opacity-30 group-hover:scale-110 transition-transform" />
                
                <div className="relative">
                  <div className="text-3xl font-black tracking-tighter" style={{
                    fontFamily: '"Bebas Neue", "Impact", sans-serif',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #dc2626 50%, #fbbf24 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '2px 2px 0 rgba(0,0,0,0.1)'
                  }}>
                    STYLE HAVEN
                  </div>
                  <div className="text-[8px] font-black text-slate-600 tracking-widest text-center -mt-1">
                    EST. 2025 • AMERICAN HERITAGE
                  </div>
                </div>
              </div>
            </Link>

            {/* 📚 Navegación Desktop - Estilo Campus */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-5 py-3 font-black text-sm transition-all duration-300 group ${
                    item.special 
                      ? 'text-slate-900 hover:text-red-600' 
                      : 'text-slate-700 hover:text-blue-900'
                  }`}
                  style={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.05em' }}
                >
                  <span className="flex items-center gap-2">
                    {item.icon && <span className="text-lg">{item.icon}</span>}
                    {item.name}
                    {item.badge && (
                      <span className={`text-[10px] px-2 py-1 rounded-full font-black border-2 ${
                        item.badge === 'HOT' 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white border-red-600 shadow-lg shadow-red-500/50 animate-pulse' 
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-600 shadow-lg shadow-green-500/50'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </span>
                  
                  {/* Underline animado estilo varsity */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 ${
                    item.special ? 'bg-red-600' : 'bg-blue-900'
                  } group-hover:w-4/5 transition-all duration-500 rounded-full`} />
                  
                  {/* Highlight background */}
                  <div className={`absolute inset-0 ${
                    item.special 
                      ? 'bg-gradient-to-r from-red-500/0 to-orange-500/0 group-hover:from-red-500/10 group-hover:to-orange-500/10' 
                      : 'bg-blue-900/0 group-hover:bg-blue-900/5'
                  } rounded-xl transition-all duration-300`} />
                </Link>
              ))}
            </nav>

            {/* 🎯 Iconos de Acción - Estilo Premium */}
            <div className="flex items-center space-x-2">
              {/* Buscador */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-3 rounded-xl transition-all duration-300 font-bold ${
                  isSearchOpen 
                    ? 'bg-blue-900 text-white scale-110' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-blue-900 border-2 border-transparent hover:border-blue-900'
                }`}
              >
                <FaSearch className="text-lg" />
              </button>

              {/* Cuenta */}
              <Link 
                to="/account" 
                className="hidden sm:flex p-3 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-blue-900 border-2 border-transparent hover:border-blue-900 transition-all duration-300"
              >
                <FaUser className="text-lg" />
              </Link>

              {/* Carrito con badge especial */}
              <button 
                onClick={toggleCart}
                className="relative p-3 rounded-xl text-slate-700 hover:bg-yellow-400 hover:text-slate-900 border-2 border-transparent hover:border-yellow-500 transition-all duration-300 group hover:scale-110"
              >
                <FaShoppingCart className="text-lg group-hover:animate-bounce" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-black rounded-full h-6 w-6 flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Menú Mobile */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-blue-900 border-2 border-transparent hover:border-blue-900 transition-all duration-300"
              >
                {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>

          {/* 🔍 Barra de Búsqueda Expandible */}
          {isSearchOpen && (
            <div className="py-4 border-t-2 border-slate-200" style={{
              animation: 'slideDown 0.3s ease-out'
            }}>
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar camisas Oxford, chinos, blazers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full px-6 py-4 pl-14 pr-12 bg-slate-50 border-4 border-slate-200 focus:border-blue-900 rounded-2xl focus:outline-none text-slate-900 font-bold placeholder-slate-400"
                  />
                  <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl" />
                  <button 
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-red-600 p-2 rounded-xl hover:bg-slate-100 transition-all"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="flex justify-center gap-2 mt-3">
                  {['Camisas', 'Zapatos', 'Pantalones', 'Ofertas'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSearchQuery(tag)}
                      className="text-xs text-slate-600 hover:text-white hover:bg-blue-900 px-4 py-2 rounded-full border-2 border-slate-300 hover:border-blue-900 transition-all font-bold"
                      style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </form>
            </div>
          )}

          {/* 📱 Menú Mobile */}
          {isMenuOpen && (
            <div className="lg:hidden border-t-2 border-slate-200 py-4 bg-white" style={{
              animation: 'slideDown 0.3s ease-out'
            }}>
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center justify-between px-4 py-4 ${
                      item.special 
                        ? 'bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border-l-4 border-red-600' 
                        : 'text-slate-700 hover:bg-slate-50 border-l-4 border-transparent hover:border-blue-900'
                    } font-black rounded-xl transition-all group`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon && <span className="text-2xl">{item.icon}</span>}
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className={`text-xs px-3 py-1 rounded-full font-black ${
                        item.badge === 'HOT' 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
                
                {/* Items adicionales mobile */}
                <div className="border-t-2 border-slate-200 my-2" />
                
                <Link 
                  to="/account" 
                  className="flex items-center gap-3 px-4 py-4 text-slate-700 hover:bg-slate-50 font-black rounded-xl transition-all border-l-4 border-transparent hover:border-blue-900 sm:hidden"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                >
                  <FaUser className="text-xl" />
                  <span>Mi Cuenta</span>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Agregar los estilos CSS globalmente */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;
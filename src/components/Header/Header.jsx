import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { 
  FaSearch, 
  FaUser, 
  FaShoppingCart, 
  FaBars, 
  FaTimes, 
  FaFire, 
  FaTruck,
  FaBolt,
  FaGem,
  FaCrown
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
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/products' },
    { name: 'Colección 2025', href: '/products?filter=new-collection', badge: 'New', icon: <FaBolt className="text-yellow-400" /> },
    { name: 'Ofertas', href: '/products?filter=discount', badge: 'Hot', icon: <FaFire className="text-orange-400" /> },
    { name: 'Contacto', href: '/contact' }
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
      {/* Banner Superior - Estilo Premium */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-slate-300 py-3 text-center text-sm font-bold border-b border-slate-700">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <FaTruck className="text-indigo-400 text-base" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            <strong>ENVÍO GRATIS</strong> EN COMPRAS +$50.000
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">COLECCIÓN PRIMAVERA 2025 DISPONIBLE</span>
        </div>
      </div>

      {/* Header Principal */}
      <header className={`bg-slate-900 sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled ? 'shadow-2xl shadow-slate-900/50 border-b border-slate-800' : 'border-b border-slate-800'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="group flex items-center gap-3"
            >
              <div className="relative">
                <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-500">
                  STYLEHAVEN
                </div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-500"></div>
              </div>
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full opacity-60"></div>
            </Link>

            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative px-5 py-3 text-slate-300 hover:text-white font-bold transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    {item.icon && <span>{item.icon}</span>}
                    {item.name}
                    {item.badge && (
                      <span className={`text-xs px-2 py-1 rounded-full font-black ${
                        item.badge === 'Hot' 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' 
                          : item.badge === 'Lux'
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 shadow-lg shadow-yellow-500/30'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-4/5 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300"></div>
                </Link>
              ))}
            </nav>

            {/* Iconos de Acción */}
            <div className="flex items-center space-x-3">
              {/* Buscador */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-3 rounded-xl transition-all duration-300 backdrop-blur-md ${
                  isSearchOpen 
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-700'
                }`}
              >
                <FaSearch className="text-xl" />
              </button>

              {/* Cuenta */}
              <Link 
                to="/account" 
                className="hidden sm:block p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-all duration-300"
              >
                <FaUser className="text-xl" />
              </Link>

              {/* Carrito */}
              <button 
                onClick={toggleCart}
                className="relative p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-indigo-500/50 transition-all duration-300 group"
              >
                <FaShoppingCart className="text-xl group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black rounded-full h-6 w-6 flex items-center justify-center shadow-lg shadow-red-500/50 border border-red-400/30">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Menú Mobile */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-all duration-300"
              >
                {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>

          {/* Barra de Búsqueda Expandible */}
          {isSearchOpen && (
            <div className="py-4 border-t border-slate-800 animate-slideDown">
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos, categorías, colecciones..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full px-6 py-4 pl-14 pr-12 bg-slate-800 border-2 border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white font-medium placeholder-slate-400 backdrop-blur-md"
                  />
                  <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl" />
                  <button 
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-700 transition-all"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="flex justify-center gap-3 mt-3">
                  {['Camisas', 'Zapatos', 'Pantalones', 'Ofertas'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSearchQuery(tag)}
                      className="text-xs text-slate-400 hover:text-indigo-300 hover:bg-slate-800 px-3 py-1 rounded-full border border-slate-700 hover:border-indigo-500/50 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </form>
            </div>
          )}

          {/* Menú Mobile */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-slate-800 py-4 animate-slideDown bg-slate-900/95 backdrop-blur-md rounded-b-2xl">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center justify-between px-4 py-4 text-slate-300 hover:text-white hover:bg-slate-800/50 font-bold rounded-xl transition-all border border-transparent hover:border-slate-700 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon && <span>{item.icon}</span>}
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className={`text-xs px-2 py-1 rounded-full font-black ${
                        item.badge === 'Hot' 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                          : item.badge === 'Lux'
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                ))}
                
                {/* Separador */}
                <div className="border-t border-slate-800 my-2"></div>
                
                {/* Items adicionales para mobile */}
                <Link 
                  to="/account" 
                  className="flex items-center gap-3 px-4 py-4 text-slate-300 hover:text-white hover:bg-slate-800/50 font-bold rounded-xl transition-all border border-transparent hover:border-slate-700 sm:hidden group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUser />
                  <span>Mi Cuenta</span>
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ml-auto"></div>
                </Link>
                <button 
                  onClick={() => {
                    toggleCart();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-4 py-4 text-slate-300 hover:text-white hover:bg-slate-800/50 font-bold rounded-xl transition-all border border-transparent hover:border-slate-700 sm:hidden w-full group"
                >
                  <span className="flex items-center gap-3">
                    <FaShoppingCart />
                    Ver Carrito
                  </span>
                  <div className="flex items-center gap-2">
                    {itemCount > 0 && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black px-2 py-1 rounded-full border border-red-400/30">
                        {itemCount}
                      </span>
                    )}
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <style jsx>{`
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
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes, FaFire, FaTruck } from 'react-icons/fa';

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
    { name: 'Nueva Colección', href: '/products?category=nuevo', badge: 'New' },
    { name: 'Ofertas', href: '/products?filter=discount', badge: 'Hot', icon: <FaFire /> },
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
      {/* Banner Superior */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-2 text-center text-sm font-medium">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2 animate-pulse">
          <FaTruck className="text-base" />
          <span><strong>Envío GRATIS</strong> en compras superiores a $50.000 🎉</span>
        </div>
      </div>

      {/* Header Principal */}
      <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-sm border-b border-gray-100'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="group flex items-center gap-2"
            >
              <div className="relative">
                <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                  STYLE HAVEN
                </div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
              </div>
            </Link>

            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative px-4 py-2 text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-200 group"
                >
                  <span className="flex items-center gap-2">
                    {item.icon && <span className="text-orange-500">{item.icon}</span>}
                    {item.name}
                    {item.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        item.badge === 'Hot' 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse' 
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </nav>

            {/* Iconos de Acción */}
            <div className="flex items-center space-x-2">
              {/* Buscador */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isSearchOpen 
                    ? 'bg-indigo-100 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'
                }`}
              >
                <FaSearch className="text-xl" />
              </button>

              {/* Cuenta */}
              <Link 
                to="/account" 
                className="hidden sm:block p-3 rounded-full text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-300"
              >
                <FaUser className="text-xl" />
              </Link>

              {/* Carrito */}
              <button 
                onClick={toggleCart}
                className="relative p-3 rounded-full text-gray-600 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-600 transition-all duration-300 group"
              >
                <FaShoppingCart className="text-xl group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-bounce">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Menú Mobile */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 rounded-full text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-300"
              >
                {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>

          {/* Barra de Búsqueda Expandible */}
          {isSearchOpen && (
            <div className="py-4 border-t border-gray-100 animate-slideDown">
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos, categorías..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full px-6 py-4 pl-14 pr-12 border-2 border-indigo-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-800 font-medium placeholder-gray-500"
                  />
                  <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-indigo-400 text-xl" />
                  <button 
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-white transition-all"
                  >
                    <FaTimes />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Menú Mobile */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4 animate-slideDown">
              <nav className="flex flex-col space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 font-semibold rounded-xl transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <span className="text-orange-500">{item.icon}</span>}
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                        item.badge === 'Hot' 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
                
                {/* Separador */}
                <div className="border-t border-gray-200 my-2"></div>
                
                {/* Items adicionales para mobile */}
                <Link 
                  to="/account" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 font-semibold rounded-xl transition-all sm:hidden"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUser />
                  Mi Cuenta
                </Link>
                <button 
                  onClick={() => {
                    toggleCart();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 font-semibold rounded-xl transition-all sm:hidden w-full"
                >
                  <span className="flex items-center gap-3">
                    <FaShoppingCart />
                    Ver Carrito
                  </span>
                  {itemCount > 0 && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {itemCount}
                    </span>
                  )}
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
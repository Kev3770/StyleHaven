import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { itemCount, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/products' },
    { name: 'Nueva Colección', href: '/products?category=nuevo' },
    { name: 'Ofertas', href: '/products?filter=discount' },
    { name: 'Contacto', href: '/contact' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Header Principal */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              STYLE HAVEN
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Iconos de Acción */}
          <div className="flex items-center space-x-4">
            {/* Buscador */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaSearch className="text-xl" />
            </button>

            {/* Cuenta */}
            <Link 
              to="/account" 
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors hidden sm:block"
            >
              <FaUser className="text-xl" />
            </Link>

            {/* Carrito */}
            <button 
              onClick={toggleCart}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
            >
              <FaShoppingCart className="text-xl" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Menú Mobile */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors md:hidden"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Barra de Búsqueda Expandible */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200">
            <form onSubmit={handleSearchSubmit} className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
              <button 
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </form>
          </div>
        )}

        {/* Menú Mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Items adicionales para mobile */}
              <Link 
                to="/account" 
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors sm:hidden flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUser className="text-sm" />
                Mi Cuenta
              </Link>
              <Link 
                to="/cart" 
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors sm:hidden flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaShoppingCart className="text-sm" />
                Ver Carrito ({itemCount})
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Banner de Envío Gratis */}
      <div className="bg-blue-600 text-white py-2 text-center text-sm flex items-center justify-center gap-2">
        <FaShoppingCart className="text-sm" />
        <strong>Envío gratis</strong> en compras superiores a $50.000
      </div>
    </header>
  );
};

export default Header;
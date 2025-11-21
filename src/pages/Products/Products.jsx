import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, categories, getProductsByCategory, searchProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { 
  FaSearch, 
  FaFire, 
  FaStar, 
  FaGift, 
  FaFilter, 
  FaTimes,
  FaArrowRight,
  FaBolt,
  FaMedal,
  FaAward,
  FaTrophy,
  FaCrown
} from 'react-icons/fa';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevant');
  const { addToCart } = useCart();
  const toast = useToast();

  const categoryFromUrl = searchParams.get('category');
  const searchFromUrl = searchParams.get('search');
  const filterFromUrl = searchParams.get('filter');

  useEffect(() => {
    let result = products;

    if (categoryFromUrl && categoryFromUrl !== 'all') {
      result = getProductsByCategory(categoryFromUrl);
      setSelectedCategory(categoryFromUrl);
    }

    if (searchFromUrl) {
      result = searchProducts(searchFromUrl);
      setSearchQuery(searchFromUrl);
    }

    if (filterFromUrl === 'discount') {
      result = result.filter(product => product.discount > 0);
    }
    
    if (filterFromUrl === 'new-collection') {
      result = result.filter(product => product.isNewCollection);
    }

    // Aplicar ordenamiento
    result = sortProducts(result, sortBy);

    setFilteredProducts(result);
  }, [categoryFromUrl, searchFromUrl, filterFromUrl, sortBy]);

  const sortProducts = (productList, sortType) => {
    const sorted = [...productList];
    switch(sortType) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-az':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-za':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'discount':
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return sorted;
    }
  };

  const handleAddToCart = (product) => {
    const result = addToCart(product, 'M', 1);
    if (result.success) {
      toast.addedToCart(product.name);
    } else {
      toast.outOfStock();
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(sortProducts(products, sortBy));
    } else {
      setFilteredProducts(sortProducts(getProductsByCategory(category), sortBy));
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setFilteredProducts(sortProducts(searchProducts(e.target.value), sortBy));
    } else {
      setFilteredProducts(sortProducts(products, sortBy));
    }
  };

  const getActiveFilterText = () => {
    if (filterFromUrl === 'discount') return 'OFERTAS ESPECIALES';
    if (filterFromUrl === 'new-collection') return 'COLECCIÓN 2025';
    if (categoryFromUrl && categoryFromUrl !== 'all') {
      const cat = categories.find(c => c.id === categoryFromUrl);
      return cat ? cat.name.toUpperCase() : 'TODOS LOS PRODUCTOS';
    }
    return 'TODOS LOS PRODUCTOS';
  };

  const getFilterIcon = () => {
    if (filterFromUrl === 'discount') return <FaFire className="text-orange-500" />;
    if (filterFromUrl === 'new-collection') return <FaBolt className="text-yellow-500" />;
    return <FaTrophy className="text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 🎯 Hero Banner - Estilo Collegiate */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden border-b-4 border-yellow-400">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white text-sm font-black px-6 py-3 rounded-full border-2 border-white/20 mb-6">
              {getFilterIcon()}
              <span className="tracking-wider">{getActiveFilterText()}</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-4 leading-none text-white" style={{
              fontFamily: '"Bebas Neue", sans-serif',
              textShadow: '4px 4px 0 rgba(0,0,0,0.5)'
            }}>
              EXPLORA
              <span className="block text-yellow-400">
                NUESTRA TIENDA
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-slate-200 font-light max-w-2xl">
              Descubre {filteredProducts.length} productos premium seleccionados para el hombre moderno
            </p>
            
            <Link 
              to="/"
              className="inline-flex items-center gap-3 bg-white hover:bg-yellow-400 text-slate-900 font-black py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl"
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            >
              ← Volver al Inicio
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 📱 Sidebar de filtros - Desktop */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border-4 border-slate-200">
              {/* Búsqueda */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FaSearch className="text-blue-900 text-xl" />
                  <h3 className="font-black text-slate-900 text-lg" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                    Buscar
                  </h3>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all text-slate-900 font-bold placeholder-slate-400"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Categorías */}
              <div className="mb-8">
                <h3 className="font-black text-slate-900 mb-4 text-lg flex items-center gap-2" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  <FaTrophy className="text-yellow-500" />
                  Categorías
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${
                      selectedCategory === 'all' 
                        ? 'bg-gradient-to-r from-blue-900 to-red-900 text-white shadow-lg scale-105' 
                        : 'text-slate-700 hover:bg-slate-100 border-2 border-slate-200 hover:border-blue-900'
                    }`}
                  >
                    Todas las categorías
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${
                        selectedCategory === category.id 
                          ? 'bg-gradient-to-r from-blue-900 to-red-900 text-white shadow-lg scale-105' 
                          : 'text-slate-700 hover:bg-slate-100 border-2 border-slate-200 hover:border-blue-900'
                      }`}
                    >
                      <span className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtros rápidos */}
              <div>
                <h3 className="font-black text-slate-900 mb-4 text-lg flex items-center gap-2" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  <FaStar className="text-yellow-500" />
                  Filtros Rápidos
                </h3>
                <div className="space-y-3">
                  <Link 
                    to="/products?filter=new-collection"
                    className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-blue-700 rounded-xl transition-all font-bold border-2 border-blue-300 hover:border-blue-500 hover:scale-105"
                  >
                    <FaBolt className="text-xl text-yellow-500" />
                    <span>Colección 2025</span>
                  </Link>

                  <Link 
                    to="/products?filter=discount"
                    className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 text-red-700 rounded-xl transition-all font-bold border-2 border-orange-300 hover:border-orange-500 hover:scale-105"
                  >
                    <FaFire className="text-xl animate-pulse" />
                    <span>En Oferta</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Botón filtros móvil */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-900 to-red-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform border-4 border-white"
          >
            {showFilters ? <FaTimes className="text-2xl" /> : <FaFilter className="text-2xl" />}
          </button>

          {/* Filtros móvil - Overlay */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-md p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-white" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  Filtros
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <FaTimes className="text-3xl" />
                </button>
              </div>
              
              {/* Contenido de filtros móvil (mismo que desktop) */}
              <div className="bg-white rounded-2xl p-6">
                {/* Búsqueda móvil */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 text-slate-900 font-bold"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                {/* Categorías móvil */}
                <div className="mb-6">
                  <h3 className="font-black text-slate-900 mb-4 text-lg" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                    Categorías
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => { handleCategoryChange('all'); setShowFilters(false); }}
                      className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${
                        selectedCategory === 'all' 
                          ? 'bg-gradient-to-r from-blue-900 to-red-900 text-white' 
                          : 'text-slate-700 hover:bg-slate-100 border-2 border-slate-200'
                      }`}
                    >
                      Todas las categorías
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => { handleCategoryChange(category.id); setShowFilters(false); }}
                        className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${
                          selectedCategory === category.id 
                            ? 'bg-gradient-to-r from-blue-900 to-red-900 text-white' 
                            : 'text-slate-700 hover:bg-slate-100 border-2 border-slate-200'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 🛍️ Grid de productos */}
          <div className="lg:w-3/4">
            {/* Header de productos */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-xl border-4 border-slate-200">
              <div className="flex items-center gap-3">
                <FaCrown className="text-3xl text-yellow-500" />
                <div>
                  <p className="text-slate-700 font-bold text-lg">
                    Mostrando <span className="text-blue-900 font-black">{filteredProducts.length}</span> productos
                  </p>
                  <p className="text-sm text-slate-500 font-medium">
                    {getActiveFilterText()}
                  </p>
                </div>
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 font-bold text-slate-900"
              >
                <option value="relevant">Más Relevantes</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="name-az">Nombre: A-Z</option>
                <option value="name-za">Nombre: Z-A</option>
                <option value="discount">Mayor Descuento</option>
              </select>
            </div>

            {/* Productos */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow-xl border-4 border-slate-200">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full mb-6">
                  <FaSearch className="text-5xl text-slate-400" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  No encontramos productos
                </h3>
                <p className="text-slate-600 mb-8 text-lg">
                  Intenta con otros términos de búsqueda o categorías
                </p>
                <Link 
                  to="/products"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-900 to-red-900 hover:from-blue-800 hover:to-red-800 text-white font-black py-4 px-8 rounded-xl transition-all shadow-lg hover:scale-105"
                >
                  <FaAward className="text-xl" />
                  VER TODOS LOS PRODUCTOS
                  <FaArrowRight />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
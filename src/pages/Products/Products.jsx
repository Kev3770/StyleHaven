import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, categories, getProductsByCategory, searchProducts } from '../../data/products';
import { useCart } from '../../hooks/useCart';
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
  FaAward
} from 'react-icons/fa';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  const categoryFromUrl = searchParams.get('category');
  const searchFromUrl = searchParams.get('search');
  const filterFromUrl = searchParams.get('filter');

  useEffect(() => {
    let result = products;

    // Filtro por categoría desde URL
    if (categoryFromUrl && categoryFromUrl !== 'all') {
      result = getProductsByCategory(categoryFromUrl);
      setSelectedCategory(categoryFromUrl);
    }

    // Filtro por búsqueda desde URL
    if (searchFromUrl) {
      result = searchProducts(searchFromUrl);
      setSearchQuery(searchFromUrl);
    }

    // Sistema de filtros
    if (filterFromUrl === 'discount') {
      result = result.filter(product => product.discount > 0);
    }
    
    // 🆕 NUEVO FILTRO - Colección 2025
    if (filterFromUrl === 'new-collection') {
      result = result.filter(product => product.isNewCollection);
    }

    setFilteredProducts(result);
  }, [categoryFromUrl, searchFromUrl, filterFromUrl]);

  const handleAddToCart = (product) => {
    addToCart(product, 'M', 1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(getProductsByCategory(category));
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setFilteredProducts(searchProducts(e.target.value));
    } else {
      setFilteredProducts(products);
    }
  };

  // Función para obtener el texto del filtro activo
  const getActiveFilterText = () => {
    if (filterFromUrl === 'discount') return 'EN OFERTA';
    if (filterFromUrl === 'new-collection') return 'COLECCIÓN 2025';
    return 'COLECCIÓN PREMIUM';
  };

  const getFilterDescription = () => {
    if (filterFromUrl === 'discount') return 'Productos con descuentos especiales';
    if (filterFromUrl === 'new-collection') return 'Nueva colección primavera-verano 2025';
    return 'Colección premium masculina';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner - Estilo Premium */}
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
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-md text-indigo-300 text-sm font-bold px-5 py-2.5 rounded-full border border-indigo-400/30 mb-6">
              <FaBolt className="text-yellow-400" />
              {getActiveFilterText()}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none text-white">
              EXPLORA
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                NUESTRA TIENDA
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-slate-300 font-light max-w-2xl">
              Descubre {filteredProducts.length} productos únicos seleccionados para el hombre moderno
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/"
                className="group bg-slate-800/50 backdrop-blur-md border-2 border-slate-600 hover:border-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-3 hover:scale-105"
              >
                VOLVER AL INICIO
                <FaArrowRight className="group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros - Desktop */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 sticky top-4 border border-slate-700 backdrop-blur-md">
              {/* Búsqueda */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FaSearch className="text-indigo-400 text-xl" />
                  <h3 className="font-bold text-white text-lg">Buscar</h3>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white placeholder-slate-400"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Categorías */}
              <div className="mb-8">
                <h3 className="font-bold text-white mb-4 text-lg">Categorías</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${
                      selectedCategory === 'all' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105' 
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
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
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105' 
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm opacity-75 bg-slate-600 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtros adicionales */}
              <div>
                <h3 className="font-bold text-white mb-4 text-lg">Filtros Rápidos</h3>
                <div className="space-y-3">
                  {/* Filtro Colección 2025 */}
                  <Link 
                    to="/products?filter=new-collection"
                    className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 hover:from-blue-500/30 hover:to-cyan-500/30 rounded-xl transition-all font-bold border-2 border-blue-500/30 hover:border-blue-400 hover:scale-105"
                  >
                    <FaBolt className="text-xl group-hover:scale-110 transition-transform text-yellow-400" />
                    <span>Colección 2025</span>
                  </Link>

                  {/* Filtro Ofertas */}
                  <Link 
                    to="/products?filter=discount"
                    className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 hover:from-orange-500/30 hover:to-red-500/30 rounded-xl transition-all font-bold border-2 border-orange-500/30 hover:border-orange-400 hover:scale-105"
                  >
                    <FaFire className="text-xl group-hover:scale-110 transition-transform" />
                    <span>En Oferta</span>
                  </Link>

                  {/* Filtro Nuevos */}
                  <Link 
                    to="/products"
                    className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 hover:from-green-500/30 hover:to-emerald-500/30 rounded-xl transition-all font-bold border-2 border-green-500/30 hover:border-green-400 hover:scale-105"
                  >
                    <FaGift className="text-xl group-hover:scale-110 transition-transform" />
                    <span>Nuevos</span>
                  </Link>

                  {/* Filtro Más Vendidos */}
                  <Link 
                    to="/products"
                    className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 hover:from-yellow-500/30 hover:to-amber-500/30 rounded-xl transition-all font-bold border-2 border-yellow-500/30 hover:border-yellow-400 hover:scale-105"
                  >
                    <FaStar className="text-xl group-hover:scale-110 transition-transform" />
                    <span>Más Vendidos</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Botón filtros móvil */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 rounded-full shadow-2xl shadow-indigo-500/50 hover:scale-110 transition-transform backdrop-blur-md border border-indigo-400/30"
          >
            {showFilters ? <FaTimes className="text-2xl" /> : <FaFilter className="text-2xl" />}
          </button>

          {/* Filtros móvil */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-md p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-white">Filtros</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>
              
              {/* Búsqueda móvil */}
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-400"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Categorías móvil */}
              <div className="mb-8">
                <h3 className="font-bold text-white mb-4 text-lg">Categorías</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => { handleCategoryChange('all'); setShowFilters(false); }}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${
                      selectedCategory === 'all' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                        : 'text-slate-300 hover:bg-slate-800'
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
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm opacity-75 bg-slate-700 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtros rápidos móvil */}
              <div className="mb-8">
                <h3 className="font-bold text-white mb-4 text-lg">Filtros Rápidos</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    to="/products?filter=new-collection"
                    onClick={() => setShowFilters(false)}
                    className="flex flex-col items-center gap-2 p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 hover:from-blue-500/30 hover:to-cyan-500/30 rounded-xl transition-all font-bold border-2 border-blue-500/30 hover:border-blue-400"
                  >
                    <FaBolt className="text-xl text-yellow-400" />
                    <span className="text-sm text-center">Colección 2025</span>
                  </Link>

                  <Link 
                    to="/products?filter=discount"
                    onClick={() => setShowFilters(false)}
                    className="flex flex-col items-center gap-2 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 hover:from-orange-500/30 hover:to-red-500/30 rounded-xl transition-all font-bold border-2 border-orange-500/30 hover:border-orange-400"
                  >
                    <FaFire className="text-xl" />
                    <span className="text-sm text-center">En Oferta</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Grid de productos */}
          <div className="lg:w-3/4">
            {/* Header de productos */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
              <div className="flex items-center gap-3">
                <FaMedal className="text-2xl text-yellow-500" />
                <div>
                  <p className="text-slate-300 font-medium">
                    Mostrando <span className="font-bold text-indigo-400">{filteredProducts.length}</span> productos
                    {filterFromUrl && (
                      <span className={`ml-2 text-xs font-bold px-2 py-1 rounded-full ${
                        filterFromUrl === 'new-collection' 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      }`}>
                        {filterFromUrl === 'new-collection' ? 'COLECCIÓN 2025' : 'EN OFERTA'}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-slate-500">
                    {getFilterDescription()}
                  </p>
                </div>
              </div>
              <select className="px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-white">
                <option className="bg-slate-700">Más relevantes</option>
                <option className="bg-slate-700">Precio: Menor a mayor</option>
                <option className="bg-slate-700">Precio: Mayor a menor</option>
                <option className="bg-slate-700">Nombre: A-Z</option>
                <option className="bg-slate-700">Nombre: Z-A</option>
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
              <div className="text-center py-20 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-700 rounded-full mb-6">
                  <FaSearch className="text-4xl text-slate-400" />
                </div>
                <h3 className="text-3xl font-black text-white mb-3">
                  No encontramos productos
                </h3>
                <p className="text-slate-400 mb-8 text-lg font-light">
                  Intenta con otros términos de búsqueda o categorías
                </p>
                <Link 
                  to="/products"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4 px-8 rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:scale-105"
                >
                  <FaAward className="text-xl" />
                  VER TODOS LOS PRODUCTOS
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
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
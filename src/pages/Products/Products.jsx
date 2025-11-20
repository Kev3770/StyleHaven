import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, categories, getProductsByCategory, searchProducts } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { FaSearch, FaFire, FaStar, FaGift, FaFilter, FaTimes } from 'react-icons/fa';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  const categoryFromUrl = searchParams.get('category');
  const searchFromUrl = searchParams.get('search');

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

    if (searchParams.get('filter') === 'discount') {
      result = products.filter(product => product.discount > 0);
    }

    setFilteredProducts(result);
  }, [categoryFromUrl, searchFromUrl, searchParams]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-3">Nuestra Colección</h1>
          <p className="text-lg text-indigo-100">
            Descubre {filteredProducts.length} productos únicos seleccionados para ti
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros - Desktop */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 border border-gray-100">
              {/* Búsqueda */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FaSearch className="text-indigo-600 text-xl" />
                  <h3 className="font-bold text-gray-900 text-lg">Buscar</h3>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Categorías */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Categorías</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${
                      selectedCategory === 'all' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Todas las categorías
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${
                        selectedCategory === category.id 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm opacity-75">({category.count})</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtros adicionales */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Filtros Rápidos</h3>
                <div className="space-y-3">
                  <Link 
                    to="/products?filter=discount"
                    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 hover:from-orange-100 hover:to-red-100 rounded-xl transition-all font-medium border-2 border-orange-200 hover:border-orange-300"
                  >
                    <FaFire className="text-xl" />
                    <span>En Oferta</span>
                  </Link>
                  <Link 
                    to="/products"
                    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all font-medium border-2 border-green-200 hover:border-green-300"
                  >
                    <FaGift className="text-xl" />
                    <span>Nuevos</span>
                  </Link>
                  <Link 
                    to="/products"
                    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 hover:from-yellow-100 hover:to-amber-100 rounded-xl transition-all font-medium border-2 border-yellow-200 hover:border-yellow-300"
                  >
                    <FaStar className="text-xl" />
                    <span>Más Vendidos</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Botón filtros móvil */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
          >
            {showFilters ? <FaTimes className="text-2xl" /> : <FaFilter className="text-2xl" />}
          </button>

          {/* Grid de productos */}
          <div className="lg:w-3/4">
            {/* Contador y ordenar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <p className="text-gray-600 font-medium">
                  Mostrando <span className="font-bold text-indigo-600">{filteredProducts.length}</span> productos
                </p>
              </div>
              <select className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium bg-white">
                <option>Más relevantes</option>
                <option>Precio: Menor a mayor</option>
                <option>Precio: Mayor a menor</option>
                <option>Nombre: A-Z</option>
                <option>Nombre: Z-A</option>
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
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                  <FaSearch className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  No encontramos productos
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Intenta con otros términos de búsqueda o categorías
                </p>
                <Link 
                  to="/products"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:scale-105"
                >
                  Ver Todos los Productos
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
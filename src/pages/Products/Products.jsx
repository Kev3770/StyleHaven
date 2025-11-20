import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, categories, getProductsByCategory, searchProducts } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { FaSearch, FaFire, FaStar, FaGift } from 'react-icons/fa';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const categoryFromUrl = searchParams.get('category');
  const searchFromUrl = searchParams.get('search');

  useEffect(() => {
    let result = products;

    // Filtrar por categoría
    if (categoryFromUrl && categoryFromUrl !== 'all') {
      result = getProductsByCategory(categoryFromUrl);
      setSelectedCategory(categoryFromUrl);
    }

    // Filtrar por búsqueda
    if (searchFromUrl) {
      result = searchProducts(searchFromUrl);
      setSearchQuery(searchFromUrl);
    }

    // Filtrar por ofertas
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header de la página */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Todos los Productos</h1>
          <p className="text-gray-600">
            Encuentra tu estilo perfecto entre {filteredProducts.length} productos
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              {/* Búsqueda */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaSearch className="text-blue-600" />
                  Buscar
                </h3>
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Categorías */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Categorías</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all' 
                        ? 'bg-blue-100 text-blue-600 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Todas las categorías
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id 
                          ? 'bg-blue-100 text-blue-600 font-semibold' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtros adicionales */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Filtros</h3>
                <div className="space-y-2">
                  <Link 
                    to="/products?filter=discount"
                    className="flex items-center gap-2 px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    <FaFire />
                    En Oferta
                  </Link>
                  <Link 
                    to="/products"
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaGift />
                    Nuevos
                  </Link>
                  <Link 
                    to="/products"
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaStar />
                    Más Vendidos
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de productos */}
          <div className="lg:w-3/4">
            {/* Contador y ordenar */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Mostrando {filteredProducts.length} productos
              </p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Ordenar por: Más relevantes</option>
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
              <div className="text-center py-12">
                <FaSearch className="text-6xl mb-4 text-gray-300 mx-auto" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta con otros términos de búsqueda o categorías
                </p>
                <Link 
                  to="/products"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
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
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTag } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart }) => {
  const {
    id,
    name,
    price,
    image,
    description,
    inStock,
    discount,
    category
  } = product;

  // Calcular precio con descuento
  const finalPrice = discount > 0 ? price * (1 - discount / 100) : price;

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart && inStock) {
      onAddToCart(product);
    }
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Aquí iría la lógica para agregar a favoritos
    alert('Agregado a favoritos');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <Link to={`/product/${id}`} className="block">
        {/* Imagen del producto */}
        <div className="relative">
          <div className="h-64 bg-gray-200 overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600';
              }}
            />
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {discount > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <FaTag className="text-xs" />
                -{discount}%
              </span>
            )}
            {!inStock && (
              <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Agotado
              </span>
            )}
          </div>

          {/* Botón rápido de favoritos */}
          <button 
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
            onClick={handleFavoriteClick}
          >
            <FaHeart className="text-gray-400 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Información del producto */}
        <div className="p-4">
          {/* Categoría */}
          <span className="text-xs text-gray-500 uppercase font-semibold">
            {category}
          </span>

          {/* Nombre */}
          <h3 className="text-lg font-semibold text-gray-800 mt-1 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {name}
          </h3>

          {/* Descripción */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Precio */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {discount > 0 ? (
                <>
                  <span className="text-2xl font-bold text-gray-800">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-800">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Botón de agregar al carrito */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCartClick}
          disabled={!inStock}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            inStock
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <FaShoppingCart className="text-sm" />
          {inStock ? 'Agregar al Carrito' : 'Agotado'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
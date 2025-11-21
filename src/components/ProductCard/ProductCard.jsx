import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTag, FaEye, FaStar, FaBolt } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';

const ProductCard = ({ product, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const toast = useToast();

  const {
    id,
    name,
    price,
    image,
    description,
    inStock,
    discount,
    category,
    isNewCollection
  } = product;

  const finalPrice = discount > 0 ? price * (1 - discount / 100) : price;

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!inStock) {
      toast.outOfStock();
      return;
    }
    
    if (onAddToCart) {
      onAddToCart(product);
      toast.addedToCart(name);
    }
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    if (!isFavorite) {
      toast.addedToWishlist(name);
    } else {
      toast.info(`${name} eliminado de favoritos`);
    }
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Aquí puedes implementar la lógica para vista rápida
    // Por ejemplo, abrir un modal o redirigir a la página del producto
    window.location.href = `/product/${id}`;
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-slate-100 hover:border-indigo-300"
      onMouseEnter={() => {
        setIsHovered(true);
        setShowQuickView(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickView(false);
      }}
    >
      {/* Contenedor principal sin Link - usaremos botones para las acciones */}
      <div className="block cursor-pointer">
        {/* Imagen del producto */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 h-80">
          <Link to={`/product/${id}`} className="block h-full">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&fit=crop';
              }}
            />
          </Link>
          
          {/* Overlay oscuro en hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Badges superiores */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {isNewCollection && (
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                <FaBolt className="text-xs" />
                2025
              </div>
            )}
            
            {discount > 0 && (
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                <FaTag className="text-xs" />
                -{discount}% OFF
              </div>
            )}
            
            {!inStock && (
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                Agotado
              </div>
            )}
          </div>

          {/* Botón de favoritos */}
          <button 
            className={`absolute top-4 right-4 w-11 h-11 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center z-10 ${
              isFavorite 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 scale-110 shadow-red-500/50' 
                : 'bg-white/90 backdrop-blur-sm hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:scale-110'
            }`}
            onClick={handleFavoriteClick}
          >
            <FaHeart className={`text-lg transition-colors ${
              isFavorite ? 'text-white' : 'text-slate-600 group-hover:text-white'
            }`} />
          </button>

          {/* Quick view en hover - CORREGIDO: ahora es un botón, no un Link anidado */}
          <div className={`absolute inset-x-0 bottom-0 p-4 transform transition-all duration-300 ${
            showQuickView ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
            <button
              onClick={handleQuickViewClick}
              className="w-full bg-white/95 backdrop-blur-md hover:bg-white text-slate-900 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl border border-slate-200"
            >
              <FaEye />
              Vista Rápida
            </button>
          </div>
        </div>

        {/* Información del producto - Envuelta en Link para navegación */}
        <Link to={`/product/${id}`} className="block p-5 hover:no-underline">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-indigo-600 uppercase font-bold tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              {category}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar className="text-sm" />
              <span className="text-xs font-bold text-slate-700">4.8</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors min-h-[3.5rem]">
            {name}
          </h3>

          <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <div className="flex items-end justify-between mb-4">
            <div>
              {discount > 0 ? (
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-slate-500 line-through">
                    ${price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-black text-slate-900">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>
            {discount > 0 && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                Ahorra ${(price - finalPrice).toFixed(2)}
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Botón de agregar al carrito - Separado del contenido clickeable principal */}
      <div className="px-5 pb-5">
        <button
          onClick={handleAddToCartClick}
          disabled={!inStock}
          className={`w-full py-3.5 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            inStock
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95'
              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
          }`}
        >
          <FaShoppingCart className="text-lg" />
          {inStock ? 'Agregar al Carrito' : 'No Disponible'}
        </button>
      </div>

      {/* Brillo decorativo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className={`absolute -top-full left-0 w-full h-full bg-gradient-to-b from-white/30 to-transparent transform transition-transform duration-1000 ${
          isHovered ? 'translate-y-full' : ''
        }`} />
      </div>
    </div>
  );
};

export default ProductCard;
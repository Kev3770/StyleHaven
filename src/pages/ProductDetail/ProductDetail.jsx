import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { 
  FaHeart, 
  FaShoppingCart, 
  FaChevronRight,
  FaBolt,
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaCheck,
  FaRuler,
  FaTag,
  FaFire,
  FaCrown,
  FaAward
} from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const toast = useToast();

  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-8xl font-black text-white mb-6" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
            404
          </div>
          <h2 className="text-3xl font-black text-white mb-4">Producto no encontrado</h2>
          <Link 
            to="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-900 to-red-900 hover:from-blue-800 hover:to-red-800 text-white font-black py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-2xl"
          >
            VOLVER A PRODUCTOS
            <FaChevronRight />
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const result = addToCart(product, selectedSize, quantity);
    if (result.success) {
      toast.addedToCart(product.name);
    } else {
      toast.outOfStock();
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate('/'), 500);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.addedToWishlist(product.name);
    }
  };

  const finalPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  // Mock de imágenes múltiples
  const productImages = [product.image, product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 🍞 Breadcrumb Estilo Premium */}
      <div className="bg-white border-b-4 border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-3 text-sm font-bold">
              <li>
                <Link to="/" className="text-slate-500 hover:text-blue-900 transition-colors">
                  Inicio
                </Link>
              </li>
              <li><FaChevronRight className="text-xs text-slate-400" /></li>
              <li>
                <Link to="/products" className="text-slate-500 hover:text-blue-900 transition-colors">
                  Productos
                </Link>
              </li>
              <li><FaChevronRight className="text-xs text-slate-400" /></li>
              <li className="text-blue-900 font-black">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 📸 Galería de Imágenes - Estilo Magazine */}
          <div>
            {/* Imagen principal */}
            <div className="bg-white rounded-2xl overflow-hidden mb-6 border-4 border-slate-200 shadow-2xl relative group">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&fit=crop';
                }}
              />
              
              {/* Badges flotantes */}
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                {product.isNewCollection && (
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-2xl flex items-center gap-2 border-2 border-white">
                    <FaBolt />
                    COLECCIÓN 2025
                  </div>
                )}
                {product.discount > 0 && (
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-2xl animate-pulse flex items-center gap-2 border-2 border-white">
                    <FaFire />
                    -{product.discount}% OFF
                  </div>
                )}
              </div>

              {/* Botón favorito flotante */}
              <button
                onClick={handleFavorite}
                className={`absolute top-6 right-6 w-14 h-14 rounded-full shadow-2xl transition-all flex items-center justify-center border-4 border-white ${
                  isFavorite 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 scale-110' 
                    : 'bg-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:scale-110'
                }`}
              >
                <FaHeart className={`text-2xl ${isFavorite ? 'text-white' : 'text-slate-600'}`} />
              </button>
            </div>
            
            {/* Mini galería */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-xl h-24 border-4 transition-all ${
                    selectedImage === index 
                      ? 'border-blue-900 shadow-xl scale-105' 
                      : 'border-slate-200 hover:border-blue-500'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 📋 Información del producto - Estilo Americano */}
          <div>
            {/* Categoría */}
            <span className="inline-block text-sm text-blue-900 uppercase font-black tracking-widest bg-blue-100 px-4 py-2 rounded-full border-2 border-blue-200 mb-4">
              {product.category}
            </span>
            
            {/* Título */}
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4" style={{
              fontFamily: '"Bebas Neue", sans-serif',
              lineHeight: '1.1'
            }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-slate-200">
              <div className="flex text-yellow-400 text-xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="fill-current" />
                ))}
              </div>
              <span className="text-slate-600 font-bold">(4.8 · 124 reseñas)</span>
              <span className="text-green-600 font-black flex items-center gap-2">
                <FaCheck className="text-sm" />
                VERIFICADO
              </span>
            </div>

            {/* Precio con descuento */}
            <div className="flex items-center space-x-4 mb-8 pb-8 border-b-2 border-slate-200">
              {product.discount > 0 ? (
                <>
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-red-900">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl text-slate-500 line-through font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg">
                    AHORRA ${(product.price - finalPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-red-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Descripción */}
            <p className="text-slate-700 mb-8 leading-relaxed text-lg font-medium bg-slate-100 p-6 rounded-2xl border-2 border-slate-200">
              {product.description}
            </p>

            {/* Tallas con diseño mejorado */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-slate-900 text-xl flex items-center gap-2" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  <FaRuler className="text-blue-900" />
                  Selecciona Talla
                </h3>
                <Link to="/products" className="text-sm text-blue-900 font-bold hover:underline">
                  Guía de Tallas →
                </Link>
              </div>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-16 border-4 rounded-xl font-black text-lg transition-all ${
                      selectedSize === size
                        ? 'border-blue-900 bg-blue-900 text-white shadow-xl scale-110'
                        : 'border-slate-300 text-slate-700 hover:border-blue-900 hover:scale-105 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div className="mb-8">
              <h3 className="font-black text-slate-900 text-xl mb-4" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                Cantidad
              </h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center border-4 border-slate-300 rounded-xl bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-14 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-l-lg transition-colors font-black text-2xl"
                  >
                    -
                  </button>
                  <span className="w-14 text-center font-black text-slate-900 text-2xl">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-14 h-14 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-lg transition-colors font-black text-2xl"
                  >
                    +
                  </button>
                </div>
                <span className={`text-lg font-bold flex items-center gap-2 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? (
                    <>
                      <FaCheck className="text-xl" />
                      EN STOCK
                    </>
                  ) : (
                    <>✗ AGOTADO</>
                  )}
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col gap-4 mb-8">
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className={`group py-5 px-8 rounded-xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  product.inStock
                    ? 'bg-gradient-to-r from-blue-900 to-red-900 hover:from-blue-800 hover:to-red-800 text-white shadow-2xl hover:scale-105'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              >
                <FaShoppingCart className="text-2xl group-hover:scale-110 transition-transform" />
                {product.inStock ? 'COMPRAR AHORA' : 'AGOTADO'}
              </button>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`py-5 px-8 rounded-xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  product.inStock
                    ? 'bg-white text-blue-900 border-4 border-blue-900 hover:bg-blue-900 hover:text-white shadow-xl hover:scale-105'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed border-4 border-slate-300'
                }`}
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              >
                AGREGAR AL CARRITO
              </button>
            </div>

            {/* Beneficios destacados */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: <FaTruck />, title: "Envío Gratis", desc: "+$50K", color: "from-green-500 to-emerald-600" },
                { icon: <FaShieldAlt />, title: "Garantía", desc: "30 días", color: "from-blue-500 to-cyan-600" },
                { icon: <FaAward />, title: "Premium", desc: "Calidad", color: "from-yellow-500 to-orange-600" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border-4 border-slate-200 hover:border-yellow-400 transition-all hover:scale-105">
                  <div className={`text-3xl bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.icon}
                  </div>
                  <div className="text-center">
                    <p className="font-black text-slate-900 text-sm">{item.title}</p>
                    <p className="text-slate-600 text-xs font-bold">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Información adicional */}
            <div className="bg-white border-4 border-slate-200 rounded-2xl p-6">
              <h3 className="font-black text-slate-900 text-xl mb-4 flex items-center gap-2" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                <FaTag className="text-blue-900" />
                Información del Producto
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="font-bold text-slate-700">SKU:</span>
                  <span className="text-slate-600 font-medium">SH-{product.id.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="font-bold text-slate-700">Categoría:</span>
                  <span className="text-slate-600 font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-bold text-slate-700">Envío:</span>
                  <span className="text-green-600 font-bold">Gratis en pedidos +$50.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
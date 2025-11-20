import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { 
  FaHeart, 
  FaShoppingCart, 
  FaChevronRight,
  FaBolt,
  FaTruck,
  FaShieldAlt,
  FaStar
} from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-black text-white mb-4">Producto no encontrado</h2>
          <Link 
            to="/products"
            className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            VOLVER A PRODUCTOS
            <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    alert(`${product.name} agregado al carrito!`);
  };

  const finalPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-3 text-sm font-medium">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">Inicio</Link>
              </li>
              <li><FaChevronRight className="text-xs text-slate-600" /></li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-white transition-colors">Productos</Link>
              </li>
              <li><FaChevronRight className="text-xs text-slate-600" /></li>
              <li className="text-white font-bold">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen del producto */}
          <div>
            <div className="bg-slate-800 rounded-2xl overflow-hidden mb-6 border-2 border-slate-700 shadow-2xl">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&fit=crop';
                }}
              />
            </div>
            
            {/* Mini galería */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-slate-800 rounded-xl h-20 border-2 border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer">
                  <img 
                    src={product.image} 
                    alt={`${product.name} ${item}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div>
            <span className="text-sm text-indigo-400 uppercase font-bold tracking-widest">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-2 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="fill-current" />
                ))}
              </div>
              <span className="text-slate-600 font-medium">(4.8 · 124 reseñas)</span>
            </div>

            {/* Precio */}
            <div className="flex items-center space-x-4 mb-6">
              {product.discount > 0 ? (
                <>
                  <span className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-slate-500 line-through font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-black">
                    -{product.discount}% OFF
                  </span>
                </>
              ) : (
                <span className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Descripción */}
            <p className="text-slate-600 mb-8 leading-relaxed text-lg font-light">
              {product.description}
            </p>

            {/* Tallas */}
            <div className="mb-8">
              <h3 className="font-bold text-slate-900 text-lg mb-4">Selecciona Talla:</h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border-2 rounded-xl font-bold transition-all ${
                      selectedSize === size
                        ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-110'
                        : 'border-slate-300 text-slate-700 hover:border-indigo-500 hover:scale-105 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div className="mb-8">
              <h3 className="font-bold text-slate-900 text-lg mb-4">Cantidad:</h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center border-2 border-slate-300 rounded-xl bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-l-lg transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-black text-slate-900 text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-lg transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
                <span className={`text-lg font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? '✓ En stock' : '✗ Agotado'}
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`group flex-1 py-4 px-8 rounded-xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  product.inStock
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30 hover:scale-105'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <FaShoppingCart className="group-hover:scale-110 transition-transform" />
                {product.inStock ? 'AGREGAR AL CARRITO' : 'AGOTADO'}
              </button>
              <button className="group w-16 h-16 border-2 border-slate-300 rounded-xl flex items-center justify-center text-slate-600 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all hover:scale-105">
                <FaHeart className="group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Beneficios */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700">
                <FaTruck className="text-2xl text-indigo-400" />
                <div>
                  <p className="font-bold text-white text-sm">Envío Gratis</p>
                  <p className="text-slate-400 text-xs">+$50.000</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700">
                <FaShieldAlt className="text-2xl text-green-400" />
                <div>
                  <p className="font-bold text-white text-sm">Garantía</p>
                  <p className="text-slate-400 text-xs">30 días</p>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="border-t border-slate-300 pt-6">
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
                  <span className="text-slate-600 font-medium">Gratis en pedidos +$50.000</span>
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
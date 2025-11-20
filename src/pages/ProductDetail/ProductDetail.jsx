import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { FaHeart, FaShoppingCart, FaChevronRight } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
          <Link 
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Volver a Productos
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600">Inicio</Link>
            </li>
            <li><FaChevronRight className="text-xs" /></li>
            <li>
              <Link to="/products" className="hover:text-blue-600">Productos</Link>
            </li>
            <li><FaChevronRight className="text-xs" /></li>
            <li className="text-gray-800 font-semibold">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen del producto */}
          <div>
            <div className="bg-gray-200 rounded-2xl h-96 overflow-hidden mb-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&fit=crop';
                }}
              />
            </div>
          </div>

          {/* Información del producto */}
          <div>
            <span className="text-sm text-gray-500 uppercase font-semibold">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-4">
              {product.name}
            </h1>

            {/* Precio */}
            <div className="flex items-center space-x-4 mb-6">
              {product.discount > 0 ? (
                <>
                  <span className="text-3xl font-bold text-gray-800">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    -{product.discount}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-800">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Descripción */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Tallas */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Talla:</h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 rounded-lg font-semibold transition-colors ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-blue-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Cantidad:</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.inStock ? '✓ En stock' : '✗ Agotado'}
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaShoppingCart />
                {product.inStock ? 'Agregar al Carrito' : 'Agotado'}
              </button>
              <button className="w-14 h-14 border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                <FaHeart />
              </button>
            </div>

            {/* Información adicional */}
            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>SKU:</span>
                  <span>SH-{product.id.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Categoría:</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span>Gratis en pedidos superiores a $50.000</span>
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
import React from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../common/Modal/Modal';
import Button from '../common/Button/Button';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaShoppingBag, FaTimes, FaTag, FaArrowRight, FaCrown } from 'react-icons/fa';

const Cart = () => {
  const { 
    items, 
    total, 
    itemCount, 
    isOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity,
    clearCart 
  } = useCart();
  
  const toast = useToast();

  const handleQuantityChange = (productId, size, newQuantity, productName) => {
    if (newQuantity === 0) {
      removeFromCart(productId, size);
      toast.removedFromCart(productName);
    } else {
      updateQuantity(productId, size, newQuantity);
      toast.info(`Cantidad actualizada: ${newQuantity}`);
    }
  };

  const handleRemoveItem = (productId, size, productName) => {
    removeFromCart(productId, size);
    toast.removedFromCart(productName);
  };

  const handleClearCart = () => {
    if (clearCart()) {
      toast.cartCleared();
    }
  };

  const handleCheckout = () => {
    toast.success('¡Proceso de compra iniciado! Redirigiendo al checkout...');
    setTimeout(() => {
      toggleCart();
    }, 1500);
  };

  const calculateDiscount = (item) => {
    return item.discount > 0 ? item.price * (item.discount / 100) * item.quantity : 0;
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = items.reduce((sum, item) => sum + calculateDiscount(item), 0);

  return (
    <Modal isOpen={isOpen} onClose={toggleCart} title={
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-900 to-red-900 rounded-full flex items-center justify-center border-2 border-white shadow-xl">
            <FaShoppingCart className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              Mi Carrito
            </h2>
            {itemCount > 0 && (
              <p className="text-xs text-gray-500 font-bold">{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</p>
            )}
          </div>
        </div>
        <button 
          onClick={toggleCart}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors group"
        >
          <FaTimes className="text-gray-500 group-hover:text-red-600 text-xl" />
        </button>
      </div>
    }>
      <div className="flex flex-col h-full">
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-100 to-red-100 rounded-full mb-6 border-4 border-slate-200">
                <FaShoppingBag className="text-6xl text-blue-900" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                Tu carrito está vacío
              </h3>
              <p className="text-gray-600 mb-8 text-lg">¡Empieza a agregar productos increíbles!</p>
              <Button 
                onClick={toggleCart} 
                className="bg-gradient-to-r from-blue-900 to-red-900 hover:from-blue-800 hover:to-red-800 text-white font-black py-4 px-8 rounded-xl transition-all shadow-lg hover:scale-105"
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              >
                Explorar Productos
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-6" style={{ maxHeight: '400px' }}>
              {items.map((item) => {
                const finalPrice = item.discount > 0 
                  ? item.price * (1 - item.discount / 100) 
                  : item.price;
                
                return (
                  <div 
                    key={`${item.id}-${item.size}`} 
                    className="group bg-white rounded-2xl p-4 border-4 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Imagen del producto */}
                      <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-red-50 border-2 border-slate-200">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&fit=crop';
                            }}
                          />
                        </div>
                        {item.discount > 0 && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-black px-2 py-1 rounded-full shadow-lg flex items-center gap-1 border-2 border-white">
                            <FaTag className="text-xs" />
                            -{item.discount}%
                          </div>
                        )}
                      </div>
                      
                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-gray-900 truncate group-hover:text-blue-900 transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500 flex items-center gap-2 font-bold">
                              <span>Talla:</span>
                              <span className="bg-gray-100 px-2 py-0.5 rounded-md font-black text-blue-900">{item.size}</span>
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id, item.size, item.name)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 group/btn"
                            title="Eliminar producto"
                          >
                            <FaTrash className="text-sm group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                        
                        {/* Precio y controles */}
                        <div className="flex justify-between items-center mt-3">
                          <div>
                            {item.discount > 0 ? (
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-red-900">
                                  ${(finalPrice * item.quantity).toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-400 line-through font-bold">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xl font-black text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            )}
                          </div>
                          
                          {/* Controles de cantidad */}
                          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1 border-2 border-slate-200">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1, item.name)}
                              className="w-8 h-8 rounded-full bg-white hover:bg-gradient-to-r hover:from-blue-900 hover:to-red-900 hover:text-white flex items-center justify-center transition-all shadow-sm font-black"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="w-8 text-center font-black text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1, item.name)}
                              className="w-8 h-8 rounded-full bg-white hover:bg-gradient-to-r hover:from-blue-900 hover:to-red-900 hover:text-white flex items-center justify-center transition-all shadow-sm font-black"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Resumen de compra */}
            <div className="border-t-4 border-gray-100 pt-6 space-y-4">
              {/* Subtotal y descuentos */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600 font-bold">
                  <span>Subtotal</span>
                  <span className="font-black">${subtotal.toFixed(2)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-green-600 font-bold">
                    <span className="flex items-center gap-1">
                      <FaTag className="text-xs" />
                      Descuentos
                    </span>
                    <span className="font-black">-${totalDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 font-bold">
                  <span>Envío</span>
                  <span className="font-black text-green-600">GRATIS</span>
                </div>
              </div>
              
              {/* Total */}
              <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-2xl p-4 border-4 border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-gray-900 flex items-center gap-2" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                    <FaCrown className="text-yellow-500" />
                    Total a Pagar
                  </span>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-red-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Botones de acción */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-blue-900 to-red-900 hover:from-blue-800 hover:to-red-800 text-white font-black py-4 px-6 rounded-xl transition-all shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center justify-center gap-3"
                  style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                >
                  <FaShoppingCart className="text-xl" />
                  Finalizar Compra
                  <FaArrowRight className="text-sm" />
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleClearCart}
                    className="flex-1 bg-white hover:bg-red-50 text-red-600 border-4 border-red-200 hover:border-red-400 font-black py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                    style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                  >
                    <FaTrash className="text-sm" />
                    Vaciar
                  </button>
                  <button
                    onClick={toggleCart}
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-4 border-gray-200 hover:border-gray-400 font-black py-3 px-4 rounded-xl transition-all"
                    style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                  >
                    Seguir Comprando
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
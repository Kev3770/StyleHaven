import React from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext'; // 🔥 NUEVO
import Modal from '../common/Modal/Modal';
import Button from '../common/Button/Button';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaShoppingBag, FaTimes, FaTag, FaArrowRight } from 'react-icons/fa';

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
  
  const toast = useToast(); // 🔥 NUEVO: Hook de notificaciones

  const handleQuantityChange = (productId, size, newQuantity, productName) => {
    if (newQuantity === 0) {
      removeFromCart(productId, size);
      toast.removedFromCart(productName); // 🔥 NUEVO: Notificación
    } else {
      updateQuantity(productId, size, newQuantity);
      toast.info(`Cantidad actualizada: ${newQuantity}`); // 🔥 NUEVO: Notificación
    }
  };

  // 🔥 NUEVO: Manejar eliminación con notificación
  const handleRemoveItem = (productId, size, productName) => {
    removeFromCart(productId, size);
    toast.removedFromCart(productName);
  };

  // 🔥 NUEVO: Manejar vaciar carrito con notificación
  const handleClearCart = () => {
    if (clearCart()) {
      toast.cartCleared();
    }
  };

  // 🔥 NUEVO: Manejar checkout con notificación
  const handleCheckout = () => {
    toast.success('¡Proceso de compra iniciado! Redirigiendo al checkout...');
    // Aquí irá la lógica real de checkout
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
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
            <FaShoppingCart className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900">Mi Carrito</h2>
            {itemCount > 0 && (
              <p className="text-xs text-gray-500">{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</p>
            )}
          </div>
        </div>
        <button 
          onClick={toggleCart}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaTimes className="text-gray-500" />
        </button>
      </div>
    }>
      <div className="flex flex-col h-full">
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-6">
                <FaShoppingBag className="text-5xl text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Tu carrito está vacío</h3>
              <p className="text-gray-600 mb-8">¡Empieza a agregar productos increíbles!</p>
              <Button 
                onClick={toggleCart} 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:scale-105"
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
                    className="group bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Imagen del producto */}
                      <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
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
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <FaTag className="text-xs" />
                            -{item.discount}%
                          </div>
                        )}
                      </div>
                      
                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <span className="font-medium">Talla:</span>
                              <span className="bg-gray-100 px-2 py-0.5 rounded-md font-semibold">{item.size}</span>
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id, item.size, item.name)} // 🔥 ACTUALIZADO
                            className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                            title="Eliminar producto"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                        
                        {/* Precio y controles */}
                        <div className="flex justify-between items-center mt-3">
                          <div>
                            {item.discount > 0 ? (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-black text-indigo-600">
                                  ${(finalPrice * item.quantity).toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-black text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            )}
                          </div>
                          
                          {/* Controles de cantidad */}
                          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1, item.name)} // 🔥 ACTUALIZADO
                              className="w-7 h-7 rounded-full bg-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1, item.name)} // 🔥 ACTUALIZADO
                              className="w-7 h-7 rounded-full bg-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
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
            <div className="border-t-2 border-gray-100 pt-6 space-y-4">
              {/* Subtotal y descuentos */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <FaTag className="text-xs" />
                      Descuentos
                    </span>
                    <span className="font-semibold">-${totalDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="font-semibold text-green-600">GRATIS</span>
                </div>
              </div>
              
              {/* Total */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border-2 border-indigo-100">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total a Pagar</span>
                  <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Botones de acción */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCheckout} // 🔥 ACTUALIZADO
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                >
                  <FaShoppingCart />
                  Finalizar Compra
                  <FaArrowRight className="text-sm" />
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleClearCart} // 🔥 ACTUALIZADO
                    className="flex-1 bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 hover:border-red-300 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <FaTrash className="text-sm" />
                    Vaciar
                  </button>
                  <button
                    onClick={toggleCart}
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 font-semibold py-3 px-4 rounded-xl transition-all"
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
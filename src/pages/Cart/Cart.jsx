import React from 'react';
import { useCart } from '../../context/CartContext.jsx';
import Modal from '../../components/common/Modal/Modal.jsx';
import Button from '../../components/common/Button/Button.jsx';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTimes } from 'react-icons/fa';

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

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId, size);
    } else {
      updateQuantity(productId, size, newQuantity);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={toggleCart} title={
      <div className="flex items-center gap-2">
        <FaShoppingBag />
        Tu Carrito de Compras
        {itemCount > 0 && (
          <span className="bg-blue-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
    }>
      <div className="max-h-96 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <FaShoppingBag className="text-6xl mb-4 text-gray-300 mx-auto" />
            <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
            <Button onClick={toggleCart} variant="outline">
              Seguir Comprando
            </Button>
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                  {/* Imagen del producto */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&fit=crop';
                      }}
                    />
                  </div>
                  
                  {/* Información del producto */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">Talla: {item.size}</p>
                    <p className="text-lg font-bold text-blue-600">
                      ${((item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  {/* Controles de cantidad */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                  
                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2"
                    title="Eliminar producto"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Total y acciones */}
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold border-t border-gray-200 pt-4">
                <span>Total:</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={clearCart} 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <FaTrash className="text-sm" />
                  Vaciar Carrito
                </Button>
                <Button 
                  onClick={() => {
                    alert('¡Proceso de compra iniciado!');
                    toggleCart();
                  }} 
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <FaShoppingBag className="text-sm" />
                  Finalizar Compra
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
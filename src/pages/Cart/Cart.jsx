import React from 'react';
import { useCart } from '../../context/CartContext.jsx';
import Modal from '../../components/common/Modal/Modal.jsx';
import Button from '../../components/common/Button/Button.jsx';
import { 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaShoppingBag, 
  FaTimes,
  FaArrowRight,
  FaBolt,
  FaAward
} from 'react-icons/fa';

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
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-xl">
          <FaShoppingBag className="text-white text-lg" />
        </div>
        <div>
          <h3 className="font-black text-white text-xl">Tu Carrito</h3>
          {itemCount > 0 && (
            <p className="text-slate-300 text-sm font-medium">
              {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
            </p>
          )}
        </div>
        {itemCount > 0 && (
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-black rounded-full h-8 w-8 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            {itemCount}
          </span>
        )}
      </div>
    }>
      <div className="max-h-96 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-700 rounded-full mb-6">
              <FaShoppingBag className="text-4xl text-slate-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Carrito Vacío</h3>
            <p className="text-slate-400 mb-8 font-light">Agrega productos para continuar</p>
            <Button 
              onClick={toggleCart} 
              variant="outline"
              className="group border-2 border-slate-600 hover:border-indigo-500 text-white hover:text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105"
            >
              SEGUIR COMPRANDO
              <FaArrowRight className="group-hover:translate-x-1 transition-transform ml-2" />
            </Button>
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4 border-b border-slate-700 pb-4">
                  {/* Imagen del producto */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-700 border-2 border-slate-600">
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
                    <h4 className="font-bold text-white mb-1">{item.name}</h4>
                    <p className="text-sm text-slate-400 mb-2">Talla: {item.size}</p>
                    <p className="text-lg font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      ${((item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  {/* Controles de cantidad */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                      className="w-10 h-10 rounded-xl bg-slate-700 hover:bg-slate-600 border-2 border-slate-600 flex items-center justify-center transition-all hover:scale-110"
                    >
                      <FaMinus className="text-slate-300 text-xs" />
                    </button>
                    <span className="w-8 text-center font-black text-white text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                      className="w-10 h-10 rounded-xl bg-slate-700 hover:bg-slate-600 border-2 border-slate-600 flex items-center justify-center transition-all hover:scale-110"
                    >
                      <FaPlus className="text-slate-300 text-xs" />
                    </button>
                  </div>
                  
                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-slate-400 hover:text-red-400 transition-all p-3 hover:scale-110"
                    title="Eliminar producto"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Total y acciones */}
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center text-xl font-black border-t border-slate-700 pt-4">
                <span className="text-white">Total:</span>
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-2xl">
                  ${total.toFixed(2)}
                </span>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={clearCart} 
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-3 border-2 border-slate-600 hover:border-red-500 text-slate-300 hover:text-red-400 font-bold py-4 transition-all hover:scale-105"
                >
                  <FaTrash className="text-lg" />
                  Vaciar Carrito
                </Button>
                <Button 
                  onClick={() => {
                    alert('¡Proceso de compra iniciado!');
                    toggleCart();
                  }}
                  className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4 transition-all shadow-lg shadow-indigo-500/30 hover:scale-105"
                >
                  <FaAward className="text-lg" />
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